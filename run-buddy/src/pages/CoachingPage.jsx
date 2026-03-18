import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import packImg2 from "../assets/images/rbmedals.jpg";
import packImg4 from "../assets/images/rbthree.jpg";
import packImg6 from "../assets/images/packImg6.jpg";
import packImg7 from "../assets/images/packImgNew.jpg";

export default function CoachingPage() {
  const [coachingType, setCoachingType] = useState(null);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const philosophyItems = [
    {
      title: "Data-Driven Training",
      desc: "Stop guessing. We analyze your metrics, load, and heart rate data to ensure you're adapting, not just surviving.",
      icon: (
        <svg className="w-8 h-8 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Personalized Programming",
      desc: "Your life is unpredictable. Your training plan shouldn't be rigid. We adapt your mileage around your actual schedule.",
      icon: (
        <svg className="w-8 h-8 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "Form & Biomechanics",
      desc: "Run faster by running better. We focus on cadence, ground contact time, and efficiency to keep you injury-free.",
      icon: (
        <svg className="w-8 h-8 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  const tiers = [
    {
      name: "Kickstart",
      price: "$0",
      period: "/ month",
      desc: "Perfect for beginners tackling their first 5K or 10K.",
      features: [
        "Custom monthly training plan",
        "Pace & heart-rate guidance",
        "Email support (48hr response)",
        "Pre-race strategy guide"
      ],
      highlight: false
    },
    {
      name: "The Regular",
      price: "$0",
      period: "/ month",
      desc: "For intermediate runners targeting a Half or Full Marathon.",
      features: [
        "Weekly tailored schedule adjustments",
        "Direct coach messaging (24hr response)",
        "Strength & mobility protocols",
        "Race-day fueling strategy"
      ],
      highlight: true
    },
    {
      name: "Pro Elite",
      price: "$0",
      period: "/ month",
      desc: "1-on-1 bespoke coaching for serious PR chasers.",
      features: [
        "Daily feedback & dynamic adjustments",
        "Video gait & form analysis",
        "Priority 1-on-1 calls (Bi-weekly)",
        "Advanced pacing & lactate threshold work"
      ],
      highlight: false
    }
  ];

  const coaches = [
    { name: "Coach Jothem Manjanja", specialty: "Premium Performance Systems", img: packImg7 },
  ];

  if (!coachingType) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-black text-white mb-16 tracking-tight"
        >
          How will you <span className="text-orange-500">train?</span>
        </motion.h1>
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            onClick={() => setCoachingType("online")}
            className="flex-1 p-12 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-orange-500 hover:bg-zinc-900/80 hover:shadow-[0_0_40px_rgba(249,115,22,0.1)] cursor-pointer group transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:bg-orange-500/20 transition-all">
              <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">Online Coaching</h2>
            <p className="text-zinc-400 font-light leading-relaxed">Bespoke training plans and weekly check-ins, delivered directly to your device anywhere in the world.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            onClick={() => setCoachingType("in-person")}
            className="flex-1 p-12 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-orange-500 hover:bg-zinc-900/80 hover:shadow-[0_0_40px_rgba(249,115,22,0.1)] cursor-pointer group transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:bg-orange-500/20 transition-all">
              <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">In-Person Coaching</h2>
            <p className="text-zinc-400 font-light leading-relaxed">Face-to-face biomechanics, pacing strategies, and track sessions tailored to perfect your form on the ground.</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key="coaching-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-orange-500/30 w-full overflow-x-hidden pt-20"
    >

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-zinc-800/40 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Run Buddy Coaching
          </motion.div>
          <motion.div variants={fadeUp} className="overflow-hidden">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.05] text-white">
              Unlock Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                True Potential.
              </span>
            </h1>
          </motion.div>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-zinc-400 font-light max-w-2xl mb-12 leading-relaxed">
            Your running journey, tailored to your pace, your lifestyle, and the goals that matter most to you.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold tracking-wide transition-all shadow-[0_0_40px_rgba(249,115,22,0.3)]">
              View Training Plans
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-full font-bold tracking-wide transition-all">
              Meet The Coaches
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. PHILOSOPHY SECTION */}
      <section className="w-full py-32 bg-zinc-950 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20 md:w-2/3"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Built by runners,<br /> <span className="text-zinc-500">for humans.</span></h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              We don't believe in copy-paste PDF plans. We believe in dynamic, data-backed coaching that adapts to your life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {philosophyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/80 transition-colors"
              >
                {item.icon}
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES & PRICING TIERS */}
      <section className="w-full py-32 bg-zinc-900/20 relative z-10">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Choose Your Plan.</h2>
            <p className="text-xl text-zinc-400 font-light max-w-2xl">Whether you're lacing up for your first 5K or hunting a Boston Qualifier, we have a tier for you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl [perspective:1000px]">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, rotateY: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`flex flex-col p-10 rounded-[2.5rem] relative overflow-hidden ${tier.highlight
                  ? "bg-zinc-900 border-2 border-orange-500/50 shadow-[0_20px_80px_rgba(249,115,22,0.15)] transform lg:-translate-y-4"
                  : "bg-zinc-900/40 border border-white/10"
                  }`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-black tracking-widest uppercase px-6 py-2 rounded-bl-2xl">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-black tracking-tighter">{tier.price}</span>
                  <span className="text-zinc-500 font-medium ml-2">{tier.period}</span>
                </div>
                <p className="text-zinc-400 font-light mb-10 h-10">{tier.desc}</p>

                <ul className="flex flex-col gap-4 mb-12 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-zinc-300 font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-full font-bold tracking-wide transition-all ${tier.highlight
                  ? "bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  : "bg-white/10 hover:bg-white/20 text-white"
                  }`}>
                  Select {tier.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEET THE COACHES */}
      <section className="w-full py-32 bg-zinc-950 border-t border-white/5 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">The Experts.</h2>
              <p className="text-xl text-zinc-400 font-light">Train with athletes who have actually walked the walk.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coaches.map((coach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateZ: index % 2 === 0 ? 5 : -5, scale: 0.8 }}
                whileInView={{ opacity: 1, rotateZ: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer"
              >
                <img src={coach.img} alt={coach.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-bold text-white mb-1">{coach.name}</h3>
                  <p className="text-orange-500 font-medium text-sm tracking-wide uppercase">{coach.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA FOOTer */}
      <section className="w-full py-40 bg-orange-600 relative z-10 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8">
          Ready to run faster?
        </h2>
        <p className="text-xl text-white/80 font-medium mb-12 max-w-xl">
          Join the Run Buddy coaching roster today and start chasing your next PR with a proven system.
        </p>
        <button className="px-10 py-5 bg-white text-orange-600 hover:bg-zinc-100 rounded-full font-black text-lg tracking-wide transition-all shadow-2xl hover:scale-105 active:scale-95">
          Apply For Coaching
        </button>
      </section>

    </motion.div>
  );
}
