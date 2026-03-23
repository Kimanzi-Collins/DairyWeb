import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Bell, Search } from 'lucide-react';

const pageTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/farmers': 'Farmers Management',
    '/agents': 'Agents Management',
    '/factories': 'Factories Management',
    '/inputs': 'Inputs Management',
    '/milk-quality': 'Milk Quality',
    '/loans': 'Loans Management',
    '/deliveries': 'Deliveries Management',
    '/purchases': 'Input Purchases',
    '/sales': 'Sales Management',
    '/reports/farmers-list': 'Farmers Report',
    '/reports/agents-commission': 'Agents Commission Report',
    '/reports/deliveries': 'Deliveries Report',
    '/reports/loans': 'Loans Report',
    '/reports/purchases': 'Purchases Report',
    '/reports/statements': 'Farmer Statements',
};

export default function Header() {
    const headerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const location = useLocation();

    const title = pageTitles[location.pathname] || 'DairySphere Society';

    useEffect(() => {
        // Animate title change
        gsap.fromTo(titleRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
    }, [location.pathname]);

    useEffect(() => {
        gsap.from(headerRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        });
    }, []);

    return (
        <div ref={headerRef} style={styles.header}>
            <div>
                <h1 ref={titleRef} style={styles.title}>{title}</h1>
                <p style={styles.subtitle}>
                    {new Date().toLocaleDateString('en-KE', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>

            <div style={styles.actions}>
                {/* Search */}
                <div style={styles.searchBox}>
                    <Search size={16} color="var(--text-muted)" />
                    <input
                        type="text"
                        placeholder="Search..."
                        style={styles.searchInput}
                    />
                </div>

                {/* Notifications */}
                <div style={styles.iconButton}>
                    <Bell size={20} />
                    <div style={styles.badge}>3</div>
                </div>

                {/* User */}
                <div style={styles.userAvatar}>
                    <span style={styles.avatarText}>AD</span>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    header: {
        height: 'var(--header-height)',
        background: 'var(--card-white)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
    },
    title: {
        fontSize: '22px',
        fontWeight: 700,
        color: 'var(--text-primary)',
    },
    subtitle: {
        fontSize: '13px',
        color: 'var(--text-muted)',
        marginTop: '2px',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--background)',
        borderRadius: '10px',
        padding: '8px 16px',
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: '14px',
        color: 'var(--text-primary)',
        width: '200px',
        fontFamily: 'Inter, sans-serif',
    },
    iconButton: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: 'var(--background)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative' as const,
        color: 'var(--text-secondary)',
    },
    badge: {
        position: 'absolute' as const,
        top: '-2px',
        right: '-2px',
        background: 'var(--danger)',
        color: '#fff',
        fontSize: '10px',
        fontWeight: 700,
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: 'var(--primary-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    avatarText: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: 700,
    },
};