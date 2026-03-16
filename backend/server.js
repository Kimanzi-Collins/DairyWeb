const express = require('express');
const cors = require('cors');
const { getConnection, sql } = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());          // Allows React to call this API
app.use(express.json());  // Parses JSON from forms

// ---------- API ROUTES ----------

// GET all items (for reports/display)
app.get('/api/items', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM TestItems');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

// POST a new item (from a form)
app.post('/api/items', async (req, res) => {
    try {
        const { name } = req.body;
        const pool = await getConnection();

        // Parameterized query — prevents SQL injection!
        await pool.request()
            .input('name', sql.NVarChar, name)
            .query('INSERT INTO TestItems (Name) VALUES (@name)');

        res.status(201).json({ message: 'Item added!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Insert failed' });
    }
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});