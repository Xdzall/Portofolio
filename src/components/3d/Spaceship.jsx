import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Spaceship({ 
  shipRef,
  isMouseDown = false
}) {
  const modelRef = useRef();
  const mainFlameRef = useRef();
  const leftFlameRef = useRef();
  const rightFlameRef = useRef();
  const engineLightRef = useRef();

  // Flight parameters with realistic aerospace inertia
  const flight = useRef({
    position: new THREE.Vector3(0, 2, 22),
    yaw: 0,
    pitch: 0,
    roll: 0,
    speed: 0,
    targetSpeed: 0,
    maxSpeed: 0.28,
    turnSpeed: 0.65 // Smoothed, reduced sensitivity
  });

  useFrame((state, delta) => {
    if (!shipRef.current) return;

    const f = flight.current;
    const rawX = state.pointer.x; // [-1 (left), 1 (right)]
    const rawY = state.pointer.y; // [-1 (bottom), 1 (top)]

    // Deadzone filter & progressive curve for ultra-smooth control
    const deadzone = 0.05;
    const px = Math.abs(rawX) > deadzone 
      ? Math.sign(rawX) * Math.pow((Math.abs(rawX) - deadzone) / (1 - deadzone), 1.35) 
      : 0;
    const py = Math.abs(rawY) > deadzone 
      ? Math.sign(rawY) * Math.pow((Math.abs(rawY) - deadzone) / (1 - deadzone), 1.35) 
      : 0;

    // Smooth Steer Rates
    // Yaw: Left/Right turning
    const turnDelta = -px * f.turnSpeed * delta;
    f.yaw += turnDelta;

    // Pitch: Up/Down nose tilt (gentle response)
    const targetPitch = py * 0.45;
    f.pitch = THREE.MathUtils.lerp(f.pitch, targetPitch, 0.045);

    // Roll: Wing banking into turns (authentic aerospace feel)
    const targetRoll = -px * 0.55;
    f.roll = THREE.MathUtils.lerp(f.roll, targetRoll, 0.05);

    // Movement: ONLY accelerate forward when mouse is PRESSED / HELD
    if (isMouseDown) {
      f.targetSpeed = f.maxSpeed;
    } else {
      f.targetSpeed = 0;
    }

    // Smooth thrust acceleration and gentle glide deceleration
    f.speed = THREE.MathUtils.lerp(f.speed, f.targetSpeed, isMouseDown ? 0.04 : 0.06);

    // Forward direction in 3D (-Z is forward)
    const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(f.pitch, f.yaw, 0, 'YXZ'));

    // Move forward when engine thrust > 0
    if (f.speed > 0.0005) {
      f.position.addScaledVector(forward, f.speed * (delta * 60));
    }

    // Soft orbital boundary wrapping
    if (f.position.length() > 72) {
      f.yaw += Math.PI * 0.01;
    }
    f.position.y = THREE.MathUtils.clamp(f.position.y, -32, 32);

    // Apply transformation to 3D Spaceplane
    shipRef.current.position.copy(f.position);
    shipRef.current.rotation.set(f.pitch, f.yaw, f.roll, 'YXZ');

    // Engine Rocket Plume Animation (Warm orange/yellow core + blue shock plume)
    const isThrusting = isMouseDown || f.speed > 0.04;
    const thrustRatio = f.speed / f.maxSpeed;
    const flicker = 1 + (Math.sin(state.clock.elapsedTime * 30) * 0.15);
    const flameScale = isThrusting ? Math.max(thrustRatio * flicker, 0.25) : 0.001;

    if (mainFlameRef.current && leftFlameRef.current && rightFlameRef.current) {
      mainFlameRef.current.scale.set(flameScale * 1.1, flameScale * 1.1, flameScale * 1.6);
      leftFlameRef.current.scale.set(flameScale * 0.85, flameScale * 0.85, flameScale * 1.3);
      rightFlameRef.current.scale.set(flameScale * 0.85, flameScale * 0.85, flameScale * 1.3);

      mainFlameRef.current.visible = isThrusting;
      leftFlameRef.current.visible = isThrusting;
      rightFlameRef.current.visible = isThrusting;
    }

    if (engineLightRef.current) {
      engineLightRef.current.intensity = isThrusting ? 3.0 * thrustRatio : 0;
    }
  });

  return (
    <group ref={shipRef} position={[0, 2, 22]}>
      {/* 
        AUTHENTIC EARTH SPACECRAFT / SPACE SHUTTLE ORBITER MODEL:
        - White thermal tile fuselage
        - Black heat shield belly & nose cap
        - Multi-pane flight deck cockpit windows
        - Delta wings with black leading edges & navigation lights
        - Distinctive vertical stabilizer tail fin
        - 3 Main Rocket Engines (triangular cluster) + 2 OMS pods
      */}
      <group ref={modelRef} scale={[0.42, 0.42, 0.42]}>
        
        {/* Main Orbiter Fuselage Body (White Top) */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.62, 0.72, 3.2, 16]} />
          <meshStandardMaterial 
            color="#e8e8ed" 
            roughness={0.4} 
            metalness={0.2}
          />
        </mesh>

        {/* Black Thermal Heat Shield Belly (Bottom Half) */}
        <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.63, 0.73, 3.22, 16, 1, false, Math.PI / 2, Math.PI]} />
          <meshStandardMaterial 
            color="#141418" 
            roughness={0.8} 
            metalness={0.1}
          />
        </mesh>

        {/* Aerodynamic Nose Section (Forward -Z) */}
        <mesh position={[0, 0, -1.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.62, 0.9, 16]} />
          <meshStandardMaterial color="#e8e8ed" roughness={0.4} />
        </mesh>

        {/* Black Ceramic Nose Cap (Frontmost tip) */}
        <mesh position={[0, 0, -2.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshStandardMaterial color="#111116" roughness={0.7} />
        </mesh>

        {/* Cockpit Flight Deck Windows (6-pane black glass array on top +Y) */}
        <group position={[0, 0.35, -1.2]} rotation={[-0.32, 0, 0]}>
          {/* Front windshields */}
          <mesh position={[-0.14, 0, 0]}>
            <boxGeometry args={[0.18, 0.14, 0.05]} />
            <meshStandardMaterial color="#0a0a14" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.14, 0, 0]}>
            <boxGeometry args={[0.18, 0.14, 0.05]} />
            <meshStandardMaterial color="#0a0a14" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Side windows */}
          <mesh position={[-0.26, -0.04, 0.1]} rotation={[0, -0.5, 0]}>
            <boxGeometry args={[0.12, 0.12, 0.04]} />
            <meshStandardMaterial color="#0a0a14" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.26, -0.04, 0.1]} rotation={[0, 0.5, 0]}>
            <boxGeometry args={[0.12, 0.12, 0.04]} />
            <meshStandardMaterial color="#0a0a14" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* Double-Delta Wings (White with black leading edges) */}
        {/* Left Wing (-X) */}
        <group position={[-1.4, -0.15, 0.5]}>
          <mesh rotation={[0, 0, -0.05]}>
            <boxGeometry args={[2.0, 0.07, 2.0]} />
            <meshStandardMaterial color="#e0e0e6" roughness={0.4} />
          </mesh>
          {/* Black Leading Edge */}
          <mesh position={[-0.5, 0, -0.8]} rotation={[0, 0.45, 0]}>
            <boxGeometry args={[1.5, 0.09, 0.16]} />
            <meshStandardMaterial color="#16161c" roughness={0.8} />
          </mesh>
          {/* Port Navigation Light (Red) */}
          <mesh position={[-1.02, 0, 0.6]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#ff2222" />
          </mesh>
        </group>

        {/* Right Wing (+X) */}
        <group position={[1.4, -0.15, 0.5]}>
          <mesh rotation={[0, 0, 0.05]}>
            <boxGeometry args={[2.0, 0.07, 2.0]} />
            <meshStandardMaterial color="#e0e0e6" roughness={0.4} />
          </mesh>
          {/* Black Leading Edge */}
          <mesh position={[0.5, 0, -0.8]} rotation={[0, -0.45, 0]}>
            <boxGeometry args={[1.5, 0.09, 0.16]} />
            <meshStandardMaterial color="#16161c" roughness={0.8} />
          </mesh>
          {/* Starboard Navigation Light (Green) */}
          <mesh position={[1.02, 0, 0.6]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#00ff44" />
          </mesh>
        </group>

        {/* Vertical Tail Stabilizer (Vertical Tail Fin +Y at rear +Z) */}
        <group position={[0, 0.85, 1.1]} rotation={[0.25, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.09, 1.4, 1.1]} />
            <meshStandardMaterial color="#e8e8ed" roughness={0.4} />
          </mesh>
          {/* Black Leading Edge on Tail */}
          <mesh position={[0, 0.35, -0.55]} rotation={[-0.35, 0, 0]}>
            <boxGeometry args={[0.11, 1.1, 0.12]} />
            <meshStandardMaterial color="#16161c" roughness={0.8} />
          </mesh>
          {/* Blue NASA / Earth Emblem Accent */}
          <mesh position={[0.05, 0.1, 0.1]}>
            <boxGeometry args={[0.01, 0.28, 0.28]} />
            <meshStandardMaterial color="#0b3d91" roughness={0.3} />
          </mesh>
          <mesh position={[-0.05, 0.1, 0.1]}>
            <boxGeometry args={[0.01, 0.28, 0.28]} />
            <meshStandardMaterial color="#0b3d91" roughness={0.3} />
          </mesh>
        </group>

        {/* OMS (Orbital Maneuvering System) Pods (Left & Right of tail) */}
        <mesh position={[-0.45, 0.35, 1.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.8, 12]} />
          <meshStandardMaterial color="#e0e0e6" roughness={0.5} />
        </mesh>
        <mesh position={[0.45, 0.35, 1.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.8, 12]} />
          <meshStandardMaterial color="#e0e0e6" roughness={0.5} />
        </mesh>

        {/* 
          3 Main Space Shuttle Rocket Engine Nozzles (SSME Cluster at rear +Z)
          - Top Center Engine
          - Bottom Left Engine
          - Bottom Right Engine
        */}
        {/* Top Center Engine */}
        <mesh position={[0, 0.38, 1.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.45, 16]} />
          <meshStandardMaterial color="#2d2d35" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh ref={mainFlameRef} position={[0, 0.38, 2.4]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.24, 1.5, 16]} />
          <meshBasicMaterial color="#ffaa22" transparent opacity={0.88} />
        </mesh>

        {/* Bottom Left Engine */}
        <mesh position={[-0.32, -0.15, 1.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.26, 0.45, 16]} />
          <meshStandardMaterial color="#2d2d35" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh ref={leftFlameRef} position={[-0.32, -0.15, 2.3]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.2, 1.3, 16]} />
          <meshBasicMaterial color="#ff7711" transparent opacity={0.85} />
        </mesh>

        {/* Bottom Right Engine */}
        <mesh position={[0.32, -0.15, 1.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.26, 0.45, 16]} />
          <meshStandardMaterial color="#2d2d35" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh ref={rightFlameRef} position={[0.32, -0.15, 2.3]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.2, 1.3, 16]} />
          <meshBasicMaterial color="#ff7711" transparent opacity={0.85} />
        </mesh>

        {/* Rocket Exhaust Illumination Light */}
        <pointLight ref={engineLightRef} position={[0, 0.1, 2.3]} intensity={0} distance={15} color="#ff9922" />
      </group>
    </group>
  );
}
