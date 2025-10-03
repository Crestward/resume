'use client';

import { useRef, useState } from 'react';
import { WorkExperience } from '@/types/experience';
import AnimatedCounter from './AnimatedCounter';

interface HolographicCardProps {
  experience: WorkExperience;
  index: number;
}

export default function HolographicCard({ experience, index }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl transition-all duration-300 cursor-pointer glass"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        transformStyle: 'preserve-3d',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Company & Position */}
      <div className="mb-6">
        <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          {experience.position}
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-2">
          <span className="text-lg md:text-xl text-blue-400">{experience.company}</span>
          <span className="text-gray-500 hidden sm:inline">•</span>
          <span className="text-gray-400 text-sm md:text-base">{experience.location}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{experience.duration}</p>
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-6 leading-relaxed">{experience.description}</p>

      {/* Metrics */}
      {experience.metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-6">
          {experience.metrics.map((metric, idx) => (
            <AnimatedCounter
              key={idx}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              delay={index * 0.1 + idx * 0.1}
            />
          ))}
        </div>
      )}

      {/* Achievements - Expandable */}
      <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1000px]' : 'max-h-[150px]'}`}>
        <h4 className="text-lg font-semibold text-purple-300 mb-3">Key Achievements</h4>
        <ul className="space-y-2">
          {experience.achievements.map((achievement, idx) => (
            <li key={idx} className="text-gray-300 flex items-start">
              <span className="text-blue-400 mr-2">▹</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expand Indicator */}
      <div className="mt-4 text-center text-sm text-gray-500">
        {isExpanded ? '↑ Click to collapse' : '↓ Click to expand'}
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-6">
        {experience.technologies.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Holographic glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.1), transparent 70%)',
        }}
      />
    </div>
  );
}
