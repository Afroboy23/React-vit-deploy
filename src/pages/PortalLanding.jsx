// src/pages/PortalLanding.jsx
import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import portalLoopVideo from "../assets/bycreair-portal.MOV";
import Navbar from "../components/Navbar";

function PortalLanding() {
  const [stage, setStage] = useState("fakeSite"); // "fakeSite" | "realSite"

  const handlePortalComplete = () => {
    // When the full video finishes, jump straight to the real site.
    setStage("realSite");
  };

  return (
    <>
      {stage === "fakeSite" && (
        <FakeClientWebsite onPortalComplete={handlePortalComplete} />
      )}

      {stage === "realSite" && <RealByCreairSite />}
    </>
  );
}

/* ================================
   1) Fake “before” ByCreair website
   ================================ */

function FakeClientWebsite({ onPortalComplete }) {
  return (
    <div className="fake-site fake-site-ugly">
      <header className="fake-header fake-header-ugly">
        <div className="fake-header-inner">
          <div className="fake-logo fake-ugly-heading">
            ByCreair Studio Website
          </div>
          <nav className="fake-nav fake-ugly-nav">
            <button>Home</button>
            <button>About</button>
            <button>Services</button>
            <button>Contact</button>
          </nav>
        </div>
      </header>

      <main className="fake-main">
        <section className="fake-hero">
          <div className="fake-hero-text fake-ugly-text">
            <h1 className="fake-ugly-heading">
              ByCreair – Creative Digital Studio
            </h1>

            <p className="fake-ugly-paragraph">
              Welcome to the official ByCreair website. We do websites,
              branding, design, content, marketing, campaigns and more digital
              services for clients across multiple industries.
            </p>

            <p className="fake-ugly-paragraph">
              Our team is passionate about helping brands grow online with
              professional solutions that are modern, engaging and effective for
              your business goals and objectives.
            </p>

            <div className="fake-note fake-note-ugly">
              <p className="fake-note-title">
                This is the &quot;before&quot; version.
              </p>
              <p>
                Somewhere inside this layout is a doorway to a different way of
                introducing ByCreair. The current page is functional, but it
                doesn&apos;t feel like a world yet.
              </p>
            </div>
          </div>

          <div className="fake-hero-portal">
            <PortalPreview onPortalComplete={onPortalComplete} />
          </div>
        </section>

        <section className="fake-grid">
          <div className="fake-card fake-ugly-block">
            <h2>Our Services</h2>
            <p>
              We provide a wide range of digital solutions including design,
              strategy, consulting and more to support your business needs.
            </p>
          </div>
          <div className="fake-card fake-ugly-block">
            <h2>Why Choose Us</h2>
            <p>
              We are dedicated, committed and focused on delivering projects on
              time with quality work and attention to detail.
            </p>
          </div>
          <div className="fake-card fake-ugly-block">
            <h2>Get In Touch</h2>
            <p>
              Contact ByCreair today to discuss your next project and learn how
              we can help you achieve better results online.
            </p>
          </div>
        </section>
      </main>

      <footer className="fake-footer fake-footer-ugly">
        <div className="fake-footer-inner fake-ugly-paragraph">
          <span>© 2025 ByCreair Studio</span>
          <span>Initial placeholder website layout</span>
        </div>
      </footer>
    </div>
  );
}

/* ================================
   2) Portal preview circle
   ================================ */

