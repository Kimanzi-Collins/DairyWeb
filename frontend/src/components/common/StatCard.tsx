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
                y: 40, opacity: 0,
                duration: 0.7, delay,
                ease: 'power3.out'
            });
            gsap.from(valueRef.current, {
                scale: 0.5, opacity: 0,
                duration: 0.5, delay: delay + 0.3,
                ease: 'back.out(1.7)'
            });
        });
        return () => ctx.revert();
    }, [delay]);

    return (
        <div ref={cardRef} className="card-hover" style={styles.card}>
            <div style={styles.header}>
                <div style={{
                    ...styles.iconBox,
                    background: `${color}12`,
                    border: `1px solid ${color}20`,
                }}>
                    <Icon size={20} color={color} />
                </div>
            </div>
            <span style={styles.title}>{title}</span>
            <div ref={valueRef} style={styles.value}>{value}</div>
            {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
            {/* Bottom accent line */}
            <div style={{
                ...styles.bottomLine,
                background: `linear-gradient(90deg, ${color}, transparent)`,
            }} />
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    card: {
        background: 'var(--card-white)',
        borderRadius: 'var(--radius)',
        padding: '22px 24px',
        boxShadow: 'var(--shadow)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '150px',
        border: '1px solid var(--border-light)',
    },
    header: {
        marginBottom: '14px',
    },
    iconBox: {
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '12px',
        fontWeight: 600,
        color: 'var(--text-secondary)',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.8px',
        marginBottom: '6px',
    },
    value: {
        fontSize: '30px',
        fontWeight: 800,
        color: 'var(--text-primary)',
        lineHeight: 1.1,
        fontFamily: 'Poppins, sans-serif',
    },
    subtitle: {
        fontSize: '13px',
        color: 'var(--text-muted)',
        marginTop: '6px',
    },
    bottomLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
    },
};