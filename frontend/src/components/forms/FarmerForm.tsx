import { useState, useEffect } from 'react';
import type { Farmer } from '../../types';
import { farmersAPI } from '../../api';
import Modal from '../common/Modal';
import FormField, { inputStyle, selectStyle } from '../common/FormField';

interface FarmerFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
    editFarmer?: Farmer | null;
}

export default function FarmerForm({ isOpen, onClose, onSaved, editFarmer }: FarmerFormProps) {
    const [form, setForm] = useState({
        farmerName: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        location: '',
        contact: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editFarmer) {
            setForm({
                farmerName: editFarmer.FarmerName,
                dateOfBirth: editFarmer.DateOfBirth,
                gender: editFarmer.Gender,
                email: editFarmer.Email || '',
                location: editFarmer.Location,
                contact: editFarmer.Contact,
            });
        } else {
            setForm({ farmerName: '', dateOfBirth: '', gender: '', email: '', location: '', contact: '' });
        }
        setError('');
    }, [editFarmer, isOpen]);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!form.farmerName || !form.dateOfBirth || !form.gender || !form.location || !form.contact) {
            setError('Please fill in all required fields');
            return;
        }

        setSaving(true);
        setError('');

        try {
            if (editFarmer) {
                await farmersAPI.update(editFarmer.FarmerId, form);
            } else {
                await farmersAPI.create(form);
            }
            onSaved();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editFarmer ? `Edit ${editFarmer.FarmerName}` : 'Add New Farmer'}
            width="560px"
        >
            {error && (
                <div style={S.errorBox}>{error}</div>
            )}

            <div style={S.grid}>
                <FormField label="Full Name *">
                    <input
                        style={inputStyle}
                        placeholder="e.g. John Kamau"
                        value={form.farmerName}
                        onChange={(e) => handleChange('farmerName', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>

                <FormField label="Date of Birth *">
                    <input
                        type="date"
                        style={{ ...inputStyle, colorScheme: 'dark' }}
                        value={form.dateOfBirth}
                        onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>
            </div>

            <div style={S.grid}>
                <FormField label="Gender *">
                    <select
                        style={selectStyle}
                        value={form.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </FormField>

                <FormField label="Email">
                    <input
                        type="email"
                        style={inputStyle}
                        placeholder="email@example.com"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>
            </div>

            <div style={S.grid}>
                <FormField label="Location *">
                    <input
                        style={inputStyle}
                        placeholder="e.g. Nairobi"
                        value={form.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>

                <FormField label="Contact *">
                    <input
                        style={inputStyle}
                        placeholder="e.g. 0712345678"
                        value={form.contact}
                        onChange={(e) => handleChange('contact', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>
            </div>

            {/* Buttons */}
            <div style={S.actions}>
                <button style={S.cancelBtn} onClick={onClose}>Cancel</button>
                <button
                    className="btn-primary"
                    style={{ opacity: saving ? 0.7 : 1 }}
                    onClick={handleSubmit}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : editFarmer ? 'Update Farmer' : 'Add Farmer'}
                </button>
            </div>
        </Modal>
    );
}

const S: Record<string, React.CSSProperties> = {
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    errorBox: {
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: '10px',
        padding: '10px 14px',
        fontSize: '13px',
        color: '#ef4444',
        marginBottom: '18px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '8px',
        paddingTop: '18px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
    },
    cancelBtn: {
        padding: '10px 24px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: 600,
        color: '#8b949e',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        transition: 'all 0.2s ease',
    },
};