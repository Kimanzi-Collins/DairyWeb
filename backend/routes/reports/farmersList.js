const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET farmers list grouped by location
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, DateOfBirth, Age,
                Gender, Email, Contact, Location,
                FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                ProfilePicUrl
            FROM vw_FarmersList
            ORDER BY Location ASC, FarmerId DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmers-list failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET location summary stats
router.get('/summary', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                Location,
                COUNT(*) AS TotalFarmers,
                AVG(Age) AS AvgAge,
                SUM(CASE WHEN Gender = 'Male' THEN 1 ELSE 0 END) AS Males,
                SUM(CASE WHEN Gender = 'Female' THEN 1 ELSE 0 END) AS Females
            FROM vw_FarmersList
            GROUP BY Location
            ORDER BY TotalFarmers DESC, Location ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmers-list/summary failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;