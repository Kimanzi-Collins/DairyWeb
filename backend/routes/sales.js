const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all sales (with joined details)
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                s.SaleId,
                FORMAT(s.SaleDate, 'yyyy-MM-dd') AS SaleDate,
                s.AgentId, a.AgentName,
                s.FarmerId, f.FarmerName,
                s.SaleAmount, s.Commission,
                s.CreatedAt
            FROM Sales s
            INNER JOIN Agents a ON s.AgentId = a.AgentId
            INNER JOIN Farmers f ON s.FarmerId = f.FarmerId
            ORDER BY s.SaleIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /sales failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single sale
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    s.SaleId,
                    FORMAT(s.SaleDate, 'yyyy-MM-dd') AS SaleDate,
                    s.AgentId, a.AgentName,
                    s.FarmerId, f.FarmerName,
                    s.SaleAmount, s.Commission,
                    s.CreatedAt
                FROM Sales s
                INNER JOIN Agents a ON s.AgentId = a.AgentId
                INNER JOIN Farmers f ON s.FarmerId = f.FarmerId
                WHERE s.SaleId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /sales/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET sales by agent
router.get('/agent/:agentId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('agentId', sql.VarChar, req.params.agentId)
            .query(`
                SELECT 
                    s.SaleId,
                    FORMAT(s.SaleDate, 'yyyy-MM-dd') AS SaleDate,
                    s.AgentId, a.AgentName,
                    s.FarmerId, f.FarmerName,
                    s.SaleAmount, s.Commission
                FROM Sales s
                INNER JOIN Agents a ON s.AgentId = a.AgentId
                INNER JOIN Farmers f ON s.FarmerId = f.FarmerId
                WHERE s.AgentId = @agentId
                ORDER BY s.SaleDate DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /sales/agent/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET sales by farmer
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    s.SaleId,
                    FORMAT(s.SaleDate, 'yyyy-MM-dd') AS SaleDate,
                    s.AgentId, a.AgentName,
                    s.FarmerId, f.FarmerName,
                    s.SaleAmount, s.Commission
                FROM Sales s
                INNER JOIN Agents a ON s.AgentId = a.AgentId
                INNER JOIN Farmers f ON s.FarmerId = f.FarmerId
                WHERE s.FarmerId = @farmerId
                ORDER BY s.SaleDate DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /sales/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new sale
router.post('/', async (req, res) => {
    try {
        const { saleDate, agentId, farmerId, saleAmount } = req.body;

        if (!saleAmount || saleAmount <= 0) {
            return res.status(400).json({ error: 'Sale amount must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('saleDate', sql.Date, saleDate)
            .input('agentId', sql.VarChar, agentId)
            .input('farmerId', sql.VarChar, farmerId)
            .input('saleAmount', sql.Decimal(12, 2), saleAmount)
            .query(`
                INSERT INTO Sales (SaleDate, AgentId, FarmerId, SaleAmount)
                OUTPUT INSERTED.SaleId, INSERTED.SaleAmount, INSERTED.Commission
                VALUES (@saleDate, @agentId, @farmerId, @saleAmount)
            `);

        console.log('✅ Sale added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /sales failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update sale
router.put('/:id', async (req, res) => {
    try {
        const { saleDate, agentId, farmerId, saleAmount } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('saleDate', sql.Date, saleDate)
            .input('agentId', sql.VarChar, agentId)
            .input('farmerId', sql.VarChar, farmerId)
            .input('saleAmount', sql.Decimal(12, 2), saleAmount)
            .query(`
                UPDATE Sales 
                SET SaleDate = @saleDate,
                    AgentId = @agentId,
                    FarmerId = @farmerId,
                    SaleAmount = @saleAmount
                WHERE SaleId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.json({ message: 'Sale updated successfully' });
    } catch (err) {
        console.error('❌ PUT /sales/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE sale
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Sales WHERE SaleId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.json({ message: 'Sale deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /sales/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;