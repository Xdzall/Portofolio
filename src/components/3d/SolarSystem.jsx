import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// Orbit line helper with specific orbital inclination
function OrbitRing({ radius, inclination = 0 }) {
  const lineGeometry = useMemo(() => {
    const pts = [];
    const segments = 160;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);

  return (
    <group rotation={[inclination, 0, 0]}>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="#6a58cc" opacity={0.25} transparent />
      </line>
    </group>
  );
}

// Textured Planet with realistic orbital phase, speed, axial tilt & inclination
function RealPlanet({ 
  name, 
  radius, 
  size, 
  speed, 
  initialAngle = 0,
  inclination = 0,
  texturePath, 
  cloudsTexturePath,
  normalTexturePath,
  specularTexturePath,
  roughness = 0.6, 
  metalness = 0.05,
  hasRings = false,
  ringInner = 1.3,
  ringOuter = 2.5,
  ringTexturePath,
  axialTilt = 0.1,
  hasMoon = false,
  moonTexturePath
}) {
  const orbitGroupRef = useRef();
  const planetMeshRef = useRef();
  const cloudsMeshRef = useRef();
  const moonOrbitRef = useRef();
  
  // Track current orbital angle starting from initial angle
  const currentAngle = useRef(initialAngle);

  // Load textures
  const texture = useLoader(TextureLoader, texturePath);
  const cloudsTexture = cloudsTexturePath ? useLoader(TextureLoader, cloudsTexturePath) : null;
  const normalMap = normalTexturePath ? useLoader(TextureLoader, normalTexturePath) : null;
  const specularMap = specularTexturePath ? useLoader(TextureLoader, specularTexturePath) : null;
  const ringTexture = ringTexturePath ? useLoader(TextureLoader, ringTexturePath) : null;
  const moonTexture = moonTexturePath ? useLoader(TextureLoader, moonTexturePath) : null;

  useFrame((state, delta) => {
    // Increment orbital revolution angle
    currentAngle.current += speed * 0.04 * delta;
    
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = currentAngle.current;
    }
    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y += 0.35 * delta;
    }
    if (cloudsMeshRef.current) {
      cloudsMeshRef.current.rotation.y += 0.5 * delta;
    }
    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y += 1.4 * delta;
    }
  });

  return (
    <group rotation={[inclination, 0, 0]}>
      {/* Individual Orbit Line matching inclination */}
      <OrbitRing radius={radius} inclination={0} />

      {/* Orbiting Planet Group */}
      <group ref={orbitGroupRef} rotation={[0, initialAngle, 0]}>
        <group position={[radius, 0, 0]} rotation={[axialTilt, 0, 0]}>
          {/* Planet Body */}
          <mesh ref={planetMeshRef} castShadow receiveShadow>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial 
              map={texture} 
              normalMap={normalMap}
              roughnessMap={specularMap}
              roughness={roughness} 
              metalness={metalness}
            />
          </mesh>

          {/* Clouds Layer (Earth) */}
          {cloudsTexture && (
            <mesh ref={cloudsMeshRef}>
              <sphereGeometry args={[size * 1.025, 64, 64]} />
              <meshStandardMaterial 
                map={cloudsTexture} 
                transparent 
                opacity={0.82} 
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          )}

          {/* Planetary Rings (Saturn / Uranus) */}
          {hasRings && ringTexture && (
            <mesh rotation={[Math.PI / 2.3, 0, 0]}>
              <ringGeometry args={[size * ringInner, size * ringOuter, 64]} />
              <meshStandardMaterial 
                map={ringTexture}
                side={THREE.DoubleSide} 
                transparent 
                opacity={0.92}
                roughness={0.4}
              />
            </mesh>
          )}

          {/* Earth's Moon */}
          {hasMoon && (
            <group ref={moonOrbitRef}>
              <mesh position={[size * 2.4, 0.15, 0]}>
                <sphereGeometry args={[size * 0.27, 32, 32]} />
                <meshStandardMaterial map={moonTexture || texture} roughness={0.9} />
              </mesh>
            </group>
          )}
        </group>
      </group>
    </group>
  );
}