function PortalPreview({ onPortalComplete }) {
  const [isExpanding, setIsExpanding] = useState(false);
  const [pingPongActive, setPingPongActive] = useState(true);
  const [hasTriggered, setHasTriggered] = useState(false);

  const holdTimeoutRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  const directionRef = useRef(1); // 1 = forward, -1 = backward
  const lastTimestampRef = useRef(null);

  const beginExpansion = () => {
    if (hasTriggered) return;
    setHasTriggered(true);
    setPingPongActive(false); // stop ping-pong loop

    const wrapper = wrapperRef.current;
    const v = videoRef.current;

    if (wrapper) {
      // Measure current position & size in the viewport
      const rect = wrapper.getBoundingClientRect();

      // Turn it into a fixed element at that exact spot
      wrapper.style.position = "fixed";
      wrapper.style.top = `${rect.top}px`;
      wrapper.style.left = `${rect.left}px`;
      wrapper.style.width = `${rect.width}px`;
      wrapper.style.height = `${rect.height}px`;
      wrapper.style.borderRadius = "999px";

      // Force layout so these are the starting values
      // eslint-disable-next-line no-unused-expressions
      wrapper.offsetWidth;

      setIsExpanding(true);

      // Animate to full viewport
      requestAnimationFrame(() => {
        wrapper.style.top = "0px";
        wrapper.style.left = "0px";
        wrapper.style.width = "100vw";
        wrapper.style.height = "100vh";
        wrapper.style.borderRadius = "0px";
      });
    }

    if (v) {
      try {
        // Do NOT reset currentTime; keep going from current frame
        v.muted = true;
        v.play();
      } catch (_) {
        // ignore autoplay issues
      }
    }
  };

  // Long press only (3s)
  const handlePressStart = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
    }

    holdTimeoutRef.current = setTimeout(() => {
      beginExpansion();
    }, 3000); // 3 seconds hold
  };

  const handlePressEnd = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  // 🔁 Ping-pong loop 0–2s while idle
  useEffect(() => {
    if (!pingPongActive) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    const v = videoRef.current;
    if (!v) return;

    const MAX_TIME = 2; // seconds of clip for breathing loop
    const SPEED = 1;

    const step = (timestamp) => {
      const video = videoRef.current;
      if (!video) return;

      if (lastTimestampRef.current == null) {
        lastTimestampRef.current = timestamp;
      }

      const dt = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      let newTime = video.currentTime + directionRef.current * dt * SPEED;

      if (newTime > MAX_TIME) {
        const overflow = newTime - MAX_TIME;
        newTime = MAX_TIME - overflow;
        directionRef.current = -1;
      } else if (newTime < 0) {
        const under = -newTime;
        newTime = under;
        directionRef.current = 1;
      }

      video.currentTime = newTime;
      frameRef.current = requestAnimationFrame(step);
    };

    const startLoop = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = true;
      video.pause(); // we control currentTime manually
      video.currentTime = 0;
      lastTimestampRef.current = null;
      directionRef.current = 1;
      frameRef.current = requestAnimationFrame(step);
    };

    if (v.readyState >= 1) {
      startLoop();
    } else {
      v.addEventListener("loadedmetadata", startLoop);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      if (v) {
        v.removeEventListener("loadedmetadata", startLoop);
      }
      lastTimestampRef.current = null;
    };
  }, [pingPongActive]);

  // When full video finishes, trigger real site (no extra whiteout effect)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleEnded = () => {
      onPortalComplete();
    };

    v.addEventListener("ended", handleEnded);
    return () => {
      v.removeEventListener("ended", handleEnded);
    };
  }, [onPortalComplete]);

  return (
    <>
      {isExpanding && <div className="portal-expansion-backdrop" />}

      <div
        ref={wrapperRef}
        className={
          "portal-wrapper" + (isExpanding ? " portal-wrapper--expanding" : "")
        }
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        <video
          ref={videoRef}
          src={portalLoopVideo}
          muted
          playsInline
          preload="auto"
          className="portal-video"
        />

        <div className="portal-overlay" />

        {/* Only show "Be HOLD" before expansion */}
        {!isExpanding && (
          <div className="portal-text">
            <div className="portal-title">
              <span className="portal-title-be">Be</span>
              <span className="portal-title-hold">HOLD</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ================================
   3) Real ByCreair site
   ================================ */

function RealByCreairSite() {
  return (
    <div className="app">
      {/* Real ByCreair navigation (only shows AFTER portal) */}
      <Navbar />

      {/* Cosmic background layers */}
      <div className="cosmos">
        <div className="cosmos-layer cosmos-nebula" aria-hidden="true" />
        <div className="cosmos-layer cosmos-dust" aria-hidden="true" />
        <div className="cosmos-layer cosmos-stars" aria-hidden="true" />
      </div>

      <header className="hero">
        <div className="hero-inner">
          {/* Logo image removed */}
          <h1 className="hero-title">BYCREAIR</h1>

          <p className="hero-tagline">
            We build cinematic, AI-powered worlds for brands. From websites and
            campaigns to CRM, SEO and automation – nothing legendary is made
            without real work.
          </p>

          {/* FlutterTop Studio animated pill */}
          <div className="ft-pill-wrapper">
            <div className="ft-pill">
              <span className="ft-pill-light ft-pill-light-a" />
              <span className="ft-pill-light ft-pill-light-b" />
              <span className="ft-pill-label">FlutterTop Studio</span>
            </div>
          </div>

          <div className="hero-actions">
            {/* Only one CTA now */}
            <button className="btn btn-ghost">Explore Our Worlds</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default PortalLanding;
