'use client';

import { useEffect, useState } from 'react';
import './MobileOptimizations.css';

export default function MobileOptimizations() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Add touch gesture support
    if ('ontouchstart' in window) {
      enableTouchGestures();
    }

    // Optimize performance for mobile
    if (isMobile) {
      optimizeMobilePerformance();
    }

    // Swipe navigation handlers
    const handleSwipeLeft = () => {
      const sections = document.querySelectorAll('section');
      const currentSection = Array.from(sections).find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2;
      });

      if (currentSection && currentSection.nextElementSibling) {
        currentSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleSwipeRight = () => {
      const sections = document.querySelectorAll('section');
      const currentSection = Array.from(sections).find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2;
      });

      if (currentSection && currentSection.previousElementSibling) {
        currentSection.previousElementSibling.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('swipe-left', handleSwipeLeft);
    document.addEventListener('swipe-right', handleSwipeRight);

    return () => {
      window.removeEventListener('resize', checkDevice);
      document.removeEventListener('swipe-left', handleSwipeLeft);
      document.removeEventListener('swipe-right', handleSwipeRight);
    };
  }, [isMobile]);

  return null; // Utility component
}

function enableTouchGestures() {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe right
        document.dispatchEvent(new CustomEvent('swipe-right'));
      } else {
        // Swipe left
        document.dispatchEvent(new CustomEvent('swipe-left'));
      }
    }

    // Vertical swipe
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
      if (diffY > 0) {
        // Swipe down
        document.dispatchEvent(new CustomEvent('swipe-down'));
      } else {
        // Swipe up
        document.dispatchEvent(new CustomEvent('swipe-up'));
      }
    }
  };

  // Pinch to zoom detection
  let initialDistance = 0;

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (initialDistance === 0) {
        initialDistance = distance;
      } else {
        const scale = distance / initialDistance;

        if (scale > 1.1) {
          // Pinch out (zoom in)
          document.dispatchEvent(new CustomEvent('pinch-out', { detail: { scale } }));
        } else if (scale < 0.9) {
          // Pinch in (zoom out)
          document.dispatchEvent(new CustomEvent('pinch-in', { detail: { scale } }));
        }
      }
    }
  };

  const handleTouchEndReset = () => {
    initialDistance = 0;
  };

  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchend', handleTouchEnd);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEndReset);
}

function optimizeMobilePerformance() {
  // Reduce particle count for mobile
  const particleContainers = document.querySelectorAll('.cursor-particle');
  particleContainers.forEach((container, index) => {
    if (index % 2 === 0) {
      (container as HTMLElement).style.display = 'none';
    }
  });

  // Disable complex shaders on mobile
  document.body.classList.add('mobile-optimized');

  // Reduce animation complexity
  const animations = document.querySelectorAll('[class*="animate-"]');
  animations.forEach((element) => {
    (element as HTMLElement).style.animationDuration = '0.5s';
  });

  // Lazy load images
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}
