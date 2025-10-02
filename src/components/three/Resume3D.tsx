'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, RoundedBox } from '@react-three/drei';

export default function Resume3D() {
  const groupRef = useRef<THREE.Group>(null);
  const pageRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Gentle floating animation
    const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    groupRef.current.position.y = floatY;

    // Subtle rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

    // Page glow effect
    if (pageRef.current && pageRef.current.material instanceof THREE.MeshStandardMaterial) {
      const glowIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      pageRef.current.material.emissiveIntensity = glowIntensity;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Resume page */}
      <RoundedBox
        ref={pageRef}
        args={[3, 4, 0.05]}
        radius={0.02}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.1}
          roughness={0.2}
          emissive="#10B981"
          emissiveIntensity={0.3}
        />
      </RoundedBox>

      {/* Resume icon/text */}
      <Text
        position={[0, 1.3, 0.03]}
        fontSize={0.3}
        color="#1F2937"
        anchorX="center"
        anchorY="middle"
      >
        📄
      </Text>

      <Text
        position={[0, 0.7, 0.03]}
        fontSize={0.2}
        color="#1F2937"
        maxWidth={2.5}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Oladimeji Adeyemi
      </Text>

      <Text
        position={[0, 0.3, 0.03]}
        fontSize={0.12}
        color="#6B7280"
        maxWidth={2.5}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Data Scientist & AI Engineer
      </Text>

      {/* Resume content lines */}
      {[0, -0.3, -0.6, -0.9, -1.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0.03]}>
          <planeGeometry args={[2.2, 0.08]} />
          <meshBasicMaterial color="#E5E7EB" transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Download indicator */}
      <mesh position={[0, -1.6, 0.03]}>
        <circleGeometry args={[0.15, 32]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>
      <Text
        position={[0, -1.6, 0.04]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ↓
      </Text>

      {/* Glow effect behind */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[3.5, 4.5]} />
        <meshBasicMaterial
          color="#10B981"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
