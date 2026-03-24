import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Users, UserCheck, Factory,
    Package, Milk, Landmark, Truck,
    ShoppingCart, DollarSign, FileText,
    ChevronRight, Leaf, PanelLeftClose, PanelLeft
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
    { path: '/reports/agents-commission', label: 'Commission', icon: FileText },
    { path: '/reports/deliveries', label: 'Deliveries', icon: FileText },
    { path: '/reports/loans', label: 'Loans', icon: FileText },
    { path: '/reports/purchases', label: 'Purchases', icon: FileText },
    { path: '/reports/statements', label: 'Statements', icon: FileText },
];

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const location = useLocation();

    return (
        <div style={{
            ...styles.sidebar,
            width: collapsed ? '72px' : '260px',
        }}>
            {/* Logo */}
            <div style={{
                ...styles.logoContainer,
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '20px 0 16px' : '20px 20px 16px',
            }}>
                <div style={styles.logoIconWrap}>
                    <Leaf size={20} color="#22C55E" />
                </div>
                {!collapsed && (
                    <div>
                        <div style={styles.logoText}>DairySphere</div>
                        <div style={styles.logoSub}>SOCIETY</div>
                    </div>
                )}
            </div>

            {/* Toggle */}
            <div
                onClick={onToggle}
                style={{
                    ...styles.toggleBtn,
                    justifyContent: collapsed ? 'center' : 'flex-end',
                    padding: collapsed ? '0' : '0 16px',
                }}
            >
                <div style={styles.toggleInner}>
                    {collapsed
                        ? <PanelLeft size={16} color="rgba(255,255,255,0.5)" />
                        : <PanelLeftClose size={16} color="rgba(255,255,255,0.5)" />
                    }
                </div>
            </div>

            {/* Scrollable Nav */}
            <div style={styles.scrollArea}>

                {/* Main Nav */}
                <div style={styles.navSection}>
                    {!collapsed && <div style={styles.navLabel}>MAIN MENU</div>}
                    {collapsed && <div style={styles.navDivider} />}

                    {mainNav.map((item) => {
                        const isActive = item.path === '/'
                            ? location.pathname === '/'
                            : location.pathname.startsWith(item.path);

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/'}
                                title={collapsed ? item.label : undefined}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '11px',
                                    padding: collapsed ? '11px 0' : '11px 14px',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    fontSize: '13.5px',
                                    fontWeight: isActive ? 600 : 500,
                                    marginBottom: '2px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    background: isActive ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                                    borderLeft: isActive && !collapsed ? '3px solid #22C55E' : '3px solid transparent',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <item.icon
                                    size={18}
                                    color={isActive ? '#22C55E' : '#8b9fc0'}
                                    style={{ flexShrink: 0 }}
                                />
                                {!collapsed && (
                                    <>
                                        <span style={{
                                            color: isActive ? '#ffffff' : '#8b9fc0',
                                        }}>
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <ChevronRight
                                                size={14}
                                                color="#22C55E"
                                                style={{ marginLeft: 'auto' }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </div>

                {/* Reports Nav */}
                <div style={styles.navSection}>
                    {!collapsed && <div style={styles.navLabel}>REPORTS</div>}
                    {collapsed && <div style={styles.navDivider} />}

                    {reportNav.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                title={collapsed ? item.label : undefined}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '11px',
                                    padding: collapsed ? '11px 0' : '11px 14px',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    fontSize: '13.5px',
                                    fontWeight: isActive ? 600 : 500,
                                    marginBottom: '2px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    background: isActive ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                                    borderLeft: isActive && !collapsed ? '3px solid #22C55E' : '3px solid transparent',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <item.icon
                                    size={18}
                                    color={isActive ? '#22C55E' : '#8b9fc0'}
                                    style={{ flexShrink: 0 }}
                                />
                                {!collapsed && (
                                    <span style={{
                                        color: isActive ? '#ffffff' : '#8b9fc0',
                                    }}>
                                        {item.label}
                                    </span>
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Card */}
            {!collapsed ? (
                <div style={styles.bottomCard}>
                    <div style={{ fontSize: '18px' }}>🐄</div>
                    <div style={{ flex: 1 }}>
                        <div style={styles.bottomName}>DairySphere v1.0</div>
                        <div style={styles.bottomSub}>SQL Server Connected</div>
                    </div>
                    <div style={styles.statusDot} />
                </div>
            ) : (
                <div style={styles.bottomCollapsed}>
                    <div style={styles.statusDot} />
                </div>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    sidebar: {
        height: '100vh',
        background: '#0c1220',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        transition: 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all 0.3s ease',
    },
    logoIconWrap: {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        background: 'rgba(34, 197, 94, 0.12)',
        border: '1px solid rgba(34, 197, 94, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    logoText: {
        fontSize: '17px',
        fontWeight: 800,
        color: '#ffffff',
        lineHeight: 1.1,
        fontFamily: 'Poppins, sans-serif',
        whiteSpace: 'nowrap',
    },
    logoSub: {
        fontSize: '9px',
        fontWeight: 700,
        color: '#22C55E',
        letterSpacing: '3px',
    },
    toggleBtn: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
        cursor: 'pointer',
    },
    toggleInner: {
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s ease',
    },
    scrollArea: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '0 8px',
    },
    navSection: {
        marginBottom: '12px',
    },
    navLabel: {
        fontSize: '10px',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '1.5px',
        padding: '10px 14px 6px',
        whiteSpace: 'nowrap',
    },
    navDivider: {
        height: '1px',
        background: 'rgba(255,255,255,0.06)',
        margin: '8px 12px',
    },
    bottomCard: {
        margin: '8px 10px 14px',
        padding: '12px 14px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    bottomCollapsed: {
        display: 'flex',
        justifyContent: 'center',
        padding: '14px 0',
    },
    bottomName: {
        fontSize: '11px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.6)',
        whiteSpace: 'nowrap',
    },
    bottomSub: {
        fontSize: '10px',
        color: 'rgba(255,255,255,0.25)',
        whiteSpace: 'nowrap',
    },
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#22C55E',
        flexShrink: 0,
        boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)',
    },
};