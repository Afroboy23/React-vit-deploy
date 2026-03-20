import React from "react";
import { Link, useLocation } from "react-router-dom";
import runBuddyLogo from "../assets/images/rb.jpg";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "text-white" : "";

  return (
    <nav className="fixed w-full z-50 top-0 px-6 py-4 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <Link to="/" className="w-10 h-10 rounded overflow-hidden flex items-center justify-center bg-white shadow-sm">
          <img src={runBuddyLogo} alt="Run Buddy Logo" className="w-full h-full object-cover" />
        </Link>
        <Link to="/" className="font-bold text-xl tracking-tight hidden sm:block text-white">RunBuddy.</Link>
      </div>
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
      <div className="flex items-center gap-6">
        {location.pathname === '/shop' && (
          <div
            className="text-[#4F73FF] font-black uppercase leading-none text-left hidden sm:block relative"
            style={{ fontFamily: "'Marker Felt', 'Comic Sans MS', sans-serif" }}
          >
            <div className="text-lg md:text-xl">SAVED</div>
            <div className="text-lg md:text-xl">KARLOS</div>
            <div className="absolute top-[calc(35%-15px)] -right-[24px] text-[10px] md:text-xs">by</div>
          </div>
        )}
        <button className="px-5 py-2.5 bg-orange-500 text-white font-semibold text-sm rounded-full hover:bg-orange-600 transition-colors">
          Get a Buddy
        </button>
      </div>
    </nav>
  );
}
