import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { smoothSculpturePelvis } from "./smoothSculpturePelvis.js";
import { createSceneRenderLoop } from "./createSceneRenderLoop.js";
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
export default function SculptureScene({
  paused,
  theme = "light",
  onStatusChange,
}) {
  const host = useRef(null),
    pause = useRef(paused),
    currentTheme = useRef(theme),
    applyTheme = useRef(null),
    wakeScene = useRef(null),
    statusCallback = useRef(onStatusChange);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    pause.current = paused;
    wakeScene.current?.();
  }, [paused]);
  useEffect(() => {
    currentTheme.current = theme;
    applyTheme.current?.(theme);
  }, [theme]);
  useEffect(() => {
    statusCallback.current = onStatusChange;
  }, [onStatusChange]);
  useEffect(() => {
    statusCallback.current?.(status);
  }, [status]);
  useEffect(() => {
    const container = host.current;
    const mobile =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const capturePoster =
      import.meta.env.DEV &&
      new URLSearchParams(window.location.search).has("capturePoster");
    const abort = new AbortController();
    const stagingMaterials = new Set();
    let disposed = false,
      failed = false,
      cleaned = false,
      inView = false,
      renderer,
      scene,
      controls,
      environment,
      draco,
      marble,
      renderLoop,
      resizeObserver,
      visibilityObserver,
      loadTimeout,
      onKeyDown,
      onContextLost,
      onVisibilityChange,
      onControlsChange;
    const release = () => {
      if (cleaned) return;
      cleaned = true;
      applyTheme.current = null;
      wakeScene.current = null;
      clearTimeout(loadTimeout);
      abort.abort();
      renderLoop?.dispose();
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      renderer?.domElement.removeEventListener("keydown", onKeyDown);
      renderer?.domElement.removeEventListener(
        "webglcontextlost",
        onContextLost,
      );
      controls?.removeEventListener("change", onControlsChange);
      controls?.removeEventListener("start", onControlsChange);
      controls?.removeEventListener("end", onControlsChange);
      controls?.dispose();
      const materials = [...stagingMaterials];
      if (marble) materials.push(marble);
      if (scene) {
        disposeObject(scene, materials);
      } else {
        disposeMaterials(materials);
      }
      stagingMaterials.clear();
      environment?.dispose();
      draco?.dispose();
      renderer?.dispose();
      if (renderer && !renderer.getContext().isContextLost()) {
        renderer.forceContextLoss();
      }
      renderer?.domElement.remove();
    };
    const unavailable = () => {
      if (disposed || failed) return;
      failed = true;
      release();
      container.dataset.renderMode = "unavailable";
      setStatus("unavailable");
    };
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !mobile,
        alpha: true,
        powerPreference: mobile ? "low-power" : "high-performance",
        preserveDrawingBuffer: capturePoster,
      });
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5),
      );
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
      scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
      camera.position.set(0, 0.8, 8.3);
      controls = new OrbitControls(camera, renderer.domElement);
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
      try {
        environment = pmrem.fromScene(room, 0.04, 0.1, 100, {
          size: mobile ? 64 : 256,
        });
      } finally {
        room.dispose();
        pmrem.dispose();
      }
      scene.environment = environment.texture;
      const rig = new THREE.Group();
      scene.add(rig);
      marble = new THREE.MeshStandardMaterial({
        color: "#aaa697",
        metalness: 0.08,
        roughness: 0.5,
        envMapIntensity: 0.55,
      });
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.22, 0.022, 16, 160),
        new THREE.MeshBasicMaterial({
          color: "#c7af7d",
          toneMapped: false,
        }),
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
      rig.rotation.y = -0.65;
      let elapsed = 0,
        renderCount = 0,
        posterTheme = null;
      container.dataset.renderCount = "0";
      container.dataset.renderProfile = mobile ? "mobile" : "desktop";
      renderLoop = createSceneRenderLoop({
        maxFps: mobile ? 30 : 60,
        isPaused: () => pause.current,
        isVisible: () => inView && !document.hidden,
        onMode: (mode) => {
          container.dataset.renderMode = mode;
        },
        update: (delta, isPaused) => {
          controls.autoRotate = !isPaused;
          const changed = controls.update(delta);
          if (!isPaused) elapsed += delta;
          rig.position.y = Math.sin(elapsed * 0.3) * 0.018;
          ring.rotation.y = Math.sin(elapsed * 0.15) * 0.14;
          return changed;
        },
        render: () => {
          try {
            renderer.render(scene, camera);
            container.dataset.renderCount = String(++renderCount);
            if (capturePoster && posterTheme !== currentTheme.current) {
              container.dataset.posterSrc =
                renderer.domElement.toDataURL("image/png");
              container.dataset.posterTheme = currentTheme.current;
              posterTheme = currentTheme.current;
            }
          } catch {
            unavailable();
          }
        },
      });
      wakeScene.current = renderLoop.invalidate;
      onControlsChange = renderLoop.invalidate;
      controls.addEventListener("change", onControlsChange);
      controls.addEventListener("start", onControlsChange);
      controls.addEventListener("end", onControlsChange);
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
        renderLoop.invalidate();
      };
      applyTheme.current(currentTheme.current);
      draco = new DRACOLoader()
        .setDecoderPath("/models/draco/")
        .setWorkerLimit(mobile ? 1 : 2);
      const loader = new GLTFLoader().setDRACOLoader(draco);
      // The original texture maps are discarded for the uniform stone finish.
      // Skip decoding those large images altogether, particularly on phones.
      loader.register(() => ({
        name: "portfolio-marble-finish",
        loadMaterial: () => {
          if (disposed || failed)
            return Promise.reject(new Error("Scene disposed"));
          const material = new THREE.MeshStandardMaterial();
          stagingMaterials.add(material);
          return Promise.resolve(material);
        },
      }));
      const onLoaded = (gltf) => {
        if (disposed || failed) {
          disposeObject(gltf.scene);
          return;
        }
        const sculpture = gltf.scene;
        try {
          const bounds = new THREE.Box3().setFromObject(sculpture),
            size = bounds.getSize(new THREE.Vector3()),
            center = bounds.getCenter(new THREE.Vector3());
          const scale = 6 / size.y;
          if (!Number.isFinite(scale) || scale <= 0)
            throw new Error("Invalid sculpture bounds");
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
          stagingMaterials.forEach((material) =>
            originalMaterials.add(material),
          );
          disposeMaterials(originalMaterials);
          stagingMaterials.clear();
          rig.add(sculpture);
          clearTimeout(loadTimeout);
          setStatus("ready");
          renderLoop.setReady();
        } catch {
          rig.add(sculpture);
          unavailable();
        }
      };
      loadTimeout = setTimeout(unavailable, mobile ? 25000 : 20000);
      const loadModel = async () => {
        const modelRequest = fetch("/models/perseus.glb", {
          signal: abort.signal,
        }).then((response) => {
          if (!response.ok) throw new Error("Sculpture request failed");
          return response.arrayBuffer();
        });
        draco.preload();
        // Await decoder preparation before parse: cancellation can then revoke a
        // late decoder URL without allowing queued work to create new workers.
        const decoderReady = draco.decoderPending.then(() => {
          if (disposed || failed) {
            draco.dispose();
            throw new Error("Scene disposed");
          }
        });
        const [buffer] = await Promise.all([modelRequest, decoderReady]);
        if (disposed || failed) return;
        loader.parse(buffer, "/models/", onLoaded, unavailable);
      };
      loadModel().catch(unavailable);
      const resize = () => {
        if (disposed || failed) return;
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
        renderLoop.invalidate();
      };
      onKeyDown = (event) => {
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
      onContextLost = (event) => {
        event.preventDefault();
        unavailable();
      };
      renderer.domElement.addEventListener("keydown", onKeyDown);
      renderer.domElement.addEventListener("webglcontextlost", onContextLost);
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();
      if (typeof IntersectionObserver !== "undefined") {
        visibilityObserver = new IntersectionObserver(([entry]) => {
          if (disposed || failed) return;
          inView = entry.isIntersecting && entry.intersectionRatio > 0;
          renderLoop.visibilityChanged();
        });
        visibilityObserver.observe(container);
      } else {
        inView = true;
      }
      onVisibilityChange = renderLoop.visibilityChanged;
      document.addEventListener("visibilitychange", onVisibilityChange);
    } catch {
      unavailable();
    }
    return () => {
      disposed = true;
      release();
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
          className="sculpture-poster"
          src={`/images/sculpture-poster-${theme}.webp`}
          alt="Classical male sculpture with a smooth stone finish"
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
  onStatusChange: (props, key) =>
    props[key] === undefined || typeof props[key] === "function"
      ? null
      : new Error("onStatusChange must be a function"),
};
