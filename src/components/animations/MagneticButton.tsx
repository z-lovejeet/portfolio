'use client';

import { motion } from 'framer-motion';
import { useRef, useState, ReactNode } from 'react';
import { uiSound } from '@/lib/audio';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'glass';
}

export default function MagneticButton({
    children,
    className = '',
    href,
    onClick,
    variant = 'primary',
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setPosition({ x: x * 0.2, y: y * 0.2 });
    };

    const handleMouseEnter = () => {
        uiSound?.playHover();
    };

    const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

    const handleClick = (e: React.MouseEvent) => {
        uiSound?.playClick();
        if (onClick) onClick();
    };

    const baseStyles = variant === 'primary'
        ? 'bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
        : 'bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl text-white/90';

    const content = (
        <motion.div
            ref={ref}
            className={`relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide cursor-pointer overflow-hidden group ${baseStyles} ${className}`}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, mass: 0.3 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-hover
        >
            {/* Glass shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2.5">{children}</span>
        </motion.div>
    );

    if (href) {
        return <a href={href} onClick={(e) => {
            uiSound?.playClick();
            if (onClick) onClick();
        }}>{content}</a>;
    }
    return content;
}
