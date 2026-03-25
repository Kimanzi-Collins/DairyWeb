import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GlassCardProps {
    children: ReactNode;
    delay?: number;
    style?: React.CSSProperties;
    hover?: boolean;
    scrollReveal?: boolean;
    className?: string;
}

export default function GlassCard({
    children, delay = 0, style,
    hover = true, scrollReveal = false
}: GlassCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        if (scrollReveal) {
            gsap.set(ref.current, { y: 60, opacity: 0, scale: 0.95 });
            ScrollTrigger.create({
                trigger: ref.current,
                start: 'top 88%',
                onEnter: () => {
                    gsap.to(ref.current, {
                        y: 0, opacity: 1, scale: 1,
                        duration: 0.8, delay,
                        ease: 'expo.out'
                    });
                },
                once: true,
            });
        } else {
            gsap.from(ref.current, {
                y: 40, opacity: 0, scale: 0.96,
                duration: 0.7, delay,
                ease: 'expo.out'
            });
        }
    }, [delay, scrollReveal]);

    return (
        <div
            ref={ref}
            className="glass-card"
            style={{ padding: '24px', ...style }}
            onMouseEnter={(e) => {
                if (!hover) return;
                gsap.to(e.currentTarget, {
                    y: -5, duration: 0.35,
                    ease: 'power2.out',
                });
            }}
            onMouseLeave={(e) => {
                if (!hover) return;
                gsap.to(e.currentTarget, {
                    y: 0, duration: 0.35,
                    ease: 'power2.out',
                });
            }}
        >
            {children}
        </div>
    );
}