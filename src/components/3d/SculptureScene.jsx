import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

function disposeObject(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.geometry.dispose();
    (Array.isArray(child.material) ? child.material : [child.material]).forEach(
      (material) => {
        Object.values(material).forEach((value) => {
          if (value?.isTexture) value.dispose();
        });
        material.dispose();
      },
    );
  });
}

export default function SculptureScene({ paused }) {
  const host = useRef(null),
    pause = useRef(paused);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    pause.current = paused;
  }, [paused]);
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
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#111315");
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
    camera.position.set(0, 1.4, 6.3);
    const pmrem = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    const rig = new THREE.Group();
    scene.add(rig);
    const marble = new THREE.MeshStandardMaterial({
      color: "#12171c",
      metalness: 0.7,
      roughness: 0.36,
    });
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.22, 0.022, 16, 160),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 3, 3) }),
    );
    ring.position.set(0, 1.9, -0.75);
    ring.rotation.x = 0.13;
    scene.add(ring);
    scene.add(new THREE.HemisphereLight("#dee9ff", "#080909", 0.55));
    const key = new THREE.DirectionalLight("#f4f5f6", 4.5);
    key.position.set(-3, 5, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight("#d4e2ff", 5);
    rim.position.set(2, 3, -3);
    scene.add(rim);
    const fill = new THREE.DirectionalLight("#ffffff", 0.7);
    fill.position.set(4, 0, 2);
    scene.add(fill);
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(new THREE.Vector2(1, 1), 0.12, 0.35, 1.3),
    );
    composer.addPass(new OutputPass());
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
        sculpture.traverse((child) => {
          if (!child.isMesh) return;
          (Array.isArray(child.material)
            ? child.material
            : [child.material]
          ).forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value?.isTexture) value.dispose();
            });
            material.dispose();
          });
          child.material = marble;
        });
        rig.add(sculpture);
        setStatus("ready");
      },
      undefined,
      () => {
        if (!disposed) setStatus("unavailable");
      },
    );
    let mobile = false,
      progress = 0,
      targetProgress = 0,
      sectionTops = [];
    const pointer = new THREE.Vector2();
    const resize = () => {
      const width = container.clientWidth,
        height = container.clientHeight;
      mobile = width < 700;
      renderer.setSize(width, height);
      composer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      sectionTops = [...document.querySelectorAll("main > section")].map(
        (el) => el.offsetTop,
      );
    };
    const onScroll = () => {
      const y = window.scrollY;
      const index = Math.max(
        0,
        sectionTops.findLastIndex((top) => y >= top),
      );
      const next =
        sectionTops[index + 1] ?? sectionTops[index] + window.innerHeight;
      targetProgress = Math.min(
        4,
        index + (y - sectionTops[index]) / (next - sectionTops[index]),
      );
    };
    const onPointer = (event) =>
      pointer.set(
        event.clientX / window.innerWidth - 0.5,
        event.clientY / window.innerHeight - 0.5,
      );
    const onContextLost = (event) => {
      event.preventDefault();
      renderer.setAnimationLoop(null);
      setStatus("unavailable");
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    const resizeObserver = new ResizeObserver(() => {
      resize();
      onScroll();
    });
    resizeObserver.observe(container);
    const contentObserver = new ResizeObserver(() => {
      resize();
      onScroll();
    });
    const main = document.querySelector("main");
    if (main) contentObserver.observe(main);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    resize();
    onScroll();
    // rotation, horizontal position, camera distance, target height per chapter.
    const poses = [
      [-0.65, -0.35, 4.7, 2.0],
      [0.55, 1.35, 6, 1.65],
      [1.45, -1.9, 8.5, 0.45],
      [2.5, 1.55, 6.8, 1.1],
      [3.8, 0.25, 8.5, 0.65],
    ];
    rig.rotation.y = poses[0][0];
    let lastTime = performance.now(),
      elapsed = 0;
    renderer.setAnimationLoop(() => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (document.hidden) return;
      if (!pause.current)
        progress = THREE.MathUtils.damp(progress, targetProgress, 4, delta);
      const p = progress,
        index = Math.min(3, Math.floor(p)),
        t = THREE.MathUtils.smoothstep(p - index, 0, 1);
      const pose = poses[index].map((value, i) =>
        THREE.MathUtils.lerp(value, poses[index + 1][i], t),
      );
      if (!pause.current) elapsed += delta;
      if (!pause.current) rig.rotation.y = pose[0] + pointer.x * 0.09;
      rig.position.x = mobile ? pose[1] * 0.3 : pose[1];
      rig.position.y = Math.sin(elapsed * 0.3) * 0.018;
      ring.position.x = rig.position.x;
      ring.rotation.y = Math.sin(elapsed * 0.15) * 0.14;
      camera.position.set(0, pose[3], mobile ? pose[2] * 1.25 : pose[2]);
      camera.lookAt(0, pose[3], 0);
      composer.render();
    });
    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      contentObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        onContextLost,
      );
      disposeObject(scene);
      marble.dispose();
      environment.dispose();
      draco.dispose();
      composer.passes.forEach((pass) => pass.dispose?.());
      composer.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div
      ref={host}
      className={`sculpture-canvas ${status}`}
      data-scene-status={status}
    >
      {status === "loading" && (
        <span className="scene-loading">Loading sculpture</span>
      )}
      {status === "unavailable" && (
        <img
          className="sculpture-fallback"
          src="/images/sculpture-fallback.jpg"
          alt=""
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
};
