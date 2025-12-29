// src/components/IntroHoldOverlay.jsx
import React, { useState, useEffect } from "react";

const LATIN_TEXT = "Nihil Sine Labore";
const ENGLISH_TEXT = "Nothing achieved without hard work";

// Approx 3 blinks before typing starts
const START_TYPING_DELAY_MS = 1800;
// Slower, cinematic typing speed
const TYPING_INTERVAL_MS = 130;
// How long to hold the Latin line before changing
const LATIN_HOLD_MS = 2000;
// How long to hold the English line before finishing
const ENGLISH_HOLD_MS = 2000;

function IntroHoldOverlay({ onComplete }) {
  const [typingStarted, setTypingStarted] = useState(false);
  const [latinText, setLatinText] = useState("");
  const [showEnglish, setShowEnglish] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Start typing after a few cursor blinks
  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingStarted(true);
    }, START_TYPING_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Type out "Nihil Sine Labore"
  useEffect(() => {
    if (!typingStarted) return;

    if (latinText.length < LATIN_TEXT.length) {
      const timeout = setTimeout(() => {
        setLatinText(LATIN_TEXT.slice(0, latinText.length + 1));
      }, TYPING_INTERVAL_MS);
      return () => clearTimeout(timeout);
    }

    if (!showEnglish) {
      const holdTimer = setTimeout(() => {
        setShowEnglish(true);
      }, LATIN_HOLD_MS);
      return () => clearTimeout(holdTimer);
    }
  }, [typingStarted, latinText, showEnglish]);

  // After English line shows, wait then complete
  useEffect(() => {
    if (!showEnglish) return;

    const timer = setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, ENGLISH_HOLD_MS);

    return () => clearTimeout(timer);
  }, [showEnglish, onComplete]);

  const overlayClassNames = [
    "intro-hold-overlay",
    isDone ? "intro-hold-overlay--done" : "",
  ]
    .join(" ")
    .trim();

  return (
    <div className={overlayClassNames}>
      <div className="intro-terminal">
        <p className="intro-terminal__line">
          <span className="intro-terminal__text">
            {showEnglish ? ENGLISH_TEXT : latinText}
          </span>
          <span className="intro-terminal__cursor" />
        </p>
      </div>
    </div>
  );
}

export default IntroHoldOverlay;
