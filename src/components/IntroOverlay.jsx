import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import videoSource from "../assets/bycreair-animation.mov";

export default function IntroOverlay({ onComplete }) {
  const [show, setShow] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setShow(false);
    // Wait for the exit animation to finish before unmounting parent if needed
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1000);
  };

  const handleCanPlayThrough = () => {
    setIsReady(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Loading Indicator (Hidden once ready) */}
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </div>
          )}

          <motion.video
            ref={videoRef}
            src={videoSource}
            preload="auto"
            muted
            playsInline
            onEnded={handleVideoEnd}
            onCanPlayThrough={handleCanPlayThrough}
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
