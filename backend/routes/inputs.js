const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all inputs
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                InputId, InputName, InputPrice, CreatedAt
            FROM Inputs
            ORDER BY InputIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /inputs failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single input
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    InputId, InputName, InputPrice, CreatedAt
                FROM Inputs
                WHERE InputId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Input not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /inputs/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new input
router.post('/', async (req, res) => {
    try {
        const { inputName, inputPrice } = req.body;

        if (!inputPrice || inputPrice <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('inputName', sql.NVarChar, inputName)
            .input('inputPrice', sql.Decimal(10, 2), inputPrice)
            .query(`
                INSERT INTO Inputs (InputName, InputPrice)
                OUTPUT INSERTED.InputId, INSERTED.InputName, INSERTED.InputPrice
                VALUES (@inputName, @inputPrice)
            `);

        console.log('✅ Input added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /inputs failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update input
router.put('/:id', async (req, res) => {
    try {
        const { inputName, inputPrice } = req.body;

        if (!inputPrice || inputPrice <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('inputName', sql.NVarChar, inputName)
            .input('inputPrice', sql.Decimal(10, 2), inputPrice)
            .query(`
                UPDATE Inputs 
                SET InputName = @inputName,
                    InputPrice = @inputPrice
                WHERE InputId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Input not found' });
        }
        res.json({ message: 'Input updated successfully' });
    } catch (err) {
        console.error('❌ PUT /inputs/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE input
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Inputs WHERE InputId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Input not found' });
        }
        res.json({ message: 'Input deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /inputs/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;