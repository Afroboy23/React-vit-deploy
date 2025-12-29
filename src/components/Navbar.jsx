// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

// Studio Navigation Structure
const NAV_ITEMS = [
  { label: "Client work", path: "/client-work" },
  { label: "Systems & Services", path: "/systems" },
  { label: "Our Approach", path: "/approach" },
  { label: "Networking", path: "#", badge: "Coming Soon" },
];

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-8 transition-all duration-500 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="text-xs font-semibold tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-80"
        >
          ByCreair
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                to={item.path}
                className={`text-[0.7rem] font-medium uppercase tracking-[0.15em] transition-colors ${item.badge
                  ? "text-white/30 cursor-not-allowed"
                  : "text-white/60 hover-cyan hover:text-cyan"
                  }`}
                onClick={(e) => item.badge && e.preventDefault()}
              >
                {item.label}
              </Link>
              {item.badge && (
                <span className="absolute -top-3 -right-6 text-[0.5rem] tracking-wider uppercase text-cyan-400 opacity-80 whitespace-nowrap">
                  {item.badge}
                </span>
              )}
            </div>
          ))}

          {/* Luxury CTA: Understated */}
          <Link
            to="/builder"
            className="ml-8 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:text-cyan"
          >
            Get Started
          </Link>
        </nav>


        {/* Mobile menu trigger */}
        <button className="flex flex-col gap-1.5 md:hidden group">
          <span className="h-px w-6 bg-white/80 transition-all group-hover:w-8 group-hover:bg-cyan-400"></span>
          <span className="h-px w-6 bg-white/80 transition-all group-hover:w-4 group-hover:bg-cyan-400"></span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
