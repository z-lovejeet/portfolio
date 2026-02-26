'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../animations/ScrollReveal';
import GlassCard from '../animations/GlassCard';
import MagneticButton from '../animations/MagneticButton';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="relative py-32 px-6 z-10">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-4">
                            Contact
                        </span>
                        <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
                            Let&apos;s{' '}
                            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Work Together
                            </span>
                        </h2>
                        <p className="text-white/30 mt-4 max-w-lg mx-auto">
                            Have a project in mind? I&apos;d love to hear about it. Drop me a message.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
                    {/* Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <ScrollReveal variant="slideRight">
                            <GlassCard className="p-5 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/5 flex items-center justify-center text-violet-300 shrink-0 mt-0.5">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-heading text-sm font-semibold mb-1">Email</h4>
                                    <a href="mailto:lovejeet1225@gmail.com" className="block text-white/50 text-sm hover:text-white transition-colors">lovejeet1225@gmail.com <span className="text-white/20 text-xs ml-1">(Primary)</span></a>
                                    <a href="mailto:hello@lovejeet.dev" className="block text-white/50 text-sm hover:text-white transition-colors mt-1">hello@lovejeet.dev <span className="text-white/20 text-xs ml-1">(Secondary)</span></a>
                                </div>
                            </GlassCard>
                        </ScrollReveal>

                        <ScrollReveal variant="slideRight" delay={0.1}>
                            <GlassCard className="p-5 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/5 flex items-center justify-center text-violet-300 shrink-0 mt-0.5">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-heading text-sm font-semibold mb-1">Discord</h4>
                                    <p className="text-white/80 font-medium text-sm mb-1">z.beast</p>
                                    <p className="text-white/30 text-xs">Clients can also contact me directly via Discord</p>
                                </div>
                            </GlassCard>
                        </ScrollReveal>

                        <ScrollReveal variant="slideRight" delay={0.2}>
                            <div className="flex gap-3 mt-4">
                                {[
                                    { label: 'GitHub', href: 'https://github.com/z-lovejeet', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg> },
                                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lovejeet-singh-14666b391/', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
                                    { label: 'Instagram', href: 'https://www.instagram.com/z.lovejeet/', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg> },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl flex items-center justify-center text-white/40 hover:text-violet-300 hover:-translate-y-1 hover:bg-white/[0.08] transition-all duration-300"
                                        aria-label={social.label}
                                        data-hover
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Form */}
                    <ScrollReveal variant="slideLeft" className="lg:col-span-3">
                        <GlassCard className="p-8">
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <motion.div
                                            className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mx-auto mb-6"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
                                        >
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        </motion.div>
                                        <h3 className="font-heading text-xl font-bold mb-2">Message Sent!</h3>
                                        <p className="text-white/40 text-sm">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your Name"
                                                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300"
                                                />
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your Email"
                                                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300"
                                                />
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            placeholder="Subject"
                                            className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300"
                                        />
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Your Message"
                                            className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300 resize-none"
                                        />

                                        {status === 'error' && (
                                            <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                                        )}

                                        <MagneticButton
                                            variant="primary"
                                            className="w-full justify-center"
                                            onClick={() => {
                                                const formEl = document.querySelector('form');
                                                if (formEl) formEl.requestSubmit();
                                            }}
                                        >
                                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                        </MagneticButton>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </GlassCard>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
