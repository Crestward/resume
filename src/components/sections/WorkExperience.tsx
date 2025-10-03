'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workExperiences } from '@/types/experience';
import HolographicCard from '../ui/HolographicCard';

gsap.registerPlugin(ScrollTrigger);

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !cardsRef.current) return;

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Cards stagger animation
    const cards = cardsRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
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
        background: 'linear-gradient(180deg, #1f2937 0%, #111827 50%, #0f172a 100%)',
      }}
    >
      {/* 3D Timeline Background - Removed per user request */}

      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold mb-16 text-center opacity-0"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            Work Experience
          </span>
        </h2>

        {/* Experience Cards */}
        <div ref={cardsRef} className="space-y-12 max-w-4xl mx-auto">
          {workExperiences.map((experience, index) => (
            <HolographicCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>

      {/* Decorative gradient orbs - removed per user request */}
    </section>
  );
}
