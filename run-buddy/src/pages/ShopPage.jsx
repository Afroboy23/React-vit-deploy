import React, { useState } from "react";
import { motion } from "framer-motion";
import socksImg from "../assets/images/rb-sock.jpg";

export default function ShopPage() {
  const [activeVariant, setActiveVariant] = useState(0);
  const variants = [
    { name: "Cyan/Navy Variant 1", color: "bg-cyan-500" },
    { name: "Teal/Navy Variant 2", color: "bg-teal-500" },
    { name: "White/Cyan Variant 3", color: "bg-white" }
  ];

  return (
    <div className="pt-32 px-6 pb-24 min-h-[90vh] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl"
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
              Run Buddy
            </span> Shop
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Official performance gear to keep you moving forward.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center bg-zinc-900/40 border border-white/5 rounded-3xl p-8 md:p-12">

          {/* Product Image */}
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white flex items-center justify-center border border-white/10 group">
            <img src={socksImg} alt="Run Buddy Performance Socks" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-8" />

            {/* Badge */}
            <div className="absolute top-6 left-6 px-4 py-1.5 bg-orange-500 text-white text-xs font-black tracking-widest uppercase rounded-full shadow-lg z-10">
              New Arrival
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">RB Performance Socks</h2>
            <div className="text-3xl font-light text-orange-400 mb-6">$24.00</div>

            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              Engineered for endurance. These Run Buddy compression socks feature targeted arch support, breathable mesh zones, and reinforced heels to keep your feet feeling fresh mile after mile. Featuring the RB elephant logo and SBK detailing.
            </p>

            {/* Variants */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-4">Select Colorway</h3>
              <div className="flex gap-4">
                {variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveVariant(idx)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeVariant === idx ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-zinc-950 scale-110' : 'ring-1 ring-white/20 hover:scale-105'} ${variant.color}`}
                    title={variant.name}
                  />
                ))}
              </div>
              <p className="text-zinc-500 text-sm mt-3 font-medium">{variants[activeVariant].name}</p>
            </div>

            {/* Add to Cart */}
            <button className="w-full py-5 bg-white text-black hover:bg-orange-500 hover:text-white font-black text-lg tracking-wide uppercase rounded-full transition-all hover:scale-[1.02] shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)]">
              Add to Bag
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
