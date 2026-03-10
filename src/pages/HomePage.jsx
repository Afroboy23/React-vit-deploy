// src/pages/HomePage.jsx
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from "framer-motion";
import StarlightPremium from "../components/StarlightPremium";
import imgShowreel from "../assets/showreel-preview.png";
import vidAnimation from "../assets/bycreair-animation.scale-down.mov"; // Optimized
import vidLanding from "../assets/bycreair-landing.mp4";

// Helper for Scene Transitions
// visibleRange: [start, end] of scroll progress (0-1) where this section is active
function Scene({ children, scrollYProgress, start, end }) {
  // Fade in during the first 10% of the range, stay visible, fade out in the last 10%
  // FIX: If start is 0, we want it to be visible immediately (1)
  // Otherwise, use the fade-in logic
  const opacity = useTransform(
    scrollYProgress,
    start === 0 ? [start, end - 0.05, end] : [start, start + 0.05, end - 0.05, end],
    start === 0 ? [1, 1, 0] : [0, 1, 1, 0]
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

// Lazy Video Component
function LazyVideo({ src, className, poster }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" }); // Load when 200px away
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isInView) setShouldLoad(true);
  }, [isInView]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {shouldLoad ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        poster ? (
          <img src={poster} alt="Video preview" className="w-full h-full object-cover opacity-50" />
        ) : (
          <div className="w-full h-full bg-white/5 animate-pulse" />
        )
      )}
    </div>
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
      <div className="sticky top-0 h-[100dvh] overflow-hidden">

        <Navbar />

        {/* BACKGROUND: PREMIUM STARLIGHT (Shader-based) */}
        <div className="absolute inset-0 z-0">
          <StarlightPremium />
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
            <div className="max-w-5xl text-center flex flex-col gap-4 sm:gap-8 px-4">
              <p className="text-lg sm:text-3xl font-[Arial,sans-serif] leading-relaxed text-white/90">
                By<span className="text-cyan">Creair</span> is a cinematic digital studio that develops your full design and digital needs.
              </p>
              <p className="text-sm sm:text-xl font-[Arial,sans-serif] leading-relaxed text-white/80">
                We create premium websites, operating systems, and the infrastructure to host your own educational courses.
              </p>
              <p className="text-sm sm:text-xl font-[Arial,sans-serif] leading-relaxed text-white/80">
                Our work blends high-end design with smart systems that save time and boost results. <span className="text-cyan">From first impression to daily operations, we help your company move with precision and impact.</span>
              </p>
            </div>
          </Scene>

          {/* SCENE 3: WORK (33% - 50%) */}
          <Scene scrollYProgress={scrollYProgress} start={0.33} end={0.5}>


            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center w-full max-w-5xl px-4">
              <div className="space-y-4 md:space-y-8">
                <h2 className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-cyan">Selected Work</h2>
                <h3 className="text-3xl md:text-4xl font-light">Precision in every pixel.</h3>
                <ul className="space-y-2 md:space-y-4 text-sm md:text-lg font-light text-white/60">
                  <li>• Brand Identity Architecture</li>
                  <li>• High-Performance Web Platforms</li>
                  <li>• Cinematic Digital Experiences</li>
                </ul>
                <Link to="/client-work" className="inline-block text-[10px] md:text-xs uppercase tracking-[0.2em] border-b border-cyan-500/50 pb-1 hover:text-cyan transition-colors">
                  View Portfolio
                </Link>
              </div>

              <div className="space-y-4 md:space-y-6">
                {/* Video 1: Animation - Hidden on mobile, only shown on tablet/desktop */}
                <motion.div
                  className="hidden md:block aspect-video bg-white/5 rounded-lg border border-white/10 overflow-hidden relative group cursor-pointer perspective-1000"
                  whileHover="hover"
                  initial="initial"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -5;
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
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-20 pointer-events-none"
                    variants={{
                      initial: { x: "-100%" },
                      hover: { x: "100%", transition: { repeat: Infinity, duration: 1.5, ease: "linear" } }
                    }}
                  />
                  <LazyVideo
                    src={vidAnimation}
                    className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>

                {/* Video 2: Landing - Primary featured video on mobile */}
                <motion.div
                  className="aspect-video bg-white/5 rounded-lg border border-white/10 overflow-hidden relative group cursor-pointer perspective-1000"
                  whileHover="hover"
                  initial="initial"
                  onMouseMove={(e) => {
                    if (!window.matchMedia("(hover: hover)").matches) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -5;
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
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-20 pointer-events-none"
                    variants={{
                      initial: { x: "-100%" },
                      hover: { x: "100%", transition: { repeat: Infinity, duration: 1.5, ease: "linear" } }
                    }}
                  />
                  <LazyVideo
                    src={vidLanding}
                    className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              </div>
            </div>
          </Scene>

          {/* SCENE 4: SYSTEMS (50% - 66%) */}
          <Scene scrollYProgress={scrollYProgress} start={0.5} end={0.66}>
            <div className="grid md:grid-cols-3 gap-4 md:gap-8 w-full max-w-6xl text-center px-4">
              {[
                { title: "Founders", desc: "Establishing authority from day zero." },
                { title: "Scale-ups", desc: "Automating growth at velocity." },
                { title: "Creators", desc: "Owning the platform, not renting it." }
              ].map((card, i) => (
                <div key={i} className="p-4 md:p-8 border border-white/10 rounded-xl bg-black/20 hover:border-cyan-500/50 transition-colors">
                  <h3 className="text-lg md:text-xl font-light text-white mb-2 md:mb-4">{card.title}</h3>
                  <p className="text-xs md:text-sm text-white/50">{card.desc}</p>
                </div>
              ))}
            </div>
          </Scene>

          {/* SCENE 5: CTA (66% - 83%) */}
          <Scene scrollYProgress={scrollYProgress} start={0.66} end={0.83}>
            <div className="text-center px-4">
              <h2 className="text-3xl sm:text-6xl font-light text-white mb-8 sm:mb-12">
                Upgrade Your Brand Presence.
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
            <div className="text-center px-4">
              <h2 className="text-2xl sm:text-5xl font-medium tracking-tighter text-white mb-4 sm:mb-6">
                Nihil Sine Labore
              </h2>
              <p className="text-[10px] sm:text-base font-light tracking-[0.2em] sm:tracking-[0.3em] text-cyan uppercase leading-relaxed">
                Nothing Achieved Without Hard Work
              </p>
              <div className="mt-12 sm:mt-16 text-[10px] text-white/20 uppercase tracking-widest">
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
