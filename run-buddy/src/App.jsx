import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import BuddiesPage from "./pages/BuddiesPage";
import CoachingPage from "./pages/CoachingPage";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-orange-500/30">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/buddies" element={<BuddiesPage />} />
        <Route path="/coaching" element={<CoachingPage />} />
      </Routes>
    </div>
  );
}
