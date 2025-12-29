// src/components/CyanTerrainScene.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";

export default function CyanTerrainScene({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // -----------------------------
    // Scene / Renderer / Camera
    // -----------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050513, 0.0105);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      900
    );
    // Low-ish camera aimed at the surface so it reads as terrain
    camera.position.set(0, 7.2, 17.5);

    // -----------------------------
    // Lights (ByCreair: dark + cinematic)
    // -----------------------------
    scene.add(new THREE.AmbientLight(0xb8c0ff, 0.22));

    const hemi = new THREE.HemisphereLight(0x9aa6ff, 0x02020a, 0.55);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(12, 18, 10);
    scene.add(key);

    const rim = new THREE.PointLight(0x60a5fa, 0.7, 160);
    rim.position.set(-14, 7, -10);
    scene.add(rim);

    const violet = new THREE.PointLight(0x7c3aed, 0.35, 220);
    violet.position.set(10, 12, -30);
    scene.add(violet);

    // -----------------------------
    // Terrain (Option A)
    // -----------------------------
    const noise = new ImprovedNoise();

    const SIZE = 220;
    const SEG = 220; // keep reasonable
    const terrainGeo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    const pos = terrainGeo.attributes.position;

    // Barren “alien” heightfield — coherent, not random
    const s = 0.022;
    const amp = 10.0;

    const fbm = (x, y) => {
      let f = 0;
      let a = 1;
      let freq = 1;
      for (let o = 0; o < 5; o++) {
        f += a * noise.noise(x * s * freq, y * s * freq, 10 + o * 9);
        a *= 0.5;
        freq *= 2.0;
      }
      return f;
    };

    // Vertex colors for readable ridges even on dark palettes
    const colors = new Float32Array(pos.count * 3);
    const cLow = new THREE.Color(0x040616);  // deep violet black
    const cMid = new THREE.Color(0x07122a);  // slate blue
    const cHigh = new THREE.Color(0x102b52); // ridge tint

    // Handy: terrain center falloff so it feels like a “world surface”
    const radius = SIZE * 0.52;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const n = fbm(x, y);
      const ridge = Math.abs(noise.noise(x * s * 2.2, y * s * 2.2, 55));

      // Gentle crater-like falloff
      const d = Math.sqrt(x * x + y * y);
      const falloff = THREE.MathUtils.smoothstep(radius, 0, d); // 0..1

      // Height shaping: dunes + ridge cuts
      const z = (n * amp + (ridge - 0.45) * 5.0) * (0.55 + 0.45 * falloff);

      pos.setZ(i, z);

      // Color by height + ridges
      const h01 = THREE.MathUtils.clamp((z + amp) / (amp * 2), 0, 1);
      const base = cLow.clone().lerp(cMid, h01);
      const ridgeBoost = THREE.MathUtils.clamp((ridge - 0.55) * 2.4, 0, 1);
      base.lerp(cHigh, ridgeBoost * 0.9);

      colors[i * 3 + 0] = base.r;
      colors[i * 3 + 1] = base.g;
      colors[i * 3 + 2] = base.b;
    }

    pos.needsUpdate = true;
    terrainGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.97,
      metalness: 0.03,
      emissive: new THREE.Color(0x02051a),
      emissiveIntensity: 0.16,
    });

    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -8.5;
    scene.add(terrain);

    // -----------------------------
    // Embedded crystal glints (small + grounded)
    // -----------------------------
    const crystalGeo = new THREE.IcosahedronGeometry(0.7, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.55,
      roughness: 0.35,
      metalness: 0.75,
      transparent: true,
      opacity: 0.95,
    });

    const crystalCount = 60;
    const crystals = new THREE.InstancedMesh(crystalGeo, crystalMat, crystalCount);
    const dummy = new THREE.Object3D();

    // helper: terrain height in world for a given x,z
    const heightAt = (wx, wz) => {
      // map world x,z to plane local x,y before rotation
      // our plane is centered, rotated -PI/2, and shifted by terrain.position.y
      const lx = wx;
      const ly = wz;
      const n = fbm(lx, ly);
      const ridge = Math.abs(noise.noise(lx * s * 2.2, ly * s * 2.2, 55));
      const d = Math.sqrt(lx * lx + ly * ly);
      const falloff = THREE.MathUtils.smoothstep(radius, 0, d);
      const z = (n * amp + (ridge - 0.45) * 5.0) * (0.55 + 0.45 * falloff);
      return terrain.position.y + z; // because plane z becomes world y after rotation
    };

    for (let i = 0; i < crystalCount; i++) {
      // bias toward mid-ground so it looks intentional
      const wx = (Math.random() - 0.5) * 140;
      const wz = (Math.random() - 0.5) * 140;

      const wy = heightAt(wx, wz);

      // “embedded” = mostly below surface, with tips peeking out
      dummy.position.set(wx, wy + 0.25, wz);
      dummy.rotation.set(
        (Math.random() - 0.5) * 0.35,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.35
      );

      const sMin = 0.25;
      const sMax = 1.15;
      const sc = sMin + Math.random() * (sMax - sMin);
      dummy.scale.set(sc, sc * (1.25 + Math.random() * 1.2), sc);

      dummy.updateMatrix();
      crystals.setMatrixAt(i, dummy.matrix);
    }
    crystals.instanceMatrix.needsUpdate = true;
    scene.add(crystals);

    // -----------------------------
    // Low “dust” particles near ground (depth, not busy)
    // -----------------------------
    const dustCount = 1200;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const wx = (Math.random() - 0.5) * 220;
      const wz = (Math.random() - 0.5) * 220;
      const wy = heightAt(wx, wz) + 0.4 + Math.random() * 2.2;

      dustPos[i * 3 + 0] = wx;
      dustPos[i * 3 + 1] = wy;
      dustPos[i * 3 + 2] = wz;
    }

    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x9bdcff,
      size: 0.22,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // -----------------------------
    // Subtle stars (top half only)
    // -----------------------------
    const starCount = 800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3 + 0] = (Math.random() - 0.5) * 700;
      starPos[i * 3 + 1] = Math.random() * 240 + 60;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 700;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.26,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // -----------------------------
    // Mouse parallax (no pointer events needed)
    // -----------------------------
    let mx = 0;
    let my = 0;

    const onMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // -----------------------------
    // Resize
    // -----------------------------
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // -----------------------------
    // Animate
    // -----------------------------
    let raf = 0;
    const clock = new THREE.Clock();
    const baseCam = camera.position.clone();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Very gentle life
      stars.rotation.y += 0.00006;
      dust.rotation.y += 0.00004;

      // Parallax drift (subtle)
      camera.position.x = baseCam.x + mx * 0.65 + Math.sin(t * 0.10) * 0.25;
      camera.position.y = baseCam.y + (-my * 0.35);
      camera.lookAt(0, -8.0, 0);

      // Crystal shimmer (tiny)
      crystalMat.emissiveIntensity = 0.50 + Math.sin(t * 1.1) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // -----------------------------
    // Cleanup
    // -----------------------------
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);

      scene.traverse((obj) => {
        if (obj.isMesh || obj.isPoints || obj.isInstancedMesh) {
          obj.geometry?.dispose?.();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
          else obj.material?.dispose?.();
        }
      });

      renderer.dispose();
      if (renderer.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} />;
}
