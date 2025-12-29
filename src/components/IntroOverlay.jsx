import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroOverlay({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Elegant timing: 
    // 0s-1s: Fade In
    // 1s-2.5s: Hold & Breathe
    // 2.5s: Fade Out
    const timer = setTimeout(() => {
      setShow(false);
    }, 2800);

    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3800); // Wait for exit animation

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl sm:text-7xl font-medium tracking-tight text-white/90">
              ByCreair
            </h1>
            <p className="mt-6 text-sm sm:text-base font-light tracking-[0.25em] text-white/50 uppercase">
              Nihil Sine Labore
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
