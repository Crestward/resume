'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function MorphingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useMousePosition();

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Morphing animation
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.z = Math.cos(time * 0.3) * 0.2;

    // Mouse tracking with momentum
    if (mousePosition) {
      const targetRotationY = (mousePosition.x / window.innerWidth - 0.5) * Math.PI * 0.3;
      const targetRotationX = (mousePosition.y / window.innerHeight - 0.5) * Math.PI * 0.3;

      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
    }

    // Scale pulsing
    const scale = 1 + Math.sin(time * 0.5) * 0.1;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial
        color="#764ba2"
        metalness={0.8}
        roughness={0.2}
        wireframe={false}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#667eea" />
    </mesh>
  );
}
