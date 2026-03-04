import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
  starCount: 3000,          // High density for luxury feel
  color: '#5b8bf7',         // Subtle Electric Blue - Premium, not neon
  size: 30.0,               // Base size multiplier for shader
  depth: 80,                // Z-depth spread
  bgImageOpacity: 0.3,      // Darken background image to make stars pop
};

// ==========================================
// SHADER: Soft Circular Glow + Twinkle
// ==========================================
const starVertexShader = `
  attribute float size;
  attribute float phase;
  attribute float speed;
  
  varying float vOpacity;
  varying float vPhase;
  varying float vSpeed;

  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation based on depth
    gl_PointSize = size * uPixelRatio * (20.0 / -mvPosition.z);

    vPhase = phase;
    vSpeed = speed;
  }
`;

const starFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;

  varying float vPhase;
  varying float vSpeed;

  void main() {
    // 1. MAKE IT DIAMOND (Refined Flare)
    // Center the coordinate system (-0.5 to 0.5)
    vec2 center = gl_PointCoord - vec2(0.5);
    
    // Manhattan Distance: |x| + |y| creates a diamond shape
    float dist = abs(center.x) + abs(center.y);
    
    // Discard pixels outside the diamond (radius 0.5)
    if (dist > 0.5) discard;

    // 2. SHARP GLOW (Linear Gradient for Flares)
    // 1.0 at center -> 0.0 at edge
    float glow = 1.0 - (dist * 2.0);
    glow = pow(glow, 2.2); // Sharpen the core for that "gemstone" glint

    // 3. TWINKLE ANIMATION
    // Sine wave modulated by random phase and speed
    // Result range: 0.1 (very dim) -> 1.0 (bright flare)
    float twinkle = 0.1 + 0.9 * (sin(uTime * vSpeed + vPhase) * 0.5 + 0.5);

    // 4. COLOR TINT
    // Mix white core with electric blue edge for premium look
    vec3 finalColor = mix(uColor, vec3(1.0), glow * 0.6);

    gl_FragColor = vec4(finalColor, glow * twinkle);
  }
`;

// ==========================================
// COMPONENT: Points
// ==========================================
function StarPoints() {
  const mesh = useRef();

  const [positions, sizes, phases, speeds] = useMemo(() => {
    const pos = new Float32Array(CONFIG.starCount * 3);
    const sz = new Float32Array(CONFIG.starCount);
    const ph = new Float32Array(CONFIG.starCount);
    const sp = new Float32Array(CONFIG.starCount);

    for (let i = 0; i < CONFIG.starCount; i++) {
      // Position: X/Y Spread wide, Z depth negative (in front of camera)
      pos[i * 3] = (Math.random() - 0.5) * 150;      // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;  // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * CONFIG.depth; // Z

      // Size: Random sizes for variety
      sz[i] = Math.random() * CONFIG.size;

      // Phase: Offset time for asynchronous twinkling
      ph[i] = Math.random() * Math.PI * 2;

      // Speed: Different stars twinkle at different rates
      sp[i] = 1.0 + Math.random() * 2.0;
    }
    return [pos, sz, ph, sp];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(CONFIG.color) },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
  }), []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={CONFIG.starCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={CONFIG.starCount} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-phase" count={CONFIG.starCount} array={phases} itemSize={1} />
        <bufferAttribute attach="attributes-speed" count={CONFIG.starCount} array={speeds} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ==========================================
// COMPONENT: Main Background
// ==========================================
export default function StarlightPremium({
  className = "",
  backgroundImage = "/assets/starfield-bg.jpg"
}) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>

      {/* 1. LAYER: Static Image (optional texture) */}
      <div className="absolute inset-0 z-0 opacity-60">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => e.target.style.display = 'none'} // Hide if missing
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. LAYER: Premium Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
          <StarPoints />
        </Canvas>
      </div>
    </div>
  );
}
