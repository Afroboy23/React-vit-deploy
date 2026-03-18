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
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [hoveredOption, setHoveredOption] = useState(null);
  const [clickedOption, setClickedOption] = useState(null);

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
    4: ["Male", "Female", "Other", "Any"],
    5: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"]
  };

  const targets = {
    1: "Running",
    2: "Occasional",
    3: "Auckland CBD",
    4: "Any",
    5: "6:30 PM"
  };

  useEffect(() => {
    let isCancelled = false;

    const runAutomatedFlow = async () => {
      if (!isPlaying) return;

      if (step >= 1 && step <= 5) {
        const targetName = targets[step];

        // 1. Initial pause for elegant pacing
        await wait(1800);
        if (isCancelled) return;

        // 2. Locate target element and move cursor
        const el = document.getElementById(`option-${targetName.replace(/\s+/g, '-')}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Offset slightly to make it look intentionally human, not perfectly dead-center
          setCursorPos({ x: rect.left + rect.width / 2 + 10, y: rect.top + rect.height / 2 + 10 });
        }

        // 3. Smooth cursor travel time
        await wait(2200);
        if (isCancelled) return;

        // 4. Hover state for human-like confirmation pause
        setHoveredOption(targetName);
        await wait(600);
        if (isCancelled) return;

        // 5. Fire click
        setClickedOption(targetName);
        await wait(300);
        if (isCancelled) return;

        // 6. Linger on the active state
        setClickedOption(null);
        await wait(1200);
        if (isCancelled) return;

        // 7. Reset variables and fade to next step
        setHoveredOption(null);
        setCursorPos({ x: window.innerWidth / 2, y: window.innerHeight - 80 });
        setStep(s => s + 1);
      }
      else if (step === 6) {
        // Searching state - breathe and build anticipation
        await wait(8000);
        if (!isCancelled) setStep(7);
      }
      else if (step === 7) {
        // Roulette spin - elegant horizontal decelerated slide
        await wait(9500);
        if (!isCancelled) setStep(8);
      }
    };

    runAutomatedFlow();

    return () => { isCancelled = true; };
  }, [step, isPlaying]);

  const startDemo = () => {
    setIsPlaying(true);
    setCursorPos({ x: window.innerWidth / 2, y: window.innerHeight + 50 });
    setStep(1);
  };

  const rouletteCandidates = [
    { name: "Alex", img: packImg2, detail: "Regular • Ponsonby" },
    { name: "Jordan", img: packImg4, detail: "Pro • Newmarket" },
    { name: "Sam", img: packImg6, detail: "Occasional • CBD" },
    { name: "Taylor", img: packImg8, detail: "Consistent • Mt Eden" },
    { name: "Casey", img: packImg7, detail: "Good • Takapuna" },
  ];

  const displayRoulette = Array.from({ length: 30 }, (_, i) => rouletteCandidates[i % rouletteCandidates.length]);
  const chosenBuddyIndex = 26;
  const chosenBuddy = displayRoulette[chosenBuddyIndex];

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.8, ease: "easeOut" } })
  };

  return (
    <div className="pt-32 px-6 pb-24 min-h-screen flex flex-col items-center overflow-hidden bg-zinc-950 font-sans">

      {/* Fake Mouse Cursor */}
      <AnimatePresence>
        {isPlaying && step <= 5 && (
          <motion.div
            initial={{ opacity: 0, x: window.innerWidth / 2, y: window.innerHeight }}
            animate={{
              opacity: 1,
              x: cursorPos.x,
              y: cursorPos.y,
              scale: clickedOption ? 0.8 : 1
            }}
            exit={{ opacity: 0 }}
            transition={{
              x: { type: "tween", ease: [0.25, 1, 0.4, 1], duration: 1.8 },
              y: { type: "tween", ease: [0.25, 1, 0.4, 1], duration: 1.8 },
              scale: { duration: 0.15 },
              opacity: { duration: 1 }
            }}
            className="fixed top-0 left-0 w-8 h-8 z-50 pointer-events-none drop-shadow-2xl"
            style={{ marginLeft: '-4px', marginTop: '-4px' }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 -ml-2 -mt-2">
              <path d="M5.5 3L20.5 10.5L12 12.5L9.5 21L5.5 3Z" fill="white" stroke="#18181b" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* STEP 0: ENTRY / WELCOME */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-4xl text-center mt-32 cursor-pointer group"
            onClick={startDemo}
          >
            <div className="inline-flex items-center justify-center px-5 py-2 mb-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-semibold tracking-widest uppercase transition-all duration-700 group-hover:bg-white/10 group-hover:text-white">
              Coming Soon
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium mb-8 tracking-tight text-white transition-transform duration-1000 group-hover:scale-[1.02]">
              Choose a <span className="text-orange-500 font-bold">Buddy</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 mb-16 max-w-2xl mx-auto leading-relaxed font-light group-hover:text-zinc-400 transition-colors duration-700">
              Click anywhere to watch the automated product preview.
            </p>
          </motion.div>
        )}

        {/* STEPS 1-5: SELECTION FLOW */}
        {step >= 1 && step <= 5 && (
          <motion.div
            key={`selection-step-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full max-w-3xl mt-20"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-16 text-center tracking-tight text-white">
              {step === 1 && "What's the play today?"}
              {step === 2 && "What's your current level?"}
              {step === 3 && "Where are we meeting?"}
              {step === 4 && "Who are you running with?"}
              {step === 5 && "When are we moving?"}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {selections[step].map((option, i) => {
                const isHovered = hoveredOption === option;
                const isClicked = clickedOption === option;
                const safeId = "option-" + option.replace(/\s+/g, '-');
                return (
                  <motion.div
                    key={option}
                    id={safeId}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                  >
                    <div
                      className={`w-full py-5 px-6 h-full flex items-center justify-center rounded-2xl border text-lg transition-all duration-700 ease-out font-medium tracking-wide ${isClicked
                          ? 'border-orange-500 bg-orange-500 text-white scale-[0.97] shadow-[0_0_40px_rgba(249,115,22,0.4)]'
                          : isHovered
                            ? 'border-white/30 bg-zinc-800 scale-[1.03] text-white shadow-2xl'
                            : 'border-white/5 bg-zinc-900/40 text-zinc-400'
                        }`}
                    >
                      {option}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Selection Progress Indicator */}
            <div className="flex justify-center gap-3 mt-24">
              {[1, 2, 3, 4, 5].map(dot => (
                <div
                  key={dot}
                  className={`h-1.5 rounded-full transition-all duration-1000 ease-in-out ${step === dot ? "w-10 bg-orange-500" :
                      step > dot ? "w-3 bg-orange-500/40" : "w-3 bg-zinc-800"
                    }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 6: SEARCHING STATE */}
        {step === 6 && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full max-w-4xl flex flex-col items-center justify-center mt-40"
          >
            <motion.h2
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl md:text-5xl font-light mb-16 tracking-widest text-zinc-300"
            >
              Searching for your buddy...
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-5 max-w-3xl px-6">
              {Object.values(filters).map((filter, i) => (
                <motion.div
                  key={filter}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.3, duration: 1.2, ease: "easeOut" }}
                  className="px-6 py-2.5 bg-transparent border border-white/10 rounded-full text-zinc-400 font-medium tracking-wide text-sm"
                >
                  {filter}
                </motion.div>
              ))}
            </div>

            {/* Elegant scanning line pulse */}
            <div className="w-64 h-[2px] bg-zinc-800/50 mt-24 relative overflow-hidden rounded-full">
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"
              />
            </div>
          </motion.div>
        )}

        {/* STEP 7: ROULETTE SPIN & MATCH REVEAL */}
        {step === 7 && (
          <motion.div
            key="step7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="w-full max-w-6xl mt-32 flex flex-col items-center overflow-hidden"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-20 tracking-widest text-zinc-200">
              Buddy Found
            </h2>

            {/* Viewport for Horizontal Roulette Reel */}
            <div className="relative w-full h-[360px] flex items-center justify-center overflow-hidden mask-image-fade mx-auto">
              {/* Center Selector Highlight */}
              <div className="absolute top-0 bottom-0 left-1/2 -ml-32 w-64 border border-orange-500/40 rounded-3xl z-20 pointer-events-none shadow-[0_0_60px_rgba(249,115,22,0.15)] bg-orange-500/5 backdrop-blur-[1px] transition-all duration-[8000ms]" />

              {/* Scrolling Track */}
              <motion.div
                className="absolute flex items-center gap-6"
                style={{ left: "50%" }}
                initial={{ x: "20%" }}
                animate={{
                  x: `calc(-128px - ${chosenBuddyIndex * (256 + 24)}px)`
                }}
                transition={{
                  duration: 8.5,
                  ease: [0.1, 0.0, 0.05, 1], // Very slow elegant deceleration
                }}
              >
                {displayRoulette.map((buddy, i) => (
                  <div
                    key={i}
                    className={`w-64 h-[320px] rounded-2xl overflow-hidden relative shrink-0 transition-all duration-[2000ms] ease-out border ${i === chosenBuddyIndex ? 'border-orange-500/50 z-10 scale-100 opacity-100' : 'border-white/5 opacity-30 scale-95 grayscale'}`}
                  >
                    <img src={buddy.img} className="w-full h-full object-cover transition-transform duration-[4000ms] hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-medium text-white tracking-wide">{buddy.name}</h3>
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
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full max-w-4xl mt-16 flex flex-col md:flex-row gap-12 items-center bg-zinc-900/30 p-10 md:p-14 rounded-[32px] border border-white/5 relative overflow-hidden"
          >
            {/* Background glow removed for a cleaner minimal look, keeping just a subtle hint */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="w-full md:w-[45%] aspect-[3/4] rounded-2xl overflow-hidden relative border border-white/10 z-10 shrink-0 shadow-2xl">
              <img src={chosenBuddy.img} className="w-full h-full object-cover" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-semibold tracking-widest uppercase text-white backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                Ready to Run
              </div>
            </div>

            <div className="w-full md:w-[55%] flex flex-col z-10">
              <h4 className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-3">RUN BUDDY MATCH</h4>
              <h2 className="text-5xl md:text-6xl font-medium mb-8 text-white tracking-tight">{chosenBuddy.name}</h2>

              <p className="text-lg text-zinc-400 mb-10 leading-relaxed font-light">
                Matches exactly with your selected vibe. Based in the CBD and consistently hits that occasional target pace.
              </p>

              <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-12">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Activity</div>
                  <div className="font-medium text-white text-lg">{filters.activity}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Level</div>
                  <div className="font-medium text-white text-lg">{filters.level}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Location</div>
                  <div className="font-medium text-white text-lg">{filters.location}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Time</div>
                  <div className="font-medium text-white text-lg">{filters.time}</div>
                </div>
              </div>

              <div className="flex gap-4 w-full pt-6 border-t border-white/5">
                <button className="px-8 py-4 bg-orange-500 text-white font-medium rounded-2xl transition-all hover:bg-orange-600 hover:scale-[1.02] shadow-[0_10px_30px_-10px_rgba(249,115,22,0.4)] tracking-wide w-full max-w-xs">
                  Message {chosenBuddy.name}
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
