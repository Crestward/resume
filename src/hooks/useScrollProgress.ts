'use client';

import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    let lastScrollTop = 0;
    let lastTime = Date.now();

    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);

      // Calculate scroll velocity
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTime;
      const scrollDelta = Math.abs(scrollTop - lastScrollTop);
      const velocity = timeDelta > 0 ? scrollDelta / timeDelta : 0;

      setScrollVelocity(Math.min(velocity * 10, 1)); // Normalize to 0-1

      lastScrollTop = scrollTop;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return { scrollProgress, scrollVelocity };
};
