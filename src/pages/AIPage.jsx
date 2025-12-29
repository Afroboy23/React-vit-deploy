import React from "react";
import Navbar from "../components/Navbar";
import AlienTerrainScene from "../components/AlienTerrainScene"; // Assuming this exists from file list

function AIPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">

      {/* 3D Background if possible, or just layout */}
      <div className="absolute inset-0 z-0 opacity-40">
        {/* We can try to use the AlienTerrainScene here for visual flair if it works without props */}
        <AlienTerrainScene />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar />
        </div>

        <main className="flex-1 px-6 pb-12 pt-10 sm:px-10 pointer-events-auto">
          <div className="mx-auto max-w-5xl">
            <h1 className="mb-6 text-[2rem] leading-tight sm:text-[2.5rem]">
              Artificial <span className="text-fuchsia-400">Intelligence</span>
            </h1>

            <p className="max-w-xl text-[1.1rem] text-slate-300 backdrop-blur-md bg-black/30 p-4 rounded-lg border border-white/5">
              Leveraging the power of LLMs and generative models to create adaptive, intelligent interfaces.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AIPage;
