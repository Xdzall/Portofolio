import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export default function FloatingShape({ 
  position, 
  geometry = 'sphere', 
  color = '#ffffff', 
  speed = 1, 
  floatSpeed = 1.5, 
  floatIntensity = 1.5, 
  scale = 1 
}) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * speed;
      meshRef.current.rotation.y += delta * 0.3 * speed;
    }
  });

  const getGeometry = () => {
    switch (geometry) {
      case 'torus':
        return <torusKnotGeometry args={[1, 0.3, 128, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'sphere':
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <Float 
      speed={floatSpeed} 
      rotationIntensity={1} 
      floatIntensity={floatIntensity}
      position={position}
    >
      <mesh ref={meshRef} scale={scale}>
        {getGeometry()}
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
    </Float>
  );
}
