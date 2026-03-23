const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all quality grades
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                QualityId, Grade, PricePerLitre, CreatedAt
            FROM MilkQuality
            ORDER BY QualityIdNum
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /milk-quality failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single grade
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT QualityId, Grade, PricePerLitre, CreatedAt
                FROM MilkQuality
                WHERE QualityId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Quality grade not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /milk-quality/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new grade
router.post('/', async (req, res) => {
    try {
        const { grade, pricePerLitre } = req.body;

        if (!['A', 'AA', 'B'].includes(grade)) {
            return res.status(400).json({ error: 'Grade must be A, AA, or B' });
        }
        if (!pricePerLitre || pricePerLitre <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('grade', sql.NVarChar, grade)
            .input('pricePerLitre', sql.Decimal(10, 2), pricePerLitre)
            .query(`
                INSERT INTO MilkQuality (Grade, PricePerLitre)
                OUTPUT INSERTED.QualityId, INSERTED.Grade, INSERTED.PricePerLitre
                VALUES (@grade, @pricePerLitre)
            `);

        console.log('✅ Quality grade added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /milk-quality failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update grade price
router.put('/:id', async (req, res) => {
    try {
        const { grade, pricePerLitre } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('grade', sql.NVarChar, grade)
            .input('pricePerLitre', sql.Decimal(10, 2), pricePerLitre)
            .query(`
                UPDATE MilkQuality 
                SET Grade = @grade,
                    PricePerLitre = @pricePerLitre
                WHERE QualityId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Quality grade not found' });
        }
        res.json({ message: 'Quality grade updated successfully' });
    } catch (err) {
        console.error('❌ PUT /milk-quality/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE grade
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM MilkQuality WHERE QualityId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Quality grade not found' });
        }
        res.json({ message: 'Quality grade deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /milk-quality/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;