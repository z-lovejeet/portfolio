'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import GlassCard from '../animations/GlassCard';

const categories = [
    {
        title: 'Frontend',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="m8 21 4-4 4 4" /></svg>
        ),
        skills: [
            { name: 'React / Next.js', level: 95 },
            { name: 'TypeScript', level: 90 },
            { name: 'Tailwind CSS', level: 92 },
            { name: 'WebGL / Three.js', level: 80 },
        ],
    },
    {
        title: 'Backend',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
        ),
        skills: [
            { name: 'Node.js / Express', level: 88 },
            { name: 'Python / FastAPI', level: 85 },
            { name: 'PostgreSQL / MongoDB', level: 82 },
            { name: 'Supabase / Firebase', level: 80 },
        ],
    },
    {
        title: 'Tools & DevOps',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
        ),
        skills: [
            { name: 'Git / GitHub', level: 90 },
            { name: 'Docker / CI-CD', level: 78 },
            { name: 'Vercel / AWS', level: 85 },
            { name: 'n8n / Automation', level: 82 },
            { name: 'Figma / UI Design', level: 75 },
        ],
    },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (inView) {
            const timeout = setTimeout(() => setWidth(level), delay);
            return () => clearTimeout(timeout);
        }
    }, [inView, level, delay]);

    return (
        <div ref={ref} className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-white/50 font-medium">{name}</span>
                <span className="text-violet-300 font-heading font-semibold">{level}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        boxShadow: width > 0 ? '0 0 12px rgba(99,102,241,0.4)' : 'none',
                    }}
                />
            </div>
        </div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="relative py-32 px-6 z-10">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-4">
                            Skills & Tech
                        </span>
                        <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
                            My{' '}
                            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Tech Stack
                            </span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-6">
                    {categories.map((cat, ci) => (
                        <ScrollReveal key={cat.title} variant="scaleIn" delay={ci * 0.15}>
                            <GlassCard className="p-6 h-full group" tilt={true}>
                                <div className="flex items-center gap-3 mb-7">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/5 flex items-center justify-center text-violet-300">
                                        {cat.icon}
                                    </div>
                                    <h3 className="font-heading text-base font-semibold">{cat.title}</h3>
                                </div>
                                <div className="space-y-5">
                                    {cat.skills.map((skill, si) => (
                                        <SkillBar
                                            key={skill.name}
                                            name={skill.name}
                                            level={skill.level}
                                            delay={ci * 200 + si * 120}
                                        />
                                    ))}
                                </div>
                            </GlassCard>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
