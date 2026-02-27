'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/animations/SmoothScroll';
import CursorGlow from '@/components/animations/CursorGlow';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import BootSequence from '@/components/animations/BootSequence';

// Dynamic import for WebGL (SSR disabled)
const GlassBackground = dynamic(
  () => import('@/components/webgl/GlassBackground'),
  { ssr: false }
);

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    if (isBooting) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
  }, [isBooting]);

  return (
    <>
      <BootSequence onComplete={() => setIsBooting(false)} />

      <SmoothScroll>
        <GlassBackground />

        {!isBooting && (
          <div className="animate-in fade-in duration-1000">
            <CursorGlow />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </div>
        )}
      </SmoothScroll>
    </>
  );
}
