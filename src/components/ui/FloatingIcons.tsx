'use client';

import { useRef, useEffect } from 'react';
import { fadeInUp } from '../animations/gsapHelpers';

const techIcons = [
  { emoji: '🐍', label: 'Python', color: 'from-blue-400 to-yellow-600' },
  { emoji: '🧠', label: 'TensorFlow', color: 'from-orange-400 to-orange-600' },
  { emoji: '⚡', label: 'Apache Spark', color: 'from-red-400 to-orange-600' },
  { emoji: '☁️', label: 'Azure', color: 'from-cyan-400 to-blue-600' },
  { emoji: '🗄️', label: 'SQL', color: 'from-purple-400 to-pink-600' },
  { emoji: '🤖', label: 'LLMs', color: 'from-green-400 to-emerald-600' },
];

export default function FloatingIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const icons = containerRef.current.querySelectorAll('.tech-icon');
      fadeInUp(icons, 0.15);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center gap-4 mt-12 flex-wrap"
    >
      {techIcons.map((tech, index) => (
        <div
          key={index}
          className="tech-icon glass p-4 rounded-xl hover:scale-110 transition-all duration-300 cursor-pointer group relative opacity-0"
          style={{
            animation: `float 3s ease-in-out ${index * 0.2}s infinite`,
          }}
        >
          <span className="text-4xl block">{tech.emoji}</span>

          {/* Tooltip */}
          <div className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${tech.color} whitespace-nowrap`}>
            {tech.label}
          </div>

          {/* Glow effect on hover */}
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
        </div>
      ))}
    </div>
  );
}
