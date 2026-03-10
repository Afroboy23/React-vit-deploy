import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "../../components/Navbar";
import runBuddyLogo from "../../assets/images/rb.jpg";
import runBuddyVideo from "../../assets/rb.opening.mp4";
import packImg1 from "../../assets/images/rbsnow.jpg";
import packImg2 from "../../assets/images/rbmedals.jpg";
import packImg3 from "../../assets/images/rblskd.jpg";
import packImg4 from "../../assets/images/rbthree.jpg";
import packImg5 from "../../assets/images/rbjay.jpg";
import packImg6 from "../../assets/images/packImg6.jpg";
import packImg7 from "../../assets/images/packImgNew.jpg";
import packImg8 from "../../assets/images/packImg8.jpg";

export default function RunBuddyDemo() {
  const [accessRequested, setAccessRequested] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Connect to the page's scroll position
  const { scrollYProgress } = useScroll();

  // Transform scroll position into CSS values for the hero container
  // Start tight at top of page, expand out to full bleed as you scroll down
  const containerPadding = useTransform(scrollYProgress, [0, 0.15], ["2px", "0px"]);
  const containerRadius = useTransform(scrollYProgress, [0, 0.15], ["24px", "0px"]);
  const innerRadius = useTransform(scrollYProgress, [0, 0.15], ["22px", "0px"]);
  const marginX = useTransform(scrollYProgress, [0, 0.15], ["24px", "0px"]);
  const marginTop = useTransform(scrollYProgress, [0, 0.15], ["32px", "0px"]);

  // Handle the fake loading state
  useEffect(() => {
    if (accessRequested) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 2500); // 2.5 seconds loading simulation
      return () => clearTimeout(timer);
    }
  }, [accessRequested]);

  // If the demo is fully loaded, render the actual Run Buddy App
  if (isLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-orange-500/30"
      >
        {/* Navigation */}
        <nav className="fixed w-full z-50 top-0 px-6 py-4 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded overflow-hidden flex items-center justify-center bg-white shadow-sm">
              <img src={runBuddyLogo} alt="Run Buddy Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block text-white">RunBuddy.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-400">
            <a href="#" className="hover:text-white transition-colors text-white">Home</a>
            <a href="#" className="hover:text-white transition-colors">Group Runs</a>
            <a href="#" className="hover:text-white transition-colors">Coaching</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <div className="flex items-center gap-2 cursor-not-allowed opacity-70">
              <span>Choose Buddy</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 uppercase tracking-wider font-black">Coming Soon</span>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-orange-500 text-white font-semibold text-sm rounded-full hover:bg-orange-600 transition-colors">
            Get a Buddy
          </button>
        </nav>

        {/* Hero Section */}
        <motion.section
          style={{
            padding: containerPadding,
            borderRadius: containerRadius,
            marginLeft: marginX,
            marginRight: marginX,
            marginTop: marginTop
          }}
          className="relative pt-40 pb-32 px-6 min-h-[90vh] flex flex-col items-center justify-center text-center bg-gradient-to-br from-white via-white/5 to-white shadow-2xl"
        >
          <motion.div
            style={{
              borderRadius: innerRadius,
              top: containerPadding,
              right: containerPadding,
              bottom: containerPadding,
              left: containerPadding
            }}
            className="absolute overflow-hidden z-0"
          >
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
              <video
                src={runBuddyVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-zinc-950/70" />
            </div>

            {/* Dynamically Moving Glow behind hero */}
            <motion.div
              initial={{ x: "-50%", y: "-50%", scale: 1, opacity: 0.3 }}
              animate={{
                x: ["-50%", "-10%", "-90%", "-50%"],
                y: ["-50%", "-80%", "-10%", "-50%"],
                scale: [1, 1.6, 0.6, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 w-[600px] h-[400px] md:w-[800px] md:h-[600px] bg-orange-600/70 blur-[130px] rounded-full pointer-events-none mix-blend-screen z-0"
            />
          </motion.div>

          {/* Transparent Container without Border Effect */}
          <div className="relative z-10 w-full max-w-4xl mx-auto mt-8">
            {/* The Actual Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-orange-400 mb-8 tracking-wide">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                NEW LOCAL ROUTES ADDED
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-8">
                Moving forward <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
                  together.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl mb-12 leading-relaxed">
                All you need is a little accountability and a buddy
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)]">
                  Find a Group Run
                </button>
                <button className="px-8 py-4 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-white font-bold rounded-full transition-all hover:bg-zinc-800">
                  View Coaching Plans
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Community Runs",
                desc: "Social butterfly? Nervous running solo? Join one of Run buddy's morning runs before you start your day.",
                icon: "🏃‍♂️"
              },
              {
                title: "Online Coaching",
                desc: "Get a free personalised programme catered to you and your schedule when you join Run Buddy",
                icon: "📊"
              },
              {
                title: "Goal Tracking",
                desc: "Sync your watch and track your exact progress towards race day.",
                icon: "🏅"
              }
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-zinc-900 border border-white/5 p-8 rounded-2xl hover:bg-zinc-800/80 transition-colors"
              >
                <div className="text-4xl mb-4">{feat.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-6 w-full bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">Your Path to <span className="text-orange-500">Progress</span></h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">You are what you can sustain</p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Create Profile", desc: "Share your current pace, experience, and weekly availability." },
                { step: "02", title: "Set Goal", desc: "Define the exact distance and target time you're aiming for." },
                { step: "03", title: "Choose Mood", desc: "Pick your vibe: from relaxed conversational runs to all-out speed sessions." },
                { step: "04", title: "Train Together", desc: "Our algorithm finds your local pod and matches you up to put in the work." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative p-6 rounded-2xl border border-white/5 bg-zinc-900/50 hover:border-orange-500/50 transition-colors group"
                >
                  <div className="text-5xl font-black text-white/5 group-hover:text-orange-500/20 transition-colors absolute top-4 right-4">{item.step}</div>
                  <h3 className="text-xl font-bold mt-12 mb-3 relative z-10">{item.title}</h3>
                  <p className="text-zinc-500 font-medium relative z-10">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Jothem <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Manjanja</span></h2>
            <p className="text-xl md:text-2xl font-bold max-w-2xl mx-auto text-zinc-300">Run Buddy</p>
          </motion.div>

          {/* Masonry CSS Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 translate-x-[130px]">
            {[
              { id: 1, height: "h-64", src: packImg8 },
              { id: 2, height: "h-96", src: packImg2 },
              { id: 3, height: "h-48", src: packImg3 },
              { id: 4, height: "h-72", src: packImg4 },
              { id: 5, height: "h-80", src: packImg5 },
              { id: 6, height: "h-56", src: packImg6 },
              { id: 7, height: "h-96", src: packImg7 },
              { id: 8, height: "h-64", empty: true },
              { id: 9, height: "h-80", empty: true },
              { id: 10, height: "h-48", empty: true }
            ].map((img) => (
              img.empty ? (
                <div key={img.id} className={`w-full ${img.height} break-inside-avoid`} />
              ) : (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className={`break-inside-avoid bg-zinc-900 border border-white/5 rounded-2xl w-full ${img.height} flex items-center justify-center group overflow-hidden relative cursor-pointer hover:border-orange-500/50 transition-colors p-0`}
                >
                  {/* Image or Placeholder Number rendering */}
                  {img.src ? (
                    <img src={img.src} alt="Run Buddy Member" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span className="text-7xl font-black text-white/5 group-hover:text-orange-500/20 transition-colors z-0 relative">{img.num}</span>
                  )}

                  {/* Dark Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 z-10">
                    <span className="text-white font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all shadow-black drop-shadow-lg">
                      {img.src ? "View full photo" : "Placeholder"}
                    </span>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 px-6 w-full bg-gradient-to-b from-zinc-950 to-orange-950/20 text-center border-t border-orange-500/10 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">Ready to hit the pavement?</h2>
            <p className="text-xl text-zinc-400 mb-10">Join thousands of runners in your city today.</p>
            <button className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] text-lg">
              Claim Free Run
            </button>
          </motion.div>
        </section>

        {/* Demo Footer */}
        <footer className="border-t border-white/10 py-12 px-6 text-center">
          <p className="text-zinc-500 font-medium text-sm">
            A bespoke digital experience engineered by <span className="text-white">ByCreair</span>.
          </p>
        </footer>
      </motion.div >
    );
  }

  // Otherwise, render the ByCreair Initializer Portal
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/20 selection:text-cyan-200 overflow-hidden">
      {/* Background: Ethereal Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="ethereal-gradient absolute inset-0 opacity-30" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-12 pt-32 pb-32 flex flex-col items-center justify-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full relative group"
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-50 group-hover:opacity-100" />

            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-16 overflow-hidden shadow-2xl">

              {/* Internal decorative elements */}
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>

              <div className="flex flex-col items-center text-center max-w-2xl mx-auto relative z-10">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-8 p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block"
                >
                  <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl sm:text-6xl font-medium tracking-tighter text-white mb-6"
                >
                  Run Buddy Demo
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg sm:text-xl font-light text-white/60 leading-relaxed mb-12"
                >
                  Welcome to your exclusive demo environment. This portal provides direct access to your custom digital solution engineered by ByCreair.
                </motion.p>

                <AnimatePresence mode="wait">
                  {!accessRequested ? (
                    <motion.button
                      key="request-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => setAccessRequested(true)}
                      className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium tracking-widest uppercase text-sm rounded-full overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Initialize Demo
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-cyan-100 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </motion.button>
                  ) : (
                    <motion.div
                      key="loading-state"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
                      <p className="text-cyan-400 text-sm tracking-widest uppercase font-medium">Connecting to Environment...</p>
                      <p className="text-white/40 text-xs mt-2">The live demo integration is currently being provisioned.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </motion.div>

        </main>
      </div>
    </div>
  );
}
