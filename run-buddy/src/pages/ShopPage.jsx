import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import socksImg from "../assets/images/rb-sock-nobg.png";
import lookbook1 from "../assets/images/packImgNew.jpg";
import lookbook2 from "../assets/images/rbthree.jpg";
import lookbook3 from "../assets/images/rblskd.jpg";
import lookbook4 from "../assets/images/packImg6.jpg";
import productImg1 from "../assets/images/rbjay.jpg";
import productImg2 from "../assets/images/rbmedals.jpg";
import productImg3 from "../assets/images/rbheadshot.jpg";

export default function ShopPage() {
  const [swapped, setSwapped] = useState(false);
  const [cultureText, setCultureText] = useState("Culture");
  const [meetsVisible, setMeetsVisible] = useState(true);
  const [bioVisible, setBioVisible] = useState(false);

  useEffect(() => {
    // 1. Initial pause, then start the 3D-style swap
    const t1 = setTimeout(() => setSwapped(true), 2500); 
    // 2. Exactly halfway through the 1.5s swap, transition the word hidden behind "Movement"
    const t2 = setTimeout(() => setCultureText("Cultural"), 3250);
    // 3. After the words have settled, softly fade out "meets"
    const t3 = setTimeout(() => setMeetsVisible(false), 4500);
    // 4. Wait for 'meets' to fade, then drop down the bio
    const t4 = setTimeout(() => setBioVisible(true), 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const wordsConfig = [
    {
      id: "movement",
      content: "Movement",
      className: "text-orange-500 font-bold inline-block relative",
      zIndex: 10,
      animate: swapped ? { scale: [1, 1.15, 1] } : { scale: 1 },
      transition: { layout: { type: "tween", duration: 1.5, ease: "easeInOut" }, scale: { duration: 1.5, ease: "easeInOut" } }
    },
    {
      id: "meets",
      content: "meets",
      className: "inline-block font-light text-zinc-300 overflow-hidden whitespace-nowrap",
      zIndex: 5,
      animate: { 
        opacity: meetsVisible ? 1 : 0, 
        width: meetsVisible ? "auto" : 0,
        margin: meetsVisible ? "0 0.25rem" : "0 0"
      },
      transition: { duration: 1.5, ease: "easeInOut" }
    },
    {
      id: "culture",
      isCulture: true, // Special rendering to handle invisible width
      className: "text-[#4F73FF] font-bold inline-block relative",
      zIndex: 1,
      animate: swapped 
        ? { scale: [1, 0.85, 1], filter: ["blur(0px)", "blur(4px)", "blur(0px)"] } 
        : { scale: 1, filter: "blur(0px)" },
      transition: { layout: { type: "tween", duration: 1.5, ease: "easeInOut" }, scale: { duration: 1.5, ease: "easeInOut" }, filter: { duration: 1.5, ease: "easeInOut" } }
    }
  ];

  const orderedWords = swapped 
    ? [wordsConfig[2], wordsConfig[1], wordsConfig[0]] 
    : [wordsConfig[0], wordsConfig[1], wordsConfig[2]];

  const products = [
    {
      name: "SBK Courtside Hoodie",
      price: "$120",
      label: "Limited Drop",
      img: productImg1,
      color: "bg-zinc-900"
    },
    {
      name: "City Performance Tee",
      price: "$65",
      label: "Core Piece",
      img: productImg2,
      color: "bg-zinc-800"
    },
    {
      name: "Rhythm Run Shorts",
      price: "$75",
      label: "City Essential",
      img: productImg3,
      color: "bg-zinc-900"
    },
    {
      name: "SBK Warmup Top",
      price: "$110",
      label: "Exclusive Collab",
      img: lookbook3,
      color: "bg-zinc-800"
    },
    {
      name: "Performance Singlet",
      price: "$55",
      label: "Training Fit",
      img: lookbook1,
      color: "bg-zinc-900"
    },
    {
      name: "Culture Cap",
      price: "$40",
      label: "Core Piece",
      img: lookbook2,
      color: "bg-zinc-800"
    }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-orange-500/30">

      {/* 1. HERO COLLABORATION BANNER - MINIMALIST */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">

        {/* Removed loud blur orbs, keeping it pure black and minimal */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center"
        >
          <div className="inline-block border border-zinc-800 px-6 py-2 rounded-full text-xs font-medium tracking-[0.2em] uppercase mb-12 text-zinc-400">
            Capsule 01
          </div>

          {/* Logo Lockup */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-8 w-full">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Run Buddy
            </h1>
            <span className="text-zinc-600 font-light text-2xl md:text-4xl">×</span>

            {/* SAVED BY KARLOS LOGO */}
            {/* Fallback styling applied so it looks decent if the image fails to load initially */}
            <div className="h-16 md:h-20 flex items-center justify-center">
              <img
                src="/src/assets/images/sbk-logo.png"
                alt="Saved By Karlos"
                className="h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  // Fallback text if image isn't saved in assets yet
                  e.target.outerHTML = '<div class="relative inline-block text-[#4F73FF] uppercase font-black tracking-tight leading-none text-left" style="font-family: marker felt, comic sans ms, sans-serif;"><div class="text-3xl sm:text-4xl md:text-5xl">SAVED</div><div class="text-3xl sm:text-4xl md:text-5xl">KARLOS</div><div class="absolute top-[calc(35%-14px)] right-[0px] text-lg">by</div></div>';
                }}
              />
            </div>
          </div>

          <div className="text-lg md:text-2xl font-light text-zinc-300 tracking-wide mt-8 mb-6 h-10 flex items-center justify-center gap-0 md:gap-[0.2rem]">
            {orderedWords.map((word) => (
              <motion.span
                key={word.id}
                layout
                initial={false}
                animate={word.animate}
                transition={word.transition}
                style={{ zIndex: word.zIndex }}
                className={word.className}
              >
                {word.isCulture ? (
                  <>
                    <span className="invisible">Cultural</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={cultureText}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                        >
                          {cultureText}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </>
                ) : (
                  word.content
                )}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0, marginBottom: 0 }}
            animate={bioVisible ? { opacity: 1, y: 0, height: "auto", marginBottom: "2.5rem" } : { opacity: 0, y: -20, height: 0, marginBottom: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="overflow-hidden w-full flex justify-center"
          >
            <p className="text-base md:text-lg text-zinc-500 font-light max-w-xl px-4 text-center">
              Where movement meets culture, a cultural movement begins. Run Buddy and Saved By Karlos are both rooted in neighbouring suburbs — Beach Haven, “The Valley”, and Glenfield, “G40” — communities shaped by challenge, resilience, and identity. This collection is a product of that environment, carrying the energy, culture, and lived experience of where we come from.
            </p>
          </motion.div>
          <button className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-bold tracking-wide transition-all border border-transparent">
            Shop the Drop
          </button>

          <div className="relative mt-8 group flex justify-center">
            <a 
              href="https://www.instagram.com/saved.by.karlos/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-500 hover:text-orange-500 transition-colors flex items-center gap-2 underline underline-offset-4 decoration-white/10 hover:decoration-orange-500/50"
            >
              See more from Saved By Karlos on Instagram
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            {/* Tooltip Pop-up */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-zinc-900 border border-white/10 text-white text-[11px] font-bold tracking-widest uppercase rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-2xl shadow-black/50 whitespace-nowrap z-50 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Open Instagram
              {/* Arrow pointer */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-zinc-900"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE REMOVED TO REDUCE LOUDNESS */}

      {/* 2. COLLAB STORY BLOCK */}
      <section className="w-full py-40 border-b border-white/5 relative z-10 bg-black">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed"
          >
            Saved By Karlos injects the rhythm of the court and the pulse of the streets into Run Buddy’s core endurance aesthetics. This isn't merchandise—it's a meeting point of sport, sound, and identity. Welcome to the crossover.
          </motion.p>
        </div>
      </section>

    </div>
  );
}
