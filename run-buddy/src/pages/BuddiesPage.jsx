import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import packImg2 from "../assets/images/rbmedals.jpg";
import packImg3 from "../assets/images/rblskd.jpg";
import packImg4 from "../assets/images/rbthree.jpg";
import packImg5 from "../assets/images/rbjay.jpg";
import packImg6 from "../assets/images/packImg6.jpg";
import packImg7 from "../assets/images/packImgNew.jpg";
import packImg8 from "../assets/images/packImg8.jpg";

export default function BuddiesPage() {
  const [step, setStep] = useState(0);

  // Pre-defined selections based on user requirement
  const filters = {
    activity: "Running",
    level: "Occasional",
    location: "Auckland CBD",
    gender: "Any",
    time: "6:30 PM"
  };

  // Content for each selection step
  const selections = {
    1: ["Running", "Gym", "Walking", "Hiking", "Sports"],
    2: ["Beginner", "Occasional", "Regular", "Good", "Consistent", "Pro", "Athlete"],
    3: ["Auckland CBD", "Newmarket", "Ponsonby", "Mt Eden", "Takapuna"],
    4: ["Male", "Female", "Other", "Any"],
    5: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"]
  };

  const advanceStep = () => setStep(s => s + 1);

  // Auto-advance logic for Searching (Step 6) and Match (Step 7) states
  useEffect(() => {
    if (step === 6) {
      const timer = setTimeout(() => setStep(7), 3000); // 3 seconds searching
      return () => clearTimeout(timer);
    }
    if (step === 7) {
      const timer = setTimeout(() => setStep(8), 5000); // 5 seconds roulette spin
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Candidates for roulette
  const rouletteCandidates = [
    { name: "Alex", img: packImg2, detail: "Regular • Ponsonby" },
    { name: "Jordan", img: packImg4, detail: "Pro • Newmarket" },
    { name: "Sam", img: packImg6, detail: "Occasional • CBD" },
    { name: "Taylor", img: packImg8, detail: "Consistent • Mt Eden" },
    { name: "Casey", img: packImg7, detail: "Good • Takapuna" },
  ];

  // Create a long array for the roulette ticker to spin through
  const displayRoulette = Array.from({ length: 30 }, (_, i) => rouletteCandidates[i % rouletteCandidates.length]);
  // The chosen buddy is always the one it lands on (index 26)
  const chosenBuddyIndex = 26;
  const chosenBuddy = displayRoulette[chosenBuddyIndex];

  // Common animation variants for selection items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } })
  };

  return (
    <div className="pt-32 px-6 pb-24 min-h-screen flex flex-col items-center overflow-hidden">
      <AnimatePresence mode="wait">

        {/* STEP 0: ENTRY / WELCOME */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl text-center mt-12"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-black tracking-widest uppercase">
              Feature Preview
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
              Choose a <span className="text-orange-500">Buddy</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-16 max-w-2xl mx-auto leading-relaxed">
              Find the perfect training partner based on your exact pace, location, and vibe.
            </p>
            <button
              onClick={advanceStep}
              className="px-12 py-5 bg-white text-black hover:bg-orange-500 hover:text-white font-black text-xl tracking-wide rounded-full transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)]"
            >
              Start Demo
            </button>
          </motion.div>
        )}

        {/* STEPS 1-5: SELECTION FLOW */}
        {step >= 1 && step <= 5 && (
          <motion.div
            key={`selection-step-${step}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-3xl mt-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center tracking-tight">
              {step === 1 && "What's the play today?"}
              {step === 2 && "What's your current level?"}
              {step === 3 && "Where are we meeting?"}
              {step === 4 && "Who are you running with?"}
              {step === 5 && "When are we moving?"}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selections[step].map((option, i) => (
                <motion.div
                  key={option}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  <button
                    onClick={advanceStep}
                    className="w-full p-6 h-full text-center rounded-2xl border border-white/10 bg-zinc-900/50 hover:bg-orange-500/10 hover:border-orange-500 text-lg font-bold transition-all hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    {option}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Selection Progress Indicator */}
            <div className="flex justify-center gap-2 mt-16">
              {[1, 2, 3, 4, 5].map(dot => (
                <div
                  key={dot}
                  className={`h-1.5 rounded-full transition-all duration-500 ${step === dot ? "w-8 bg-orange-500" :
                      step > dot ? "w-2 bg-orange-500/50" : "w-2 bg-zinc-800"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl flex flex-col items-center justify-center mt-24"
          >
            <div className="relative w-48 h-48 mb-16 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-t-4 border-l-4 border-orange-500 rounded-full opacity-80"
              />
              <motion.div
                animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-b-4 border-r-4 border-amber-400 rounded-full opacity-60"
              />
              <div className="text-4xl">🏃</div>
            </div>

            <motion.h2
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-4xl md:text-5xl font-black mb-12 tracking-wider"
            >
              SEARCHING FOR BUDDY...
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-3 max-w-2xl px-6">
              {Object.values(filters).map((filter, i) => (
                <motion.div
                  key={filter}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-full text-zinc-300 font-bold tracking-wide"
                >
                  {filter}
                </motion.div>
              ))}
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
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl mt-24 flex flex-col items-center overflow-hidden"
          >
            <h2 className="text-5xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
              Buddy Found
            </h2>

            {/* Viewport for Roulette Reel */}
            <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden mask-image-fade">
              {/* Center Selector Highlight */}
              <div className="absolute top-0 bottom-0 left-1/2 -ml-32 w-64 border-2 border-orange-500 rounded-3xl z-20 pointer-events-none shadow-[0_0_50px_rgba(249,115,22,0.3)] bg-orange-500/10 backdrop-blur-[2px]" />

              {/* Scrolling Track */}
              <motion.div
                className="absolute flex items-center gap-6"
                initial={{ x: "40%" }} // Start slightly offset
                animate={{
                  x: `-${chosenBuddyIndex * (256 + 24) - (window.innerWidth / 2 - 128)}px`
                  // Move left exactly to center the chosenBuddyIndex item
                }}
                transition={{
                  duration: 4.5,
                  ease: [0.15, 0.0, 0.1, 1], // Custom slow-down easing (like a roulette wheel)
                }}
              >
                {displayRoulette.map((buddy, i) => (
                  <div
                    key={i}
                    className={`w-64 h-80 rounded-2xl overflow-hidden relative shrink-0 transition-all duration-300 border ${i === chosenBuddyIndex ? 'border-orange-500 z-10 scale-100 opacity-100' : 'border-white/10 opacity-40 scale-95 grayscale'}`}
                  >
                    <img src={buddy.img} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-black text-white">{buddy.name}</h3>
                      <p className="font-bold text-orange-400 text-sm mt-1">{buddy.detail}</p>
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
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="w-full max-w-4xl mt-12 flex flex-col md:flex-row gap-8 items-center bg-zinc-900/50 p-8 md:p-12 rounded-3xl border border-orange-500/30 shadow-[0_0_80px_-20px_rgba(249,115,22,0.3)] relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Profile Image Column */}
            <div className="w-full md:w-1/2 aspect-[3/4] rounded-2xl overflow-hidden relative border border-white/10 z-10 shrink-0">
              <img src={chosenBuddy.img} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/50 text-xs font-black tracking-widest uppercase text-green-400 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Ready to Run
              </div>
            </div>

            {/* Profile Details Column */}
            <div className="w-full md:w-1/2 flex flex-col z-10">
              <h4 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">RUN BUDDY MATCH</h4>
              <h2 className="text-5xl md:text-6xl font-black mb-6">{chosenBuddy.name}</h2>

              <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
                Matches exactly with your selected vibe. Based in the CBD and consistently hits that occasional target pace.
              </p>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10 pb-8 border-b border-white/10">
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-black tracking-wider mb-1">Activity</div>
                  <div className="font-bold text-white text-lg">{filters.activity}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-black tracking-wider mb-1">Level</div>
                  <div className="font-bold text-white text-lg">{filters.level}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-black tracking-wider mb-1">Location</div>
                  <div className="font-bold text-white text-lg">{filters.location}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-black tracking-wider mb-1">Time</div>
                  <div className="font-bold text-white text-lg">{filters.time}</div>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setStep(0)}
                  className="px-6 py-4 bg-zinc-800 text-white font-bold rounded-xl transition-all hover:bg-zinc-700 w-1/3"
                >
                  Restart
                </button>
                <button className="px-6 py-4 bg-orange-500 text-white font-bold rounded-xl transition-all hover:bg-orange-600 w-2/3 shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)]">
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
