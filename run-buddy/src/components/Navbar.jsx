import React from "react";
import runBuddyLogo from "../assets/images/rb.jpg";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 px-6 py-4 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded overflow-hidden flex items-center justify-center bg-white shadow-sm">
          <img src={runBuddyLogo} alt="Run Buddy Logo" className="w-full h-full object-cover" />
        </div>
        <span className="font-bold text-xl tracking-tight hidden sm:block text-white">RunBuddy.</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-400">
        <a href="#" className="hover:text-white transition-colors text-white">Home</a>
        <a href="#" className="hover:text-white transition-colors">Group Runs</a>
        <a href="#" className="hover:text-white transition-colors">Coaching</a>
        <a href="#" className="hover:text-white transition-colors">Pricing</a>
        <a href="#" className="hover:text-white transition-colors">Shop</a>
        <div className="flex items-center gap-2 cursor-not-allowed opacity-70">
          <span>Choose Buddy</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 uppercase tracking-wider font-black">Coming Soon</span>
        </div>
      </div>
      <button className="px-5 py-2.5 bg-orange-500 text-white font-semibold text-sm rounded-full hover:bg-orange-600 transition-colors">
        Get a Buddy
      </button>
    </nav>
  );
}
