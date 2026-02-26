'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type Variant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn';

const variants: Record<Variant, Variants> = {
    fadeUp: {
        hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    },
    fadeIn: {
        hidden: { opacity: 0, filter: 'blur(8px)' },
        visible: { opacity: 1, filter: 'blur(0px)' },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 80, filter: 'blur(6px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
    },
    slideRight: {
        hidden: { opacity: 0, x: -80, filter: 'blur(6px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
        visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    },
};

interface ScrollRevealProps {
    children: ReactNode;
    variant?: Variant;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

export default function ScrollReveal({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 0.8,
    className = '',
    once = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants[variant]}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
