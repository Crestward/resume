'use client';

import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './ScrollProgress.css';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / documentHeight, 1);
      setScrollProgress(progress);

      // Detect active section
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          setActiveSection(section.id || '');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-bar">
        <div
          className="scroll-progress-fill"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="scroll-progress-3d">
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ProgressBar3D progress={scrollProgress} />
        </Canvas>
      </div>

      {/* Section indicators */}
      <div className="scroll-section-indicators">
        {['hero', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'].map((section, index) => (
          <div
            key={section}
            className={`section-indicator ${activeSection === section ? 'active' : ''}`}
            style={{ top: `${(index / 6) * 100}%` }}
            title={section.charAt(0).toUpperCase() + section.slice(1)}
          >
            <div className="indicator-dot" />
            <div className="indicator-label">{section.charAt(0).toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ProgressBar3DProps {
  progress: number;
}

function ProgressBar3D({ progress }: ProgressBar3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotate the progress bar
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;

    // Pulsing effect
    const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
    meshRef.current.scale.set(1, 1, pulse);

    // Glow effect
    if (glowRef.current) {
      glowRef.current.scale.set(1.2 + pulse * 0.1, 1.2 + pulse * 0.1, 1.2 + pulse * 0.1);
    }
  });

  const barHeight = 4;
  const filledHeight = barHeight * progress;

  return (
    <group>
      {/* Outer glow */}
      <mesh ref={glowRef} position={[0, (filledHeight - barHeight) / 2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, filledHeight || 0.01, 32]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.3} />
      </mesh>

      {/* Main progress bar */}
      <mesh ref={meshRef} position={[0, (filledHeight - barHeight) / 2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, filledHeight || 0.01, 32]} />
        <meshPhysicalMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Background track */}
      <mesh position={[0, 0, -0.05]}>
        <cylinderGeometry args={[0.05, 0.05, barHeight, 32]} />
        <meshStandardMaterial color="#1F2937" opacity={0.3} transparent />
      </mesh>

      {/* Top cap */}
      {progress > 0 && (
        <mesh position={[0, (filledHeight - barHeight) / 2 + filledHeight / 2, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshPhysicalMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      )}
    </group>
  );
}
