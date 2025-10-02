'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function Avatar3D() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const mousePosition = useMousePosition();

  useFrame((state) => {
    if (!groupRef.current || !headRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle floating animation
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;

    // Mouse tracking - smooth follow
    if (mousePosition) {
      const targetX = (mousePosition.x / window.innerWidth - 0.5) * 0.3;
      const targetY = -(mousePosition.y / window.innerHeight - 0.5) * 0.3;

      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      headRef.current.rotation.x += (targetY - headRef.current.rotation.x) * 0.05;
    }

    // Idle rotation
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#764ba2" />
      </mesh>

      {/* Body */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.8]} />
        <meshStandardMaterial color="#667eea" />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.8, -0.3, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#667eea" />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.8, -0.3, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#667eea" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.2, 0.6, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 0.6, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Pupils */}
      <mesh position={[-0.2, 0.6, 0.58]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.2, 0.6, 0.58]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Lights for the avatar */}
      <pointLight position={[2, 2, 2]} intensity={1} color="#ffffff" />
      <pointLight position={[-2, 2, 2]} intensity={0.5} color="#667eea" />
      <pointLight position={[0, -2, 2]} intensity={0.3} color="#764ba2" />
    </group>
  );
}
