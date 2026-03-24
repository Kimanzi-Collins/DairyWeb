import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Calendar, ArrowRight } from 'lucide-react';
import type { Farmer } from '../../types';
import { formatDate } from '../../utils/formatCurrency';

gsap.registerPlugin(ScrollTrigger);

interface FarmerCardProps {
    farmer: Farmer;
    index: number;
}

const API_BASE = 'http://localhost:3001';

export default function FarmerCard({ farmer, index }: FarmerCardProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [, setIsFlipped] = useState(false);
    const navigate = useNavigate();

    // Scroll-triggered smooth entrance
    useEffect(() => {
        if (!wrapperRef.current) return;

        const ctx = gsap.context(() => {
            gsap.set(wrapperRef.current, {
                opacity: 0,
                y: 80,
                scale: 0.92,
            });

            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: 'top 92%',
                onEnter: () => {
                    gsap.to(wrapperRef.current, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: (index % 4) * 0.1,
                        ease: 'power3.out',
                    });
                },
                once: true,
            });
        });

        return () => ctx.revert();
    }, [index]);

    const handleMouseEnter = () => {
        setIsFlipped(true);
        gsap.to(innerRef.current, {
            rotateY: 180,
            duration: 0.6,
            ease: 'power2.inOut'
        });
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
        gsap.to(innerRef.current, {
            rotateY: 0,
            duration: 0.6,
            ease: 'power2.inOut'
        });
    };

    const handleClick = () => {
        gsap.to(wrapperRef.current, {
            scale: 0.95,
            duration: 0.15,
            ease: 'power2.in',
            onComplete: () => navigate(`/farmers/${farmer.FarmerId}`)
        });
    };

    const profilePic = farmer.ProfilePicUrl
        ? `${API_BASE}${farmer.ProfilePicUrl}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(farmer.FarmerName)}&background=22C55E&color=fff&size=200&font-size=0.4&bold=true`;

    return (
        <div
            ref={wrapperRef}
            style={styles.perspective}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div ref={innerRef} style={styles.cardInner}>

                {/* FRONT */}
                <div style={styles.front}>
                    <div style={styles.accentStripe} />

                    <div style={styles.profileSection}>
                        <div style={styles.avatarWrapper}>
                            <img src={profilePic} alt={farmer.FarmerName} style={styles.avatar} />
                            <div style={{
                                ...styles.statusDot,
                                background: farmer.Age < 35 ? '#22C55E' : '#f59e0b'
                            }} />
                        </div>
                        <div style={styles.idBadge}>{farmer.FarmerId}</div>
                    </div>

                    <h3 style={styles.name}>{farmer.FarmerName}</h3>
                    <div style={styles.locationRow}>
                        <MapPin size={13} color="var(--text-muted)" />
                        <span style={styles.locationText}>{farmer.Location}</span>
                    </div>

                    <div style={styles.tagRow}>
                        <span style={{
                            ...styles.tag,
                            background: farmer.Gender === 'Male'
                                ? 'rgba(34, 197, 94, 0.1)' : 'rgba(236, 72, 153, 0.1)',
                            color: farmer.Gender === 'Male' ? '#22C55E' : '#ec4899',
                            border: farmer.Gender === 'Male'
                                ? '1px solid rgba(34, 197, 94, 0.2)'
                                : '1px solid rgba(236, 72, 153, 0.2)',
                        }}>
                            {farmer.Gender}
                        </span>
                        <span style={styles.tagNeutral}>Age: {farmer.Age}</span>
                    </div>
                </div>

                {/* BACK */}
                <div style={styles.back}>
                    <div style={styles.backContent}>
                        <div style={styles.backHeader}>
                            <img src={profilePic} alt={farmer.FarmerName} style={styles.backAvatar} />
                            <div>
                                <h3 style={styles.backName}>{farmer.FarmerName}</h3>
                                <span style={styles.backId}>{farmer.FarmerId}</span>
                            </div>
                        </div>

                        <div style={styles.backDetails}>
                            <div style={styles.detailRow}>
                                <Phone size={14} color="#22C55E" />
                                <span>{farmer.Contact}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <Mail size={14} color="#22C55E" />
                                <span>{farmer.Email || 'No email'}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <MapPin size={14} color="#22C55E" />
                                <span>{farmer.Location}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <Calendar size={14} color="#22C55E" />
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
        perspective: '1200px',
        cursor: 'pointer',
    },
    cardInner: {
        position: 'relative',
        width: '100%',
        height: '285px',
        transformStyle: 'preserve-3d',
        borderRadius: 'var(--radius)',
    },
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
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
    },
    accentStripe: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #22C55E, #f59e0b)',
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
        width: '76px',
        height: '76px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '3px solid var(--border-light)',
    },
    statusDot: {
        position: 'absolute',
        bottom: '2px', right: '2px',
        width: '14px', height: '14px',
        borderRadius: '50%',
        border: '2.5px solid var(--card-white)',
    },
    idBadge: {
        position: 'absolute',
        top: '-4px', right: '-20px',
        background: '#0c1220',
        color: '#22C55E',
        fontSize: '10px',
        fontWeight: 700,
        padding: '2px 8px',
        borderRadius: '6px',
        letterSpacing: '0.5px',
    },
    name: {
        fontSize: '15px',
        fontWeight: 700,
        color: 'var(--text-primary)',
        textAlign: 'center',
        marginBottom: '4px',
    },
    locationRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        marginBottom: '14px',
    },
    locationText: {
        fontSize: '12px',
        color: 'var(--text-muted)',
    },
    tagRow: {
        display: 'flex',
        gap: '8px',
        marginTop: 'auto',
    },
    tag: {
        fontSize: '11px',
        fontWeight: 600,
        padding: '4px 12px',
        borderRadius: '20px',
    },
    tagNeutral: {
        fontSize: '11px',
        fontWeight: 600,
        padding: '4px 12px',
        borderRadius: '20px',
        background: 'var(--background)',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border)',
    },
    back: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        background: 'linear-gradient(145deg, #0c1220 0%, #1E293B 100%)',
        borderRadius: 'var(--radius)',
        transform: 'rotateY(180deg)',
        padding: '24px',
        border: '1px solid rgba(255,255,255,0.08)',
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
        marginBottom: '18px',
        paddingBottom: '14px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    backAvatar: {
        width: '42px',
        height: '42px',
        borderRadius: '10px',
        objectFit: 'cover',
        border: '2px solid rgba(34, 197, 94, 0.3)',
    },
    backName: {
        fontSize: '14px',
        fontWeight: 700,
        color: '#ffffff',
    },
    backId: {
        fontSize: '11px',
        color: '#22C55E',
        fontWeight: 600,
    },
    backDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '11px',
        flex: 1,
    },
    detailRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '12.5px',
        color: 'rgba(255,255,255,0.75)',
    },
    viewProfile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px',
        background: 'rgba(34, 197, 94, 0.12)',
        border: '1px solid rgba(34, 197, 94, 0.2)',
        borderRadius: '10px',
        color: '#22C55E',
        fontSize: '12.5px',
        fontWeight: 600,
        marginTop: 'auto',
    },
};