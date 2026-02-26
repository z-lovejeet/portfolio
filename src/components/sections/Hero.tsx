'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import MagneticButton from '../animations/MagneticButton';

const roles = ['Full-Stack Developer', 'UI/UX Enthusiast', 'Creative Coder', 'Problem Solver'];

function useTyping(texts: string[]) {
    const [display, setDisplay] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = texts[textIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting && charIndex < current.length) {
            timeout = setTimeout(() => {
                setDisplay(current.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, 70);
        } else if (!isDeleting && charIndex === current.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex > 0) {
            timeout = setTimeout(() => {
                setDisplay(current.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            }, 35);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % texts.length);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, textIndex, texts]);

    return display;
}

function CountUp({ target, suffix = '' }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const interval = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(interval);
    }, [target]);

    return <>{count}{suffix}</>;
}

export default function Hero() {
    const typed = useTyping(roles);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-32">
            <div className="max-w-3xl mx-auto text-center relative z-10 w-full">
                {/* Badge */}
                <ScrollReveal delay={0.2}>
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl text-sm text-white/60 mb-8">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                        Available for work
                    </div>
                </ScrollReveal>

                {/* Title */}
                <ScrollReveal delay={0.4}>
                    <p className="text-white/40 text-lg mb-3 tracking-widest uppercase font-light">Hello, I&apos;m</p>
                </ScrollReveal>

                <ScrollReveal delay={0.5}>
                    <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 bg-gradient-to-br from-white via-violet-200 to-indigo-400 bg-clip-text text-transparent leading-[1.1]">
                        Lovejeet Singh
                    </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.6}>
                    <p className="text-violet-300/80 text-xl sm:text-2xl font-medium h-8 mb-8 font-heading">
                        {typed}
                        <motion.span
                            className="inline-block text-indigo-400 ml-0.5"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                        >
                            |
                        </motion.span>
                    </p>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal delay={0.7}>
                    <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                        I craft <span className="text-white/70 font-medium">premium digital experiences</span> that merge stunning design with cutting-edge technology. Specializing in full-stack development with a passion for interactive, immersive web applications.
                    </p>
                </ScrollReveal>

                {/* CTAs */}
                <ScrollReveal delay={0.9}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <MagneticButton href="#projects" variant="primary">
                            View My Work
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </MagneticButton>
                        <MagneticButton href="#contact" variant="glass">
                            Get In Touch
                        </MagneticButton>
                    </div>
                </ScrollReveal>

                {/* Stats */}
                <ScrollReveal delay={1.1}>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        {[
                            { value: 100, suffix: '%', label: 'Success Rate' },
                            { value: 10, suffix: '+', label: 'Projects Delivered' },
                            { value: 10, suffix: '+', label: 'Happy Clients' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl text-center min-w-[140px]"
                            >
                                <div className="font-heading text-2xl font-bold text-violet-300">
                                    <CountUp target={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-xs text-white/30 mt-1 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            {/* Scroll indicator - Hidden on very short screens or small mobile to prevent overlap */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">Scroll</span>
                <motion.div
                    className="w-px h-8 bg-gradient-to-b from-indigo-500/50 to-transparent"
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ transformOrigin: 'top' }}
                />
            </motion.div>
        </section>
    );
}
