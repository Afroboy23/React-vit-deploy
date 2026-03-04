import React from "react";
import { motion } from "framer-motion";

// Placeholder image for car
// Ideally use a real car image if available, else a gradient/shape
const CAR_IMG = "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop";

export default function DemoPrecision() {
  return (
    <div className="w-full h-full overflow-y-auto bg-stone-900 text-white font-sans selection:bg-amber-500/30">

      {/* 1. HERO */}
      <section className="relative h-[60%] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={CAR_IMG} alt="Luxury Car" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-white mb-2"
          >
            Velocitá GT
          </motion.h2>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-500">Pure Performance. Pure Art.</p>
        </div>
      </section>

      {/* 2. SPECS */}
      <section className="py-12 px-6 bg-stone-900">
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto border-t border-b border-white/10 py-6">
          <div className="text-center">
            <span className="block text-xl font-light">2.8s</span>
            <span className="text-[10px] text-white/40 uppercase tracking-widest">0-60 mph</span>
          </div>
          <div className="text-center border-l border-white/10">
            <span className="block text-xl font-light">720</span>
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Horsepower</span>
          </div>
          <div className="text-center border-l border-white/10">
            <span className="block text-xl font-light">210</span>
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Top Speed</span>
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="py-16 text-center">
        <button className="px-8 py-3 border border-white/20 hover:bg-white hover:text-black transition-colors text-xs uppercase tracking-[0.2em]">
          Configure Yours
        </button>
      </section>

    </div>
  );
}
