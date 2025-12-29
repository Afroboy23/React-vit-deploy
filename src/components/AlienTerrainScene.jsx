import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";

export default function AlienTerrainScene({
  className = "",
  interactive = false, // keep false for homepage so it doesn't fight your UI
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // -----------------------------
    // Scene / Camera / Renderer
    // -----------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070616, 0.03);

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      800
    );
    camera.position.set(0, 10, 22);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Controls (for testing; disabled by default so UI stays usable)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enabled = interactive;
    controls.enablePan = false;

    // -----------------------------
    // Lights (ByCreair palette)
    // -----------------------------
    const ambient = new THREE.AmbientLight(0xaab0ff, 0.18);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(10, 18, 10);
    scene.add(key);

    const rim = new THREE.PointLight(0x60a5fa, 1.2, 120);
    rim.position.set(-12, 10, -8);
    scene.add(rim);

    const riverLight = new THREE.PointLight(0x22d3ee, 1.1, 60);
    riverLight.position.set(0, 2.5, 0);
    scene.add(riverLight);

    // -----------------------------
    // Terrain (coherent “barren” surface)
    // -----------------------------
    const noise = new ImprovedNoise();
    const terrainGeo = new THREE.PlaneGeometry(120, 120, 180, 180);
    const pos = terrainGeo.attributes.position;

    // Make gentle dunes + ridges (not random spikes)
    const scale = 0.08; // noise frequency
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const n1 = noise.noise(x * scale, y * scale, 0) * 2.0;
      const n2 = noise.noise(x * scale * 2.2, y * scale * 2.2, 10) * 0.8;

      // Slightly barren: low amplitude, some sharper ridges
      const ridge = Math.abs(noise.noise(x * scale * 1.2, y * scale * 1.2, 20));
      const z = (n1 + n2) * 1.6 + (ridge - 0.4) * 1.2;

      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x0b0b1a,      // deep slate/purple-black
      roughness: 0.95,
      metalness: 0.05,
    });

    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -2.2;
    scene.add(terrain);

    // -----------------------------
    // “Energy river” (interactive-looking feature)
    // -----------------------------
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-35, -2.05, 30),
      new THREE.Vector3(-18, -2.05, 10),
      new THREE.Vector3(-6, -2.05, -5),
      new THREE.Vector3(10, -2.05, -18),
      new THREE.Vector3(30, -2.05, -35),
    ]);

    const tubeGeo = new THREE.TubeGeometry(curve, 220, 0.55, 10, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x22d3ee,
      emissiveIntensity: 1.3,
      roughness: 0.25,
      metalness: 0.2,
    });
    const river = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(river);

    // -----------------------------
    // Crystals (instanced for performance)
    // -----------------------------
    const crystalCount = 55;
    const crystalGeo = new THREE.OctahedronGeometry(1, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.6,
      roughness: 0.35,
      metalness: 0.75,
    });

    const crystals = new THREE.InstancedMesh(crystalGeo, crystalMat, crystalCount);
    crystals.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    const crystalData = [];

    for (let i = 0; i < crystalCount; i++) {
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;

      // sample terrain height approximately by a cheap noise function
      const h = noise.noise(x * 0.06, z * 0.06, 0) * 2.0;

      const baseY = -2.2 + h * 0.8 + 0.6;
      const s = 0.7 + Math.random() * 1.6;

      dummy.position.set(x, baseY, z);
      dummy.rotation.set(
        (Math.random() - 0.5) * 0.6,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.6
      );
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      crystals.setMatrixAt(i, dummy.matrix);

      crystalData.push({ x, y: baseY, z, s, phase: Math.random() * Math.PI * 2 });
    }
    crystals.instanceMatrix.needsUpdate = true;
    scene.add(crystals);

    // -----------------------------
    // Stars (subtle)
    // -----------------------------
    const starCount = 2200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3 + 0] = (Math.random() - 0.5) * 600;
      starPositions[i * 3 + 1] = Math.random() * 220 + 40;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 600;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.35,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // -----------------------------
    // Interaction (cursor + scroll)
    // -----------------------------
    const mouse = new THREE.Vector2(999, 999);
    const worldCursor = new THREE.Vector3(0, -2.05, 0);
    const raycaster = new THREE.Raycaster();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 2.05); // y = -2.05

    const onMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    let scroll01 = 0;
    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scroll01 = Math.min(1, Math.max(0, window.scrollY / max));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Resize
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

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // subtle star drift
      stars.rotation.y += 0.00008;

      // project cursor to ground
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(groundPlane, worldCursor);

      // camera parallax (premium: small)
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 1.2, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 10.5 + scroll01 * 1.2, 0.04);
      camera.lookAt(0, -2.05, 0);

      // “river alive”: emissive breath + scroll boost
      tubeMat.emissiveIntensity = 1.15 + Math.sin(t * 1.2) * 0.12 + scroll01 * 0.25;

      // move river light slightly with cursor
      riverLight.position.x = THREE.MathUtils.lerp(riverLight.position.x, worldCursor.x * 0.25, 0.05);
      riverLight.position.z = THREE.MathUtils.lerp(riverLight.position.z, worldCursor.z * 0.25, 0.05);

      // crystals react near cursor (they lift & pulse)
      for (let i = 0; i < crystalCount; i++) {
        const c = crystalData[i];
        const dx = c.x - worldCursor.x;
        const dz = c.z - worldCursor.z;
        const d = Math.sqrt(dx * dx + dz * dz);

        const influence = THREE.MathUtils.clamp(1 - d / 14, 0, 1); // radius
        const lift = influence * (0.55 + Math.sin(t * 3 + c.phase) * 0.15);

        dummy.position.set(c.x, c.y + lift, c.z);
        dummy.rotation.y += 0.002 + influence * 0.01;
        dummy.scale.setScalar(c.s * (1 + influence * 0.12));
        dummy.updateMatrix();
        crystals.setMatrixAt(i, dummy.matrix);
      }
      crystals.instanceMatrix.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      controls.dispose();

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
  }, [interactive]);

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} />;
}
