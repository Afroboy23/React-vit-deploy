import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-12 border-t border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-2xl font-medium tracking-tighter block mb-4">
            By<span className="text-cyan-400">Creair</span>
          </Link>
          <p className="text-sm text-white/50 leading-relaxed font-light">
            Automating growth. <br />
            Designing authority. <br />
            Building the future.
          </p>
        </div>

        {/* Navigation */}
        <div className="col-span-1">
          <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">Explore</h4>
          <ul className="space-y-3 text-sm font-light">
            <li><Link to="/client-work" className="hover:text-cyan-400 transition-colors">Client Work</Link></li>
            <li><Link to="/systems" className="hover:text-cyan-400 transition-colors">Systems & Services</Link></li>
            <li><Link to="/approach" className="hover:text-cyan-400 transition-colors">Our Approach</Link></li>
            <li><Link to="/audit" className="hover:text-cyan-400 transition-colors">Free Audit</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="col-span-1">
          <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">Services</h4>
          <ul className="space-y-3 text-sm font-light text-white/70">
            <li>Web Development</li>
            <li>Brand Identity</li>
            <li>System Automation</li>
            <li>Content Production</li>
          </ul>
        </div>

        {/* Contact/Action */}
        <div className="col-span-1">
          <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">Start Now</h4>
          <Link
            to="/request"
            className="inline-block px-6 py-3 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Request Access
          </Link>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30 uppercase tracking-widest">
        <p>© 2026 ByCreair. All rights reserved.</p>
        <p>Nihil Sine Labore</p>
      </div>
    </footer>
  );
}
