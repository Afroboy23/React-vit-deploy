import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Studio Navigation Structure
const NAV_ITEMS = [
  { label: "Client work", path: "/client-work" },
  { label: "Systems & Services", path: "/systems" },
  { label: "Our Approach", path: "/approach" },
  { label: "Networking", path: "#", badge: "Coming Soon" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-8 transition-all duration-500 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="text-xs font-semibold tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-80 z-50"
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
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden group z-50"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-white transition-all"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-px w-6 bg-white transition-all"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-white transition-all"
          />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex items-center justify-center md:hidden"
            >
              <nav className="flex flex-col items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={(e) => item.badge && e.preventDefault()}
                    className={`text-xl font-light uppercase tracking-[0.2em] ${item.badge ? "text-white/30" : "text-white hover:text-cyan"
                      }`}
                  >
                    {item.label} {item.badge && <span className="text-[0.6em] text-cyan align-top ml-2">{item.badge}</span>}
                  </Link>
                ))}
                <Link
                  to="/builder"
                  className="mt-8 px-8 py-3 border border-white/20 rounded-full text-sm uppercase tracking-[0.2em] text-white hover:border-cyan text-cyan"
                >
                  Get Started
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Navbar;
