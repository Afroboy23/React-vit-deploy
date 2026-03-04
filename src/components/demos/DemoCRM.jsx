import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import videoCrm from "../../assets/213reh9yqsrmy0cwh6bt4vgb6r_result_.mp4";

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function DemoCRM() {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div className="w-full h-full bg-stone-100 text-stone-900 font-sans overflow-y-auto scrollbar-hide relative">

      {/* 1. HERO VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-stone-900">
        <video
          ref={videoRef}
          src={videoCrm}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-stone-900/80 transition-opacity duration-1000 ${videoEnded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

        {/* Skip button for dev/impatience */}
        {!videoEnded && (
          <button
            onClick={() => {
              setVideoEnded(true);
              if (videoRef.current) {
                // optional: skip to end
              }
            }}
            className="absolute bottom-8 right-8 text-[10px] uppercase tracking-widest text-white/50 hover:text-white border border-white/20 px-4 py-2 z-50 pointer-events-auto"
          >
            Skip Intro
          </button>
        )}
      </div>

      {/* 2. NAVBAR (Reveals after video) */}
      <nav
        className={`absolute top-0 left-0 right-0 z-50 px-8 py-8 flex justify-between items-center transition-opacity duration-1000 ${videoEnded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="text-xl font-medium tracking-tighter uppercase text-white drop-shadow-md">
          Auckland<span className="font-light">Beginnings</span>
        </div>

        <div className="hidden md:flex space-x-12 text-xs font-medium tracking-widest uppercase text-white drop-shadow-md">
          <a href="#" className="hover:text-amber-500 transition-colors">Projects</a>
          <a href="#" className="hover:text-amber-500 transition-colors">Expertise</a>
          <a href="#" className="hover:text-amber-500 transition-colors">Journal</a>
          <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
        </div>

        {/* Mobile Menu Icon (Placeholder) */}
        <div className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </div>
      </nav>

      {/* 3. HERO CONTENT (Reveals over video) */}
      <div className="relative h-full min-h-[600px] flex items-center justify-center px-8 md:px-24">
        <div className="relative z-10 w-full max-w-4xl text-center">
          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="inline-block border-b border-amber-500 text-amber-500 text-xs uppercase tracking-[0.3em] font-medium pb-2 mb-8">
                  Premium Architectural Builds
                </div>



                <p className="text-lg text-white/80 mb-12 max-w-2xl font-light leading-relaxed drop-shadow-md">
                  We specialize in crafting bespoke residential and commercial spaces across Auckland. Master craftsmanship meets innovative structural design.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="bg-white text-stone-900 px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors">
                    View Portfolio
                  </button>
                  <button className="border border-white/40 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-colors bg-black/20 backdrop-blur-sm">
                    Consult Us
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
