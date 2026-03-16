import { useState, useEffect } from 'react';

const API = 'http://localhost:3001/api/items';

interface Item {
    Id: number;
    Name: string;
    CreatedAt: string;
}

function App() {
    const [items, setItems] = useState<Item[]>([]);
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const fetchItems = async (): Promise<void> => {
        try {
            const res = await fetch(API);
            const data: Item[] = await res.json();
            setItems(data);
            setStatus(`✅ Loaded ${data.length} items from database`);
        } catch {
            setStatus('❌ Cannot reach backend — is it running?');
        }
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!name.trim()) return;

        try {
            setStatus('⏳ Saving...');
            const res = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });

            if (res.ok) {
                setStatus('✅ Saved to database!');
                setName('');
                fetchItems();
            } else {
                setStatus('❌ Save failed');
            }
        } catch {
            setStatus('❌ Cannot reach backend');
        }
    };

    useEffect(() => { fetchItems(); }, []);

    return (
        <div style={{
            padding: '2rem',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h1>🐄 DairySphereSociety</h1>
            <h3>Connection Test</h3>

            {/* STATUS */}
            <p style={{
                padding: '0.5rem',
                background: status.includes('✅') ? '#e6ffe6' : '#fff3e6',
                borderRadius: '4px',
                marginBottom: '1rem'
            }}>
                {status || '⏳ Loading...'}
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a test item name"
                    style={{
                        padding: '0.5rem',
                        width: '70%',
                        marginRight: '0.5rem'
                    }}
                />
                <button
                    type="submit"
                    style={{ padding: '0.5rem 1rem' }}
                >
                    Add Item
                </button>
            </form>

            {/* DATA FROM DATABASE */}
            <h3>Items in Database ({items.length}):</h3>
            {items.length === 0 ? (
                <p>No items yet — add one above!</p>
            ) : (
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr style={{ background: '#f0f0f0' }}>
                            <th style={cellStyle}>ID</th>
                            <th style={cellStyle}>Name</th>
                            <th style={cellStyle}>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.Id}>
                                <td style={cellStyle}>{item.Id}</td>
                                <td style={cellStyle}>{item.Name}</td>
                                <td style={cellStyle}>
                                    {new Date(item.CreatedAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const cellStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left'
};

export default App;