import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Bell, Search, Sparkles } from 'lucide-react';

const titles: Record<string, string> = {
    '/': 'Dashboard',
    '/farmers': 'Farmers Management',
    '/agents': 'Agents',
    '/factories': 'Factories',
    '/inputs': 'Inputs',
    '/milk-quality': 'Milk Quality',
    '/loans': 'Loans',
    '/deliveries': 'Deliveries',
    '/purchases': 'Purchases',
    '/sales': 'Sales',
    '/reports/farmers-list': 'Farmers Report',
    '/reports/agents-commission': 'Agents Commission Report',
    '/reports/deliveries': 'Deliveries Report',
    '/reports/loans': 'Loans Report',
    '/reports/purchases': 'Purchases Report',
    '/reports/statements': 'Statements Report',
};

export default function Header() {
    const ref = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const location = useLocation();
    const title = titles[location.pathname] || 'DairySphere';

    useEffect(() => {
        gsap.fromTo(titleRef.current,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
    }, [location.pathname]);

    useEffect(() => {
        gsap.from(ref.current, {
            y: -20, opacity: 0,
            duration: 0.6, ease: 'power3.out'
        });
    }, []);

    return (
        <div ref={ref} style={styles.header} className="glass">
            <div>
                <h1 ref={titleRef} style={styles.title}>{title}</h1>
                <p style={styles.date}>
                    {new Date().toLocaleDateString('en-KE', {
                        weekday: 'long', year: 'numeric',
                        month: 'long', day: 'numeric'
                    })}
                </p>
            </div>

            <div style={styles.actions}>
                <div style={styles.search}>
                    <Search size={15} color="var(--text-faint)" />
                    <input placeholder="Search..." style={styles.searchInput} />
                </div>

                <div style={styles.iconBtn}>
                    <Bell size={17} color="var(--text-muted)" />
                    <div style={styles.badge}>3</div>
                </div>
                <div style={styles.iconBtn}>
                    <Sparkles size={17} color="var(--primary)" />
                </div>

                <div style={styles.userWrap}>
                    <div style={styles.avatar}>AD</div>
                    <div>
                        <div style={styles.userName}>Admin</div>
                        <div style={styles.userRole}>Manager</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    header: {
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderRadius: 0,
    },
    title: {
        fontSize: '19px',
        fontWeight: 700,
        color: 'var(--text-bright)',
        letterSpacing: '-0.3px',
    },
    date: {
        fontSize: '11px',
        color: 'var(--text-faint)',
        marginTop: '2px',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--glass-border)',
        borderRadius: '10px',
        padding: '7px 14px',
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: '13px',
        color: 'var(--text-normal)',
        width: '160px',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
    },
    iconBtn: {
        width: '36px', height: '36px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative' as const,
    },
    badge: {
        position: 'absolute' as const,
        top: '-3px', right: '-3px',
        background: 'var(--primary)',
        color: '#fff',
        fontSize: '9px',
        fontWeight: 700,
        width: '16px', height: '16px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userWrap: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginLeft: '8px',
        paddingLeft: '14px',
        borderLeft: '1px solid var(--glass-border)',
    },
    avatar: {
        width: '34px', height: '34px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, var(--primary), #6d5ce7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 700,
    },
    userName: {
        fontSize: '12px',
        fontWeight: 600,
        color: 'var(--text-bright)',
    },
    userRole: {
        fontSize: '10px',
        color: 'var(--text-faint)',
    },
};