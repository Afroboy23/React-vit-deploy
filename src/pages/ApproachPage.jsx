import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function ApproachPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/20 selection:text-cyan-200">

      {/* Background: Ethereal Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="ethereal-gradient absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-24 pb-32">

          {/* Header Section */}
          <div className="mb-32">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl sm:text-8xl font-medium tracking-tighter text-white mb-12"
            >
              Our <span className="text-cyan">Approach</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12 sm:gap-24 text-lg sm:text-xl font-light leading-relaxed text-white/80"
            >
              <div>
                <p className="mb-6">
                  We design the best websites that look <span className="text-white font-normal">exceptional</span> — cinematic, modern, and unmistakably premium.
                </p>
                <p>
                  Then, under the hood, we build operating systems that work for you, not with you: automation, tracking, pipelines, and workflows that keep your business moving while you focus on what matters.
                </p>
              </div>
              <div>
                <p>
                  We’re also big on <span className="text-white font-normal">animation and interaction</span> — the details that make a website feel alive. Subtle motion, immersive transitions, and interactive moments that elevate your site beyond the conventional.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Process Steps - Grid Layout */}
          <div className="space-y-0 border-t border-white/10">

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid md:grid-cols-12 gap-8 py-20 border-b border-white/10 group hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="md:col-span-4 flex flex-col justify-between h-full">
                <span className="text-sm font-mono text-cyan mb-4">01 / PROCESS</span>
                <h2 className="text-4xl sm:text-5xl font-light text-white group-hover:text-cyan transition-colors duration-300">
                  Precision & <br /> Architecture
                </h2>
              </div>
              <div className="md:col-span-8 grid sm:grid-cols-2 gap-8 text-white/60 font-light leading-relaxed">
                <p>
                  ByCreair begins with precision. We learn your business down to the most minute detail — how you sell, how you deliver, where leads come from, and what “success” looks like. We start with a real conversation: your goals, your customers, your positioning, and the future you’re building.
                </p>
                <p>
                  From there, we map your conversion journey and design the structure that supports it: messaging, page flow, proof placement, and calls to action. We also design the system your website lives inside — whether that’s a dashboard to manage CRM, leads, pipelines, enquiries, bookings, and follow-ups.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid md:grid-cols-12 gap-8 py-20 border-b border-white/10 group hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="md:col-span-4 flex flex-col justify-between h-full">
                <span className="text-sm font-mono text-cyan mb-4">02 / PROCESS</span>
                <h2 className="text-4xl sm:text-5xl font-light text-white group-hover:text-cyan transition-colors duration-300">
                  Rapid <br /> Prototyping
                </h2>
              </div>
              <div className="md:col-span-8 grid sm:grid-cols-2 gap-8 text-white/60 font-light leading-relaxed">
                <p>
                  We prototype early and fast so you can see the vision before we commit to full build. This stage is where we shape the experience: layout, hierarchy, interactive behaviour, and motion direction.
                </p>
                <p>
                  You’ll see the site’s flow come to life quickly — how users move, what they notice first, where they click, and how the experience guides them toward enquiry. We refine the details that make it feel premium: spacing, typography, micro-interactions, and animation timing — so it doesn’t just look good, it feels engineered.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid md:grid-cols-12 gap-8 py-20 border-b border-white/10 group hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="md:col-span-4 flex flex-col justify-between h-full">
                <span className="text-sm font-mono text-cyan mb-4">03 / PROCESS</span>
                <h2 className="text-4xl sm:text-5xl font-light text-white group-hover:text-cyan transition-colors duration-300">
                  Refining & <br /> Optimisation
                </h2>
              </div>
              <div className="md:col-span-8 grid sm:grid-cols-2 gap-8 text-white/60 font-light leading-relaxed">
                <p>
                  We build in focused iterations, improving the site as a system. We refine performance, responsiveness, clarity, and conversion pathways — ensuring the site operates at its best and produces the strongest outcome: more qualified enquiries, better conversions, and a smoother journey from interest to action.
                </p>
                <p>
                  This is where we tune everything: speed, responsiveness, SEO foundations, analytics visibility, and the final polish across every device — so the finished product looks exceptional and performs consistently.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Closing */}
          <div className="mt-32">
            <p className="text-3xl sm:text-5xl font-light text-white leading-tight max-w-5xl">
              What makes it ByCreair: <span className="text-white/40">precision, taste, and systems thinking</span> — <span className="text-cyan">design that stands out for the right reasons</span>, backed by a powerful engine that keeps you ahead.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}

export default ApproachPage;
