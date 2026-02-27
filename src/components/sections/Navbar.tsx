'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { uiSound } from '@/lib/audio';

const links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(total > 0 ? window.scrollY / total : 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = () => {
        uiSound?.playClick();
    };

    const handleMobileLinkClick = () => {
        uiSound?.playClick();
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const mobileMenu = (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 bg-[#050505]/98 backdrop-blur-3xl z-[9999] flex flex-col items-center justify-center md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Decorative background orb */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                    <ul className="flex flex-col items-center gap-8 relative z-10 w-full px-8">
                        {links.map((link, i) => (
                            <motion.li
                                key={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full text-center"
                            >
                                <a
                                    href={link.href}
                                    className="inline-block text-2xl font-heading font-medium tracking-wide text-white/50 hover:text-white transition-colors duration-300 relative group py-2"
                                    onClick={handleMobileLinkClick}
                                    data-hover
                                >
                                    {link.label}
                                    {/* Underline for mobile */}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full group-hover:w-full transition-all duration-300" />
                                </a>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Mobile bottom text */}
                    <motion.div
                        className="absolute bottom-12 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.3em]">Menu / {new Date().getFullYear()}</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || open
                    ? 'bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]'
                    : ''
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <a href="#hero" className="flex items-center gap-3 group" onClick={handleLinkClick} data-hover>
                            <div className="relative flex items-center justify-center w-[38px] h-[38px] rounded-xl bg-gradient-to-b from-white/[0.08] to-transparent border border-white/[0.1] shadow-[0_0_20px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-500 overflow-hidden backdrop-blur-md">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                                    <path d="M12 2 L22 7 L12 12 L2 7 Z" fill="url(#paint0_linear)" />
                                    <path d="M2 7 L12 12 L12 22 L2 17 Z" fill="url(#paint1_linear)" />
                                    <path d="M12 12 L22 7 L22 17 L12 22 Z" fill="url(#paint2_linear)" />
                                    <defs>
                                        <linearGradient id="paint0_linear" x1="2" y1="7" x2="22" y2="7" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#a78bfa" />
                                            <stop offset="1" stopColor="#c084fc" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear" x1="2" y1="17" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#818cf8" />
                                            <stop offset="1" stopColor="#a855f7" />
                                        </linearGradient>
                                        <linearGradient id="paint2_linear" x1="2" y1="12" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#c084fc" />
                                            <stop offset="1" stopColor="#818cf8" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="flex flex-col justify-center translate-y-[1px]">
                                <span className="font-heading font-bold text-[17px] leading-none tracking-tight text-white mb-1 group-hover:text-indigo-200 transition-colors duration-300">Lovejeet</span>
                                <span className="text-[9px] font-semibold tracking-[0.25em] text-white/40 uppercase leading-none">Developer</span>
                            </div>
                        </a>

                        {/* Desktop Links */}
                        <ul className="hidden md:flex items-center gap-8">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={handleLinkClick}
                                        className="text-sm text-white/50 hover:text-white transition-colors duration-300 relative group"
                                        data-hover
                                    >
                                        {link.label}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full group-hover:w-full transition-all duration-300" />
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
                            onClick={() => {
                                uiSound?.playClick();
                                setOpen(!open);
                            }}
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                className="w-6 h-0.5 bg-white rounded-full block"
                                animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                            />
                            <motion.span
                                className="w-6 h-0.5 bg-white rounded-full block"
                                animate={open ? { opacity: 0 } : { opacity: 1 }}
                            />
                            <motion.span
                                className="w-6 h-0.5 bg-white rounded-full block"
                                animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                            />
                        </button>
                    </div>
                </div>

                {/* Scroll Progress Bar */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500"
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </motion.nav>

            {/* Mobile Menu Portal */}
            {mounted && typeof document !== 'undefined' ? createPortal(mobileMenu, document.body) : null}
        </>
    );
}
