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
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Liquid page transition with blur
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 20, filter: 'blur(8px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)',
                  duration: 0.7, ease: 'expo.out' }
            );
        });
        setTimeout(() => ScrollTrigger.refresh(), 200);
        return () => ctx.revert();
    }, [location.pathname]);

    const ml = collapsed ? '72px' : '260px';

    return (
        <div style={styles.wrapper}>
            {/* Background image layer — change URL for different pages */}
            <div style={styles.bgLayer} />
            {/* Gradient overlay */}
            <div style={styles.gradientOverlay} />

            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

            <main style={{
                ...styles.main,
                marginLeft: ml,
                transition: 'margin-left 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            }}>
                <Header />
                <div ref={contentRef} style={styles.content}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        display: 'flex',
        minHeight: '100vh',
        position: 'relative',
    },
    bgLayer: {
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundImage: `url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2074&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.05,
        filter: 'grayscale(80%)',
        zIndex: 0,
    },
    gradientOverlay: {
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        background: `
            radial-gradient(ellipse at 0% 0%, rgba(139, 124, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 100%, rgba(74, 222, 128, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(45, 212, 191, 0.03) 0%, transparent 60%)
        `,
        zIndex: 0,
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
    },
    content: {
        padding: '28px 32px',
        flex: 1,
    },
};