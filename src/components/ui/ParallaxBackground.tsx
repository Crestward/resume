'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxBackground() {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Layer 1 - Slowest */}
      <div
        ref={layer1Ref}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%)',
        }}
      />

      {/* Layer 2 - Medium */}
      <div
        ref={layer2Ref}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 80% 30%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)',
        }}
      />

      {/* Layer 3 - Fastest */}
      <div
        ref={layer3Ref}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 80%, rgba(240, 147, 251, 0.03) 0%, transparent 50%)',
        }}
      />

      {/* Floating shapes for depth */}
      <div
        ref={layer1Ref}
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-purple-500 opacity-5 blur-3xl"
      />
      <div
        ref={layer2Ref}
        className="absolute top-40 right-20 w-48 h-48 rounded-full bg-blue-500 opacity-5 blur-3xl"
      />
      <div
        ref={layer3Ref}
        className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full bg-pink-500 opacity-5 blur-3xl"
      />
    </div>
  );
}
