'use client';

import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Avatar3D from '../three/Avatar3D';
import FloatingTechStack from '../three/FloatingTechStack';
import { splitTextAnimation } from '../animations/gsapHelpers';

gsap.registerPlugin(ScrollTrigger);

export default function Bio() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const para3Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !leftColRef.current || !rightColRef.current) return;

    // Section entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      leftColRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    ).fromTo(
      rightColRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.7'
    );

    // Animate bio text with split text animation
    setTimeout(() => {
      splitTextAnimation(para1Ref.current, 0);
      splitTextAnimation(para2Ref.current, 0.5);
      splitTextAnimation(para3Ref.current, 1);
    }, 1000);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #111827 0%, #1f2937 100%)',
      }}
    >
      {/* 3D Tech Stack Background - Removed for cleaner design */}

      <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column - 3D Avatar */}
        <div ref={leftColRef} className="flex justify-center opacity-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Three.js Canvas for 3D Avatar */}
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              style={{ width: '100%', height: '100%' }}
            >
              <ambientLight intensity={0.5} />
              <Avatar3D />
            </Canvas>

            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border-4 border-purple-400 opacity-20 pointer-events-none animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-pink-400 opacity-30 pointer-events-none" style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
          </div>
        </div>

        {/* Right Column - Bio Text */}
        <div ref={rightColRef} className="space-y-6 opacity-0">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              About Me
            </span>
          </h2>

          <p ref={para1Ref} className="text-xl text-gray-300 leading-relaxed">
            I started out writing small Python scripts to automate the boring stuff. You know, making things faster. But somewhere between debugging at 2am and pulling data from different partner APIs at Zeeh Africa, I realized something. Data isn't just numbers. It's stories no one's bothered to read yet. Those messy operational datasets everyone complained about? They became my thing. I'd reverse engineer platform requests to their servers, unify data streams that had no business talking to each other, and suddenly patterns would emerge. Real patterns that actually mattered.
          </p>

          <p ref={para2Ref} className="text-xl text-gray-300 leading-relaxed">
            Then came the Spark jobs. Lots of them. Azure pipelines, Prophet models, ARIMA forecasts that actually worked in production (not just in notebooks). We cut operational bottlenecks costs down because we could finally predict what was coming instead of reacting to it. Time series forecasting went from this theoretical thing to models that ran every hour, feeding dashboards that management actually used. And here's what I learned: you can't just build models. You have to speak both languages, technical and business, or you're just making expensive noise.
          </p>

          <p ref={para3Ref} className="text-xl text-gray-300 leading-relaxed">
            These days I'm co-founding Beck-AI, building AI systems that work when real users hit them. LLMs paired with multi-agent frameworks, semantic search that gets context, FastAPI backends with PostgreSQL that scale when they need to. My MSc from Cardiff came with distinction, sure. But my real degree came from production, where models either ship or they don't. I think about the business problem first, then write code. Not the other way around.
          </p>

          {/* Skills badges */}
          <div className="flex flex-wrap gap-3 pt-6">
            {[
              { name: 'Python', color: 'text-blue-300' },
              { name: 'TensorFlow', color: 'text-orange-300' },
              { name: 'Apache Spark', color: 'text-red-300' },
              { name: 'Azure', color: 'text-cyan-300' },
              { name: 'AWS', color: 'text-yellow-300' },
              { name: 'Databricks', color: 'text-purple-300' },
              { name: 'Scikit-Learn', color: 'text-green-300' },
              { name: 'Power BI', color: 'text-pink-300' },
            ].map((skill, index) => (
              <span
                key={index}
                className={`tech-badge ${skill.color} hover:scale-110 transition-transform duration-300 cursor-pointer`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
