'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionTransitions() {
  const effectsApplied = useRef(false);

  useEffect(() => {
    if (effectsApplied.current) return;
    effectsApplied.current = true;

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section');

      sections.forEach((section, index) => {
        // Camera zoom effect on section entry
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
            gsap.to(section, {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            });
          },
          onLeave: () => {
            gsap.to(section, {
              scale: 0.95,
              opacity: 0.7,
              duration: 0.6,
              ease: 'power2.in',
            });
          },
          onEnterBack: () => {
            gsap.to(section, {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(section, {
              scale: 0.95,
              opacity: 0.7,
              duration: 0.6,
              ease: 'power2.in',
            });
          },
        });

        // Parallax effect for section content
        const content = section.querySelectorAll('.parallax-item');
        content.forEach((item, itemIndex) => {
          const speed = 1 + itemIndex * 0.2;

          gsap.to(item, {
            y: () => -100 * speed,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        // Fade and slide animations for direct children
        const children = Array.from(section.children);
        children.forEach((child, childIndex) => {
          if (child.classList.contains('no-transition')) return;

          gsap.fromTo(
            child,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: childIndex * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: child,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // Stagger animation for cards/items
        const cards = section.querySelectorAll('.card, .project-card, .skill-item');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              y: 60,
              opacity: 0,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Section number indicator
        const numberIndicator = document.createElement('div');
        numberIndicator.className = 'section-number-indicator';
        numberIndicator.textContent = `0${index + 1}`;
        section.style.position = 'relative';
        section.appendChild(numberIndicator);

        gsap.fromTo(
          numberIndicator,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 0.1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null; // This is a utility component with no visual output
}
