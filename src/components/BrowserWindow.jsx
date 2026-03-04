import React from "react";

export default function BrowserWindow({ children, url = "nocturne.studio" }) {
  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-2xl flex flex-col border border-white/10">

      {/* Browser Chrome (Header) */}
      <div className="bg-zinc-900 border-b border-white/5 h-10 flex items-center px-4 space-x-4 shrink-0">

        {/* Traffic Lights */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 bg-black/40 rounded-md h-6 flex items-center justify-center px-4">
          <div className="flex items-center space-x-2 opacity-50">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[10px] text-white font-mono tracking-wide">{url}</span>
          </div>
        </div>

        {/* Spacer to balance traffic lights */}
        <div className="w-12" />
      </div>

      {/* Viewport Content */}
      <div className="flex-1 overflow-hidden relative bg-[#0a0a0a] text-white">
        {children}
      </div>

    </div>
  );
}
