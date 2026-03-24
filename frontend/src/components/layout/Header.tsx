import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Bell, Search, Sparkles } from 'lucide-react';

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
};

export default function Header() {
    const headerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const location = useLocation();
    const title = pageTitles[location.pathname] || 'DairySphere Society';

    useEffect(() => {
        gsap.fromTo(titleRef.current,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
    }, [location.pathname]);

    useEffect(() => {
        gsap.from(headerRef.current, {
            y: -20, opacity: 0,
            duration: 0.6, ease: 'power3.out'
        });
    }, []);

    return (
        <div ref={headerRef} style={styles.header}>
            <div style={styles.titleSection}>
                <h1 ref={titleRef} style={styles.title}>{title}</h1>
                <p style={styles.subtitle}>
                    {new Date().toLocaleDateString('en-KE', {
                        weekday: 'long', year: 'numeric',
                        month: 'long', day: 'numeric'
                    })}
                </p>
            </div>

            <div style={styles.actions}>
                <div style={styles.searchBox}>
                    <Search size={16} color="rgba(255,255,255,0.4)" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        style={styles.searchInput}
                    />
                </div>

                <div style={styles.iconButton}>
                    <Bell size={18} />
                    <div style={styles.badge}>3</div>
                </div>

                <div style={styles.iconButton}>
                    <Sparkles size={18} />
                </div>

                <div style={styles.userSection}>
                    <div style={styles.userAvatar}>
                        <span style={styles.avatarText}>AD</span>
                    </div>
                    <div style={styles.userInfo}>
                        <span style={styles.userName}>Admin</span>
                        <span style={styles.userRole}>Manager</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    header: {
        height: 'var(--header-height)',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
    },
    titleSection: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#ffffff',
        letterSpacing: '-0.3px',
    },
    subtitle: {
        fontSize: '12px',
        color: 'rgba(255,255,255,0.4)',
        marginTop: '2px',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '8px 16px',
        transition: 'all 0.3s ease',
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: '13px',
        color: '#ffffff',
        width: '180px',
        fontFamily: 'Inter, sans-serif',
    },
    iconButton: {
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative' as const,
        color: 'rgba(255,255,255,0.7)',
        transition: 'all 0.3s ease',
    },
    badge: {
        position: 'absolute' as const,
        top: '-4px',
        right: '-4px',
        background: 'var(--primary)',
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
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginLeft: '8px',
        paddingLeft: '16px',
        borderLeft: '1px solid rgba(255,255,255,0.08)',
    },
    userAvatar: {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, var(--primary), #16a34a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    avatarText: {
        color: '#fff',
        fontSize: '13px',
        fontWeight: 700,
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    userName: {
        fontSize: '13px',
        fontWeight: 600,
        color: '#ffffff',
    },
    userRole: {
        fontSize: '11px',
        color: 'rgba(255,255,255,0.4)',
    },
};