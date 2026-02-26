'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle anchor clicks
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
            if (!anchor) return;
            e.preventDefault();
            const id = anchor.getAttribute('href')?.slice(1);
            if (!id) return;
            const el = document.getElementById(id);
            if (el) {
                lenis.scrollTo(el, { offset: -80 });
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            lenis.destroy();
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return <>{children}</>;
}
