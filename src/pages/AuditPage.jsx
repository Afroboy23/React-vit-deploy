import React from "react";
import Navbar from "../components/Navbar";

function AuditPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-slate-50 selection:bg-white/20">
      <div className="noise-overlay" />
      <div className="lux-layer-base">
        <div className="lux-orb lux-orb-1" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 px-6 pb-12 pt-32 sm:px-10">
          <div className="mx-auto max-w-3xl text-center md:text-left">
            <span className="mb-4 block text-[0.8rem] uppercase tracking-[0.2em] text-sky-400">
              Low Friction. High Clarity.
            </span>
            <h1 className="mb-6 text-[2.5rem] leading-none tracking-tight sm:text-[3.5rem]">
              System Audit
            </h1>

            <p className="mb-8 text-[1.15rem] leading-relaxed text-slate-300">
              Before we build, we diagnose. The System Audit is a standalone, deep-dive session where we analyze your current digital presence, funnel, and automations.
            </p>

            <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h3 className="mb-4 text-xl font-medium text-slate-100">The Guarantee</h3>
              <p className="text-slate-400">
                If you don't leave this session with a clear, actionable roadmap for your growth—we refund the audit fee immediately. No risk. Pure value.
              </p>
            </div>

            <button className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition hover:bg-slate-200">
              Book Your Audit — $499
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AuditPage;
