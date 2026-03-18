import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import packImg2 from "../assets/images/rbmedals.jpg";
import packImg3 from "../assets/images/rblskd.jpg";
import packImg4 from "../assets/images/rbthree.jpg";
import packImg5 from "../assets/images/rbjay.jpg";
import packImg6 from "../assets/images/packImg6.jpg";
import packImg7 from "../assets/images/packImgNew.jpg";
import packImg8 from "../assets/images/packImg8.jpg";

const wait = (ms) => new Promise(res => setTimeout(res, ms));

export default function BuddiesPage() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTap, setActiveTap] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [typedTime, setTypedTime] = useState("");
  const [timePeriod, setTimePeriod] = useState("AM");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardType, setKeyboardType] = useState("abc");

  const filters = {
    activity: "Running",
    level: "Occasional",
    location: "Auckland CBD",
    gender: "Any",
    time: "6:30 PM"
  };

  const selections = {
    1: ["Running", "Gym", "Walking", "Hiking", "Sports"],
    2: ["Beginner", "Occasional", "Regular", "Good", "Consistent", "Pro", "Athlete"],
    3: ["Auckland CBD", "Newmarket", "Ponsonby", "Mt Eden", "Takapuna"],
    4: ["Male", "Female", "Other", "Any"]
  };

  const targets = {
    1: "Running",
    2: "Occasional",
    3: "Auckland CBD",
    4: "Any"
  };

  useEffect(() => {
    let isCancelled = false;

    const runAutomatedFlow = async () => {
      if (!isPlaying) return;

      if (step >= 1 && step <= 4) {
        const targetName = targets[step];

        // Let viewer read options
        await wait(2000);
        if (isCancelled) return;

        // Simulate finger pressing down on screen
        setActiveTap(targetName);
        await wait(250);
        if (isCancelled) return;

        // Finger lifts up (selection made)
        setActiveTap(null);
        setSelectedOption(targetName);
        await wait(1800);
        if (isCancelled) return;

        // Reset and advance
        setSelectedOption(null);
        setStep(s => s + 1);
      }
      else if (step === 5) {
        // Step 5: Time input with fake iOS Keyboard
        await wait(1500);
        if (isCancelled) return;

        // Tap the input field
        setActiveTap("time-input");
        await wait(250);
        if (isCancelled) return;
        setActiveTap(null);

        // Slide up keyboard (Defaults to ABC)
        setKeyboardType("abc");
        setKeyboardVisible(true);
        await wait(1400);
        if (isCancelled) return;

        // Tap "123" to switch keyboard layouts
        setActiveTap("123");
        await wait(200);
        setKeyboardType("123");
        setActiveTap(null);
        await wait(800);
        if (isCancelled) return;

        // Simulate typing 6:30
        const sequence = [
          { key: "0", val: "0" },
          { key: "6", val: "06" },
          { key: "3", val: "06:3" },
          { key: "0", val: "06:30" }
        ];

        for (const item of sequence) {
          setActiveTap(item.key);
          await wait(150);
          setTypedTime(item.val);
          setActiveTap(null);
          await wait(350); // read speed difference
          if (isCancelled) return;
        }

        await wait(800);

        // Tap AM/PM toggle
        setActiveTap("am-pm-toggle");
        await wait(250);
        setTimePeriod("PM");
        setActiveTap(null);

        await wait(800);

        // Tap Confirm button on screen
        setActiveTap("confirm-time");
        await wait(250);
        setKeyboardVisible(false);
        setActiveTap(null);
        setSelectedOption("confirm-time");

        await wait(1200);
        setSelectedOption(null);
        if (!isCancelled) setStep(6);
      }
      else if (step === 6) {
        // Searching state - Mobile Tinder matching energy
        await wait(5000);
        if (!isCancelled) setStep(7);
      }
      else if (step === 7) {
        // Vertical Tinder slot machine reveal
        await wait(8000);
        if (!isCancelled) setStep(8);
      }
    };

    runAutomatedFlow();

    return () => { isCancelled = true; };
  }, [step, isPlaying]);

  const rouletteCandidates = [
    { name: "Alex", img: packImg2, detail: "Regular • Ponsonby" },
    { name: "Jordan", img: packImg4, detail: "Pro • Newmarket" },
    { name: "Sam", img: packImg6, detail: "Occasional • CBD" },
    { name: "Taylor", img: packImg8, detail: "Consistent • Mt Eden" },
    { name: "Casey", img: packImg7, detail: "Good • Takapuna" },
  ];

  const displayRoulette = Array.from({ length: 30 }, (_, i) => rouletteCandidates[i % rouletteCandidates.length]);
  // The chosen buddy is index 25
  const chosenBuddyIndex = 25;
  const chosenBuddy = displayRoulette[chosenBuddyIndex];

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" } })
  };

  return (
    <div className="pt-24 md:pt-32 px-4 md:px-6 pb-24 min-h-screen flex flex-col items-center overflow-hidden bg-[#09090b] font-sans selection:bg-orange-500/30">

      {/* Centered Mobile Container to force iPhone aspect sizing layout logically */}
      <div className="w-full max-w-md relative flex flex-col items-center">
        <AnimatePresence mode="wait">

          {/* STEP 0: ENTRY / WELCOME */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full text-center mt-20 cursor-pointer group"
              onClick={() => {
                setIsPlaying(true);
                setStep(1);
              }}
            >
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-semibold tracking-widest uppercase">
                coming soon
              </div>
              <h1 className="text-5xl font-semibold mb-6 tracking-tight text-white leading-tight">
                Choose a <br /><span className="text-orange-500 font-bold">Buddy</span>
              </h1>
              <p className="text-lg text-zinc-500 mb-16 px-4 leading-relaxed font-light">
                Tap anywhere to preview our upcoming smart buddy-matching experience.
              </p>
            </motion.div>
          )}

          {/* STEPS 1-4: SELECTION FLOW */}
          {step >= 1 && step <= 4 && (
            <motion.div
              key={`selection-step-${step}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full mt-10 flex flex-col items-center"
            >
              <h2 className="text-3xl font-medium mb-10 text-center tracking-tight text-white px-4 leading-snug">
                {step === 1 && "What's your \nactivity?"}
                {step === 2 && "What's your \ncurrent level?"}
                {step === 3 && "Where are we \nmeeting?"}
                {step === 4 && "Who are you \nrunning with?"}
              </h2>

              <div className="w-full flex flex-col gap-3 px-2">
                {selections[step].map((option, i) => {
                  const isTapDown = activeTap === option;
                  const isSelected = selectedOption === option;

                  return (
                    <motion.div
                      key={option}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="w-full"
                    >
                      <div
                        className={`w-full py-4 px-6 flex items-center justify-between rounded-xl border text-base transition-all duration-300 ease-out font-medium tracking-wide ${isTapDown
                            ? 'scale-[0.98] bg-zinc-800 border-white/20 text-white'
                            : isSelected
                              ? 'border-orange-500 bg-orange-500 text-white shadow-[0_8px_30px_rgba(249,115,22,0.3)]'
                              : 'border-white/5 bg-zinc-900/50 text-zinc-400'
                          }`}
                      >
                        {option}
                        {isSelected && (
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 5: TIME INPUT (MOBILE FOCUSED) */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full mt-10 flex flex-col items-center"
            >
              <h2 className="text-3xl font-medium mb-12 text-center tracking-tight text-white px-4">
                What time?
              </h2>

              <div
                className={`w-full max-w-[280px] bg-zinc-900 border py-6 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${activeTap === "time-input" ? "border-orange-500 scale-[0.98] bg-zinc-800" : "border-white/10"}`}
              >
                <div className="text-5xl font-bold tracking-tight text-white flex items-center justify-center">
                  <span>{typedTime ? typedTime.slice(0, 5) : "--:--"}</span>
                  {/* Blinking cursor */}
                  <div className="w-[3px] h-10 bg-orange-500 rounded-full animate-pulse ml-2" />
                </div>

                {/* AM/PM Toggle */}
                <div
                  className={`mt-4 w-32 h-10 bg-zinc-950 rounded-lg border border-white/5 flex items-center justify-between p-1 transition-all duration-200 ${activeTap === "am-pm-toggle" ? "scale-[0.95] ring-1 ring-orange-500" : ""
                    }`}
                >
                  <div className={`flex-1 h-full rounded flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${timePeriod === "AM" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500"}`}>
                    AM
                  </div>
                  <div className={`flex-1 h-full rounded flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${timePeriod === "PM" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500"}`}>
                    PM
                  </div>
                </div>
              </div>

              <div
                className={`mt-10 px-10 py-4 font-semibold text-lg rounded-full transition-all duration-300 ${activeTap === "confirm-time"
                    ? "scale-[0.95] bg-orange-600 text-white"
                    : selectedOption === "confirm-time"
                      ? "bg-green-500 text-white shadow-[0_10px_30px_rgba(34,197,94,0.4)]"
                      : "bg-white/10 text-white/50"
                  }`}
              >
                Confirm Match Time
              </div>
            </motion.div>
          )}

          {/* STEP 6: SEARCHING (TINDER VIBES) */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full flex flex-col items-center justify-center mt-32 relative"
            >
              {/* Pulsing Match Radar Effect */}
              <div className="relative w-40 h-40 flex items-center justify-center mb-16">
                <img src={packImg4} className="w-16 h-16 rounded-full object-cover z-20 border-2 border-zinc-950 opacity-0 animate-[fade-in-out_2s_infinite_1s]" />
                <img src={packImg6} className="absolute w-12 h-12 rounded-full object-cover z-20 border-2 border-zinc-950 -top-4 -right-2 opacity-0 animate-[fade-in-out_2s_infinite_0.5s]" />
                <img src={packImg8} className="absolute w-14 h-14 rounded-full object-cover z-20 border-2 border-zinc-950 -bottom-2 -left-4 opacity-0 animate-[fade-in-out_2s_infinite_1.5s]" />

                {/* Center Dot */}
                <div className="w-20 h-20 rounded-full bg-orange-500/20 absolute z-10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,1)]" />
                </div>

                {/* Radar Rings */}
                <motion.div
                  animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-orange-500 bg-orange-500/5"
                />
                <motion.div
                  animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                  transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-orange-500 bg-orange-500/5"
                />
              </div>

              <h2 className="text-2xl font-light mb-12 tracking-wide text-zinc-300">
                Finding potential buddies...
              </h2>

              <div className="flex flex-wrap justify-center gap-2 px-2">
                {Object.values(filters).map((filter, i) => (
                  <motion.div
                    key={filter}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    className="px-4 py-1.5 bg-zinc-900 border border-white/5 rounded-full text-zinc-400 font-medium text-xs tracking-wider"
                  >
                    {filter}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 7: VERTICAL TINDER MATCH REVEAL */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full mt-10 flex flex-col items-center overflow-hidden"
            >
              <h2 className="text-3xl font-light mb-8 tracking-wide text-zinc-200">
                Buddy Found
              </h2>

              {/* Viewport for Vertical Roulette Reel */}
              <div className="relative w-full h-[450px] flex items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] rounded-3xl">

                {/* Center Selector Highlight Frame */}
                <div className="absolute top-1/2 left-0 right-0 -mt-[175px] h-[350px] border-[2px] border-orange-500/40 rounded-[2rem] z-20 pointer-events-none shadow-[0_0_50px_rgba(249,115,22,0.15)] bg-gradient-to-t from-orange-500/5 to-transparent transition-all duration-[7000ms]" />

                {/* Scrolling Vertical Track */}
                <motion.div
                  className="absolute flex flex-col items-center gap-6 w-full px-2"
                  style={{ top: "50%" }}
                  initial={{ y: "30%" }}
                  animate={{
                    // item height = 350, gap = 24. Math: -(index * 374) - (350/2)
                    y: `calc(-175px - ${chosenBuddyIndex * (350 + 24)}px)`
                  }}
                  transition={{
                    duration: 7.5,
                    ease: [0.12, 0, 0.05, 1], // Perfect slow ease
                  }}
                >
                  {displayRoulette.map((buddy, i) => (
                    <div
                      key={i}
                      className={`w-full h-[350px] rounded-[2rem] overflow-hidden relative shrink-0 transition-all duration-[1000ms] ease-out border ${i === chosenBuddyIndex ? 'border-orange-500 scale-100 opacity-100 shadow-2xl' : 'border-white/5 opacity-50 scale-[0.92] grayscale'}`}
                    >
                      <img src={buddy.img} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent flex flex-col justify-end p-8">
                        <h3 className="text-3xl font-semibold text-white tracking-tight">{buddy.name}</h3>
                        <p className="font-medium text-orange-400 text-sm mt-1">{buddy.detail}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* STEP 8: FINAL MATCH RESULT */}
          {step === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full mt-10 flex flex-col items-center bg-zinc-900/40 p-6 rounded-[2rem] border border-white/5 relative overflow-hidden"
            >
              <div className="w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden relative z-10 shrink-0 shadow-2xl mb-8">
                <img src={chosenBuddy.img} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-[10px] font-semibold tracking-widest uppercase text-white backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  Matched
                </div>
              </div>

              <div className="w-full flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-4xl font-semibold text-white tracking-tight">{chosenBuddy.name}</h2>
                  <p className="text-sm font-medium text-orange-400 mt-1">
                    Matching Vibe: Perfect
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">
                  👟
                </div>
              </div>

              <p className="text-sm text-zinc-400 mb-8 leading-relaxed font-light text-left w-full border-b border-white/5 pb-6">
                Consistently hits that occasional target pace around the CBD area. Ready to push your limits.
              </p>

              <div className="grid grid-cols-2 gap-y-4 gap-x-2 w-full mb-8">
                <div className="bg-zinc-800/30 p-3 rounded-xl border border-white/5">
                  <div className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-1">Time</div>
                  <div className="font-medium text-white text-sm">{filters.time}</div>
                </div>
                <div className="bg-zinc-800/30 p-3 rounded-xl border border-white/5">
                  <div className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-1">Location</div>
                  <div className="font-medium text-white text-sm">{filters.location}</div>
                </div>
              </div>

              <button
                className="w-full py-4 bg-orange-500 text-white font-semibold rounded-2xl transition-all hover:bg-orange-600 shadow-[0_10px_30px_-10px_rgba(249,115,22,0.4)] tracking-wide mb-3"
              >
                Send a Message
              </button>
              <button
                onClick={() => {
                  setStep(0);
                  setIsPlaying(false);
                  setTypedTime("");
                  setTimePeriod("AM");
                  setKeyboardType("abc");
                }}
                className="w-full py-4 bg-transparent text-zinc-500 font-medium rounded-2xl hover:text-white transition-colors"
              >
                Preview Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fake iOS Keyboard Overlay */}
      <AnimatePresence>
        {keyboardVisible && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-[#d1d5db] dark:bg-[#1c1c1e] pb-6 pt-2 px-1 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center"
          >
            <div className="w-full max-w-md">
              {/* Keyboard Header / Accessory View */}
              <div className="flex justify-between px-3 py-2 mb-1">
                <span className="text-xs font-semibold text-zinc-400">&lt; / &gt;</span>
                <span className="text-sm font-semibold text-blue-500 tracking-wide">Done</span>
              </div>

              {keyboardType === "abc" ? (
                // iOS ABC Keyboard
                <div className="flex flex-col gap-2.5 px-0.5 pb-2">
                  <div className="flex justify-center gap-1.5">
                    {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(key => (
                      <div key={key} className={`h-[44px] flex-1 rounded-md flex items-center justify-center font-medium text-[22px] shadow-[0_1px_1px_rgba(0,0,0,0.3)] transition-all duration-[50ms] ${activeTap === key ? "bg-[#acb3ba] dark:bg-[#4b4b4d]" : "bg-white dark:bg-[#6b6b6d]"} text-black dark:text-white`}>
                        {key}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-1.5 px-[5%]">
                    {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map(key => (
                      <div key={key} className={`h-[44px] flex-1 rounded-md flex items-center justify-center font-medium text-[22px] shadow-[0_1px_1px_rgba(0,0,0,0.3)] transition-all duration-[50ms] ${activeTap === key ? "bg-[#acb3ba] dark:bg-[#4b4b4d]" : "bg-white dark:bg-[#6b6b6d]"} text-black dark:text-white`}>
                        {key}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-1.5">
                    <div className="h-[44px] w-[12%] rounded-md flex items-center justify-center text-lg bg-[#acb3ba] dark:bg-[#4b4b4d] text-black dark:text-[#c4c4c6] shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                    </div>
                    {["Z", "X", "C", "V", "B", "N", "M"].map(key => (
                      <div key={key} className={`h-[44px] w-[10%] rounded-md flex items-center justify-center font-medium text-[22px] shadow-[0_1px_1px_rgba(0,0,0,0.3)] transition-all duration-[50ms] ${activeTap === key ? "bg-[#acb3ba] dark:bg-[#4b4b4d]" : "bg-white dark:bg-[#6b6b6d]"} text-black dark:text-white`}>
                        {key}
                      </div>
                    ))}
                    <div className="h-[44px] w-[12%] rounded-md flex items-center justify-center text-lg bg-[#acb3ba] dark:bg-[#4b4b4d] text-black dark:text-[#c4c4c6] shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6" /></svg>
                    </div>
                  </div>
                  <div className="flex justify-center gap-1.5 mt-0.5">
                    <div
                      className={`h-[44px] w-1/4 rounded-md flex items-center justify-center font-normal text-lg shadow-[0_1px_1px_rgba(0,0,0,0.3)] transition-all duration-[50ms] ${activeTap === "123" ? "brightness-75 scale-[0.97]" : ""} bg-[#acb3ba] dark:bg-[#4b4b4d] text-black dark:text-white tracking-wide`}
                    >
                      123
                    </div>
                    <div className="h-[44px] flex-1 rounded-md flex items-center justify-center font-normal text-lg bg-white dark:bg-[#6b6b6d] text-black dark:text-white shadow-[0_1px_1px_rgba(0,0,0,0.3)]">space</div>
                    <div className="h-[44px] w-1/4 rounded-md flex items-center justify-center font-normal text-lg bg-[#acb3ba] dark:bg-[#4b4b4d] text-black dark:text-white shadow-[0_1px_1px_rgba(0,0,0,0.3)] tracking-wide">return</div>
                  </div>
                </div>
              ) : (
                // iOS Numeric Keypad
                <div className="grid grid-cols-3 gap-2 px-1 pb-2">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"].map(key => {
                    const isTapDown = activeTap === key;
                    return (
                      <div
                        key={key}
                        className={`h-[48px] rounded-lg flex items-center justify-center font-normal text-2xl transition-all duration-[50ms] ${key === "⌫" || key === "."
                            ? "bg-[#acb3ba] dark:bg-[#4b4b4d] text-black dark:text-white"
                            : "bg-white dark:bg-[#6b6b6d] text-black dark:text-white"
                          } ${isTapDown ? "brightness-75 scale-[0.97]" : "shadow-[0_1px_1px_rgba(0,0,0,0.3)]"}`}
                      >
                        {key === "⌫" ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6" /></svg> : key}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: scale(0.9); }
          50% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
