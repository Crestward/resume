'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Masonry from '../ui/Masonry';
import { skillsData, skillCategories } from '@/types/skills';

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

  const [skillCards, setSkillCards] = useState<Array<{ id: string; img: string; height: number; title: string }>>([]);

  // Generate skill cards data for masonry
  useEffect(() => {
    const filteredSkills = skillsData.filter(skill => {
      const matchesCategory = !selectedCategory || skill.category === selectedCategory;
      const matchesSearch = !searchTerm || skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const cards = filteredSkills.map(skill => {
      // Create skill card with gradient background
      const cardId = `skill-${skill.id}`;

      // Generate heights based on proficiency for visual variety
      const baseHeight = 200;
      const heightVariation = (skill.proficiency / 100) * 100;
      const height = baseHeight + heightVariation;

      // Create a data URL for the card image using canvas
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, skill.color);
        gradient.addColorStop(1, `${skill.color}80`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, height);

        // Add skill name
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(skill.name, 200, height / 2);

        // Add proficiency
        ctx.font = '20px Inter, sans-serif';
        ctx.fillText(`${skill.proficiency}% • ${skill.yearsOfExperience} years`, 200, height / 2 + 40);
      }

      return {
        id: cardId,
        img: canvas.toDataURL(),
        height: height,
        title: skill.name
      };
    });

    setSkillCards(cards);
  }, [selectedCategory, searchTerm]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #1e293b 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
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
          Explore my technical expertise through this interactive masonry grid. Each card represents a skill with its proficiency level and years of experience.
        </p>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-center">
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

        {/* Masonry Skills Grid */}
        <div className="w-full min-h-[600px] relative">
          <Masonry
            items={skillCards}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={1.05}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
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
          <p>💡 Hover over cards to interact • Cards are sized by proficiency level</p>
        </div>
      </div>
    </section>
  );
}
