const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all purchases (with joined details)
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                ip.PurchaseId,
                ip.FarmerId, f.FarmerName,
                ip.InputId, ip.InputName, ip.InputPrice,
                ip.Quantity, ip.PurchaseAmount,
                FORMAT(ip.DateOfPurchase, 'yyyy-MM-dd') AS DateOfPurchase,
                ip.CreatedAt
            FROM InputPurchases ip
            INNER JOIN Farmers f ON ip.FarmerId = f.FarmerId
            ORDER BY ip.PurchaseIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /input-purchases failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single purchase
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    ip.PurchaseId,
                    ip.FarmerId, f.FarmerName,
                    ip.InputId, ip.InputName, ip.InputPrice,
                    ip.Quantity, ip.PurchaseAmount,
                    FORMAT(ip.DateOfPurchase, 'yyyy-MM-dd') AS DateOfPurchase,
                    ip.CreatedAt
                FROM InputPurchases ip
                INNER JOIN Farmers f ON ip.FarmerId = f.FarmerId
                WHERE ip.PurchaseId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /input-purchases/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET purchases by farmer
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    ip.PurchaseId,
                    ip.FarmerId, f.FarmerName,
                    ip.InputId, ip.InputName, ip.InputPrice,
                    ip.Quantity, ip.PurchaseAmount,
                    FORMAT(ip.DateOfPurchase, 'yyyy-MM-dd') AS DateOfPurchase
                FROM InputPurchases ip
                INNER JOIN Farmers f ON ip.FarmerId = f.FarmerId
                WHERE ip.FarmerId = @farmerId
                ORDER BY ip.DateOfPurchase DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /input-purchases/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET input details for auto-fill (name + price)
router.get('/input-details/:inputId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('inputId', sql.VarChar, req.params.inputId)
            .query(`
                SELECT InputId, InputName, InputPrice 
                FROM Inputs 
                WHERE InputId = @inputId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Input not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /input-purchases/input-details/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new purchase
router.post('/', async (req, res) => {
    try {
        const { farmerId, inputId, inputName, inputPrice, quantity, dateOfPurchase } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be greater than 0' });
        }
        if (!inputPrice || inputPrice <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, farmerId)
            .input('inputId', sql.VarChar, inputId)
            .input('inputName', sql.NVarChar, inputName)
            .input('inputPrice', sql.Decimal(10, 2), inputPrice)
            .input('quantity', sql.Int, quantity)
            .input('dateOfPurchase', sql.Date, dateOfPurchase)
            .query(`
                INSERT INTO InputPurchases (FarmerId, InputId, InputName, InputPrice, Quantity, DateOfPurchase)
                OUTPUT INSERTED.PurchaseId, INSERTED.FarmerId, INSERTED.PurchaseAmount
                VALUES (@farmerId, @inputId, @inputName, @inputPrice, @quantity, @dateOfPurchase)
            `);

        console.log('✅ Purchase added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /input-purchases failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update purchase
router.put('/:id', async (req, res) => {
    try {
        const { farmerId, inputId, inputName, inputPrice, quantity, dateOfPurchase } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('farmerId', sql.VarChar, farmerId)
            .input('inputId', sql.VarChar, inputId)
            .input('inputName', sql.NVarChar, inputName)
            .input('inputPrice', sql.Decimal(10, 2), inputPrice)
            .input('quantity', sql.Int, quantity)
            .input('dateOfPurchase', sql.Date, dateOfPurchase)
            .query(`
                UPDATE InputPurchases 
                SET FarmerId = @farmerId,
                    InputId = @inputId,
                    InputName = @inputName,
                    InputPrice = @inputPrice,
                    Quantity = @quantity,
                    DateOfPurchase = @dateOfPurchase
                WHERE PurchaseId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.json({ message: 'Purchase updated successfully' });
    } catch (err) {
        console.error('❌ PUT /input-purchases/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE purchase
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM InputPurchases WHERE PurchaseId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.json({ message: 'Purchase deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /input-purchases/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;