import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
    const contentRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // Page transition animation
    useEffect(() => {
        gsap.fromTo(contentRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
    }, [location.pathname]);

    return (
        <div style={styles.wrapper}>
            <Sidebar />
            <div style={styles.main}>
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
    },
    main: {
        flex: 1,
        marginLeft: 'var(--sidebar-width)',
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        padding: '28px 32px',
        flex: 1,
    },
};