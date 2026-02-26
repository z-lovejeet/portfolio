'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-white/[0.04] py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-heading font-semibold text-sm">
                    <motion.span
                        className="text-indigo-400"
                        animate={{
                            filter: ['drop-shadow(0 0 3px #6366f1)', 'drop-shadow(0 0 8px #a78bfa)', 'drop-shadow(0 0 3px #6366f1)'],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        ◆
                    </motion.span>
                    Lovejeet Singh
                </div>
                <p className="text-white/20 text-xs">© 2026 Lovejeet Singh. Crafted with passion & WebGL.</p>
            </div>
        </footer>
    );
}
