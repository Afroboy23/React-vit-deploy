import React, { useState } from "react";
import { motion } from "framer-motion";
import packImg2 from "../assets/images/rbmedals.jpg";
import packImg3 from "../assets/images/rblskd.jpg";
import packImg4 from "../assets/images/rbthree.jpg";

export default function BuddiesPage() {
  const [selectedBuddy, setSelectedBuddy] = useState(null);

  const buddies = [
    {
      id: 1,
      name: "Alex M.",
      pace: "8:30 min/mi",
      distance: "10K - Half Marathon",
      image: packImg2,
      vibe: "Conversational",
    },
    {
      id: 2,
      name: "Sarah T.",
      pace: "7:15 min/mi",
      distance: "5K Speedwork",
      image: packImg3,
      vibe: "Focused",
    },
    {
      id: 3,
      name: "Jordan K.",
      pace: "9:00 min/mi",
      distance: "Long Slow Distance",
      image: packImg4,
      vibe: "Chill & Social",
    }
  ];

  return (
    <div className="pt-32 px-6 pb-24 min-h-[90vh] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl"
      >
        <div className="text-center mb-16 relative">
          {/* Coming Soon Badge over Title */}
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-black tracking-widest uppercase">
            Alpha Concept - Coming Soon
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Buddy</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Our upcoming matchmaking algorithm will pair you with runners in your area based on pace, goals, and vibe. Here's a sneak peek at how you'll find your perfect running partner.
          </p>
        </div>

        {/* Buddies Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {buddies.map((buddy) => (
            <motion.div
              key={buddy.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedBuddy(buddy.id)}
              className={`relative overflow-hidden rounded-3xl border transition-all cursor-pointer ${selectedBuddy === buddy.id
                  ? "border-orange-500 shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]"
                  : "border-white/10 bg-zinc-900/40 hover:border-white/20"
                }`}
            >
              {/* Image Header */}
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={buddy.image}
                  alt={buddy.name}
                  className="w-full h-full object-cover grayscale opacity-70 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>

              {/* Details Content */}
              <div className="p-6 relative z-10 -mt-8">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-2xl font-black">{buddy.name}</h3>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" title="Online Right Now"></div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-zinc-500 text-sm">Target Pace</span>
                    <span className="font-medium text-orange-400">{buddy.pace}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-zinc-500 text-sm">Preferred Dist.</span>
                    <span className="font-medium">{buddy.distance}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-zinc-500 text-sm">Training Vibe</span>
                    <span className="font-medium">{buddy.vibe}</span>
                  </div>
                </div>

                <button
                  className={`w-full py-3 rounded-xl font-bold transition-colors ${selectedBuddy === buddy.id
                      ? "bg-orange-500 text-white"
                      : "bg-white/5 text-zinc-300 hover:bg-white/10"
                    }`}
                >
                  {selectedBuddy === buddy.id ? "Request Run" : "Select Profile"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Lock Message */}
        <div className="mt-16 p-8 border border-orange-500/20 bg-orange-500/5 rounded-2xl flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <svg className="w-8 h-8 text-orange-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h4 className="text-lg font-bold text-white mb-2">Feature Locked in Demo</h4>
          <p className="text-sm text-zinc-400">
            This "Choose Buddy" interface is a conceptual preview. In the final application, these profiles will be dynamically generated based on the user's location and active matching preferences.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
