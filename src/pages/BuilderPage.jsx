import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

// Service Data
const WEBSITE_PLANS = [
  {
    id: "launch",
    name: "Launch Website",
    description: "Ideal for startups needing a professional, high-impact presence.",
    includes: [
      "Conversion-first structure",
      "Premium UI design + build",
      "Basic SEO foundations",
      "Mobile Responsive"
    ],
    bestFor: "Startups & Personal Brands"
  },
  {
    id: "signature",
    name: "Signature Website",
    description: "Our standard for high-performance businesses. Cinematic, interactive, and conversion-focused.",
    includes: [
      "Advanced Motion & Interaction",
      "Conversion Strategy",
      "Full SEO Setup",
      "Performance Optimization",
      "CMS Integration"
    ],
    bestFor: "Growing SMEs & Agencies"
  },
  {
    id: "cinematic",
    name: "Cinematic Website",
    description: "For brands that need to dominate. Immersive 3D, WebGL, and high-end storytelling.",
    includes: [
      "Custom 3D Assets",
      "Scrollytelling Experiences",
      "Advanced Sound Design",
      "Award-Winning Aesthetics"
    ],
    bestFor: "Luxury & Tech Leaders"
  },
  {
    id: "os",
    name: "Website + Operating System",
    description: "The complete package. A high-converting website connected to a powerful backend engine.",
    includes: [
      "Signature Website included",
      "Full CRM & Pipeline Build",
      "Automation Suite",
      "Client Portal Setup"
    ],
    bestFor: "Service Businesses Scaling Up"
  }
];

const ADDONS = [
  { id: "ecom", name: "E-commerce Shop Upgrade", desc: "Sell products seamlessly." },
  { id: "seo", name: "SEO Setup", desc: "Rank higher from day one." },
  { id: "ads", name: "Ads Creative Pack", desc: "High-converting ad visuals." },
  { id: "crm", name: "CRM & Pipeline Setup", desc: "Organize your leads." },
  { id: "auto", name: "Automation Setup", desc: "Save time with smart flows." },
  { id: "ai", name: "AI Assistant / AI Workflows", desc: "Next-gen efficiency." },
  { id: "brand", name: "Brand & Design Assets", desc: "Posters & social kits." }
];

function BuilderPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [paymentMode, setPaymentMode] = useState("monthly"); // monthly | once
  const [showCart, setShowCart] = useState(false);

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [hoveredAddon, setHoveredAddon] = useState(null);

  const getPlanName = () => {
    const plan = WEBSITE_PLANS.find((p) => p.id === selectedPlan);
    return plan ? plan.name : "No Plan Selected";
  };

  const getAddonNames = () => {
    return ADDONS.filter(a => selectedAddons.includes(a.id));
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/20 selection:text-cyan-200 font-sans">

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="ethereal-gradient absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-40">

          {/* Header */}
          <div className="mb-20 text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-7xl font-medium tracking-tighter mb-6"
            >
              Build Your <span className="text-cyan">Digital OS</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 font-light"
            >
              Select your core foundation, choose your systems, and scale your impact.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 sm:gap-24 items-start">

            {/* Builder Column */}
            <div className="lg:col-span-8 space-y-20">

              {/* Step A: Plans */}
              <section>
                <div className="flex items-baseline justify-between mb-8 border-b border-white/10 pb-4">
                  <h2 className="text-2xl font-light">01. Choose a Foundation</h2>
                  <span className="text-sm text-cyan uppercase tracking-widest">Required</span>
                </div>

                <div
                  className="grid gap-6 transform-gpu"
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  {WEBSITE_PLANS.map((plan) => (
                    <motion.div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      onMouseEnter={() => setHoveredPlan(plan.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={{
                        filter: hoveredPlan && hoveredPlan !== plan.id ? "blur(4px)" : "blur(0px)",
                        opacity: hoveredPlan && hoveredPlan !== plan.id ? 0.4 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`cursor-pointer p-8 rounded-sm border transition-all duration-300 ${selectedPlan === plan.id
                        ? "bg-cyan-900/10 border-cyan shadow-[0_0_30px_rgba(0,212,255,0.1)]"
                        : "bg-white/[0.02] border-white/10 hover:border-cyan-400 hover:bg-cyan-900/20 hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                        }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                        <div>
                          <h3 className={`text-2xl font-light ${selectedPlan === plan.id ? "text-cyan" : "text-white"}`}>
                            {plan.name}
                          </h3>
                          {plan.bestFor && <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{plan.bestFor}</p>}
                        </div>
                        {selectedPlan === plan.id && (
                          <span className="flex items-center gap-2 text-cyan text-sm font-medium uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Selected
                          </span>
                        )}
                      </div>

                      <p className="text-white/70 font-light mb-6 text-lg">{plan.description}</p>

                      <div className="bg-black/20 p-4 rounded-sm">
                        <span className="text-xs text-white/30 uppercase tracking-widest block mb-3">Includes</span>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {plan.includes.map((inc, i) => (
                            <li key={i} className="text-sm text-white/60 flex items-center gap-2">
                              <span className="w-1 h-1 bg-white/40 rounded-full" /> {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Step B: Add-ons */}
              <section>
                <div className="flex items-baseline justify-between mb-8 border-b border-white/10 pb-4">
                  <h2 className="text-2xl font-light">02. Add Capabilities</h2>
                  <span className="text-sm text-white/40 uppercase tracking-widest">Optional</span>
                </div>

                <div
                  className="grid sm:grid-cols-2 gap-4 transform-gpu"
                  onMouseLeave={() => setHoveredAddon(null)}
                >
                  {ADDONS.map((addon) => (
                    <motion.div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      onMouseEnter={() => setHoveredAddon(addon.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        filter: hoveredAddon && hoveredAddon !== addon.id ? "blur(4px)" : "blur(0px)",
                        opacity: hoveredAddon && hoveredAddon !== addon.id ? 0.4 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`cursor-pointer p-6 rounded-sm border transition-all duration-300 flex items-center justify-between ${selectedAddons.includes(addon.id)
                        ? "bg-cyan-900/10 border-cyan/50"
                        : "bg-white/[0.02] border-white/10 hover:border-cyan-400 hover:bg-cyan-900/20 hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                        }`}
                    >
                      <div>
                        <h4 className={`text-lg font-light mb-1 ${selectedAddons.includes(addon.id) ? "text-cyan" : "text-white"}`}>
                          {addon.name}
                        </h4>
                        <p className="text-sm text-white/50">{addon.desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${selectedAddons.includes(addon.id) ? "border-cyan bg-cyan text-black" : "border-white/20"
                        }`}>
                        {selectedAddons.includes(addon.id) && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

            </div>

            {/* Cart / Summary Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-white/[0.03] border border-white/10 rounded-sm p-8 backdrop-blur-md">
                <h3 className="text-xl font-light mb-6 flex items-center gap-3">
                  Your Build
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/50">Summary</span>
                </h3>

                {/* Selected Plan */}
                <div className="mb-8 pb-8 border-b border-white/10">
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-2">Foundation</span>
                  {selectedPlan ? (
                    <div className="flex items-center justify-between">
                      <span className="text-cyan font-medium">{getPlanName()}</span>
                      <span className="text-white/60 text-sm">Active</span>
                    </div>
                  ) : (
                    <span className="text-white/20 italic">No foundation selected</span>
                  )}
                </div>

                {/* Selected Addons */}
                <div className="mb-8 pb-8 border-b border-white/10 min-h-[100px]">
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-2">Capabilities</span>
                  {selectedAddons.length > 0 ? (
                    <ul className="space-y-2">
                      {getAddonNames().map((addon) => (
                        <li key={addon.id} className="flex items-center justify-between text-sm text-white/80">
                          <span>{addon.name}</span>
                          <span className="text-cyan text-xs">Added</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-white/20 italic text-sm">No add-ons selected</span>
                  )}
                </div>

                {/* Payment Preference */}
                <div className="mb-8">
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-3">Preference</span>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded">
                    <button
                      onClick={() => setPaymentMode("monthly")}
                      className={`text-xs py-2 rounded transition-colors ${paymentMode === "monthly" ? "bg-cyan text-black font-medium" : "text-white/50 hover:text-white"}`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setPaymentMode("once")}
                      className={`text-xs py-2 rounded transition-colors ${paymentMode === "once" ? "bg-cyan text-black font-medium" : "text-white/50 hover:text-white"}`}
                    >
                      One-time
                    </button>
                  </div>
                  <p className="text-[0.65rem] text-white/30 mt-2 text-center">
                    {paymentMode === "monthly" ? "Includes ongoing optimization & support." : "Project handover after completion."}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    navigate('/request', {
                      state: {
                        selectedPlan,
                        selectedAddons,
                        paymentMode
                      }
                    });
                  }}
                  disabled={!selectedPlan}
                  className={`w-full py-4 text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 ${selectedPlan
                    ? "bg-white text-black hover:bg-cyan hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                    }`}
                >
                  {selectedPlan ? "Complete Request" : "Select a Plan"}
                </button>
                <p className="text-center text-xs text-white/30 mt-4">
                  No payment required today.
                </p>

              </div>

              {/* Help Blurb */}
              <div className="mt-8 p-6 border border-white/5 rounded-sm bg-white/[0.01]">
                <h4 className="text-sm font-medium text-white mb-2">Need help choosing?</h4>
                <p className="text-xs text-white/50 leading-relaxed mb-4">
                  If you’re unsure what to select, book a consultation first. We’ll assess your goals, workflows, and bottlenecks — then recommend the system that will move your business forward fastest
                </p>
                <Link to="/consult" className="text-xs text-cyan hover:text-white transition-colors uppercase tracking-widest border-b border-cyan/30 pb-0.5">
                  Book Consult
                </Link>
              </div>

              {/* Custom Build Blurb */}
              <div className="mt-4 p-6 border border-white/5 rounded-sm bg-white/[0.01]">
                <h4 className="text-sm font-medium text-white mb-2">Need something custom?</h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  Tell us what you’re aiming for — we’ll build it.
                </p>
                <Link to="/consult" className="block mt-4 text-center w-full py-3 border border-white/10 hover:border-cyan/50 hover:text-cyan hover:bg-white/[0.02] text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300">
                  Contact Us
                </Link>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default BuilderPage;
