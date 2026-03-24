import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sidebar from './Sidebar';
import Header from './Header';

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
    const contentRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Page transition
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            );
        });

        // Small delay to let DOM render, then refresh ScrollTrigger
        setTimeout(() => ScrollTrigger.refresh(), 100);

        return () => ctx.revert();
    }, [location.pathname]);

    const marginLeft = sidebarCollapsed ? '72px' : '260px';

    return (
        <div style={styles.wrapper}>
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            <div style={{
                ...styles.main,
                marginLeft,
                transition: 'margin-left 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            }}>
                <Header />
                <div ref={contentRef} style={styles.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--background)',
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    content: {
        padding: '28px 32px',
        flex: 1,
    },
};