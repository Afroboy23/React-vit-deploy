import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import runBuddyLogo from "../assets/images/rb.jpg";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path) => location.pathname === path ? "text-white" : "";

  return (
    <nav className="fixed w-full z-50 top-0 px-4 md:px-6 py-4 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <Link to="/" className="w-10 h-10 rounded overflow-hidden flex items-center justify-center bg-white shadow-sm z-50 relative">
          <img src={runBuddyLogo} alt="Run Buddy Logo" className="w-full h-full object-cover" />
        </Link>
        <Link to="/" className="font-bold text-xl tracking-tight text-white z-50 relative">RunBuddy.</Link>
      </div>

      {/* DESKTOP NAVIGATION */}
      <div className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-400">
        <Link to="/" className={`hover:text-white transition-colors ${isActive('/')}`}>Home</Link>
        <Link to="/group-runs" className={`hover:text-white transition-colors ${isActive('/group-runs')}`}>Group Runs</Link>
        <Link to="/coaching" className={`hover:text-white transition-colors ${isActive('/coaching')}`}>Coaching</Link>
        <Link to="/pricing" className={`hover:text-white transition-colors ${isActive('/pricing')}`}>Pricing</Link>
        <Link to="/shop" className={`hover:text-white transition-colors ${isActive('/shop')}`}>Shop</Link>
        <Link to="/buddies" className={`flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity ${isActive('/buddies')}`}>
          <span>Choose Buddy</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 uppercase tracking-wider font-black">Coming Soon</span>
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 sm:gap-6 z-50 relative">
        {location.pathname === '/shop' && (
          <div
            className="text-[#4F73FF] font-black uppercase leading-none text-left hidden sm:block relative"
            style={{ fontFamily: "'Marker Felt', 'Comic Sans MS', sans-serif" }}
          >
            <div className="text-lg md:text-xl">SAVED</div>
            <div className="text-lg md:text-xl">KARLOS</div>
            <div className="absolute top-[35%] -right-[14px] text-[10px] md:text-xs">by</div>
          </div>
        )}
        <button className="hidden md:block px-5 py-2.5 bg-orange-500 text-white font-semibold text-sm rounded-full hover:bg-orange-600 transition-colors">
          Get a Buddy
        </button>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE FULL SCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-3xl border-b border-white/5 py-8 px-6 flex flex-col gap-6 text-2xl font-bold md:hidden shadow-2xl text-zinc-400 origin-top h-[90vh] overflow-y-auto"
          >
            <Link onClick={() => setIsOpen(false)} to="/" className={`hover:text-white transition-colors ${isActive('/')}`}>Home</Link>
            <Link onClick={() => setIsOpen(false)} to="/group-runs" className={`hover:text-white transition-colors ${isActive('/group-runs')}`}>Group Runs</Link>
            <Link onClick={() => setIsOpen(false)} to="/coaching" className={`hover:text-white transition-colors ${isActive('/coaching')}`}>Coaching</Link>
            <Link onClick={() => setIsOpen(false)} to="/pricing" className={`hover:text-white transition-colors ${isActive('/pricing')}`}>Pricing</Link>
            <Link onClick={() => setIsOpen(false)} to="/shop" className={`hover:text-white transition-colors ${isActive('/shop')}`}>Shop</Link>
            <Link onClick={() => setIsOpen(false)} to="/buddies" className={`flex flex-col items-start gap-1 opacity-70 hover:opacity-100 transition-opacity mt-4 pt-4 border-t border-white/5 ${isActive('/buddies')}`}>
              <span>Choose Buddy</span>
              <span className="text-[12px] px-2.5 py-1 mt-1 rounded bg-orange-500/20 text-orange-400 uppercase tracking-wider font-black">Coming Soon</span>
            </Link>
            
            <button onClick={() => setIsOpen(false)} className="mt-8 px-6 py-4 bg-orange-500 text-white font-bold rounded-xl w-full text-center hover:bg-orange-600 transition-colors text-lg tracking-wide shadow-lg shadow-orange-500/20">
              Get a Buddy
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
