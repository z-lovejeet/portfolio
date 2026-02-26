'use client';

import ScrollReveal from '../animations/ScrollReveal';
import GlassCard from '../animations/GlassCard';

import Image from 'next/image';

const projects = [
    {
        title: 'Wealify Labs (LMS)',
        description: 'A fully scalable Learning Management System with Admin, User & Member panels, Auth & DB logic, secure payments, and course sync. Deployed live with robust system architecture.',
        tags: ['Next.js', 'Auth', 'Payments', 'Full-Stack'],
        image: '/projects/wealify.png',
        liveUrl: 'https://wealifylabs.site/',
        sourceUrl: null,
    },
    {
        title: 'Sharma Book Depot',
        description: 'Complete ecommerce solution for retail: secure checkout, product/user/order management, and real-time database sync. Responsive UI built with modern React stack.',
        tags: ['React', 'Next.js', 'Tailwind', 'Database'],
        image: '/projects/sharma-v3.png',
        liveUrl: 'https://sharma-book-depot.vercel.app/',
        sourceUrl: null,
    },
    {
        title: 'Kisan Mitra',
        description: 'A marketplace & support system for farmers featuring authentication, user roles, marketplace helpers, and an SOS feature. High social impact.',
        tags: ['Auth', 'Web Stack', 'Social Impact'],
        image: '/projects/kisan-real.png',
        liveUrl: 'https://kisan-mitra-nu.vercel.app/',
        sourceUrl: 'https://github.com/z-lovejeet/Kisan-Mitra',
    },
    {
        title: 'Deadlock Prevention Toolkit',
        description: 'Implements Banker\'s Algorithm to detect and prevent deadlocks before they occur. Technical focus on system safety and algorithm logic.',
        tags: ['Algorithm', 'Logic', 'System Safety'],
        image: '/projects/algorithm-v3.png',
        liveUrl: null,
        sourceUrl: 'https://github.com/z-lovejeet/Deadlock-Prevention-Toolkit',
    },
];

export default function Projects() {
    return (
        <section id="projects" className="relative py-32 px-6 z-10">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-4">
                            Portfolio
                        </span>
                        <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
                            Featured{' '}
                            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Projects
                            </span>
                        </h2>
                        <p className="text-white/30 mt-4 max-w-lg mx-auto">
                            A selection of projects that showcase my passion for building exceptional digital products.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <ScrollReveal key={project.title} variant="scaleIn" delay={i * 0.12}>
                            <GlassCard className="overflow-hidden h-full flex flex-col group" tilt={true}>
                                {/* Image Area */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-[#050505]">
                                    <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
                                </div>

                                {/* Content */}
                                <div className="p-6 relative z-10 flex-1 flex flex-col">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-[11px] font-semibold tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 text-violet-300 border border-indigo-500/15">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="font-heading text-lg font-bold mb-2 tracking-tight">{project.title}</h3>
                                    <p className="text-white/30 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>
                                    <div className="flex gap-4 mt-auto">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors" data-hover>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                                                Live Demo
                                            </a>
                                        )}
                                        {project.sourceUrl && (
                                            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/40 hover:text-white/60 transition-colors" data-hover>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                                Source
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </GlassCard>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