// Realistic 3D Asteroid Belt
function RealisticAsteroidBelt({ count = 220, innerRadius = 17.0, outerRadius = 21.5 }) {
  const beltRef = useRef();

  const asteroids = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = innerRadius + Math.random() * (outerRadius - innerRadius);
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const y = (Math.random() - 0.5) * 2.2;
      const scale = 0.04 + Math.random() * 0.15;
      const rot = [Math.random() * Math.PI, Math.random() * Math.PI, 0];
      items.push({ position: [x, y, z], scale, rot });
    }
    return items;
  }, [count, innerRadius, outerRadius]);

  useFrame((state, delta) => {
    if (beltRef.current) {
      beltRef.current.rotation.y += 0.012 * delta;
    }
  });

  return (
    <group ref={beltRef}>
      {asteroids.map((ast, idx) => (
        <mesh key={idx} position={ast.position} scale={ast.scale} rotation={ast.rot}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#727080" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export default function SolarSystem() {
  const sunRef = useRef();
  const sunCoronaRef = useRef();
  const sunTexture = useLoader(TextureLoader, '/textures/sun.jpg');
  const spaceBackground = useLoader(TextureLoader, '/textures/milkyway.jpg');

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.06 * delta;
    }
    if (sunCoronaRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.04;
      sunCoronaRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Deep Space Milky Way Skybox Sphere */}
      <mesh>
        <sphereGeometry args={[300, 64, 64]} />
        <meshBasicMaterial map={spaceBackground} side={THREE.BackSide} />
      </mesh>

      {/* Sun Point Light Casting Light on All Planets */}
      <pointLight position={[0, 0, 0]} intensity={5.5} distance={300} color="#fff8e7" decay={0.15} />

      {/* The Sun */}
      <group position={[0, 0, 0]}>
        <mesh ref={sunRef}>
          <sphereGeometry args={[3.2, 64, 64]} />
          <meshBasicMaterial map={sunTexture} />
        </mesh>

        {/* Sun Corona Pulse Glow */}
        <mesh ref={sunCoronaRef}>
          <sphereGeometry args={[3.65, 32, 32]} />
          <meshBasicMaterial 
            color="#ff5500" 
            transparent 
            opacity={0.38} 
            side={THREE.BackSide} 
          />
        </mesh>
        
        {/* Outer Solar Atmosphere */}
        <mesh>
          <sphereGeometry args={[4.4, 32, 32]} />
          <meshBasicMaterial 
            color="#ffa000" 
            transparent 
            opacity={0.14} 
          />
        </mesh>
      </group>

      {/* 
        NATURAL PLANETARY DISTRIBUTION:
        Each planet has a distinct initial orbital angle (scattered around the sun)
        and realistic orbital inclination!
      */}

      {/* 1. Mercury (fast, inclined 7.0°) */}
      <RealPlanet 
        name="Mercury"
        radius={5.6}
        size={0.38}
        speed={1.6}
        initialAngle={0.9}
        inclination={0.12}
        texturePath="/textures/mercury.jpg"
        roughness={0.9}
        axialTilt={0.03}
      />

      {/* 2. Venus (retrograde rotation, inclined 3.4°) */}
      <RealPlanet 
        name="Venus"
        radius={8.4}
        size={0.7}
        speed={1.15}
        initialAngle={2.6}
        inclination={0.06}
        texturePath="/textures/venus.jpg"
        roughness={0.5}
        axialTilt={3.1}
      />

      {/* 3. Earth & Moon (home planet, inclined 0°) */}
      <RealPlanet 
        name="Earth"
        radius={12.0}
        size={0.88}
        speed={0.85}
        initialAngle={4.3}
        inclination={0.0}
        texturePath="/textures/earth.jpg"
        cloudsTexturePath="/textures/earth_clouds.png"
        normalTexturePath="/textures/earth_normal.jpg"
        specularTexturePath="/textures/earth_specular.jpg"
        roughness={0.35}
        metalness={0.1}
        axialTilt={0.41}
        hasMoon={true}
        moonTexturePath="/textures/moon.jpg"
      />

      {/* 4. Mars (inclined 1.85°) */}
      <RealPlanet 
        name="Mars"
        radius={15.8}
        size={0.56}
        speed={0.68}
        initialAngle={1.4}
        inclination={0.03}
        texturePath="/textures/mars.jpg"
        roughness={0.8}
        axialTilt={0.44}
      />

      {/* Asteroid Belt */}
      <RealisticAsteroidBelt count={220} innerRadius={17.5} outerRadius={21.5} />

      {/* 5. Jupiter (giant, inclined 1.3°) */}
      <RealPlanet 
        name="Jupiter"
        radius={26.5}
        size={2.2}
        speed={0.4}
        initialAngle={5.5}
        inclination={0.02}
        texturePath="/textures/jupiter.jpg"
        roughness={0.5}
        axialTilt={0.05}
      />

      {/* 6. Saturn with Rings (inclined 2.5°) */}
      <RealPlanet 
        name="Saturn"
        radius={34.5}
        size={1.7}
        speed={0.29}
        initialAngle={3.2}
        inclination={0.04}
        texturePath="/textures/saturn.jpg"
        roughness={0.5}
        hasRings={true}
        ringInner={1.3}
        ringOuter={2.7}
        ringTexturePath="/textures/saturn_ring.png"
        axialTilt={0.47}
      />

      {/* 7. Uranus with Rings (inclined 0.77°, tilted on side) */}
      <RealPlanet 
        name="Uranus"
        radius={41.5}
        size={1.2}
        speed={0.21}
        initialAngle={1.9}
        inclination={0.015}
        texturePath="/textures/uranus.jpg"
        roughness={0.3}
        hasRings={true}
        ringInner={1.2}
        ringOuter={1.7}
        ringTexturePath="/textures/uranus_ring.png"
        axialTilt={1.7}
      />

      {/* 8. Neptune (outermost, inclined 1.77°) */}
      <RealPlanet 
        name="Neptune"
        radius={48.0}
        size={1.15}
        speed={0.15}
        initialAngle={4.9}
        inclination={0.03}
        texturePath="/textures/neptune.jpg"
        roughness={0.3}
        axialTilt={0.5}
      />
    </group>
  );
}
