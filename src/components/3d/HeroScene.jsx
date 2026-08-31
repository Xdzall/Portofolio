import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import SolarSystem from './SolarSystem';
import Spaceship from './Spaceship';

// Camera controller that follows smoothly behind the Earth spaceplane
function SpaceshipChaseCamera({ shipRef }) {
  const { camera } = useThree();
  const currentCamPos = useRef(new THREE.Vector3(0, 15, 30));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (!shipRef.current) return;
    const ship = shipRef.current;

    // Smooth third-person chase camera positioned behind (+Z) and slightly above (+Y)
    const cameraOffset = new THREE.Vector3(0, 2.4, 6.8);
    cameraOffset.applyEuler(ship.rotation);
    const targetCameraPos = ship.position.clone().add(cameraOffset);

    // Look ahead of nose (-Z)
    const lookOffset = new THREE.Vector3(0, 0.4, -9.0);
    lookOffset.applyEuler(ship.rotation);
    const targetLookAt = ship.position.clone().add(lookOffset);

    // Ultra-smooth lerping for cinematic spaceflight
    currentCamPos.current.lerp(targetCameraPos, 0.065);
    currentLookAt.current.lerp(targetLookAt, 0.08);

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function FallbackLoader() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[3.2, 16, 16]} />
      <meshBasicMaterial color="#ff8800" wireframe />
    </mesh>
  );
}

export default function HeroScene() {
  const shipRef = useRef();
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Global pointer listeners
  useEffect(() => {
    const handleDown = () => setIsMouseDown(true);
    const handleUp = () => setIsMouseDown(false);

    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchstart', handleDown);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchstart', handleDown);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full cursor-crosshair select-none">
      <Canvas
        camera={{ position: [0, 15, 30], fov: 48, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020206']} />

        {/* Ambient & Starfield Lighting */}
        <ambientLight intensity={0.28} />

        <Suspense fallback={<FallbackLoader />}>
          {/* Realistic High-Res Solar System with Natural Planetary Distribution */}
          <SolarSystem />

          {/* Earth Version Spaceship (Space Shuttle / Orbiter) */}
          <Spaceship shipRef={shipRef} isMouseDown={isMouseDown} />

          {/* Cinematic Chase Camera */}
          <SpaceshipChaseCamera shipRef={shipRef} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
}
