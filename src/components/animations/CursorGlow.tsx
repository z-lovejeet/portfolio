'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

    useEffect(() => {
        // Hide on mobile
        if (typeof window === 'undefined') return;
        const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
        if (isMobile) return;

        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [data-hover]')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [data-hover]')) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <>
            {/* Main glow */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
                style={{ x: springX, y: springY }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        width: isHovering ? 60 : 32,
                        height: isHovering ? 60 : 32,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    {/* Red channel offset */}
                    <div
                        className="absolute inset-0 rounded-full opacity-30"
                        style={{
                            background: 'radial-gradient(circle, rgba(239,68,68,0.5) 0%, transparent 70%)',
                            transform: 'translate(-2px, -1px)',
                        }}
                    />
                    {/* Purple core */}
                    <div
                        className="absolute inset-0 rounded-full opacity-40"
                        style={{
                            background: 'radial-gradient(circle, rgba(167,139,250,0.6) 0%, transparent 70%)',
                        }}
                    />
                    {/* Blue channel offset */}
                    <div
                        className="absolute inset-0 rounded-full opacity-30"
                        style={{
                            background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)',
                            transform: 'translate(2px, 1px)',
                        }}
                    />
                    {/* White core */}
                    <motion.div
                        className="absolute rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                            top: '30%', left: '30%', width: '40%', height: '40%',
                        }}
                        animate={{ opacity: isHovering ? 0.6 : 0.4 }}
                    />
                </motion.div>
            </motion.div>
        </>
    );
}
