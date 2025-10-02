'use client';

import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Resume3D from '../three/Resume3D';

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

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !socialRef.current) return;

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
            Let's Connect
          </span>
        </h2>

        <p className="text-center text-gray-400 mb-16 text-xl max-w-3xl mx-auto">
          Interested in collaborating or learning more about my work? Let's build something amazing together.
        </p>

        {/* 3D Resume Display */}
        <div className="w-full h-[500px] relative mb-12">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#10B981" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3B82F6" />
            <spotLight position={[0, 10, 5]} angle={0.5} intensity={1.2} color="#06B6D4" />

            <Resume3D />

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={8}
              autoRotate={true}
              autoRotateSpeed={2}
            />
          </Canvas>
        </div>

        {/* Download Button */}
        <div className="text-center mb-16">
          <button
            onClick={handleDownload}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full font-bold text-lg text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-emerald-500/50"
          >
            <span className="relative z-10">📄 Download Resume</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <p className="text-sm text-gray-500 mt-3">Last updated: October 2025</p>
        </div>

        {/* Social Links */}
        <div ref={socialRef} className="flex justify-center gap-6 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
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

        {/* Contact Info */}
        <div className="text-center mb-8">
          <div className="glass inline-block px-8 py-4 rounded-full">
            <a
              href="mailto:oladimeji759@gmail.com"
              className="text-gray-300 hover:text-emerald-400 transition-colors text-lg"
            >
              oladimeji759@gmail.com
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-8 mt-12">
          <p>© 2025 Oladimeji Adeyemi. Built with Next.js, Three.js, GSAP & Tailwind CSS</p>
          <p className="mt-2">Data Scientist • AI Engineer • Machine Learning Specialist</p>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
