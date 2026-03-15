import React from "react";
import { motion } from "framer-motion";

export default function ShopPage() {
  return (
    <div className="pt-32 px-6 min-h-[90vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
            Run Buddy
          </span> Shop
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
          Official merchandise and gear coming soon. Stay accountable in style.
        </p>

        <div className="p-12 border border-white/5 bg-zinc-900/50 rounded-2xl flex items-center justify-center">
          <p className="text-zinc-500 font-medium tracking-widest uppercase">Inventory Drop Incoming</p>
        </div>
      </motion.div>
    </div>
  );
}
