const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all farmers
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, DateOfBirth, Age,
                Gender, Email, Location, Contact,
                FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                ProfilePicUrl, CreatedAt
            FROM Farmers
            ORDER BY FarmerIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /farmers failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer by FarmerId
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    FarmerId, FarmerName, DateOfBirth, Age,
                    Gender, Email, Location, Contact,
                    FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                    ProfilePicUrl, CreatedAt
                FROM Farmers
                WHERE FarmerId = @id
            `);
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /farmers/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new farmer
router.post('/', async (req, res) => {
    try {
        const { farmerName, dateOfBirth, gender, email, location, contact } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerName', sql.NVarChar, farmerName)
            .input('dateOfBirth', sql.Date, dateOfBirth)
            .input('gender', sql.NVarChar, gender)
            .input('email', sql.NVarChar, email || null)
            .input('location', sql.NVarChar, location)
            .input('contact', sql.NVarChar, contact)
            .query(`
                INSERT INTO Farmers (FarmerName, DateOfBirth, Gender, Email, Location, Contact)
                OUTPUT INSERTED.FarmerId, INSERTED.FarmerName
                VALUES (@farmerName, @dateOfBirth, @gender, @email, @location, @contact)
            `);

        console.log('✅ Farmer added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /farmers failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update farmer
router.put('/:id', async (req, res) => {
    try {
        const { farmerName, dateOfBirth, gender, email, location, contact } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('farmerName', sql.NVarChar, farmerName)
            .input('dateOfBirth', sql.Date, dateOfBirth)
            .input('gender', sql.NVarChar, gender)
            .input('email', sql.NVarChar, email || null)
            .input('location', sql.NVarChar, location)
            .input('contact', sql.NVarChar, contact)
            .query(`
                UPDATE Farmers 
                SET FarmerName = @farmerName,
                    DateOfBirth = @dateOfBirth,
                    Gender = @gender,
                    Email = @email,
                    Location = @location,
                    Contact = @contact
                WHERE FarmerId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json({ message: 'Farmer updated successfully' });
    } catch (err) {
        console.error('❌ PUT /farmers/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE farmer
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Farmers WHERE FarmerId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json({ message: 'Farmer deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /farmers/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;