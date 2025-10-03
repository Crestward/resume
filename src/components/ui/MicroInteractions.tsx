'use client';

import { useEffect } from 'react';
import './MicroInteractions.css';

export default function MicroInteractions() {
  useEffect(() => {
    // Magnetic button effect
    const magneticElements = document.querySelectorAll('.magnetic-btn, button, a[role="button"]');

    const handleMouseMove = (e: MouseEvent, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = (x / rect.width) * 20;
      const moveY = (y / rect.height) * 20;

      element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    };

    const handleMouseLeave = (element: HTMLElement) => {
      element.style.transform = '';
    };

    magneticElements.forEach((element) => {
      const htmlElement = element as HTMLElement;

      const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e, htmlElement);
      const mouseLeaveHandler = () => handleMouseLeave(htmlElement);

      htmlElement.addEventListener('mousemove', mouseMoveHandler);
      htmlElement.addEventListener('mouseleave', mouseLeaveHandler);

      // Cleanup function stored on element
      (htmlElement as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
        htmlElement.removeEventListener('mousemove', mouseMoveHandler);
        htmlElement.removeEventListener('mouseleave', mouseLeaveHandler);
      };
    });

    // Add ripple effect class to buttons
    const buttons = document.querySelectorAll('button:not(.no-ripple)');
    buttons.forEach((button) => {
      button.classList.add('ripple-effect');
    });

    // Add tilt effect to cards
    const cards = document.querySelectorAll('.card, [class*="card-"], .project-card');
    cards.forEach((card) => {
      card.classList.add('tilt-on-hover');
    });

    // Cleanup
    return () => {
      magneticElements.forEach((element) => {
        const el = element as HTMLElement & { _cleanup?: () => void };
        if (el._cleanup) {
          el._cleanup();
        }
      });
    };
  }, []);

  return null; // This is a utility component with no visual output
}
