import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function RunBuddyPage() {
  const [accessRequested, setAccessRequested] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (accessRequested) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 2500); // Simulate network load
      return () => clearTimeout(timer);
    }
  }, [accessRequested]);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/20 selection:text-cyan-200 overflow-hidden">
      {/* Background: Ethereal Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="ethereal-gradient absolute inset-0 opacity-30" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-12 pt-32 pb-32 flex flex-col items-center justify-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full relative group"
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-50 group-hover:opacity-100" />

            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-16 overflow-hidden shadow-2xl">

              {/* Internal decorative elements */}
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>

              <div className="flex flex-col items-center text-center max-w-2xl mx-auto relative z-10">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-8 p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block"
                >
                  <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl sm:text-6xl font-medium tracking-tighter text-white mb-6"
                >
                  Run Buddy Demo
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg sm:text-xl font-light text-white/60 leading-relaxed mb-12"
                >
                  Welcome to your exclusive demo environment. This portal provides direct access to your custom digital solution engineered by ByCreair.
                </motion.p>

                <AnimatePresence mode="wait">
                  {!accessRequested ? (
                    <motion.button
                      key="request-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => setAccessRequested(true)}
                      className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium tracking-widest uppercase text-sm rounded-full overflow-hidden transition-transform hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Initialize Demo
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-cyan-100 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </motion.button>
                  ) : !isLoaded ? (
                    <motion.div
                      key="loading-state"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
                      <p className="text-cyan-400 text-sm tracking-widest uppercase font-medium">Connecting to Environment...</p>
                      <p className="text-white/40 text-xs mt-2">The live demo integration is currently being provisioned.</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="loaded-state"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className="w-full flex justify-center"
                    >
                      <div className="w-full max-w-lg bg-black/50 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm text-left relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                        <h3 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Environment Ready
                        </h3>
                        <p className="text-sm text-white/60 mb-6">
                          The Run Buddy portal framework is fully operational. To display the actual demo application here, please provide the embed URL.
                        </p>

                        <div className="bg-white/5 border border-white/10 rounded overflow-hidden flex items-center p-3">
                          <svg className="w-5 h-5 text-white/40 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <span className="text-xs text-white/40 font-mono break-all line-clamp-1">Waiting for demo origin URL...</span>
                        </div>

                        <button
                          onClick={() => { setAccessRequested(false); setIsLoaded(false); }}
                          className="mt-6 text-xs text-cyan-400 hover:text-cyan-300 uppercase tracking-widest font-medium transition-colors"
                        >
                          Restart Sequence
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </motion.div>

        </main>
      </div>
    </div>
  );
}
