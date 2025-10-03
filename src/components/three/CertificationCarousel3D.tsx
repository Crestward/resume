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

  useFrame(() => {
    if (!groupRef.current) return;

    // Slow auto-rotation
    groupRef.current.rotation.y += 0.003;
  });

  const radius = 4;
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
      {/* Outer glow/shadow */}
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[1.8, 2.4]} />
        <meshBasicMaterial
          color={cert.color}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Card background with gradient effect */}
      <RoundedBox
        args={[1.5, 2.1, 0.12]}
        radius={0.08}
        smoothness={6}
      >
        <meshPhysicalMaterial
          color={cert.color}
          metalness={0.9}
          roughness={0.1}
          emissive={cert.color}
          emissiveIntensity={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      {/* Inner card surface with lighter tint */}
      <RoundedBox
        args={[1.4, 2.0, 0.05]}
        radius={0.05}
        smoothness={4}
        position={[0, 0, 0.07]}
      >
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.3}
          roughness={0.7}
          opacity={0.95}
          transparent
        />
      </RoundedBox>

      {/* Animated rim glow */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[1.6, 2.2]} />
        <meshBasicMaterial
          color={cert.color}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top accent bar */}
      <mesh position={[0, 0.9, 0.11]}>
        <planeGeometry args={[1.35, 0.12]} />
        <meshBasicMaterial color={cert.color} opacity={0.8} transparent />
      </mesh>

      {/* Title with enhanced styling */}
      <Text
        position={[0, 0.5, 0.12]}
        fontSize={0.15}
        color="#FFFFFF"
        maxWidth={1.3}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
        letterSpacing={-0.02}
      >
        {cert.title}
      </Text>

      {/* Issuer with icon */}
      <mesh position={[-0.5, 0.1, 0.12]}>
        <circleGeometry args={[0.06, 32]} />
        <meshBasicMaterial color={cert.color} opacity={0.6} transparent />
      </mesh>
      <Text
        position={[0, 0.1, 0.12]}
        fontSize={0.12}
        color="#D1D5DB"
        maxWidth={1.3}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
        letterSpacing={-0.01}
      >
        {cert.issuer}
      </Text>

      {/* Decorative line */}
      <mesh position={[0, -0.15, 0.12]}>
        <planeGeometry args={[1.1, 0.01]} />
        <meshBasicMaterial color={cert.color} opacity={0.5} transparent />
      </mesh>

      {/* Year badge with better styling */}
      <RoundedBox args={[0.75, 0.28, 0.02]} radius={0.05} smoothness={4} position={[0, -0.4, 0.12]}>
        <meshPhysicalMaterial
          color="#0F172A"
          metalness={0.5}
          roughness={0.3}
          emissive={cert.color}
          emissiveIntensity={0.1}
          transparent
          opacity={0.9}
        />
      </RoundedBox>
      <Text
        position={[0, -0.4, 0.14]}
        fontSize={0.14}
        color="#FCD34D"
        anchorX="center"
        anchorY="middle"
      >
        {cert.year}
      </Text>

      {/* Verification badge with glow */}
      <mesh position={[0, -0.75, 0.11]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color="#10B981" opacity={0.3} transparent />
      </mesh>
      <mesh position={[0, -0.75, 0.12]}>
        <circleGeometry args={[0.16, 32]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, -0.75, 0.13]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ✓
      </Text>

      {/* Corner decorations */}
      <mesh position={[-0.65, 0.85, 0.12]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.08, 0.08]} />
        <meshBasicMaterial color={cert.color} opacity={0.6} transparent />
      </mesh>
      <mesh position={[0.65, 0.85, 0.12]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.08, 0.08]} />
        <meshBasicMaterial color={cert.color} opacity={0.6} transparent />
      </mesh>
    </group>
  );
}
