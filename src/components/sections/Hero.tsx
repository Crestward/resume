'use client';

import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleField from '../three/ParticleField';
import MorphingMesh from '../three/MorphingMesh';
import FloatingIcons from '../ui/FloatingIcons';
import { animateText, glitchEffect, typewriterEffect } from '../animations/gsapHelpers';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Animate text elements on mount
    animateText(titleRef.current, 0.3);
    typewriterEffect(subtitleRef.current, 1.3);

    // Add glitch effect to title
    if (titleRef.current) {
      glitchEffect(titleRef.current);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden pb-32"
      style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #111827 100%)',
      }}
    >
      {/* Three.js Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ParticleField />
        </Canvas>
      </div>

      {/* Content */}
      <div className="text-center z-10 relative px-8">
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-bold mb-6 opacity-0"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Oladimeji Adeyemi
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl text-gray-300 mb-32 glass inline-block px-8 py-4 rounded-full opacity-0"
        >
          Data Scientist & AI Engineer
        </p>

        {/* Floating Tech Icons */}
        <FloatingIcons />

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <svg
            className="w-8 h-8 text-purple-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
