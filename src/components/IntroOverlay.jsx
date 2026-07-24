import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import videoSource from "../assets/bycreair-animation.mov";

export default function IntroOverlay({ onComplete }) {
  const [show, setShow] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef(null);

  // Play video only when ready
  useEffect(() => {
    if (isReady && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [isReady]);

  // Fallback timeout: Chrome/Android often block or fail to decode .mov files.
  // If the video hasn't triggered onCanPlayThrough in 2.5 seconds, force the overlay to be ready.
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsReady(true);
    }, 2500);
    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleVideoEnd = () => {
    setShow(false);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1000);
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
          <motion.video
            ref={videoRef}
            src={videoSource}
            preload="auto"
            muted
            playsInline
            onEnded={handleVideoEnd}
            onCanPlayThrough={() => setIsReady(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ duration: 0.8 }} // Smooth fade in
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
