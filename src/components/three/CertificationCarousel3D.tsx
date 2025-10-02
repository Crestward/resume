'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, RoundedBox } from '@react-three/drei';
import { certifications } from '@/types/certifications';

interface CertificationCarousel3DProps {
  onCardClick?: (id: number) => void;
}

export default function CertificationCarousel3D({ onCardClick }: CertificationCarousel3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Slow auto-rotation
    groupRef.current.rotation.y += 0.003;
  });

  const radius = 5;
  const angleStep = (Math.PI * 2) / certifications.length;

  return (
    <group ref={groupRef}>
      {certifications.map((cert, index) => {
        const angle = angleStep * index;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(index * 0.5) * 0.5; // Slight helix effect

        return (
          <CertCard
            key={cert.id}
            cert={cert}
            position={[x, y, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
            onClick={onCardClick}
          />
        );
      })}
    </group>
  );
}

interface CertCardProps {
  cert: {
    id: number;
    title: string;
    issuer: string;
    year: number;
    color: string;
  };
  position: [number, number, number];
  rotation: [number, number, number];
  onClick?: (id: number) => void;
}

function CertCard({ cert, position, rotation, onClick }: CertCardProps) {
  const cardRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!cardRef.current) return;

    // Floating animation
    const floatY = Math.sin(state.clock.elapsedTime * 0.5 + cert.id) * 0.1;
    cardRef.current.position.y = position[1] + floatY;

    // Pulsing glow
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + cert.id) * 0.05;
      glowRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group
      ref={cardRef}
      position={position}
      rotation={rotation}
      onClick={() => onClick?.(cert.id)}
    >
      {/* Card background */}
      <RoundedBox
        args={[2, 2.8, 0.1]}
        radius={0.05}
        smoothness={4}
      >
        <meshStandardMaterial
          color={cert.color}
          metalness={0.8}
          roughness={0.2}
          emissive={cert.color}
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      {/* Glow effect */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[2.2, 3, 1]} />
        <meshBasicMaterial
          color={cert.color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 0.8, 0.06]}
        fontSize={0.18}
        color="white"
        maxWidth={1.8}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {cert.title}
      </Text>

      {/* Issuer */}
      <Text
        position={[0, 0.3, 0.06]}
        fontSize={0.14}
        color="#E5E7EB"
        maxWidth={1.8}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {cert.issuer}
      </Text>

      {/* Year badge */}
      <mesh position={[0, -0.3, 0.06]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshBasicMaterial color="#1F2937" transparent opacity={0.8} />
      </mesh>
      <Text
        position={[0, -0.3, 0.07]}
        fontSize={0.16}
        color="#FCD34D"
        anchorX="center"
        anchorY="middle"
      >
        {cert.year}
      </Text>

      {/* Verification badge */}
      <mesh position={[0, -0.8, 0.06]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>
      <Text
        position={[0, -0.8, 0.07]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ✓
      </Text>
    </group>
  );
}
