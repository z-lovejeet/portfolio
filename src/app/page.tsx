'use client';

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

// Dynamic import for WebGL (SSR disabled)
const GlassBackground = dynamic(
  () => import('@/components/webgl/GlassBackground'),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScroll>
      <GlassBackground />
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
    </SmoothScroll>
  );
}
