import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ParticleField({ count = 200, color = "#8b83ff" }) {
  const pointsRef = useRef();

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phs = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z
      phs[i] = Math.random() * Math.PI * 2;
    }
    return [pos, phs];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positionsArray = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        // slow Y drift
        positionsArray[i * 3 + 1] += delta * 0.1;
        // sine wave on X
        positionsArray[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + phases[i]) * 0.002;
        
        // Wrap around if it goes too high
        if (positionsArray[i * 3 + 1] > 10) {
          positionsArray[i * 3 + 1] = -10;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={positions} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color={color} 
        transparent 
        opacity={0.4} 
        sizeAttenuation 
      />
    </points>
  );
}
