import { useState, useEffect } from 'react';

const API = 'http://localhost:3001/api';

interface Props {
  mode: 'add' | 'edit';
  initialData?: any;
  onSuccess: () => void;
  onClose: () => void;
}

const AgentForm = ({ mode, initialData, onSuccess, onClose }: Props) => {
  const [formData, setFormData] = useState({ AgentName: '', Contact: '', Location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        AgentName: initialData.AgentName || '',
        Contact: initialData.Contact || '',
        Location: initialData.Location || '',
      });
    }
  }, [mode, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const url = mode === 'add' ? `${API}/agents` : `${API}/agents/${initialData?.AgentId}`;
      const res = await fetch(url, {
        method: mode === 'add' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed to save');
      onSuccess();
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">AGENT NAME *</label>
          <input type="text" name="AgentName" value={formData.AgentName} onChange={handleChange} placeholder="e.g. James Kariuki" className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">CONTACT *</label>
          <input type="text" name="Contact" value={formData.Contact} onChange={handleChange} placeholder="e.g. 0712345678" className="form-input" required />
        </div>
        <div className="form-group full-width">
          <label className="form-label">LOCATION *</label>
          <input type="text" name="Location" value={formData.Location} onChange={handleChange} placeholder="e.g. Nairobi" className="form-input" required />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
        <button type="submit" disabled={loading} className="btn-submit">{loading ? 'Saving...' : mode === 'add' ? 'Add Agent' : 'Update Agent'}</button>
      </div>
    </form>
  );
};

export default AgentForm;