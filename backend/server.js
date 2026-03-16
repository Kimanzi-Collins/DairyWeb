const express = require('express');
const cors = require('cors');
const { getConnection, sql } = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

let pool;  // Will hold our database connection

// Health check — hit this in your browser first
app.get('/', (req, res) => {
    res.json({ 
        status: 'Server is running',
        dbConnected: pool ? true : false
    });
});

// GET all items
app.get('/api/items', async (req, res) => {
    try {
        const result = await pool.request().query('SELECT * FROM TestItems');
        console.log('📋 Fetched items:', result.recordset.length);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new item
app.post('/api/items', async (req, res) => {
    try {
        const { name } = req.body;
        console.log('📝 Inserting:', name);

        await pool.request()
            .input('name', sql.NVarChar, name)
            .query('INSERT INTO TestItems (Name) VALUES (@name)');

        console.log('✅ Insert successful');
        res.status(201).json({ message: 'Item added!' });
    } catch (err) {
        console.error('❌ POST failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// START EVERYTHING
async function startServer() {
    console.log('🚀 Starting server...\n');

    // Step 1: Connect to DB FIRST
    pool = await getConnection();

    // Step 2: Only start Express AFTER DB is confirmed working
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log('\n========== ALL SYSTEMS GO ==========');
        console.log(`🌐 Server:  http://localhost:${PORT}`);
        console.log(`📡 Test:    http://localhost:${PORT}/api/items`);
        console.log('=====================================');
    });
}

startServer();