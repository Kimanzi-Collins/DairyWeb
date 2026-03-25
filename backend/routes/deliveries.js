const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all deliveries (with joined details)
router.get('/', async (req, res) => {
    try {
        const { factoryId, farmerId } = req.query;
        const pool = await getConnection();
        const request = pool.request();

        const filters = [];
        if (factoryId) {
            request.input('factoryId', sql.VarChar, String(factoryId));
            filters.push('d.FactoryId = @factoryId');
        }
        if (farmerId) {
            request.input('farmerId', sql.VarChar, String(farmerId));
            filters.push('d.FarmerId = @farmerId');
        }

        const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

        const result = await request.query(`
            SELECT 
                d.DeliveryId, d.BatchRef,
                d.FarmerId, f.FarmerName,
                d.MilkQuantity,
                d.QualityId, mq.Grade,
                d.RatePerLitre,
                d.FactoryId, fa.FactoryName,
                FORMAT(d.DeliveryDate, 'yyyy-MM-dd') AS DeliveryDate,
                d.Amount,
                d.CreatedAt
            FROM Deliveries d
            INNER JOIN Farmers f ON d.FarmerId = f.FarmerId
            INNER JOIN MilkQuality mq ON d.QualityId = mq.QualityId
            INNER JOIN Factories fa ON d.FactoryId = fa.FactoryId
            ${whereClause}
            ORDER BY d.DeliveryIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /deliveries failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single delivery
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    d.DeliveryId, d.BatchRef,
                    d.FarmerId, f.FarmerName,
                    d.MilkQuantity,
                    d.QualityId, mq.Grade,
                    d.RatePerLitre,
                    d.FactoryId, fa.FactoryName,
                    FORMAT(d.DeliveryDate, 'yyyy-MM-dd') AS DeliveryDate,
                    d.Amount,
                    d.CreatedAt
                FROM Deliveries d
                INNER JOIN Farmers f ON d.FarmerId = f.FarmerId
                INNER JOIN MilkQuality mq ON d.QualityId = mq.QualityId
                INNER JOIN Factories fa ON d.FactoryId = fa.FactoryId
                WHERE d.DeliveryId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Delivery not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /deliveries/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET deliveries by farmer
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    d.DeliveryId, d.BatchRef,
                    d.FarmerId, f.FarmerName,
                    d.MilkQuantity,
                    d.QualityId, mq.Grade,
                    d.RatePerLitre,
                    d.FactoryId, fa.FactoryName,
                    FORMAT(d.DeliveryDate, 'yyyy-MM-dd') AS DeliveryDate,
                    d.Amount
                FROM Deliveries d
                INNER JOIN Farmers f ON d.FarmerId = f.FarmerId
                INNER JOIN MilkQuality mq ON d.QualityId = mq.QualityId
                INNER JOIN Factories fa ON d.FactoryId = fa.FactoryId
                WHERE d.FarmerId = @farmerId
                ORDER BY d.DeliveryDate DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /deliveries/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET rate for a quality grade (for auto-fill on frontend)
router.get('/rate/:qualityId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('qualityId', sql.VarChar, req.params.qualityId)
            .query(`
                SELECT PricePerLitre 
                FROM MilkQuality 
                WHERE QualityId = @qualityId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Quality grade not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /deliveries/rate/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new delivery
router.post('/', async (req, res) => {
    try {
        const { farmerId, milkQuantity, qualityId, ratePerLitre, factoryId, deliveryDate } = req.body;

        if (!milkQuantity || milkQuantity <= 0) {
            return res.status(400).json({ error: 'Milk quantity must be greater than 0' });
        }
        if (!ratePerLitre || ratePerLitre <= 0) {
            return res.status(400).json({ error: 'Rate per litre must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, farmerId)
            .input('milkQuantity', sql.Decimal(10, 2), milkQuantity)
            .input('qualityId', sql.VarChar, qualityId)
            .input('ratePerLitre', sql.Decimal(10, 2), ratePerLitre)
            .input('factoryId', sql.VarChar, factoryId)
            .input('deliveryDate', sql.Date, deliveryDate)
            .query(`
                INSERT INTO Deliveries (FarmerId, MilkQuantity, QualityId, RatePerLitre, FactoryId, DeliveryDate)
                OUTPUT INSERTED.DeliveryId, INSERTED.BatchRef, INSERTED.FarmerId, INSERTED.Amount
                VALUES (@farmerId, @milkQuantity, @qualityId, @ratePerLitre, @factoryId, @deliveryDate)
            `);

        console.log('✅ Delivery added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /deliveries failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update delivery
router.put('/:id', async (req, res) => {
    try {
        const { farmerId, milkQuantity, qualityId, ratePerLitre, factoryId, deliveryDate } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('farmerId', sql.VarChar, farmerId)
            .input('milkQuantity', sql.Decimal(10, 2), milkQuantity)
            .input('qualityId', sql.VarChar, qualityId)
            .input('ratePerLitre', sql.Decimal(10, 2), ratePerLitre)
            .input('factoryId', sql.VarChar, factoryId)
            .input('deliveryDate', sql.Date, deliveryDate)
            .query(`
                UPDATE Deliveries 
                SET FarmerId = @farmerId,
                    MilkQuantity = @milkQuantity,
                    QualityId = @qualityId,
                    RatePerLitre = @ratePerLitre,
                    FactoryId = @factoryId,
                    DeliveryDate = @deliveryDate
                WHERE DeliveryId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Delivery not found' });
        }
        res.json({ message: 'Delivery updated successfully' });
    } catch (err) {
        console.error('❌ PUT /deliveries/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE delivery
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Deliveries WHERE DeliveryId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Delivery not found' });
        }
        res.json({ message: 'Delivery deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /deliveries/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;