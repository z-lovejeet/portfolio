'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BootSequenceProps {
    onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let current = 0;

        // Rapidly count to 100%
        const interval = setInterval(() => {
            current += Math.floor(Math.random() * 6) + 2;

            if (current >= 100) {
                current = 100;
                clearInterval(interval);

                // Hold at 100% for a tiny fraction of a second, then exit
                setTimeout(() => {
                    setIsVisible(false);
                    setTimeout(onComplete, 800); // Give time for exit animation
                }, 400);
            }

            setProgress(current);
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* Elegant abstract logo/loader */}
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <motion.div
                                className="absolute inset-0 rounded-full border-t-[1.5px] border-l-[1.5px] border-indigo-500/40"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-2 rounded-full border-b-[1.5px] border-r-[1.5px] border-purple-500/60"
                                animate={{ rotate: -360 }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-4 rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 backdrop-blur-sm"
                            />
                        </div>

                        {/* Percentage */}
                        <div className="font-heading text-4xl sm:text-5xl font-bold tracking-tighter tabular-nums flex items-baseline gap-1">
                            {progress}<span className="text-white/30 text-xl">%</span>
                        </div>

                        {/* Status line */}
                        <motion.div
                            className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase relative overflow-hidden"
                        >
                            <motion.span
                                key={progress === 100 ? 'ready' : 'loading'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="block"
                            >
                                {progress < 100 ? 'Initializing Environment' : 'System Ready'}
                            </motion.span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
