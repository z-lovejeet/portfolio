'use client';

import { motion } from 'framer-motion';
import { useRef, useState, ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    tilt?: boolean;
    glare?: boolean;
}

export default function GlassCard({
    children,
    className = '',
    tilt = true,
    glare = true,
}: GlassCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current || !tilt) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setTransform({
            rotateX: (y - 0.5) * -10,
            rotateY: (x - 0.5) * 10,
        });
        setGlarePos({ x: x * 100, y: y * 100 });
    };

    const handleMouseLeave = () => {
        setTransform({ rotateX: 0, rotateY: 0 });
    };

    return (
        <motion.div
            ref={ref}
            className={`relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl ${className}`}
            style={{
                perspective: 800,
                transformStyle: 'preserve-3d',
            }}
            animate={{
                rotateX: transform.rotateX,
                rotateY: transform.rotateY,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{
                borderColor: 'rgba(255,255,255,0.12)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.06)',
            }}
            data-hover
        >
            {/* Glare overlay */}
            {glare && (
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
                    }}
                />
            )}
            {/* Top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            {children}
        </motion.div>
    );
}
