// src/App.jsx
import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import IntroOverlay from "./components/IntroOverlay";
import Footer from "./components/Footer";

// Lazy Loaded Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ClientWorkPage = lazy(() => import("./pages/ClientWorkPage"));
const SystemsPage = lazy(() => import("./pages/SystemsPage"));
const ApproachPage = lazy(() => import("./pages/ApproachPage"));
const AuditPage = lazy(() => import("./pages/AuditPage"));
const BuilderPage = lazy(() => import("./pages/BuilderPage"));
const ConsultPage = lazy(() => import("./pages/ConsultPage"));
const RequestPage = lazy(() => import("./pages/RequestPage"));
const RunBuddyPage = lazy(() => import("./pages/RunBuddyPage"));

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

      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/client-work" element={<ClientWorkPage />} />
          <Route path="/systems" element={<SystemsPage />} />
          <Route path="/approach" element={<ApproachPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/consult" element={<ConsultPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/run-buddy" element={<RunBuddyPage />} />
        </Routes>
      </Suspense>

      {/* FOOTER: Render on all pages EXCEPT Home ("/") */}
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default App;
