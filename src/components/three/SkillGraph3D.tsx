'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { skillsData } from '@/types/skills';

interface SkillGraph3DProps {
  selectedCategory?: string;
}

export default function SkillGraph3D({ selectedCategory }: SkillGraph3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Faster rotation
    groupRef.current.rotation.y += 0.005;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  const filteredSkills = selectedCategory
    ? skillsData.filter((skill) => skill.category === selectedCategory)
    : skillsData;

  return (
    <group ref={groupRef}>
      {/* Render connections first (so they appear behind nodes) */}
      {filteredSkills.map((skill) =>
        skill.connections.map((connectionId) => {
          const connectedSkill = skillsData.find((s) => s.id === connectionId);
          if (!connectedSkill || !filteredSkills.find((s) => s.id === connectionId)) return null;

          const start = new THREE.Vector3(...skill.position);
          const end = new THREE.Vector3(...connectedSkill.position);
          const distance = start.distanceTo(end);

          const midPoint = new THREE.Vector3().lerpVectors(start, end, 0.5);
          const direction = new THREE.Vector3().subVectors(end, start);
          const quaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.normalize()
          );

          return (
            <mesh
              key={`${skill.id}-${connectionId}`}
              position={midPoint}
              quaternion={quaternion}
            >
              <cylinderGeometry args={[0.01, 0.01, distance, 8]} />
              <meshBasicMaterial
                color={skill.color}
                transparent
                opacity={hoveredSkill === skill.id || hoveredSkill === connectionId ? 0.6 : 0.2}
              />
            </mesh>
          );
        })
      )}

      {/* Render skill nodes */}
      {filteredSkills.map((skill) => (
        <SkillNode
          key={skill.id}
          skill={skill}
          isHovered={hoveredSkill === skill.id}
          onHover={() => setHoveredSkill(skill.id)}
          onUnhover={() => setHoveredSkill(null)}
        />
      ))}
    </group>
  );
}

interface SkillNodeProps {
  skill: {
    id: number;
    name: string;
    proficiency: number;
    color: string;
    position: [number, number, number];
  };
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
}

function SkillNode({ skill, isHovered, onHover, onUnhover }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Floating animation
    const floatY = Math.sin(state.clock.elapsedTime * 0.5 + skill.id) * 0.1;
    meshRef.current.position.y = skill.position[1] + floatY;

    // Rotation
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.005;

    // Pulsing glow
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + skill.id) * 0.1;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  // Size based on proficiency (50-100 -> 0.15-0.3)
  const size = 0.15 + (skill.proficiency / 100) * 0.15;

  return (
    <group position={[skill.position[0], skill.position[1], skill.position[2]]}>
      {/* Main sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={onHover}
        onPointerOut={onUnhover}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 0.8 : 0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.5, 16, 16]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={isHovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Skill name label */}
      <Text
        position={[0, -size - 0.3, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {skill.name}
      </Text>

      {/* Proficiency percentage (visible on hover) */}
      {isHovered && (
        <Text
          position={[0, size + 0.3, 0]}
          fontSize={0.12}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {skill.proficiency}%
        </Text>
      )}
    </group>
  );
}
