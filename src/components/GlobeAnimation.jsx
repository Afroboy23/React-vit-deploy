import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Interactive Particle Globe
 * Adapted for Bycreair (Purple/Blue Theme)
 */
export default function GlobeAnimation() {
  const canvasRef = useRef(null);

  // 3D Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // --- GLOBE SETTINGS ---
    // Adjust size to fit nicely in background
    const GLOBE_RADIUS = Math.min(width, height) * 0.55;
    const DOTS_COUNT = 150000; // Sample count for Fibonacci sphere

    // --- STATE ---
    let rotation = { y: 0, x: 0 };
    let targetRotation = { y: 0, x: 0 };
    let points = [];

    // --- MOUSE STATE ---
    let mouse = { x: 0, y: 0, down: false };

    // --- IMAGE LOADER ---
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/1024px-Blue_Marble_2002.png";

    img.onload = () => {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = img.width;
      offCanvas.height = img.height;
      const offCtx = offCanvas.getContext("2d");
      offCtx.drawImage(img, 0, 0);
      const imgData = offCtx.getImageData(0, 0, img.width, img.height).data;
      const tempPoints = [];

      // FIBONACCI SPHERE (Even distribution)
      const phi = Math.PI * (3.0 - Math.sqrt(5.0)); // Golden Angle

      for (let i = 0; i < DOTS_COUNT; i++) {
        const y = 1 - (i / (DOTS_COUNT - 1)) * 2; // y goes from 1 to -1
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;

        // Convert x,y,z back to Lat/Lon for texture lookup
        const lat = Math.asin(y) * (180 / Math.PI);
        const lon = Math.atan2(z, x) * (180 / Math.PI);

        // Map to image UV
        const u = Math.floor(((lon + 180) / 360) * img.width) % img.width;
        const v = Math.floor(((90 - lat) / 180) * img.height) % img.height;

        // Safety clamp
        const safeU = Math.max(0, Math.min(img.width - 1, u));
        const safeV = Math.max(0, Math.min(img.height - 1, v));

        const index = (safeV * img.width + safeU) * 4;
        const r = imgData[index];
        const g = imgData[index + 1];
        const b = imgData[index + 2];
        const brightness = (r + g + b) / 3;

        // Filter Land Mass
        const isBlueDominant = (b > r + 10) && (b > g + 10);
        const isLandPixel = brightness > 15 && !isBlueDominant;

        if (isLandPixel) {
          // Assign Purple/Blue Palette
          // Mix between Purple (#8b5cf6) and Blue (#3b82f6)
          const isPurple = Math.random() > 0.5;
          const baseColor = isPurple ? "#8b5cf6" : "#3b82f6";

          const isPulse = Math.random() > 0.8; // 20% pulsators

          tempPoints.push({
            x, y, z,
            baseColor,
            highlight: false,
            pulseSpeed: isPulse ? 0.02 + Math.random() * 0.04 : 0,
            pulseOffset: Math.random() * Math.PI * 2
          });
        }
      }
      points = tempPoints;
    };


    // --- ANIMATION TRACKING ---
    let frameId;
    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // --- ROTATION PHYSICS ---
      // Auto-spin logic
      targetRotation.y += 0.002;

      // Mouse interaction overrides
      // Smooth interpolation
      rotation.y += (targetRotation.y - rotation.y) * 0.05;
      rotation.x += (targetRotation.x - rotation.x) * 0.05;

      ctx.save();
      // Center the globe
      ctx.translate(width / 2, height / 2);

      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);

      if (points.length > 0) {
        points.forEach((p) => {
          // Rotation math
          let x1 = p.x * cosY - p.z * sinY;
          let z1 = p.x * sinY + p.z * cosY;

          let y1 = p.y * cosX - z1 * sinX;
          let z2 = p.y * sinX + z1 * cosX;

          // Render only front-facing points
          if (z2 < 1.0) {
            const scale = GLOBE_RADIUS / (2 - z2);
            const px = x1 * scale;
            const py = y1 * scale;

            // Transparency based on depth
            const alpha = Math.max(0.1, (z2 + 1) / 1.5); // Softer alpha falloff

            if (p.pulseSpeed > 0) {
              // Pulsing effect
              const pulse = (Math.sin(time * p.pulseSpeed + p.pulseOffset) + 1) / 2;
              ctx.fillStyle = p.baseColor; // Simplified for performance
              ctx.globalAlpha = alpha * (0.5 + pulse * 0.5);
            } else {
              ctx.fillStyle = p.baseColor;
              ctx.globalAlpha = alpha * 0.6; // Base opacity
            }

            const size = scale * 1.5; // Dot size
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      ctx.restore();
      frameId = requestAnimationFrame(render);
    };

    render();

    // Handlers
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      // Simple parallax / rotation influence based on mouse X
      const xNorm = (e.clientX / width) - 0.5;
      const yNorm = (e.clientY / height) - 0.5;

      targetRotation.y += xNorm * 0.02; // Spin faster/slower
      targetRotation.x = yNorm * 0.5; // Slight tilt
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Use a lower z-index and maybe opacity blend */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
}
