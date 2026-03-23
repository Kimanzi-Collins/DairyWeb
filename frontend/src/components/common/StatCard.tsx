import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    color: string;
    delay?: number;
}

export default function StatCard({ title, value, subtitle, icon: Icon, color, delay = 0 }: StatCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.7,
                delay,
                ease: 'power3.out'
            });

            gsap.from(valueRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 0.5,
                delay: delay + 0.3,
                ease: 'back.out(1.7)'
            });
        });

        return () => ctx.revert();
    }, [delay]);

    return (
        <div ref={cardRef} style={styles.card}>
            <div style={styles.top}>
                <div style={{
                    ...styles.iconBox,
                    background: `${color}15`,
                }}>
                    <Icon size={22} color={color} />
                </div>
                <span style={styles.title}>{title}</span>
            </div>
            <div ref={valueRef} style={styles.value}>{value}</div>
            {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    card: {
        background: 'var(--card-white)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        boxShadow: 'var(--shadow)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
    },
    top: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
    },
    iconBox: {
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--text-secondary)',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
    },
    value: {
        fontSize: '28px',
        fontWeight: 800,
        color: 'var(--text-primary)',
        lineHeight: 1.2,
    },
    subtitle: {
        fontSize: '13px',
        color: 'var(--text-muted)',
        marginTop: '6px',
    },
};