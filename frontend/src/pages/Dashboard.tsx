import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Users, Truck, DollarSign, Landmark } from 'lucide-react';
import StatCard from '../components/common/StatCard';

export default function Dashboard() {
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.from(titleRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }, []);

    return (
        <div>
            <h2 ref={titleRef} style={{
                fontSize: '32px',
                fontWeight: 800,
                marginBottom: '8px',
                color: 'var(--text-primary)'
            }}>
                Welcome to DairySphere 🐄
            </h2>
            <p style={{
                color: 'var(--text-muted)',
                marginBottom: '32px',
                fontSize: '15px'
            }}>
                Here's an overview of your dairy cooperative
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px'
            }}>
                <StatCard
                    title="Total Farmers"
                    value="20"
                    subtitle="Across 20 locations"
                    icon={Users}
                    color="#6c63ff"
                    delay={0}
                />
                <StatCard
                    title="Deliveries"
                    value="Loading..."
                    subtitle="This month"
                    icon={Truck}
                    color="#10b981"
                    delay={0.1}
                />
                <StatCard
                    title="Active Loans"
                    value="Loading..."
                    subtitle="Outstanding balance"
                    icon={Landmark}
                    color="#f59e0b"
                    delay={0.2}
                />
                <StatCard
                    title="Total Sales"
                    value="Loading..."
                    subtitle="This month"
                    icon={DollarSign}
                    color="#ef4444"
                    delay={0.3}
                />
            </div>
        </div>
    );
}