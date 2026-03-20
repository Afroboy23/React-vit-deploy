import React from "react";
import { motion } from "framer-motion";
import socksImg from "../assets/images/rb-sock-nobg.png";
import lookbook1 from "../assets/images/packImgNew.jpg";
import lookbook2 from "../assets/images/rbthree.jpg";
import lookbook3 from "../assets/images/rblskd.jpg";
import lookbook4 from "../assets/images/packImg6.jpg";
import productImg1 from "../assets/images/rbjay.jpg";
import productImg2 from "../assets/images/rbmedals.jpg";
import productImg3 from "../assets/images/rbheadshot.jpg";

export default function ShopPage() {

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
                  e.target.outerHTML = '<div class="relative inline-block text-[#4F73FF] uppercase font-black tracking-tight leading-none text-left" style="font-family: marker felt, comic sans ms, sans-serif;"><div class="text-4xl md:text-5xl">SAVED</div><div class="text-4xl md:text-5xl">KARLOS</div><div class="absolute top-[calc(35%-12px)] -right-[20px] text-xl">by</div></div>';
                }}
              />
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-light text-zinc-300 tracking-wide mt-8 mb-6">
            <span className="text-orange-500 font-bold">Movement</span> Meets <span className="text-[#4F73FF] font-bold">Culture</span>.
          </h2>
          <p className="text-base md:text-lg text-zinc-500 font-light max-w-xl mx-auto mb-10 px-4">
            Made for the run. Built for the lifestyle. An exclusive collection fusing athletic performance with street culture.
          </p>
          <button className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-bold tracking-wide transition-all border border-transparent">
            Shop the Drop
          </button>
        </motion.div>
      </section>

      {/* MARQUEE REMOVED TO REDUCE LOUDNESS */}

      {/* 2. COLLAB STORY BLOCK */}
      <section className="w-full py-40 border-b border-white/5 relative z-10 bg-black">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-black leading-[1.1] tracking-tight text-white mb-10"
          >
            Where the track ends, <br className="hidden md:block" />
            <span className="text-orange-500">the city begins.</span>
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full h-px bg-white/20 my-10"
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed"
          >
            Saved By Karlos injects the rhythm of the court and the pulse of the streets into Run Buddy’s core endurance aesthetics. This isn't merchandise—it's a meeting point of sport, sound, and identity. Welcome to the crossover.
          </motion.p>
        </div>
      </section>

      {/* 4. LOOKBOOK / CAMPAIGN VISUALS */}
      <section className="w-full py-20 bg-zinc-950 relative z-10 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative rounded-3xl overflow-hidden aspect-[3/4]"
            >
              <img src={lookbook1} alt="Campaign 1" className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition-all duration-700" />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-orange-500 font-bold tracking-widest text-xs uppercase">The Rhythm</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[3/4]"
            >
              <img src={lookbook2} alt="Campaign 2" className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition-all duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden aspect-square"
            >
              <img src={lookbook3} alt="Campaign 3" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-white font-bold tracking-widest text-xs uppercase">City Energy</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden aspect-[3/4]"
            >
              <img src={lookbook4} alt="Campaign 4" className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition-all duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 & 6. FEATURED COLLECTION AREA */}
      <section className="w-full py-32 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white">The Capsule.</h2>
              <p className="text-lg text-zinc-500 uppercase tracking-widest font-bold">Limited Run 01</p>
            </div>
            <button className="hidden md:block underline text-orange-500 font-bold tracking-wide hover:text-white transition-colors">
              View All Products
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* The Socks (Using actual asset) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group flex flex-col"
            >
              <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 flex items-center justify-center mb-6">
                <img src={socksImg} alt="Run Buddy Performance Socks" className="w-full h-full object-contain p-12 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white text-black text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg z-10">
                  Exclusive Collab
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">RB Performance Socks</h3>
                  <p className="text-zinc-500 font-light text-sm">Compression Fit</p>
                </div>
                <div className="text-xl font-light text-white">$24</div>
              </div>
            </motion.div>

            {/* The Rest of the Capsule (Typographic / Abstract styling since we lack specific apparel vectors) */}
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (idx + 1) }}
                className="group flex flex-col cursor-pointer"
              >
                <div className={`relative aspect-square w-full rounded-[2rem] overflow-hidden ${product.color} border border-white/5 flex items-center justify-center mb-6 group-hover:border-orange-500/50 transition-colors duration-500`}>

                  {/* Real Image representation */}
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700" />

                  {/* Subtle waveform graphic for music influence */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                    <svg className="w-3/4 h-3/4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>

                  <div className={`absolute top-6 left-6 px-4 py-1.5 ${product.label === 'Limited Drop' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-white'} text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg z-10`}>
                    {product.label}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">{product.name}</h3>
                    <p className="text-zinc-500 font-light text-sm">SBK x RB</p>
                  </div>
                  <div className="text-xl font-light text-white">{product.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="w-full py-32 bg-zinc-950 relative z-10 flex flex-col items-center justify-center text-center px-6 border-t border-white/5">
        <h2 className="relative z-10 text-4xl md:text-6xl font-medium tracking-tight text-white mb-8">
          Built for Movement.<br />
          <span className="text-zinc-500">Styled for the City.</span>
        </h2>
        <button className="relative z-10 px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-bold text-lg tracking-wide transition-all border border-transparent">
          Explore the Collab
        </button>
      </section>

    </div>
  );
}
