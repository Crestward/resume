'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

export default function AnimatedCounter({ value, suffix = '', label, delay = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            const obj = { val: 0 };
            gsap.to(obj, {
              val: value,
              duration: 2,
              delay,
              ease: 'power2.out',
              onUpdate: () => {
                setCount(Math.floor(obj.val));
              },
            });

            // 3D floating animation
            if (counterRef.current) {
              gsap.fromTo(
                counterRef.current,
                { y: 50, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, delay, ease: 'back.out(1.7)' }
              );
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [value, delay, hasAnimated]);

  return (
    <div ref={containerRef} className="text-center">
      <div
        ref={counterRef}
        className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
      >
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}
