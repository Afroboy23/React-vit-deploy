import React from "react";
import { motion } from "framer-motion";

export default function DemoRestaurant() {
  return (
    <div className="w-full h-full bg-zinc-100 flex items-center justify-center p-8 overflow-y-auto">
      {/* Mobile App Container */}
      <div className="w-full max-w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl relative overflow-hidden border-[8px] border-zinc-900 shrink-0">

        {/* Dynamic Island (Fake) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-900 rounded-b-3xl z-50"></div>

        {/* App Content */}
        <div className="w-full h-full flex flex-col pt-12 pb-6 bg-zinc-50 relative hide-scrollbar overflow-y-auto pb-24">

          {/* Header */}
          <header className="px-6 pt-4 pb-6 flex justify-between items-center">
            <div>
              <p className="text-zinc-500 text-sm font-medium">Delivering to</p>
              <h2 className="text-zinc-900 font-bold text-lg flex items-center gap-1">
                Home
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </h2>
            </div>
            <div className="w-10 h-10 bg-zinc-200 rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
              <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
          </header>

          {/* Search */}
          <div className="px-6 mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search food, restaurants..."
                className="w-full bg-white border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
              />
              <svg className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          {/* Categories */}
          <div className="px-6 mb-8">
            <h3 className="font-bold text-zinc-900 text-lg mb-4">Categories</h3>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {[
                { name: 'Burger', emoji: '🍔', active: true },
                { name: 'Pizza', emoji: '🍕', active: false },
                { name: 'Sushi', emoji: '🍣', active: false },
                { name: 'Healthy', emoji: '🥗', active: false },
              ].map((cat, i) => (
                <div key={i} className={`flex flex-col items-center justify-center h-24 w-[72px] shrink-0 rounded-full cursor-pointer transition-colors ${cat.active ? 'bg-orange-500 shadow-lg shadow-orange-500/30' : 'bg-white border border-zinc-100'}`}>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl bg-white mb-1 shadow-sm`}>{cat.emoji}</div>
                  <span className={`text-[11px] font-bold ${cat.active ? 'text-white' : 'text-zinc-500'}`}>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Items */}
          <div className="px-6">
            <div className="flex justify-between items-end mb-4">
              <h3 className="font-bold text-zinc-900 text-lg">Popular Now</h3>
              <a href="#" className="text-orange-500 text-sm font-semibold hover:underline">See All</a>
            </div>

            <div className="space-y-4">
              {[
                { name: "Double Cheeseburger", type: "Fast Food", rating: "4.8", price: "$12.99", time: "15-20 min", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2699&auto=format&fit=crop" },
                { name: "Classic Pepperoni", type: "Italian", rating: "4.9", price: "$16.50", time: "25-30 min", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=2000&auto=format&fit=crop" },
              ].map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="bg-white p-3 rounded-3xl border border-zinc-100 flex gap-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-zinc-900 line-clamp-1">{item.name}</h4>
                      <p className="text-zinc-500 text-xs font-medium mt-1">{item.type} • ⭐ {item.rating}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-lg text-zinc-900">{item.price}</span>
                      <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-zinc-800 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Tab Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-zinc-100 px-6 pt-4 pb-8 flex justify-between items-center rounded-b-3xl z-40">
          <div className="text-orange-500 flex flex-col items-center gap-1 cursor-pointer">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
            <span className="text-[10px] font-bold">Home</span>
          </div>
          <div className="text-zinc-400 hover:text-orange-500 transition-colors flex flex-col items-center gap-1 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            <span className="text-[10px] font-bold">Favorites</span>
          </div>
          <div className="text-zinc-400 hover:text-orange-500 transition-colors flex flex-col items-center gap-1 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span className="text-[10px] font-bold">Orders</span>
          </div>
          <div className="text-zinc-400 hover:text-orange-500 transition-colors flex flex-col items-center gap-1 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            <span className="text-[10px] font-bold">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
