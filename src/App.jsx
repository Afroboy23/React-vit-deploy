// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import HomePage from "./pages/HomePage";
import ClientWorkPage from "./pages/ClientWorkPage";
import SystemsPage from "./pages/SystemsPage"; // Can be reused for Services/Packages detail if needed
import ApproachPage from "./pages/ApproachPage"; // Can be reused for Process
import AuditPage from "./pages/AuditPage"; // New page for "System Audit"
import BuilderPage from "./pages/BuilderPage"; // New Service Builder Flow
import ConsultPage from "./pages/ConsultPage"; // New Book a Consult Page
import RequestPage from "./pages/RequestPage"; // New Finalization Page
import IntroOverlay from "./components/IntroOverlay";

function App() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);

  // Scroll to top on route change & ensure scroll is unlocked
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroOverlay key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/client-work" element={<ClientWorkPage />} />
        {/* Services/Platform routes could go here, for now mapping to existing placeholders or Home anchors */}
        <Route path="/systems" element={<SystemsPage />} />
        <Route path="/approach" element={<ApproachPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/consult" element={<ConsultPage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/request" element={<RequestPage />} />
      </Routes>
    </>
  );
}

export default App;
