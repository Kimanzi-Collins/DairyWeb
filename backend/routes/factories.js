const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all factories
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FactoryId, FactoryName, Location, Contact, CreatedAt
            FROM Factories
            ORDER BY FactoryIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /factories failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single factory
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    FactoryId, FactoryName, Location, Contact, CreatedAt
                FROM Factories
                WHERE FactoryId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Factory not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /factories/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new factory
router.post('/', async (req, res) => {
    try {
        const { factoryName, location, contact } = req.body;

        // Validate contact length
        if (!contact || contact.length !== 10) {
            return res.status(400).json({ error: 'Contact must be exactly 10 characters' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('factoryName', sql.NVarChar, factoryName)
            .input('location', sql.NVarChar, location)
            .input('contact', sql.NVarChar, contact)
            .query(`
                INSERT INTO Factories (FactoryName, Location, Contact)
                OUTPUT INSERTED.FactoryId, INSERTED.FactoryName
                VALUES (@factoryName, @location, @contact)
            `);

        console.log('✅ Factory added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /factories failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update factory
router.put('/:id', async (req, res) => {
    try {
        const { factoryName, location, contact } = req.body;

        if (!contact || contact.length !== 10) {
            return res.status(400).json({ error: 'Contact must be exactly 10 characters' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('factoryName', sql.NVarChar, factoryName)
            .input('location', sql.NVarChar, location)
            .input('contact', sql.NVarChar, contact)
            .query(`
                UPDATE Factories 
                SET FactoryName = @factoryName,
                    Location = @location,
                    Contact = @contact
                WHERE FactoryId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Factory not found' });
        }
        res.json({ message: 'Factory updated successfully' });
    } catch (err) {
        console.error('❌ PUT /factories/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE factory
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Factories WHERE FactoryId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Factory not found' });
        }
        res.json({ message: 'Factory deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /factories/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;