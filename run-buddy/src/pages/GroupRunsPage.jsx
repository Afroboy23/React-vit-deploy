import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { nzPaths } from "../assets/nzPaths";

export default function GroupRunsPage() {
  const [distance, setDistance] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const targetDistance = 21097; // A half marathon in meters for the techy metric feel

  // Simulate a live distance counter during the drawing animation
  useEffect(() => {
    let startTime = null;
    const duration = 8000; // 8 seconds for the cinematic sequence

    const animateDistance = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing curve for the distance counter (matches SVG draw ease)
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setDistance(Math.floor(easeOutQuart * targetDistance));

      if (percentage < 1) {
        requestAnimationFrame(animateDistance);
      } else {
        setIsFinished(true);
      }
    };

    requestAnimationFrame(animateDistance);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden w-full pt-20 flex flex-col items-center justify-center">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        {/* Subtle glowing orb that expands when the map finishes drawing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isFinished ? 0.15 : 0.05,
            scale: isFinished ? 1.5 : 1
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-[600px] h-[600px] bg-orange-500 rounded-full blur-[150px]"
        />
      </div>

      {/* METRIC OVERLAY (STRAVA / FITNESS TECH STYLE) */}
      <div className="absolute top-28 left-6 md:left-12 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span className="text-orange-500 text-xs font-black tracking-widest uppercase">Live Global Tracking</span>
          </div>
          <div className="font-mono text-5xl md:text-7xl font-light text-white tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {(distance / 1000).toFixed(2)}<span className="text-zinc-500 text-2xl md:text-4xl ml-2 tracking-tighter">KM</span>
          </div>
          <div className="text-zinc-500 font-medium tracking-wide flex items-center gap-4 mt-2 text-sm md:text-base">
            <span>AVG PACE: 4:32/KM</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
            <span>ELEV: {Math.floor((distance / targetDistance) * 342)}m</span>
          </div>
        </motion.div>
      </div>

      {/* THE RUN TRACE MAP WITH CINEMATIC 3D CAMERA */}
      <div className="relative z-10 w-full h-[60vh] md:h-[70vh] flex items-center justify-center -mt-10 [perspective:2000px]">
        <motion.div
          initial={{
            scale: 15,
            rotateX: 75,
            y: "70%",
            opacity: 0
          }}
          animate={{
            scale: 1,
            rotateX: 0,
            y: "0%",
            opacity: 1
          }}
          transition={{
            duration: 9,
            ease: [0.16, 1, 0.3, 1], // Highly cinematic ease out for exponential smooth deceleration
            opacity: { duration: 1.5 }
          }}
          className="w-full max-w-2xl h-full flex items-center justify-center origin-bottom transform-gpu"
        >
          {/* Invert the SVG Y-axis using transform, as standard top-down SVGs match map-coordinate bounding boxes */}
          <svg
            viewBox="0 0 1024 1024"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(249,115,22,0.8)] filter transition-all duration-1000"
            style={{ filter: isFinished ? 'drop-shadow(0 0 40px rgba(249,115,22,1))' : 'drop-shadow(0 0 20px rgba(249,115,22,0.6))' }}
          >
            <g transform="translate(0, 1024) scale(0.1, -0.1)">
              {nzPaths.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="#f97316" /* Tailwind orange-500 */
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0.9 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 8,
                    ease: "easeInOut", // Smooth mapping speed inside the curve
                    delay: 0.2
                  }}
                />
              ))}
            </g>
          </svg>
        </motion.div>
      </div>

      {/* FINAL STATE TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isFinished ? 1 : 0, y: isFinished ? 0 : 30 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute bottom-12 md:bottom-20 z-20 text-center w-full px-6 flex flex-col items-center"
      >
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
          Conquer the <span className="text-orange-500">Map.</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl font-light">
          Join the largest connected run network in the country.
        </p>
        <button className="mt-8 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold tracking-wide transition-all shadow-[0_0_40px_rgba(249,115,22,0.3)]">
          Find a Local Group Run
        </button>
      </motion.div>

    </div>
  );
}
