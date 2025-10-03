'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const mousePosition = useMousePosition();
  const { scrollVelocity } = useScrollProgress();

  // Particle count based on device - more particles on mobile for better visibility
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 2500 : 5000;

  // Create particle positions
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return pos;
  }, [particleCount]);

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3 + 1] = Math.sin(time + positions[i3]) * 0.5;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Mouse interaction
    if (mousePosition) {
      const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
      const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;

      pointsRef.current.rotation.x = mouseY * 0.1;
      pointsRef.current.rotation.y = mouseX * 0.1;
    }

    // Color shifting based on scroll velocity
    if (materialRef.current) {
      const baseColor = new THREE.Color('#667eea');
      const fastColor = new THREE.Color('#f093fb');
      materialRef.current.color.lerpColors(baseColor, fastColor, scrollVelocity);
    }
  });

  // Create buffer geometry
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  // Adjust opacity and size based on device
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleSize = isMobile ? 0.04 : 0.02;
  const particleOpacity = isMobile ? 0.8 : 0.6;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        size={particleSize}
        color="#667eea"
        transparent
        opacity={particleOpacity}
        sizeAttenuation
      />
    </points>
  );
}
