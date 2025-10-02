'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillGraph3D from '../three/SkillGraph3D';
import { skillCategories } from '@/types/skills';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsMatrix() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8, y: -50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #1e293b 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold mb-8 text-center opacity-0"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            Skills Matrix
          </span>
        </h2>

        <p className="text-center text-gray-400 mb-12 text-lg max-w-3xl mx-auto">
          Interactive 3D visualization of my technical expertise. Hover over nodes to explore proficiency levels and connections between related technologies.
        </p>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors w-full md:w-64"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === undefined
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              All Skills
            </button>
            {skillCategories.slice(0, 5).map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Skills Graph */}
        <div className="w-full h-[750px] relative">
          <Canvas camera={{ position: [0, 0, 7], fov: 75 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#60A5FA" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#A78BFA" />
            <pointLight position={[0, 10, 5]} intensity={1} color="#F472B6" />
            <spotLight position={[0, 10, 0]} angle={0.5} intensity={1.2} color="#818CF8" />

            <SkillGraph3D selectedCategory={selectedCategory} />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={4}
              maxDistance={12}
              autoRotate={true}
              autoRotateSpeed={1.5}
            />
          </Canvas>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {skillCategories.map((category) => (
            <div key={category.name} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm text-gray-400">{category.name}</span>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>💡 Drag to rotate • Scroll to zoom • Hover over nodes for details</p>
        </div>
      </div>
    </section>
  );
}
