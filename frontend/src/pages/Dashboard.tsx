import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Users, Truck, DollarSign, Landmark, TrendingUp, ArrowRight } from 'lucide-react';
import StatCard from '../components/common/StatCard';

export default function Dashboard() {
    const heroRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-text', {
                y: 50, opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });

            gsap.from('.quick-action', {
                y: 30, opacity: 0, scale: 0.95,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.5,
                ease: 'power3.out'
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <div ref={heroRef} style={styles.hero}>
                <div>
                    <h2 className="hero-text" style={styles.heroTitle}>
                        Welcome back to
                    </h2>
                    <h1 className="hero-text" style={styles.heroTitleBig}>
                        DairySphere 🐄
                    </h1>
                    <p className="hero-text" style={styles.heroSub}>
                        Managing your dairy cooperative with precision and care
                    </p>
                </div>
                <div className="hero-text" style={styles.heroStat}>
                    <TrendingUp size={20} color="var(--primary)" />
                    <span style={styles.heroStatText}>System Online</span>
                    <div style={styles.heroPulse} />
                </div>
            </div>

            {/* Stat Cards */}
            <div ref={cardsRef} style={styles.statsGrid}>
                <StatCard title="Total Farmers" value="22"
                    subtitle="Across all locations"
                    icon={Users} color="#22C55E" delay={0.2} />
                <StatCard title="Deliveries" value="—"
                    subtitle="This month"
                    icon={Truck} color="#3b82f6" delay={0.3} />
                <StatCard title="Active Loans" value="—"
                    subtitle="Outstanding"
                    icon={Landmark} color="#f59e0b" delay={0.4} />
                <StatCard title="Total Sales" value="—"
                    subtitle="This month"
                    icon={DollarSign} color="#ef4444" delay={0.5} />
            </div>

            {/* Quick Actions */}
            <h3 style={styles.sectionTitle}>Quick Actions</h3>
            <div style={styles.actionsGrid}>
                {[
                    { label: 'Add New Farmer', desc: 'Register a farmer to the system', icon: '👨‍🌾', color: '#22C55E' },
                    { label: 'Record Delivery', desc: 'Log a new milk delivery', icon: '🚚', color: '#3b82f6' },
                    { label: 'Process Loan', desc: 'Create a new loan record', icon: '💰', color: '#f59e0b' },
                    { label: 'View Statements', desc: 'Check farmer earnings', icon: '📄', color: '#6c63ff' },
                ].map((action) => (
                    <div key={action.label} className="quick-action card-hover" style={styles.actionCard}>
                        <div style={{
                            ...styles.actionIcon,
                            background: `${action.color}10`,
                            border: `1px solid ${action.color}20`,
                        }}>
                            <span style={{ fontSize: '24px' }}>{action.icon}</span>
                        </div>
                        <div style={styles.actionInfo}>
                            <h4 style={styles.actionLabel}>{action.label}</h4>
                            <p style={styles.actionDesc}>{action.desc}</p>
                        </div>
                        <ArrowRight size={18} color="var(--text-muted)" />
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    hero: {
        background: 'linear-gradient(135deg, var(--dark) 0%, var(--dark-secondary) 100%)',
        borderRadius: 'var(--radius)',
        padding: '36px 40px',
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    heroTitle: {
        fontSize: '16px',
        fontWeight: 500,
        color: 'rgba(255,255,255,0.5)',
        marginBottom: '4px',
    },
    heroTitleBig: {
        fontSize: '32px',
        fontWeight: 800,
        color: '#ffffff',
        fontFamily: 'Poppins, sans-serif',
        marginBottom: '8px',
    },
    heroSub: {
        fontSize: '14px',
        color: 'rgba(255,255,255,0.4)',
    },
    heroStat: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(34, 197, 94, 0.08)',
        border: '1px solid rgba(34, 197, 94, 0.15)',
        borderRadius: '12px',
        padding: '10px 20px',
    },
    heroStatText: {
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--primary)',
    },
    heroPulse: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'var(--primary)',
        boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '36px',
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '16px',
    },
    actionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
    },
    actionCard: {
        background: 'var(--card-white)',
        borderRadius: 'var(--radius)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        cursor: 'pointer',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
    },
    actionIcon: {
        width: '52px',
        height: '52px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    actionInfo: {
        flex: 1,
    },
    actionLabel: {
        fontSize: '14px',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '2px',
    },
    actionDesc: {
        fontSize: '12.5px',
        color: 'var(--text-muted)',
    },
};