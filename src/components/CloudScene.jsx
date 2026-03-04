import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// 1. Procedural Cloud Texture Generation
// Creates a soft, fuzzy radial gradient to simulate a cloud puff
function createCloudTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");

  // Radial gradient: white center -> transparent edge
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(0.4, "rgba(220, 220, 255, 0.5)"); // Slight blue tint
  gradient.addColorStop(0.8, "rgba(60, 20, 180, 0.1)");  // Purple fringe
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 2. Individual Cloud Particle
function CloudParticle({ position, texture, speed }) {
  const mesh = useRef();
  // Random rotation speed
  const rotSpeed = useMemo(() => (Math.random() - 0.5) * 0.002, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Scroll towards camera (Z axis)
    mesh.current.position.z += speed * delta;
    mesh.current.rotation.z += rotSpeed;

    // Reset when passed camera
    if (mesh.current.position.z > 10) {
      mesh.current.position.z = -20;
      // Randomize X/Y again slightly for variety
      mesh.current.position.x = (Math.random() - 0.5) * 20;
      mesh.current.position.y = (Math.random() - 0.5) * 10;
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={[0, 0, Math.random() * Math.PI]}>
      <planeGeometry args={[7, 7]} />
      <meshLambertMaterial
        map={texture}
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// 3. Clouds Container
function Clouds({ count = 50 }) {
  const texture = useMemo(() => createCloudTexture(), []);

  // Generate random initial positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 30 - 10; // Spread from -25 to +5
      temp.push({ id: i, pos: [x, y, z], speed: 2 + Math.random() * 3 }); // Parallax speed
    }
    return temp;
  }, [count]);

  return (
    <group>
      {particles.map((p) => (
        <CloudParticle key={p.id} position={p.pos} texture={texture} speed={p.speed} />
      ))}
    </group>
  );
}

// 4. Scene Lighting & Fog
function SceneContent() {
  const { scene } = useThree();

  // Purple/Blue Fog
  useMemo(() => {
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.05); // Dark background fog
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.6} color="#3A10AC" /> {/* The user's Purple */}
      <directionalLight position={[0, 0, 1]} intensity={1.2} color="#4488ff" /> {/* Blue Highlight */}
      <pointLight position={[0, 5, -10]} intensity={5} color="#3A10AC" distance={30} />
      <Clouds count={60} />
    </>
  );
}

// 5. Main Component
export default function CloudScene({ className }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <SceneContent />
      </Canvas>
    </div>
  );
}
