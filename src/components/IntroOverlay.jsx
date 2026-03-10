import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import videoSource from "../assets/bycreair-animation.mov";

export default function IntroOverlay({ onComplete }) {
  const [show, setShow] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const videoRef = useRef(null);

  // Play video only when BOTH ready and animation is done
  React.useEffect(() => {
    if (isReady && animationComplete && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [isReady, animationComplete]);

  // Fallback timeout: Chrome/Android often block or fail to decode .mov files.
  // If the video hasn't triggered onCanPlayThrough in 2.5 seconds, force the overlay to be ready.
  React.useEffect(() => {
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
          {/* Dot Animation: Plays if video is NOT yet playing */}
          {(!isReady || !animationComplete) && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,    // Slow, deliberate pulse
                  times: [0, 0.5, 1],
                  repeat: 1,        // Plays once + repeats once = 2 times
                  ease: "easeInOut"
                }}
                onAnimationComplete={() => setAnimationComplete(true)}
                className="w-2 h-2 bg-white rounded-full"
              />
            </div>
          )}

          <motion.video
            ref={videoRef}
            src={videoSource}
            preload="auto"
            muted
            playsInline
            onEnded={handleVideoEnd}
            onCanPlayThrough={() => setIsReady(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: (isReady && animationComplete) ? 1 : 0 }}
            transition={{ duration: 0.8 }} // Smooth fade in
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
