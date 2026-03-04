import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture, Stars } from '@react-three/drei';

// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
  bgImageOpacity: 0.2,      // Opacity of the dark overlay on the background image
};

// ==========================================
// COMPONENT: StarPoints
// ==========================================
function StarPoints() {
  return (
    <group>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      {/* Add a few larger "hero" stars manually for the premium feel */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={new Float32Array(150).map(() => (Math.random() - 0.5) * 100)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={2.0}
          color="#8855FF"
          transparent
          opacity={1.0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ==========================================
// COMPONENT: Main Background
// ==========================================
export default function StarfieldBackground({
  className = "",
  backgroundImage = "/assets/starfield-bg.jpg" // Default path, change as needed
}) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>

      {/* 1. LAYER: Static Background Image (Base Texture) */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Starfield Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for readability */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: CONFIG.bgImageOpacity }}
        />
      </div>

      {/* 2. LAYER: Three.js Star Particles (The "Rolls Royce" Effect) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <StarPoints />
        </Canvas>
      </div>

    </div>
  );
}
