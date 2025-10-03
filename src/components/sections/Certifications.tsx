'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CertificationCarousel3D from '../three/CertificationCarousel3D';
import { certifications } from '@/types/certifications';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Title animation with particle burst effect
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.5, rotationY: 180 },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const handleCardClick = (id: number) => {
    setSelectedCert(id);
  };

  const selectedCertData = certifications.find((cert) => cert.id === selectedCert);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 50%, #1e1b4b 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold mb-8 text-center opacity-0"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600">
            Certifications & Achievements
          </span>
        </h2>

        <p className="text-center text-gray-400 mb-12 text-lg max-w-3xl mx-auto">
          Professional certifications demonstrating expertise across cloud computing, data science, machine learning, and cybersecurity.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
          <div className="text-center">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              {certifications.length}
            </div>
            <div className="text-sm text-gray-500 mt-2">Certifications</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
              5
            </div>
            <div className="text-sm text-gray-500 mt-2">Providers</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
              2025
            </div>
            <div className="text-sm text-gray-500 mt-2">Latest Year</div>
          </div>
        </div>

        {/* 3D Carousel */}
        <div className="w-full h-[450px] relative pointer-events-auto">
          <Canvas camera={{ position: [0, 0, 7], fov: 55 }} className="pointer-events-auto">
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#FBBF24" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#F97316" />
            <spotLight position={[0, 10, 5]} angle={0.5} intensity={1} color="#FBBF24" />

            <CertificationCarousel3D onCardClick={handleCardClick} />

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={10}
              autoRotate={false}
              makeDefault={false}
            />
          </Canvas>
          {/* Overlay to reduce touchable area on mobile */}
          <div className="md:hidden absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-20 pointer-events-auto bg-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-auto bg-transparent" />
          </div>
        </div>

        {/* Selected Certificate Details */}
        {selectedCertData && (
          <div className="mt-8 max-w-2xl mx-auto p-6 rounded-xl glass">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedCertData.title}</h3>
                <p className="text-gray-400 mt-1">{selectedCertData.issuer} • {selectedCertData.year}</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-300 leading-relaxed">{selectedCertData.description}</p>
            {selectedCertData.verificationLink && (
              <a
                href={selectedCertData.verificationLink}
                className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold hover:scale-105 transition-transform"
              >
                View Credential
              </a>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🎯 Drag to rotate • Click on cards for details • Scroll to zoom</p>
        </div>
      </div>
    </section>
  );
}
