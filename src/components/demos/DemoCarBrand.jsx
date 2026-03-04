import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import videoHilux from "../../assets/hilux-video-2.mp4"; // Import video asset

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

export default function DemoCarBrand() {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div className="w-full h-full bg-black text-white font-sans overflow-y-auto scrollbar-hide relative">

      {/* 1. HERO VIDEO BACKGROUND (replaces static image) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={videoHilux}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />

        {/* Skip button for dev/impatience */}
        {!videoEnded && (
          <button
            onClick={() => {
              setVideoEnded(true);
              if (videoRef.current) {
                // optional: skip to end or just let it play out behind
                // videoRef.current.currentTime = videoRef.current.duration; 
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
        className={`absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center transition-opacity duration-1000 ${videoEnded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-xl font-bold tracking-tighter uppercase italic">
          TERRA<span className="text-black">MOTORS</span>
        </div>

        <div className="hidden md:flex space-x-8 text-xs font-medium tracking-widest uppercase">
          <a href="#" className="hover:text-black transition-colors">Vehicles</a>
          <a href="#" className="hover:text-black transition-colors">Technology</a>
          <a href="#" className="hover:text-black transition-colors">Ownership</a>
        </div>

        <button className="border border-white/20 list-none px-6 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Find Dealer
        </button>
      </nav>


      {/* 3. HERO CONTENT (Underneath video, revealed after) */}
      <div className="relative h-full min-h-[600px] flex items-end pb-16 px-8 md:px-24">
        <div className="relative z-10 w-full">
          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex justify-start w-full"
              >
                {/* Text removed for minimalistic look */}

                <div className="flex gap-6">
                  <button className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors border border-white">
                    Configure Yours
                  </button>
                  <button className="border border-white/30 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                    Watch Film
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. FEATURES SECTION */}
      <section className="bg-zinc-950 py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "700HP Engine", desc: "Twin-turbocharged V8 delivering relentless acceleration.", icon: "⚡" },
              { title: "Adaptive Suspension", desc: "Real-time terrain scanning for optimal comfort.", icon: "🏔️" },
              { title: "Smart Cockpit", desc: "AI-integrated command center with heads-up display.", icon: "🛸" },
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="border-t border-black/30 pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MODEL SHOWCASE */}
      <section className="py-32 bg-black relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900/20 skew-x-12 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-16 text-center">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">Path</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.2}>
              <div className="group relative aspect-video bg-zinc-900 overflow-hidden cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop"
                  alt="Offroad Model"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-2xl font-bold uppercase tracking-wider">Apex Offroad</h3>
                  <div className="w-0 group-hover:w-full h-1 bg-white transition-all duration-300 mt-2" />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="group relative aspect-video bg-zinc-900 overflow-hidden cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2783&auto=format&fit=crop"
                  alt="Sport Model"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-2xl font-bold uppercase tracking-wider">GT Sport</h3>
                  <div className="w-0 group-hover:w-full h-1 bg-white transition-all duration-300 mt-2" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}
