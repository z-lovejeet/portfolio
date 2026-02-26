'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    stagger?: number;
}

export default function TextReveal({
    text,
    className = '',
    delay = 0,
    as: Tag = 'span',
    stagger = 0.03,
}: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const words = text.split(' ');

    return (
        <Tag className={className}>
            <span ref={ref} className="inline">
                {words.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden">
                        <motion.span
                            className="inline-block"
                            initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
                            animate={isInView ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : {}}
                            transition={{
                                duration: 0.6,
                                delay: delay + i * stagger,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {word}
                        </motion.span>
                        {i < words.length - 1 && '\u00A0'}
                    </span>
                ))}
            </span>
        </Tag>
    );
}
