import gsap from 'gsap';

export const animateText = (element: HTMLElement | null, delay: number = 0) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
    }
  );
};

export const glitchEffect = (element: HTMLElement | null) => {
  if (!element) return;

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

  tl.to(element, {
    x: -2,
    y: 2,
    duration: 0.1,
  })
    .to(element, {
      x: 2,
      y: -2,
      duration: 0.1,
    })
    .to(element, {
      x: -2,
      y: -2,
      duration: 0.1,
    })
    .to(element, {
      x: 0,
      y: 0,
      duration: 0.1,
    });
};

export const fadeInUp = (
  elements: HTMLElement[] | NodeListOf<Element>,
  stagger: number = 0.1
) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: 'power2.out',
    }
  );
};

export const typewriterEffect = (element: HTMLElement | null, delay: number = 0) => {
  if (!element) return;

  const text = element.textContent || '';
  element.textContent = '';
  element.style.opacity = '1';

  const chars = text.split('');
  const tl = gsap.timeline({ delay });

  chars.forEach((char, index) => {
    tl.to(element, {
      duration: 0.05,
      onStart: () => {
        element.textContent = text.substring(0, index + 1);
      },
    });
  });

  return tl;
};

export const splitTextAnimation = (element: HTMLElement | null, delay: number = 0) => {
  if (!element) return;

  const text = element.textContent || '';
  const words = text.split(' ');

  // Clear and rebuild with spans
  element.innerHTML = '';
  const wordSpans: HTMLSpanElement[] = [];

  words.forEach((word) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.marginRight = '0.25em';
    element.appendChild(span);
    wordSpans.push(span);
  });

  // Animate words in with different effects
  const tl = gsap.timeline({ delay });

  wordSpans.forEach((span, index) => {
    const effects = ['fadeInUp', 'fadeInLeft', 'fadeInRight', 'scale'];
    const effect = effects[index % effects.length];

    switch (effect) {
      case 'fadeInUp':
        tl.fromTo(
          span,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          index * 0.05
        );
        break;
      case 'fadeInLeft':
        tl.fromTo(
          span,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
          index * 0.05
        );
        break;
      case 'fadeInRight':
        tl.fromTo(
          span,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
          index * 0.05
        );
        break;
      case 'scale':
        tl.fromTo(
          span,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
          index * 0.05
        );
        break;
    }
  });

  return tl;
};
