import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 1. Star Field Component
function StarField({ count = 1500 }) {
  const mesh = useRef();

  // Generate random positions and "phase" for twinkling
  const [positions, phases, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const pha = new Float32Array(count);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread stars across a wide area
      pos[i * 3] = (Math.random() - 0.5) * 100;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;  // z (depth)

      pha[i] = Math.random() * Math.PI * 2; // Random starting point in sine wave
      spd[i] = 0.5 + Math.random() * 1.5;   // Random twinkling speed
    }
    return [pos, pha, spd];
  }, [count]);

  // Update loop for twinkling effect
  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();
    const colors = mesh.current.geometry.attributes.color;

    for (let i = 0; i < count; i++) {
      // Calculate twinkle brightness using sine wave
      // Range: 0.2 (dim) to 1.0 (bright)
      const t = Math.sin(time * speeds[i] + phases[i]);
      const brightness = 0.2 + (t * 0.5 + 0.5) * 0.8;

      // Apply purple tint (#3A10AC is approx R:58 G:16 B:172)
      // We'll normalize 3A10AC to 0-1 range: R:0.22, G:0.06, B:0.67
      // And scale by brightness
      colors.setXYZ(
        i,
        0.22 * brightness + 0.1, // Add base white for "shine"
        0.06 * brightness + 0.1,
        0.67 * brightness + 0.3  // Boost blue/purple
      );
    }
    colors.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        {/* Initialize colors (will be updated each frame) */}
        <bufferAttribute
          attach="attributes-color"
          count={positions.length / 3}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 2. Shooting Star (Optional, adds dynamic feel)
function ShootingStar() {
  const mesh = useRef();
  const reset = () => {
    mesh.current.position.x = -50 + Math.random() * 20;
    mesh.current.position.y = 30 + Math.random() * 10;
    mesh.current.position.z = (Math.random() - 0.5) * 20;
    mesh.current.scale.x = 0;
  };

  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Move slightly
    mesh.current.position.x += 40 * delta;
    mesh.current.position.y -= 20 * delta;

    // Trail effect (stretch)
    if (mesh.current.scale.x < 20) mesh.current.scale.x += 50 * delta;

    // Reset if out of bounds
    if (mesh.current.position.x > 50 || mesh.current.position.y < -30) {
      if (Math.random() > 0.98) reset(); // 2% chance to respawn each frame logic
      else {
        // Hide it
        mesh.current.position.y = -100;
      }
    }
  });

  return (
    <mesh ref={mesh} position={[0, -100, 0]} rotation={[0, 0, -Math.PI / 6]}>
      <planeGeometry args={[1, 0.1]} />
      <meshBasicMaterial color="#a080ff" transparent opacity={0.8} />
    </mesh>
  );
}

// 3. Main Scene
export default function StarlightScene({ className }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <color attach="background" args={['#050110']} /> {/* Very dark purple/black bg */}
        <StarField count={2000} />
        {/* <ShootingStar /> - Commented out to keep it pure "Rolls Royce" static feel first, can enable if requested */}
      </Canvas>
    </div>
  );
}
