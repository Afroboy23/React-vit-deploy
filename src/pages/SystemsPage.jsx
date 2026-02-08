import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function SystemsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

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
          <div className="mb-24 px-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl sm:text-8xl font-medium tracking-tighter text-white mb-8"
            >
              Systems & <span className="text-cyan">Services</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl sm:text-2xl font-light text-white/60 max-w-3xl leading-relaxed"
            >
              Conversion-led design, built to turn attention into enquiries — so you stand out for the right reasons.
            </motion.p>
          </div>

          <div className="space-y-32">

            {/* 1. Websites & Apps */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              variants={itemVariants}
              className="group border-t border-white/10 pt-12"
            >
              <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                  <span className="text-sm font-mono text-cyan mb-4 block tracking-widest">01 / CORE</span>
                  <h2 className="text-4xl font-light text-white mb-6">Websites & Apps</h2>
                  <p className="text-white/60 leading-relaxed mb-6">
                    We design premium websites and apps that look exceptional and perform. Every build includes interactive features and animation — crafted to make the experience feel alive, modern, and unmistakably ByCreair.
                  </p>
                </div>
                <div className="md:col-span-8">
                  <motion.div
                    whileHover={{ scale: 1.005, borderColor: "rgba(6, 182, 212, 0.4)" }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-sm hover:bg-white/[0.04] transition-all duration-500"
                  >
                    <div className="space-y-12">
                      {/* Strategy */}
                      <div>
                        <h3 className="text-xl text-white mb-6">Strategy & Direction</h3>
                        <ul className="space-y-3 pl-2 border-l border-white/10">
                          {[
                            "Discovery & digital strategy",
                            "Offer + messaging structure",
                            "Conversion planning (user journey, funnels)"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm pl-4">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Web Platforms */}
                      <div>
                        <h3 className="text-xl text-white mb-6">Web & Digital Platforms</h3>
                        <ul className="space-y-3 pl-2 border-l border-white/10">
                          {[
                            "High-performance websites",
                            "Web apps / portals (dashboards, gated areas)",
                            "Website redesigns + upgrades",
                            "Copy support for key pages"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm pl-4">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cinematic */}
                      <div>
                        <h3 className="text-xl text-white mb-6">Cinematic & Interactive Experiences</h3>
                        <ul className="space-y-3 pl-2 border-l border-white/10">
                          {[
                            "Motion design + animation direction",
                            "Micro-interactions (hover, scroll, transitions)",
                            "Interactive page sections"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm pl-4">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* 2. Systems */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              variants={itemVariants}
              className="group border-t border-white/10 pt-12"
            >
              <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                  <span className="text-sm font-mono text-cyan mb-4 block tracking-widest">02 / SYSTEMS</span>
                  <h2 className="text-4xl font-light text-white mb-6">Systems</h2>
                  <p className="text-white/60 leading-relaxed mb-6">
                    Under the hood, we build operating systems that work for you — not with you. We connect your website to a real business engine: enquiries flow into the right place, get tracked, followed up, and moved through a pipeline without manual chaos.
                  </p>
                </div>
                <div className="md:col-span-8">
                  <motion.div
                    whileHover={{ scale: 1.005, borderColor: "rgba(6, 182, 212, 0.4)" }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-sm hover:bg-white/[0.04] transition-all duration-500"
                  >
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                      {/* Business OS */}
                      <div>
                        <h3 className="text-xl text-white mb-2">Business Operating Systems</h3>
                        <p className="text-white/50 text-xs uppercase tracking-widest mb-6">The Engine Room</p>
                        <ul className="space-y-3 pl-2 border-l border-white/10">
                          {[
                            "CRM setup + pipeline build",
                            "Forms & booking flows",
                            "Internal dashboards",
                            "Workflow structure"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm pl-4">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Automation */}
                      <div>
                        <h3 className="text-xl text-white mb-2">Automation & Integrations</h3>
                        <p className="text-white/50 text-xs uppercase tracking-widest mb-6">Connecting the dots</p>
                        <ul className="space-y-3 pl-2 border-l border-white/10">
                          {[
                            "Workflow automation",
                            "Tool integrations (Zapier/Make)",
                            "Lead capture systems",
                            "Smart routing rules"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm pl-4">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* AI Solutions */}
                      <div>
                        <h3 className="text-xl text-white mb-2">AI-Powered Solutions</h3>
                        <p className="text-white/50 text-xs uppercase tracking-widest mb-6">Future-Proofing</p>
                        <ul className="space-y-3 pl-2 border-l border-white/10">
                          {[
                            "AI chat assistants",
                            "Lead qualification bots",
                            "Automated replies",
                            "Knowledge base systems"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm pl-4">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Course Infrastructure */}
                      <div>
                        <h3 className="text-xl text-white mb-2">Course Infrastructure</h3>
                        <p className="text-white/50 text-xs uppercase tracking-widest mb-6">Monetise Knowledge</p>
                        <ul className="space-y-3 pl-2 border-l border-white/10">
                          {[
                            "Course hosting setup",
                            "Gated content areas",
                            "Payment & membership flows",
                            "User access strategies"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm pl-4">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* 3. Growth & Brand (Split Section) */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              variants={itemVariants}
              className="group border-t border-white/10 pt-12"
            >
              <div className="grid md:grid-cols-2 gap-12">

                {/* Growth */}
                <div>
                  <span className="text-sm font-mono text-cyan mb-4 block tracking-widest">03 / SCALING</span>
                  <h2 className="text-3xl font-light text-white mb-4">Growth</h2>
                  <p className="text-white/60 leading-relaxed mb-8 h-24">
                    Build visibility. Build demand. Then convert it. We don’t just drive traffic — we shape the journey so it becomes enquiries.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.005, borderColor: "rgba(6, 182, 212, 0.4)" }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/[0.03] border border-white/10 p-8 rounded-sm h-full hover:bg-white/[0.04] transition-all duration-500"
                  >
                    <div className="space-y-8">
                      {/* SEO */}
                      <div>
                        <h3 className="text-lg text-white mb-4">SEO, Performance & Growth</h3>
                        <ul className="space-y-3">
                          {[
                            "SEO foundations (structure, metadata, search-ready)",
                            "Speed + performance optimisation",
                            "Analytics + conversion tracking setup"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Optimisation */}
                      <div>
                        <h3 className="text-lg text-white mb-4">Ongoing Optimisation</h3>
                        <ul className="space-y-3">
                          {[
                            "Monthly improvements, testing, and iteration",
                            "Maintenance, updates, and content changes"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Brand */}
                <div>
                  <span className="text-sm font-mono text-cyan mb-4 block tracking-widest">04 / PRESENCE</span>
                  <h2 className="text-3xl font-light text-white mb-4">Brand Presence</h2>
                  <p className="text-white/60 leading-relaxed mb-8 h-24">
                    Trust is a conversion tool. We build it intentionally. Your website should carry proof with precision — so customers feel confident.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.005, borderColor: "rgba(6, 182, 212, 0.4)" }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/[0.03] border border-white/10 p-8 rounded-sm h-full hover:bg-white/[0.04] transition-all duration-500"
                  >
                    <div className="space-y-8">
                      {/* Brand & Creative */}
                      <div>
                        <h3 className="text-lg text-white mb-4">Brand & Creative</h3>
                        <ul className="space-y-3">
                          {[
                            "Logo design",
                            "Visual identity refresh (colors, typography)",
                            "Design systems (consistent UI rules)",
                            "Posters, flyers, and marketing collateral"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Reputation */}
                      <div>
                        <h3 className="text-lg text-white mb-4">Reputation Management</h3>
                        <ul className="space-y-3">
                          {[
                            "Review strategy + reputation workflows",
                            "Google Business Profile optimisation + support"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Videography */}
                      <div>
                        <h3 className="text-lg text-white mb-4">Videography</h3>
                        <ul className="space-y-3">
                          {[
                            "Short: short-form content (Reels/TikTok/ads)",
                            "Medium: brand promos + event highlights",
                            "Long: full cinematic production"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/80 font-light text-sm">
                              <span className="text-cyan mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 block shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* 4. Add-ons */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              variants={itemVariants}
              className="group pt-12 pb-12"
            >
              <span className="text-sm font-mono text-white/40 mb-8 block center w-full text-center tracking-widest uppercase">Optional Add-ons</span>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Conversion Setup",
                    items: ["Event tracking", "Funnel visibility", "Reporting-ready setup"]
                  },
                  {
                    title: "Optimisation Retainer",
                    items: ["Monthly improvements", "Conversion refinements", "Continuous iteration"]
                  },
                  {
                    title: "Creative Production",
                    items: ["Photography & Direction", "High-End Videography", "SEO Copywriting"]
                  }
                ].map((addon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, borderColor: "rgba(6, 182, 212, 0.5)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="border border-white/10 p-8 transition-colors duration-300 bg-white/[0.01]"
                  >
                    <h3 className="text-xl text-white font-light mb-6">{addon.title}</h3>
                    <ul className="space-y-3">
                      {addon.items.map((item, j) => (
                        <li key={j} className="text-sm text-white/60 flex items-center gap-2">
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.section>

          </div>

        </main>
      </div>
    </div>
  );
}

export default SystemsPage;
