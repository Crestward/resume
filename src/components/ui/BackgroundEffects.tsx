'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './BackgroundEffects.css';

export default function BackgroundEffects() {
  return (
    <div className="background-effects">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <GradientMesh />
        <ParticleField />
      </Canvas>
      <div className="noise-overlay" />
    </div>
  );
}

function GradientMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Slow morphing animation
    const time = state.clock.elapsedTime * 0.3;

    // Update vertex positions for wave effect
    const geometry = meshRef.current.geometry;
    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      const wave1 = Math.sin(x * 0.5 + time) * 0.3;
      const wave2 = Math.cos(y * 0.5 + time * 0.7) * 0.3;
      const z = wave1 + wave2;

      positions.setZ(i, z);
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();

    // Rotate the mesh slowly
    meshRef.current.rotation.z = time * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshStandardMaterial
        color="#1e293b"
        wireframe={false}
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      >
        <shaderMaterial
          attach="material"
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          uniforms={{
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color('#10b981') },
            uColor2: { value: new THREE.Color('#3b82f6') },
            uColor3: { value: new THREE.Color('#8b5cf6') },
          }}
        />
      </meshStandardMaterial>
    </mesh>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const geometry = particlesRef.current.geometry;
    const positions = new Float32Array(1000 * 3);

    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.elapsedTime * 0.2;
    particlesRef.current.rotation.y = time;
    particlesRef.current.rotation.x = time * 0.5;

    // Animate particles
    const positions = particlesRef.current.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const i3 = i * 3;
      const x = positions.array[i3];
      const y = positions.array[i3 + 1];

      positions.array[i3 + 2] = Math.sin(time + x * 0.1 + y * 0.1) * 2;
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.05}
        color="#10b981"
        transparent
        opacity={0.3}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vElevation = modelPosition.z;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec2 vUv;
  varying float vElevation;

  void main() {
    float mixStrength = (vElevation + 0.5) * 0.5;

    vec3 color = mix(uColor1, uColor2, vUv.y);
    color = mix(color, uColor3, mixStrength);

    gl_FragColor = vec4(color, 0.15);
  }
`;
