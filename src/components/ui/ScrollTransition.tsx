'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system for transition
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      opacity: number;
      size: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        opacity: 0,
        size: Math.random() * 3 + 1,
      });
    }

    let animationId: number;
    let isExploding = false;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isExploding) {
        particles.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.opacity -= 0.01;

          if (particle.opacity > 0) {
            ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Reset if all particles are invisible
        if (particles.every((p) => p.opacity <= 0)) {
          isExploding = false;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Trigger explosion on scroll
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && lastScrollY <= 100) {
        isExploding = true;
        particles.forEach((particle) => {
          particle.x = window.innerWidth / 2;
          particle.y = window.innerHeight / 2;
          particle.vx = (Math.random() - 0.5) * 15;
          particle.vy = (Math.random() - 0.5) * 15;
          particle.opacity = 1;
        });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
