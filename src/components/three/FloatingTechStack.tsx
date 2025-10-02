'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

const techStack = [
  { name: 'React', color: '#61DAFB', position: [3, 2, 0], speed: 1 },
  { name: 'Next.js', color: '#000000', position: [-3, 1.5, 0], speed: 1.1 },
  { name: 'TypeScript', color: '#3178C6', position: [2.5, -2, 1], speed: 0.9 },
  { name: 'Three.js', color: '#000000', position: [-2, -1, -1], speed: 1.2 },
  { name: 'GSAP', color: '#88CE02', position: [1, 3, -1], speed: 0.8 },
  { name: 'Tailwind', color: '#06B6D4', position: [-3, -2, 0.5], speed: 1.3 },
  { name: 'WebGL', color: '#990000', position: [3, -1, -0.5], speed: 0.7 },
  { name: 'Node.js', color: '#339933', position: [-1, 2.5, 1], speed: 1.1 },
  { name: 'Git', color: '#F05032', position: [2, 0, 1.5], speed: 0.9 },
  { name: 'Webpack', color: '#8DD6F9', position: [-2.5, 0.5, -1.5], speed: 1.2 },
  { name: 'Vite', color: '#646CFF', position: [1.5, -2.5, 0], speed: 0.8 },
  { name: 'CSS3', color: '#1572B6', position: [-1.5, 1, 1.5], speed: 1.4 },
  { name: 'HTML5', color: '#E34F26', position: [0, -3, 0.5], speed: 1 },
  { name: 'JavaScript', color: '#F7DF1E', position: [2.8, 1, -1], speed: 1.1 },
  { name: 'Sass', color: '#CC6699', position: [-2.8, -0.5, 0.5], speed: 0.9 },
  { name: 'Redux', color: '#764ABC', position: [0.5, 2.8, 0], speed: 1.2 },
  { name: 'GraphQL', color: '#E10098', position: [-0.5, -2.8, -0.5], speed: 0.8 },
  { name: 'REST API', color: '#FF6C37', position: [3.2, 0.5, 0.5], speed: 1.3 },
  { name: 'MongoDB', color: '#47A248', position: [-3.2, 0.8, -0.5], speed: 0.7 },
  { name: 'PostgreSQL', color: '#336791', position: [1.2, -1.5, 1.5], speed: 1.1 },
  { name: 'Docker', color: '#2496ED', position: [-1.2, 2.2, -1], speed: 0.9 },
  { name: 'AWS', color: '#FF9900', position: [2.2, -0.8, -1.2], speed: 1.2 },
  { name: 'Figma', color: '#F24E1E', position: [-2.2, 1.8, 1], speed: 0.8 },
  { name: 'Jest', color: '#C21325', position: [0.8, 1.2, -1.8], speed: 1.4 },
  { name: 'Cypress', color: '#17202C', position: [-0.8, -1.8, 1.2], speed: 1 },
];

export default function FloatingTechStack() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // Gentle group rotation
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={groupRef}>
      {techStack.map((tech, index) => (
        <TechIcon
          key={index}
          name={tech.name}
          color={tech.color}
          position={tech.position as [number, number, number]}
          speed={tech.speed}
          index={index}
        />
      ))}
    </group>
  );
}

interface TechIconProps {
  name: string;
  color: string;
  position: [number, number, number];
  speed: number;
  index: number;
}

function TechIcon({ name, color, position, speed, index }: TechIconProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime * speed;

    // Orbit animation
    const radius = 3;
    const x = Math.cos(time + index) * radius;
    const z = Math.sin(time + index) * radius;
    const y = Math.sin(time * 0.5 + index) * 1;

    meshRef.current.position.set(x, y, z);

    // Gentle rotation
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;

    // Pulsing glow
    if (glowRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.1;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        {/* Main icon box */}
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Text label */}
      <Text
        position={[position[0], position[1] - 0.5, position[2]]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}
