'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface Timeline3DProps {
  count: number;
}

export default function Timeline3D({ count }: Timeline3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Gentle rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Timeline line */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, count * 3, 16]} />
        <meshStandardMaterial
          color="#667eea"
          emissive="#667eea"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Timeline markers */}
      {Array.from({ length: count }).map((_, index) => (
        <group key={index} position={[0, (count - 1 - index) * 3 - (count * 3) / 2 + 1.5, 0]}>
          {/* Pulsing sphere marker */}
          <mesh>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial
              color="#f093fb"
              emissive="#f093fb"
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Glow ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.25, 0.02, 16, 32]} />
            <meshBasicMaterial color="#667eea" transparent opacity={0.6} />
          </mesh>

          {/* Year label */}
          <Text
            position={[0.8, 0, 0]}
            fontSize={0.2}
            color="white"
            anchorX="left"
            anchorY="middle"
          >
            {2025 - index}
          </Text>
        </group>
      ))}

      {/* Ambient particles */}
      {Array.from({ length: 20 }).map((_, index) => {
        const x = (Math.random() - 0.5) * 4;
        const y = (Math.random() - 0.5) * count * 3;
        const z = (Math.random() - 0.5) * 4;

        return (
          <mesh key={`particle-${index}`} position={[x, y, z]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#667eea" transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}
