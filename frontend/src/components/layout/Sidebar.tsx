import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
    LayoutDashboard, Users, UserCheck, Factory,
    Package, Milk, Landmark, Truck,
    ShoppingCart, DollarSign, FileText,
    ChevronRight
} from 'lucide-react';

const mainNav = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/farmers', label: 'Farmers', icon: Users },
    { path: '/agents', label: 'Agents', icon: UserCheck },
    { path: '/factories', label: 'Factories', icon: Factory },
    { path: '/inputs', label: 'Inputs', icon: Package },
    { path: '/milk-quality', label: 'Milk Quality', icon: Milk },
    { path: '/loans', label: 'Loans', icon: Landmark },
    { path: '/deliveries', label: 'Deliveries', icon: Truck },
    { path: '/purchases', label: 'Purchases', icon: ShoppingCart },
    { path: '/sales', label: 'Sales', icon: DollarSign },
];

const reportNav = [
    { path: '/reports/farmers-list', label: 'Farmers Report', icon: FileText },
    { path: '/reports/agents-commission', label: 'Commission Report', icon: FileText },
    { path: '/reports/deliveries', label: 'Deliveries Report', icon: FileText },
    { path: '/reports/loans', label: 'Loans Report', icon: FileText },
    { path: '/reports/purchases', label: 'Purchases Report', icon: FileText },
    { path: '/reports/statements', label: 'Farmer Statements', icon: FileText },
];

export default function Sidebar() {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Logo entrance
            gsap.from('.sidebar-logo', {
                y: -30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });

            // Nav items stagger
            gsap.from('.nav-item', {
                x: -40,
                opacity: 0,
                duration: 0.5,
                stagger: 0.04,
                ease: 'power3.out',
                delay: 0.3
            });
        }, sidebarRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sidebarRef} style={styles.sidebar}>
            {/* Logo */}
            <div className="sidebar-logo" style={styles.logoContainer}>
                <div style={styles.logoIcon}>🐄</div>
                <div>
                    <div style={styles.logoText}>DairySphere</div>
                    <div style={styles.logoSub}>Society</div>
                </div>
            </div>

            {/* Main Navigation */}
            <div style={styles.navSection}>
                <div style={styles.navLabel}>MAIN MENU</div>
                {mainNav.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className="nav-item"
                        end={item.path === '/'}
                        style={({ isActive }) => ({
                            ...styles.navLink,
                            ...(isActive ? styles.navLinkActive : {})
                        })}
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                        {location.pathname === item.path && (
                            <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Reports */}
            <div style={styles.navSection}>
                <div style={styles.navLabel}>REPORTS</div>
                {reportNav.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className="nav-item"
                        style={({ isActive }) => ({
                            ...styles.navLink,
                            ...(isActive ? styles.navLinkActive : {})
                        })}
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    sidebar: {
        width: 'var(--sidebar-width)',
        height: '100vh',
        background: 'var(--primary-dark)',
        position: 'fixed',
        left: 0,
        top: 0,
        overflowY: 'auto',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '2rem'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '24px 24px 32px',
    },
    logoIcon: {
        fontSize: '32px',
    },
    logoText: {
        fontSize: '20px',
        fontWeight: 800,
        color: '#ffffff',
        lineHeight: 1.1,
    },
    logoSub: {
        fontSize: '12px',
        fontWeight: 500,
        color: 'var(--primary-accent)',
        letterSpacing: '2px',
        textTransform: 'uppercase',
    },
    navSection: {
        padding: '0 12px',
        marginBottom: '16px',
    },
    navLabel: {
        fontSize: '11px',
        fontWeight: 700,
        color: '#4a5568',
        letterSpacing: '1.5px',
        padding: '8px 12px',
        marginBottom: '4px',
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 12px',
        borderRadius: '10px',
        color: '#94a3b8',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 500,
        transition: 'all 0.2s ease',
        marginBottom: '2px',
    },
    navLinkActive: {
        background: 'rgba(108, 99, 255, 0.15)',
        color: '#ffffff',
    },
};