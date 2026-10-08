import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { smoothSculpturePelvis } from "./smoothSculpturePelvis.js";

function disposeMaterials(materials) {
  const textures = new Set();
  new Set(materials).forEach((material) => {
    Object.values(material).forEach((value) => {
      if (value?.isTexture) textures.add(value);
    });
    material.dispose();
  });
  textures.forEach((texture) => texture.dispose());
}

function disposeObject(object, additionalMaterials = []) {
  const geometries = new Set(),
    materials = new Set(additionalMaterials);
  object.traverse((child) => {
    if (!child.isMesh) return;
    geometries.add(child.geometry);
    (Array.isArray(child.material) ? child.material : [child.material]).forEach(
      (material) => materials.add(material),
    );
  });
  geometries.forEach((geometry) => geometry.dispose());
  disposeMaterials(materials);
}

export default function SculptureScene({ paused, theme = "light" }) {
  const host = useRef(null),
    pause = useRef(paused),
    currentTheme = useRef(theme),
    applyTheme = useRef(null);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    pause.current = paused;
  }, [paused]);
  useEffect(() => {
    currentTheme.current = theme;
    applyTheme.current?.(theme);
  }, [theme]);
  useEffect(() => {
    const container = host.current;
    let disposed = false,
      renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setStatus("unavailable");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.tabIndex = 0;
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute(
      "aria-label",
      "Interactive classical male sculpture. Drag horizontally or use arrow keys to rotate. Press Home to reset the view.",
    );
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
    camera.position.set(0, 0.8, 8.3);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.8, 0);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.rotateSpeed = 0.7;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.72;
    controls.autoRotateSpeed = 0.35;
    controls.cursorStyle = "grab";
    controls.update();
    controls.saveState();
    // Horizontal touch drags orbit; vertical swipes can still scroll the page.
    renderer.domElement.style.touchAction = "pan-y pinch-zoom";
    const pmrem = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    const rig = new THREE.Group();
    scene.add(rig);
    const marble = new THREE.MeshStandardMaterial({
      color: "#aaa697",
      metalness: 0.08,
      roughness: 0.5,
      envMapIntensity: 0.55,
    });
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.22, 0.022, 16, 160),
      new THREE.MeshBasicMaterial({ color: "#c7af7d", toneMapped: false }),
    );
    ring.position.set(0, 1.9, -0.75);
    ring.rotation.x = 0.13;
    scene.add(ring);
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.22, 0.045, 12, 160),
      new THREE.MeshBasicMaterial({
        color: "#167c72",
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    ring.add(halo);
    const hemisphere = new THREE.HemisphereLight("#f4f7f2", "#bac5ba", 0.35);
    scene.add(hemisphere);
    const key = new THREE.DirectionalLight("#fff0d7", 2.7);
    key.position.set(-3, 5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight("#c1eee5", 2.8);
    rim.position.set(2, 3, -3);
    scene.add(rim);
    const fill = new THREE.DirectionalLight("#e8f6ef", 0.4);
    fill.position.set(4, 1.5, 4);
    scene.add(fill);
    const front = new THREE.DirectionalLight("#fffaf0", 0.1);
    front.position.set(0, 3, 7);
    scene.add(front);
    applyTheme.current = (nextTheme) => {
      const dark = nextTheme === "dark";
      marble.color.set(dark ? "#b9b3a1" : "#aaa697");
      renderer.toneMappingExposure = dark ? 0.8 : 0.85;
      scene.environmentIntensity = dark ? 0.6 : 0.5;
      hemisphere.intensity = dark ? 0.3 : 0.35;
      hemisphere.groundColor.set(dark ? "#9fb6ab" : "#bac5ba");
      fill.intensity = dark ? 0.55 : 0.4;
      rim.intensity = dark ? 3.3 : 2.8;
      front.intensity = dark ? 0.15 : 0.1;
      ring.material.color.set(dark ? "#61c9b3" : "#c7af7d");
      halo.material.color.set(dark ? "#ddc693" : "#167c72");
      halo.material.opacity = dark ? 0.24 : 0.12;
    };
    applyTheme.current(currentTheme.current);
    const draco = new DRACOLoader().setDecoderPath("/models/draco/");
    const loader = new GLTFLoader().setDRACOLoader(draco);
    loader.load(
      "/models/perseus.glb",
      (gltf) => {
        if (disposed) {
          disposeObject(gltf.scene);
          return;
        }
        const sculpture = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(sculpture),
          size = bounds.getSize(new THREE.Vector3()),
          center = bounds.getCenter(new THREE.Vector3());
        const scale = 6 / size.y;
        sculpture.scale.multiplyScalar(scale);
        sculpture.position.sub(center.multiplyScalar(scale));
        smoothSculpturePelvis(sculpture);
        const originalMaterials = new Set();
        sculpture.traverse((child) => {
          if (!child.isMesh) return;
          (Array.isArray(child.material)
            ? child.material
            : [child.material]
          ).forEach((material) => originalMaterials.add(material));
          child.material = marble;
        });
        disposeMaterials(originalMaterials);
        rig.add(sculpture);
        setStatus("ready");
      },
      undefined,
      () => {
        if (!disposed) {
          renderer.setAnimationLoop(null);
          setStatus("unavailable");
        }
      },
    );
    const resize = () => {
      const width = Math.max(1, container.clientWidth),
        height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const distance = 8.3 / Math.min(camera.aspect / 0.85, 1);
      camera.position
        .sub(controls.target)
        .setLength(distance)
        .add(controls.target);
      controls.update();
      controls.saveState();
    };
    const onKeyDown = (event) => {
      const step = 0.12;
      switch (event.key) {
        case "ArrowLeft":
          controls.rotateLeft(step);
          break;
        case "ArrowRight":
          controls.rotateLeft(-step);
          break;
        case "ArrowUp":
          controls.rotateUp(step);
          break;
        case "ArrowDown":
          controls.rotateUp(-step);
          break;
        case "Home":
          controls.reset();
          break;
        default:
          return;
      }
      event.preventDefault();
    };
    const onContextLost = (event) => {
      event.preventDefault();
      renderer.setAnimationLoop(null);
      if (!disposed) setStatus("unavailable");
    };
    renderer.domElement.addEventListener("keydown", onKeyDown);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    rig.rotation.y = -0.65;
    let lastTime = performance.now(),
      elapsed = 0;
    renderer.setAnimationLoop(() => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (document.hidden) return;
      if (!pause.current) elapsed += delta;
      controls.autoRotate = !pause.current;
      controls.update(delta);
      rig.position.y = Math.sin(elapsed * 0.3) * 0.018;
      ring.rotation.y = Math.sin(elapsed * 0.15) * 0.14;
      renderer.render(scene, camera);
    });
    return () => {
      disposed = true;
      applyTheme.current = null;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("keydown", onKeyDown);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        onContextLost,
      );
      controls.dispose();
      disposeObject(scene, [marble]);
      environment.dispose();
      draco.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div
      ref={host}
      className={`sculpture-canvas ${status}`}
      data-scene-status={status}
      aria-busy={status === "loading"}
    >
      {status === "loading" && (
        <span className="scene-loading" role="status">
          Loading sculpture
        </span>
      )}
      {status === "unavailable" && (
        <img
          className="sculpture-fallback"
          src="/images/sculpture-fallback.jpg"
          alt="Classical male sculpture"
        />
      )}
    </div>
  );
}
SculptureScene.propTypes = {
  paused: (props, key) =>
    typeof props[key] === "boolean"
      ? null
      : new Error("paused must be a boolean"),
  theme: (props, key) =>
    props[key] === undefined || props[key] === "light" || props[key] === "dark"
      ? null
      : new Error("theme must be light or dark"),
};
