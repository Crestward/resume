'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProfileCard from '../ui/ProfileCard';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/oladimeji-adeyemi/',
    icon: '💼',
    color: '#0077B5',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/oladimeji-adeyemi',
    icon: '💻',
    color: '#333333',
  },
  {
    name: 'Email',
    url: 'mailto:oladimeji759@gmail.com',
    icon: '📧',
    color: '#EA4335',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !socialRef.current || !footerRef.current || !profileCardRef.current) return;

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Profile Card animation
    gsap.fromTo(
      profileCardRef.current,
      { opacity: 0, y: 80, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: profileCardRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Social links stagger animation
    const socialItems = socialRef.current.children;
    gsap.fromTo(
      socialItems,
      { opacity: 0, scale: 0, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: socialRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Footer animation - slide up with fade
    const footerLines = footerRef.current.querySelectorAll('p, .footer-tech-stack');
    gsap.fromTo(
      footerLines,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const handleDownload = () => {
    // For now, we'll create a link to download
    // In production, replace with actual PDF path
    const link = document.createElement('a');
    link.href = '/Oladimeji_Adeyemi_Resume.pdf';
    link.download = 'Oladimeji_Adeyemi_Resume.pdf';
    link.click();
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 50%, #020617 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold mb-8 text-center opacity-0"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600">
            Let&apos;s Connect
          </span>
        </h2>

        <p className="text-center text-gray-400 mb-16 text-xl max-w-3xl mx-auto">
          Interested in collaborating or learning more about my work? Let&apos;s build something amazing together.
        </p>

        {/* Profile Card Display */}
        <div ref={profileCardRef} className="w-full flex justify-center mb-12 opacity-0">
          <ProfileCard
            name="Oladimeji Adeyemi"
            title="Data Scientist | AI Engineer | ML Specialist"
            handle="oladimeji-adeyemi"
            status="Available for opportunities"
            contactText="Download Resume"
            avatarUrl="/logo.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={handleDownload}
          />
        </div>


        {/* Social Links */}
        <div ref={socialRef} className="flex justify-center gap-6 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="group relative"
            >
              <div
                className="w-16 h-16 rounded-full glass flex items-center justify-center text-3xl hover:scale-110 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: `0 0 20px ${link.color}40`,
                }}
              >
                <span className="group-hover:scale-125 transition-transform duration-300">
                  {link.icon}
                </span>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm text-gray-400 whitespace-nowrap">{link.name}</span>
              </div>
            </a>
          ))}
        </div>


        {/* Footer */}
        <div
          ref={footerRef}
          className="relative text-center text-gray-500 text-sm border-t border-gray-700/50 pt-8 mt-12 overflow-hidden"
        >
          {/* Animated gradient line at top */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-pulse" />

          <p className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-300">
            © 2025 Oladimeji Adeyemi. Crafted with passion and precision ✨
          </p>

          <div className="footer-tech-stack mt-4 flex flex-wrap justify-center items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300">
              Next.js
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-300">
              Three.js
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300">
              GSAP
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all duration-300">
              Tailwind CSS
            </span>
          </div>

          <p className="mt-4 text-gray-400 font-medium">
            Data Scientist <span className="text-emerald-500">•</span> AI Engineer <span className="text-cyan-500">•</span> Machine Learning Specialist
          </p>

          {/* Decorative animated dots */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 rounded-full bg-cyan-500/50 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs - dimmed on profile card hover */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 hover-dim-orbs" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 hover-dim-orbs" />
    </section>
  );
}
