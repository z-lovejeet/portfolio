'use client';

import ScrollReveal from '../animations/ScrollReveal';
import { motion } from 'framer-motion';
import TextReveal from '../animations/TextReveal';

export default function About() {
    return (
        <section id="about" className="relative py-32 px-6 z-10">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-4">
                            About Me
                        </span>
                        <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
                            Turning Vision Into{' '}
                            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Digital Reality
                            </span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Terminal Window */}
                    <ScrollReveal variant="slideRight">
                        <div className="relative">
                            <div className="rounded-2xl bg-[#050505]/90 border border-white/[0.08] backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col">
                                {/* Terminal Header */}
                                <div className="flex items-center px-4 py-3 border-b border-white/[0.05] bg-white/[0.02]">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <div className="mx-auto text-xs text-white/30 font-mono tracking-widest pl-4">developer.ts</div>
                                </div>

                                {/* Terminal Content */}
                                <div className="p-6 overflow-x-auto text-[13px] sm:text-sm font-mono leading-relaxed text-white/70">
                                    <div className="space-y-1">
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
                                            <span className="text-purple-400">const</span> <span className="text-indigo-300">developer</span> <span className="text-purple-400">=</span> {'{'}
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
                                            {'  '}name: <span className="text-emerald-300">"Lovejeet Singh"</span>,
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
                                            {'  '}role: <span className="text-emerald-300">"Full-Stack Software Engineer"</span>,
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }}>
                                            {'  '}expertise: [<span className="text-emerald-300">"Next.js"</span>, <span className="text-emerald-300">"Node.js"</span>, <span className="text-emerald-300">"Python"</span>, <span className="text-emerald-300">"n8n"</span>, <span className="text-emerald-300">"WebGL"</span>],
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }}>
                                            {'  '}currentlyLearning: [<span className="text-emerald-300">"GenAI & ML"</span>, <span className="text-emerald-300">"App Dev (iOS/Android)"</span>],
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true }}>
                                            <br />
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} viewport={{ once: true }}>
                                            {'  '}<span className="text-blue-300">buildFuture</span>: <span className="text-purple-400">async</span> () <span className="text-purple-400">{"=>"}</span> {'{'}
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} viewport={{ once: true }}>
                                            {'    '}<span className="text-purple-400">await</span> <span className="text-blue-300">trainModels</span>();
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }} viewport={{ once: true }}>
                                            {'    '}<span className="text-purple-400">await</span> <span className="text-blue-300">developScalableArchitecture</span>();
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} viewport={{ once: true }}>
                                            {'    '}<span className="text-purple-400">return</span> merge(logic, creativity);
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }} viewport={{ once: true }}>
                                            {'  }'}
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }} viewport={{ once: true }}>
                                            {'};'}
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }} viewport={{ once: true }}>
                                            <br />
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }} viewport={{ once: true }}>
                                            <span className="text-indigo-300">developer</span>.<span className="text-blue-300">buildFuture</span>().<span className="text-blue-300">then</span>(deploy);
                                            <motion.span
                                                className="inline-block w-2.5 h-4 bg-indigo-400 ml-1 translate-y-1"
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                            />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Decoration */}
                            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-indigo-500/10 -z-10" />
                            <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-transparent -z-10 blur-2xl" />
                        </div>
                    </ScrollReveal>

                    {/* Content */}
                    <div>
                        <ScrollReveal variant="slideLeft" delay={0.1}>
                            <TextReveal
                                text="I engineer modern web applications seamlessly blending robust architecture with immersive WebGL experiences."
                                as="p"
                                className="text-white/50 text-lg leading-relaxed mb-8"
                            />
                        </ScrollReveal>

                        <ScrollReveal variant="slideLeft" delay={0.2}>
                            <p className="text-white/50 text-lg leading-relaxed mb-8">
                                As a Full-Stack Engineer, my foundation lies in scalable web tech (Next.js, Node.js) combined with frontend wizardry using <span className="text-white/60 font-medium">Three.js</span> to create premium digital experiences. I am currently diving deep into <span className="text-white/60 font-medium">Machine Learning and GenAI</span> learning how to build and train intelligent models and expanding my skill set into <span className="text-white/60 font-medium">App Development (iOS & Android)</span>.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal variant="fadeUp" delay={0.3}>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                {[
                                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>, text: 'Based in India' },
                                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>, text: 'B.Tech CSE (AI & ML)' },
                                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>, text: 'Full-Stack Engineering' },
                                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>, text: '1+ Year Experience' },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-all duration-300"
                                    >
                                        <span className="text-indigo-400/70">{item.icon}</span>
                                        <span className="truncate">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
