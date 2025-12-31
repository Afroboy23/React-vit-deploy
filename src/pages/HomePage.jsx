// src/pages/HomePage.jsx
import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import imgShowreel from "../assets/showreel-preview.png";

// Helper for Scene Transitions
// visibleRange: [start, end] of scroll progress (0-1) where this section is active
function Scene({ children, scrollYProgress, start, end }) {
  // Fade in during the first 10% of the range, stay visible, fade out in the last 10%
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );

  // Subtle scale effect for depth
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [0.9, 1.1]
  );

  // Slide up effect
  const y = useTransform(
    scrollYProgress,
    [start, end],
    ["20%", "-20%"]
  );

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center p-6 will-change-transform pointer-events-none"
    >
      <div className="pointer-events-auto">
        {children}
      </div>
    </motion.div>
  );
}

function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Auto-Loop Logic
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.995) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  });

  return (
    // SCROLL TRACK: 600vh height gives us "time" to scroll through 6 scenes (reduced to 400vh on mobile)
    <div ref={containerRef} className="relative h-[400vh] md:h-[600vh] bg-black text-white/90 selection:bg-white/10 selection:text-white">

      {/* FIXED VIEWPORT: The window into the experience */}
      <div className="sticky top-0 h-screen overflow-hidden">

        <Navbar />

        {/* BACKGROUND: ETHEREAL + VORTEX (Persists through all scenes) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="ethereal-gradient absolute inset-0 opacity-50" />

          {/* Living Vortex Animation - Full Screen Drift (Desktop Only for Performance) */}
          <div className="absolute inset-0 overflow-hidden opacity-60 hidden md:block">
            {/* Layer 1: Deep Nebula Base */}
            <motion.div
              className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-tr from-indigo-900/40 via-purple-900/30 to-cyan-900/10 rounded-full blur-[120px]"
              animate={{
                rotate: 360,
                x: ["0%", "10%", "-10%", "5%", "0%"],
                y: ["0%", "-10%", "10%", "-5%", "0%"],
              }}
              transition={{
                rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 25, repeat: Infinity, ease: "easeInOut" }
              }}
            />

            {/* Layer 2: Electric Mid-Tones */}
            <motion.div
              className="absolute top-[20%] left-[20%] w-[80vw] h-[80vw] bg-gradient-to-bl from-cyan-500/20 via-blue-600/20 to-transparent rounded-full blur-[100px]"
              animate={{
                rotate: -360,
                scale: [0.8, 1.2, 0.9, 1.1, 0.8],
                x: ["-20%", "30%", "-10%", "20%", "-20%"],
                y: ["10%", "-30%", "20%", "-10%", "10%"],
              }}
              transition={{
                rotate: { duration: 45, repeat: Infinity, ease: "linear" },
                scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 22, repeat: Infinity, ease: "easeInOut" }
              }}
            />

            {/* Layer 3: Vibrant Core */}
            <motion.div
              className="absolute top-[40%] left-[40%] w-[50vw] h-[50vw] bg-gradient-to-r from-cyan-400/30 to-fuchsia-500/30 rounded-full blur-[80px]"
              animate={{
                scale: [0.8, 1.1, 0.9, 1.2, 0.8],
                x: ["0%", "-40%", "30%", "-20%", "0%"],
                y: ["0%", "30%", "-40%", "20%", "0%"]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        {/* SCENES */}
        <main className="relative z-10 w-full h-full max-w-studio mx-auto">

          {/* SCENE 1: HERO (0% - 16%) */}
          <Scene scrollYProgress={scrollYProgress} start={0} end={0.16}>
            <div className="text-center">
              <h1 className="text-5xl sm:text-7xl font-medium tracking-tighter text-white mb-8">
                By<span className="text-cyan">Creair</span>
              </h1>
              <p className="text-sm sm:text-base font-light tracking-[0.25em] text-white uppercase max-w-lg mx-auto leading-relaxed">
                Nihil Sine Labore
              </p>
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
                <div className="w-[1px] h-8 bg-cyan-500/50" />
              </div>
            </div>
          </Scene>

          {/* SCENE 2: MANIFESTO (16% - 33%) */}
          <Scene scrollYProgress={scrollYProgress} start={0.16} end={0.33}>
            <div className="max-w-3xl text-center">
              <p className="text-2xl sm:text-4xl leading-tight font-light text-white/90">
                Conversion-led design, built to turn attention into enquiries <br />
                <span className="text-cyan">— with a presence that separates you instantly.</span>
              </p>
            </div>
          </Scene>

          {/* SCENE 3: WORK (33% - 50%) */}
          <Scene scrollYProgress={scrollYProgress} start={0.33} end={0.5}>


            <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-5xl">
              <div className="space-y-8">
                <h2 className="text-xs uppercase tracking-[0.3em] text-cyan">Selected Work</h2>
                <h3 className="text-4xl font-light">Precision in every pixel.</h3>
                <ul className="space-y-4 text-lg font-light text-white/60">
                  <li>• Brand Identity Architecture</li>
                  <li>• High-Performance Web Platforms</li>
                  <li>• Cinematic Digital Experiences</li>
                </ul>
                <Link to="/client-work" className="inline-block text-xs uppercase tracking-[0.2em] border-b border-cyan-500/50 pb-1 hover:text-cyan transition-colors">
                  View Portfolio
                </Link>
              </div>
              <motion.div
                className="aspect-video bg-white/5 rounded-lg border border-white/10 overflow-hidden relative group cursor-pointer perspective-1000"
                whileHover="hover"
                initial="initial"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left; // x position within the element.
                  const y = e.clientY - rect.top;  // y position within the element.
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  // Rotate X (tilt up/down) - inverted y
                  const rotateX = ((y - centerY) / centerY) * -5;
                  // Rotate Y (tilt left/right)
                  const rotateY = ((x - centerX) / centerX) * 5;

                  e.currentTarget.style.setProperty("--rotateX", `${rotateX}deg`);
                  e.currentTarget.style.setProperty("--rotateY", `${rotateY}deg`);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty("--rotateX", `0deg`);
                  e.currentTarget.style.setProperty("--rotateY", `0deg`);
                }}
                style={{
                  transform: "perspective(1000px) rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg))",
                  transition: "transform 0.1s ease-out"
                }}
              >
                {/* Sheen Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-20 pointer-events-none"
                  variants={{
                    initial: { x: "-100%" },
                    hover: { x: "100%", transition: { repeat: Infinity, duration: 1.5, ease: "linear" } }
                  }}
                />

                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />

                <motion.img
                  src={imgShowreel}
                  alt="Showreel Preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />


              </motion.div>
            </div>
          </Scene>

          {/* SCENE 4: SYSTEMS (50% - 66%) */}
          <Scene scrollYProgress={scrollYProgress} start={0.5} end={0.66}>
            <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl text-center">
              {[
                { title: "Founders", desc: "Establishing authority from day zero." },
                { title: "Scale-ups", desc: "Automating growth at velocity." },
                { title: "Creators", desc: "Owning the platform, not renting it." }
              ].map((card, i) => (
                <div key={i} className="p-8 border border-white/10 rounded-xl bg-black/20 hover:border-cyan-500/50 transition-colors">
                  <h3 className="text-xl font-light text-white mb-4">{card.title}</h3>
                  <p className="text-sm text-white/50">{card.desc}</p>
                </div>
              ))}
            </div>
          </Scene>

          {/* SCENE 5: CTA (66% - 83%) */}
          <Scene scrollYProgress={scrollYProgress} start={0.66} end={0.83}>
            <div className="text-center">
              <h2 className="text-4xl sm:text-6xl font-light text-white mb-12">
                Ready when you are.
              </h2>
              <Link
                to="/builder"
                className="inline-flex items-center px-8 py-4 bg-white/5 border border-white/10 rounded-full text-xs uppercase tracking-[0.25em] hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:text-cyan"
              >
                Begin
              </Link>
            </div>
          </Scene>

          {/* SCENE 6: FINAL MOTTO (83% - 100%) */}
          <Scene scrollYProgress={scrollYProgress} start={0.83} end={1}>
            <div className="text-center">
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tighter text-white mb-6">
                Nihil Sine Labore
              </h2>
              <p className="text-sm sm:text-base font-light tracking-[0.3em] text-cyan uppercase leading-relaxed">
                Nothing Achieved Without Hard Work
              </p>
              <div className="mt-16 text-[10px] text-white/20 uppercase tracking-widest">
                ByCreair © 2026
              </div>
            </div>
          </Scene>

        </main>
      </div>
    </div >
  );
}

export default HomePage;
