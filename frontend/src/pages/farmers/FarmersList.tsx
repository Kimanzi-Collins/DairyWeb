import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, UserPlus, MapPin, Search } from 'lucide-react';
import type { Farmer } from '../../types';
import { farmersAPI } from '../../api';
import FarmerCard from '../../components/common/FarmerCard';
import StatCard from '../../components/common/StatCard';

gsap.registerPlugin(ScrollTrigger);

export default function FarmersList() {
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFarmers();
    }, []);

    const loadFarmers = async () => {
        try {
            const data = await farmersAPI.getAll() as Farmer[];
            setFarmers(data);
            setLoading(false);

            // Refresh ScrollTrigger after data loads
            setTimeout(() => ScrollTrigger.refresh(), 200);
        } catch (err) {
            console.error('Failed to load farmers:', err);
            setLoading(false);
        }
    };

    const filtered = farmers.filter(f =>
        f.FarmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.FarmerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.Location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const grouped = filtered.reduce((acc, farmer) => {
        if (!acc[farmer.Location]) acc[farmer.Location] = [];
        acc[farmer.Location].push(farmer);
        return acc;
    }, {} as Record<string, Farmer[]>);

    const locations = Object.keys(grouped).sort();
    const males = farmers.filter(f => f.Gender === 'Male').length;
    const females = farmers.filter(f => f.Gender === 'Female').length;
    const avgAge = farmers.length
        ? Math.round(farmers.reduce((a, f) => a + f.Age, 0) / farmers.length)
        : 0;

    if (loading) {
        return (
            <div style={styles.loading}>
                <div style={styles.spinner} />
                <p style={{ color: 'var(--text-muted)' }}>Loading farmers...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Stats */}
            <div style={styles.statsGrid}>
                <StatCard title="Total Farmers" value={farmers.length}
                    subtitle={`${locations.length} locations`}
                    icon={Users} color="#22C55E" delay={0} />
                <StatCard title="Male Farmers" value={males}
                    subtitle={`${farmers.length ? ((males / farmers.length) * 100).toFixed(0) : 0}% of total`}
                    icon={Users} color="#3b82f6" delay={0.1} />
                <StatCard title="Female Farmers" value={females}
                    subtitle={`${farmers.length ? ((females / farmers.length) * 100).toFixed(0) : 0}% of total`}
                    icon={Users} color="#ec4899" delay={0.2} />
                <StatCard title="Average Age" value={avgAge}
                    subtitle="years old"
                    icon={Users} color="#f59e0b" delay={0.3} />
            </div>

            {/* Toolbar */}
            <div style={styles.toolbar}>
                <div style={styles.searchWrapper}>
                    <Search size={18} color="var(--text-muted)" />
                    <input
                        type="text"
                        placeholder="Search by name, ID, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>
                <button className="btn-primary" style={styles.addButton}>
                    <UserPlus size={18} />
                    <span>Add Farmer</span>
                </button>
            </div>

            {/* Grouped Cards */}
            {locations.map((location) => (
                <div key={location} style={styles.locationGroup}>
                    <div style={styles.locationHeader}>
                        <div style={styles.locationDot} />
                        <MapPin size={16} color="#22C55E" />
                        <h2 style={styles.locationTitle}>{location}</h2>
                        <span style={styles.locationCount}>
                            {grouped[location].length} farmer{grouped[location].length > 1 ? 's' : ''}
                        </span>
                        <div style={styles.locationLine} />
                    </div>
                    <div style={styles.cardGrid}>
                        {grouped[location]
                            .sort((a, b) => b.FarmerId.localeCompare(a.FarmerId))
                            .map((farmer, index) => (
                                <FarmerCard
                                    key={farmer.FarmerId}
                                    farmer={farmer}
                                    index={index}
                                />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '28px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
    },
    searchWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'var(--card-white)',
        borderRadius: '12px',
        padding: '10px 20px',
        boxShadow: 'var(--shadow)',
        width: '400px',
        border: '1px solid var(--border)',
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        color: 'var(--text-primary)',
        width: '100%',
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '11px 24px',
        background: '#22C55E',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
    },
    locationGroup: {
        marginBottom: '36px',
    },
    locationHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '18px',
    },
    locationDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#22C55E',
        boxShadow: '0 0 8px rgba(34, 197, 94, 0.4)',
    },
    locationTitle: {
        fontSize: '17px',
        fontWeight: 700,
        color: 'var(--text-primary)',
    },
    locationCount: {
        fontSize: '11px',
        fontWeight: 600,
        color: 'var(--text-muted)',
        background: 'var(--background)',
        padding: '3px 12px',
        borderRadius: '20px',
        border: '1px solid var(--border)',
    },
    locationLine: {
        flex: 1,
        height: '1px',
        background: 'var(--border)',
        marginLeft: '8px',
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '20px',
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        gap: '16px',
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '3px solid var(--border)',
        borderTopColor: '#22C55E',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
};