import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function IglooScene({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene / Camera / Renderer
    const scene = new THREE.Scene();
    // Keep it on-brand (dark). Use alpha renderer so your CSS bg can show through.
    // If you prefer a solid 3D background, uncomment:
    // scene.background = new THREE.Color(0x020617);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      500
    );
    camera.position.set(0, 1.2, 3.6);

    // Lights (clean, not “spacey”)
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const dir = new THREE.DirectionalLight(0xffffff, 1.1);
    dir.position.set(5, 8, 6);
    scene.add(dir);

    const accent = new THREE.PointLight(0x38bdf8, 0.7, 20);
    accent.position.set(-3, 1, -2);
    scene.add(accent);

    // Ground (subtle)
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.6;
    scene.add(ground);

    // Orbit Controls (good for testing; we can remove later for “studio feel”)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;

    // Model
    const loader = new GLTFLoader();
    let model = null;

    // Raycaster interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(999, 999);

    const updateMouse = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const isInteractiveUI = (el) =>
      !!el?.closest?.("button,a,input,textarea,select,label");

    const onMove = (e) => updateMouse(e);

    const onClick = (e) => {
      if (!model) return;
      if (isInteractiveUI(e.target)) return; // don’t hijack button clicks

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(model, true);
      if (hits.length) model.rotation.y += Math.PI / 6;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("click", onClick);

    // Load your GLB (recommended)
    loader.load(
      "/models/igloo.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(2.2, 2.2, 2.2);
        model.position.set(0, -0.6, 0);
        scene.add(model);
      },
      undefined,
      (err) => {
        console.error("GLTF load error:", err);
        // Temporary fallback (if you don't have a model yet)
        loader.load(
          "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf",
          (gltf) => {
            model = gltf.scene;
            model.scale.set(2.2, 2.2, 2.2);
            model.position.set(0, -0.6, 0);
            scene.add(model);
          }
        );
      }
    );

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

    // Animate
    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);

      if (model) {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObject(model, true);

        const t = clock.getElapsedTime();
        model.rotation.y += hits.length ? 0.006 : 0.0015; // hover spins slightly faster
        model.rotation.x = Math.sin(t * 0.4) * 0.03;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup (important for React)
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", onClick);
      controls.dispose();

      renderer.dispose();
      if (renderer.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} />;
}
