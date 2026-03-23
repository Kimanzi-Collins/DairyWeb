import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { MapPin, Phone, Mail, Calendar, ArrowRight } from 'lucide-react';
import type { Farmer } from '../../types';
import { formatDate } from '../../utils/formatCurrency';

interface FarmerCardProps {
    farmer: Farmer;
    index: number;
}

const API_BASE = 'http://localhost:3001';

export default function FarmerCard({ farmer, index }: FarmerCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate();

    // Stagger entrance animation
    const handleMouseEnter = () => {
        setIsFlipped(true);
        gsap.to(cardRef.current, {
            rotateY: 180,
            duration: 0.6,
            ease: 'power2.inOut'
        });
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
        gsap.to(cardRef.current, {
            rotateY: 0,
            duration: 0.6,
            ease: 'power2.inOut'
        });
    };

    const handleClick = () => {
        // Animate card before navigating
        gsap.to(cardRef.current, {
            scale: 0.95,
            duration: 0.15,
            ease: 'power2.in',
            onComplete: () => {
                navigate(`/farmers/${farmer.FarmerId}`);
            }
        });
    };

    const profilePic = farmer.ProfilePicUrl
        ? `${API_BASE}${farmer.ProfilePicUrl}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(farmer.FarmerName)}&background=6c63ff&color=fff&size=200&font-size=0.4&bold=true`;

    return (
        <div
            style={styles.perspective}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div ref={cardRef} style={styles.cardInner}>

                {/* ===== FRONT FACE ===== */}
                <div style={styles.front}>
                    {/* Accent stripe */}
                    <div style={styles.accentStripe} />

                    {/* Profile section */}
                    <div style={styles.profileSection}>
                        <div style={styles.avatarWrapper}>
                            <img
                                src={profilePic}
                                alt={farmer.FarmerName}
                                style={styles.avatar}
                            />
                            <div style={{
                                ...styles.statusDot,
                                background: farmer.Age < 35
                                    ? 'var(--success)'
                                    : 'var(--secondary-accent)'
                            }} />
                        </div>
                        <div style={styles.idBadge}>{farmer.FarmerId}</div>
                    </div>

                    {/* Info */}
                    <h3 style={styles.name}>{farmer.FarmerName}</h3>
                    <div style={styles.locationRow}>
                        <MapPin size={14} color="var(--text-muted)" />
                        <span style={styles.locationText}>{farmer.Location}</span>
                    </div>

                    {/* Tags */}
                    <div style={styles.tagRow}>
                        <span style={{
                            ...styles.tag,
                            background: farmer.Gender === 'Male'
                                ? 'rgba(108, 99, 255, 0.1)'
                                : 'rgba(236, 72, 153, 0.1)',
                            color: farmer.Gender === 'Male'
                                ? 'var(--primary-accent)'
                                : '#ec4899'
                        }}>
                            {farmer.Gender}
                        </span>
                        <span style={styles.tag}>
                            Age: {farmer.Age}
                        </span>
                    </div>
                </div>

                {/* ===== BACK FACE ===== */}
                <div style={styles.back}>
                    <div style={styles.backContent}>
                        <div style={styles.backHeader}>
                            <img
                                src={profilePic}
                                alt={farmer.FarmerName}
                                style={styles.backAvatar}
                            />
                            <div>
                                <h3 style={styles.backName}>{farmer.FarmerName}</h3>
                                <span style={styles.backId}>{farmer.FarmerId}</span>
                            </div>
                        </div>

                        <div style={styles.backDetails}>
                            <div style={styles.detailRow}>
                                <Phone size={14} />
                                <span>{farmer.Contact}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <Mail size={14} />
                                <span>{farmer.Email || 'No email'}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <MapPin size={14} />
                                <span>{farmer.Location}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <Calendar size={14} />
                                <span>Joined: {formatDate(farmer.EnrolmentDate)}</span>
                            </div>
                        </div>

                        <div style={styles.viewProfile}>
                            <span>View Full Profile</span>
                            <ArrowRight size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    perspective: {
        perspective: '1000px',
        cursor: 'pointer',
    },
    cardInner: {
        position: 'relative',
        width: '100%',
        height: '280px',
        transformStyle: 'preserve-3d',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        transition: 'box-shadow 0.3s ease',
    },
    // FRONT
    front: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        background: 'var(--card-white)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
    },
    accentStripe: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, var(--primary-accent), var(--secondary-accent))',
        borderRadius: 'var(--radius) var(--radius) 0 0',
    },
    profileSection: {
        position: 'relative',
        marginBottom: '12px',
        marginTop: '8px',
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '3px solid var(--border-light)',
    },
    statusDot: {
        position: 'absolute',
        bottom: '4px',
        right: '4px',
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        border: '2px solid var(--card-white)',
    },
    idBadge: {
        position: 'absolute',
        top: '-4px',
        right: '-16px',
        background: 'var(--primary-dark)',
        color: '#fff',
        fontSize: '10px',
        fontWeight: 700,
        padding: '2px 8px',
        borderRadius: '6px',
    },
    name: {
        fontSize: '16px',
        fontWeight: 700,
        color: 'var(--text-primary)',
        textAlign: 'center',
        marginBottom: '4px',
    },
    locationRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        marginBottom: '12px',
    },
    locationText: {
        fontSize: '13px',
        color: 'var(--text-muted)',
    },
    tagRow: {
        display: 'flex',
        gap: '8px',
        marginTop: 'auto',
    },
    tag: {
        fontSize: '12px',
        fontWeight: 600,
        padding: '4px 12px',
        borderRadius: '20px',
        background: 'var(--background)',
        color: 'var(--text-secondary)',
    },

    // BACK
    back: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, #16213e 100%)',
        borderRadius: 'var(--radius)',
        transform: 'rotateY(180deg)',
        padding: '24px',
    },
    backContent: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    backHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
    },
    backAvatar: {
        width: '45px',
        height: '45px',
        borderRadius: '10px',
        objectFit: 'cover',
    },
    backName: {
        fontSize: '15px',
        fontWeight: 700,
        color: '#ffffff',
    },
    backId: {
        fontSize: '12px',
        color: 'var(--primary-accent)',
        fontWeight: 600,
    },
    backDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1,
    },
    detailRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '13px',
        color: 'rgba(255,255,255,0.8)',
    },
    viewProfile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px',
        background: 'rgba(108, 99, 255, 0.2)',
        borderRadius: '10px',
        color: '#fff',
        fontSize: '13px',
        fontWeight: 600,
        marginTop: 'auto',
        transition: 'background 0.3s ease',
    },
};