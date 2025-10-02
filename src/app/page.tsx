'use client';

import Hero from '@/components/sections/Hero';
import Bio from '@/components/sections/Bio';
import WorkExperience from '@/components/sections/WorkExperience';
import SkillsMatrix from '@/components/sections/SkillsMatrix';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import ScrollTransition from '@/components/ui/ScrollTransition';
import Particles from '@/components/ui/Particles';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Home() {
  useSmoothScroll();

  return (
    <main className="relative">
      {/* Particles Background for whole page */}
      <div className="fixed inset-0 z-0">
        <Particles
          particleColors={['#667eea', '#764ba2', '#f093fb']}
          particleCount={150}
          particleSpread={15}
          speed={0.05}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10">
        <ScrollTransition />
        <Hero />
        <Bio />
        <WorkExperience />
        <SkillsMatrix />
        <Certifications />
        <Contact />
      </div>
    </main>
  );
}
