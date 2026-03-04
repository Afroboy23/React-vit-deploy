import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ==========================================
// SCROLL HERO CONFIG
// ==========================================
const FRAME_COUNT = 40;
const FRAME_PATH = "/frames/ezgif-frame-"; // e.g. /frames/ezgif-frame-001.jpg

// ==========================================
// SUB-COMPONENTS
// ==========================================
const Button = ({ children, secondary, className = "" }) => (
  <button
    className={`
      px-8 py-4 text-xs uppercase tracking-[0.25em] transition-all duration-300
      ${secondary
        ? "border border-white/20 hover:bg-white hover:text-black"
        : "bg-white text-black hover:bg-stone-200"}
      ${className}
    `}
  >
    {children}
  </button>
);

const Section = ({ children, className = "" }) => (
  <section className={`py-24 px-6 md:px-12 max-w-[1400px] mx-auto ${className}`}>
    {children}
  </section>
);

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

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function DemoNocturne() {
  const scrollRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Store images in ref to avoid re-renders
  const imagesRef = useRef([]);

  // 1. Preload Images (Once)
  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, "0");
      img.src = `${FRAME_PATH}${num}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []); // Empty dependency array = run only once

  // 2. Scroll & Animation Engine
  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const container = scrollRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: no alpha channel needed if fully opaque
    let isActive = true;
    let requestIds;

    // State Tracking refs
    let currentFrame = 0;
    let targetFrame = 0;

    // --- Render Function ---
    const render = () => {
      if (!isActive) return;

      // 1. Lerp for smoothness (Ease transition)
      const diff = targetFrame - currentFrame;

      // Only redraw if there is a significant change
      if (Math.abs(diff) > 0.01) {
        currentFrame += diff * 0.1; // 0.1 = easing factor (lower is smoother/slower)

        // Draw
        const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(currentFrame)));
        const img = imagesRef.current[frameIndex];

        if (img && canvas.width > 0 && canvas.height > 0) {
          // Object-Cover Logic
          const w = canvas.width;
          const h = canvas.height;
          const aspectCanvas = w / h;
          const aspectImg = img.width / img.height;

          let dw, dh, dx, dy;
          if (aspectCanvas > aspectImg) {
            dw = w;
            dh = w / aspectImg;
            dx = 0;
            dy = (h - dh) / 2;
          } else {
            dh = h;
            dw = h * aspectImg;
            dx = (w - dw) / 2;
            dy = 0;
          }

          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(img, dx, dy, dw, dh);
        }
      }

      requestIds = requestAnimationFrame(render);
    };

    // --- Start Loop ---
    render();

    // --- Scroll Listener ---
    const updateScroll = () => {
      if (!isActive) return;
      const scrollTop = container.scrollTop;
      const maxScroll = 1000; // Pixel distance to complete animation
      const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));

      targetFrame = progress * (FRAME_COUNT - 1);
    };

    container.addEventListener("scroll", updateScroll, { passive: true });

    // --- Resize Listener ---
    const handleResize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        // Force redraw immediately
        currentFrame = targetFrame - 0.1; // trigger update
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size

    return () => {
      isActive = false;
      cancelAnimationFrame(requestIds);
      container.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [imagesLoaded]);


  return (
    <div ref={scrollRef} className="w-full h-full overflow-y-auto bg-[#0a0a0a] text-stone-200 font-sans scrollbar-hide">

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        {/* Logo */}
        <div className="text-sm font-serif tracking-[0.2em] uppercase font-bold">
          Nocturne
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-[10px] uppercase tracking-[0.2em] font-medium">
          {["Shop", "Subscription", "Wholesale", "Journal"].map((link) => (
            <a key={link} href="#" className="hover:text-white/60 transition-colors">
              {link}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6 text-[10px] uppercase tracking-[0.2em]">
          <a href="#" className="hidden sm:block hover:text-white/60">Account</a>
          <a href="#" className="hover:text-white/60">Cart (0)</a>
        </div>
      </nav>

      {/* 1. CINEMATIC HERO (Pinned/Sticky) */}
      <div className="relative h-[150vh]">

        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* BACKGROUND LAYERS */}

          {/* 1. Static Fallback Image (Always visible as base layer) */}
          <img
            src="/frames/ezgif-frame-001.jpg"
            className="absolute inset-0 w-full h-full object-cover z-0"
            alt="Coffee Background"
          />

          {/* 2. Canvas Animation (Overlays the image) */}
          {/* Only show/render canvas if images are loaded to prevent flash/glitch */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* 3. Text/Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40 z-20" />
          <div className="absolute inset-0 bg-black/20 z-20" />

          {/* Hero Content */}
          <div className="relative z-30 h-full flex items-center justify-center text-center px-6">
            <div className="space-y-8 max-w-4xl pt-20">
              <FadeIn>
                <span className="text-xs uppercase tracking-[0.4em] text-white/50 mb-4 block">Nocturne Roasters</span>
                <h1 className="text-5xl md:text-8xl font-serif leading-[1] tracking-tight text-white mb-6">
                  Engineered <br /> for your ritual.
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button>Shop Collection</Button>
                  <Button secondary>Subscribe</Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TRUST STRIP */}
      <div className="border-y border-white/5 bg-[#0a0a0a] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>★ 4.9/5 (1,240 Reviews)</span>
          <span className="hidden sm:inline">Free Shipping Over $60</span>
          <span>Roasted in Melbourne</span>
          <span className="hidden sm:inline">Pause Anytime</span>
        </div>
      </div>

      {/* 3. BEST SELLERS */}
      <Section className="relative z-20 bg-[#0a0a0a]">
        <FadeIn>
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl font-serif text-white">The Collection</h2>
            <a href="#" className="hidden md:block text-xs uppercase tracking-[0.2em] border-b border-white/20 pb-1 hover:text-white transition-colors">View All</a>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Signature Blend", price: "$22.00", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2670&auto=format&fit=crop", notes: "Chocolate, Caramel, Hazelnut", roast: "Medium" },
            { name: "Midnight Oil", price: "$24.00", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2680&auto=format&fit=crop", notes: "Dark Cocoa, Molasses, Smoke", roast: "Dark" },
            { name: "Ethiopia Yirgacheffe", price: "$28.00", img: "https://images.unsplash.com/photo-1621939514649-28b12e81658b?q=80&w=2574&auto=format&fit=crop", notes: "Jasmine, Blueberry, Earl Grey", roast: "Light" },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-900 mb-6">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest text-white border border-white/10">
                    {item.roast}
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{item.name}</h3>
                <p className="text-sm text-white/50 mb-4">{item.notes}</p>
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <span className="text-sm font-light">{item.price}</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Add to Cart</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 4. FIND YOUR PERFECT ROAST (Mini Quiz) */}
      <section className="bg-stone-900 py-32 px-6 relative z-20">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-4 block">Coffee Matchmaker</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-12">How do you brew?</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {["Espresso", "Filter", "French Press", "Cold Brew"].map((method) => (
                <button
                  key={method}
                  className="p-6 border border-white/10 hover:border-orange-500/50 hover:bg-white/5 transition-all text-sm font-light"
                >
                  {method}
                </button>
              ))}
            </div>

            <Button>Find My Match</Button>
          </FadeIn>
        </div>
      </section>

      {/* 5. SUBSCRIPTION */}
      <Section className="grid md:grid-cols-2 gap-16 items-center relative z-20">
        <div className="order-2 md:order-1">
          <FadeIn>
            <h2 className="text-4xl font-serif text-white mb-6">Your ritual, on autopilot.</h2>
            <p className="text-lg font-light text-white/60 mb-8 leading-relaxed">
              Never run out again. Save 15% on every order, get early access to seasonal drops, and pause or cancel anytime.
            </p>

            <div className="space-y-4 mb-10">
              {["Save 15% on every shipment", "Free shipping on all subscriptions", "Exclusive first access to limited roasts"].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-light text-white/80">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  {benefit}
                </div>
              ))}
            </div>

            <Button secondary>Start Subscription</Button>
          </FadeIn>
        </div>

        {/* Visual for Subscription */}
        <div className="order-1 md:order-2 relative aspect-square bg-stone-900 overflow-hidden">
          {/* Abstract "Recurring" visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[80%] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[60%] h-[60%] border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2670&auto=format&fit=crop" className="w-1/2 relative z-10 drop-shadow-2xl" alt="subscription pack" />
          </div>
        </div>
      </Section>

      {/* 6. BRAND STORY */}
      <section className="py-32 border-y border-white/5 text-center relative z-20 bg-[#0a0a0a]">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-6">
            <h3 className="text-2xl font-serif italic text-white/40 mb-8">"We roast for clarity."</h3>
            <p className="text-3xl md:text-4xl font-light leading-relaxed text-white">
              We believe coffee should be <span className="text-white/40">engineered</span>, not just roasted. By controlling every variable—from sourcing to the final curve—we deliver a consistent, cinematic cup every single morning.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-12 border-t border-white/5 text-[10px] uppercase tracking-widest text-white/30 text-center relative z-20 bg-[#0a0a0a]">
        <p className="mb-4">Nocturne Roasters © 2026</p>
        <p>Directed by ByCreair Studio System</p>
      </footer>

    </div>
  );
}
