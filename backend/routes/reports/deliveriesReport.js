const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET monthly delivery report per farmer (zero records excluded)
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                DeliveryYear, DeliveryMonthNum,
                DeliveryMonth, DeliveryMonthDisplay,
                TotalDeliveries, TotalLitres,
                AvgLitresPerDelivery, MinDelivery, MaxDelivery,
                TotalAmount, AvgAmountPerDelivery, AvgRatePerLitre,
                LitresGradeAA, LitresGradeA, LitresGradeB,
                AmountGradeAA, AmountGradeA, AmountGradeB,
                FactoriesSupplied,
                FORMAT(FirstDelivery, 'yyyy-MM-dd') AS FirstDelivery,
                FORMAT(LastDelivery, 'yyyy-MM-dd') AS LastDelivery
            FROM vw_FarmerMonthlyDeliveries
            WHERE TotalLitres > 0
            ORDER BY FarmerId ASC, DeliveryYear ASC, DeliveryMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/deliveries failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET farmer delivery overview cards
router.get('/overview', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                TotalDeliveries, ActiveMonths,
                TotalLitres, TotalRevenue,
                AvgLitresPerDelivery, AvgRevenuePerDelivery,
                AvgMonthlyLitres, AvgMonthlyRevenue,
                PctGradeAA, PctGradeA, PctGradeB,
                BestSingleDelivery, SmallestDelivery,
                FORMAT(FirstEverDelivery, 'yyyy-MM-dd') AS FirstEverDelivery,
                FORMAT(MostRecentDelivery, 'yyyy-MM-dd') AS MostRecentDelivery
            FROM vw_FarmerDeliveryOverview
            ORDER BY TotalRevenue DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/deliveries/overview failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET monthly totals across all farmers (for charts)
router.get('/monthly-totals', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                DeliveryMonth, DeliveryMonthDisplay,
                DeliveryYear, DeliveryMonthNum,
                ActiveFarmers, TotalDeliveries,
                TotalLitres, TotalRevenue, AvgDeliverySize,
                TotalAA, TotalA, TotalB,
                FactoriesServed
            FROM vw_MonthlyDeliveryTotals
            ORDER BY DeliveryYear ASC, DeliveryMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/deliveries/monthly-totals failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer monthly breakdown
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    DeliveryMonthDisplay,
                    DeliveryYear, DeliveryMonthNum,
                    TotalDeliveries, TotalLitres, TotalAmount,
                    AvgLitresPerDelivery, AvgRatePerLitre,
                    LitresGradeAA, LitresGradeA, LitresGradeB,
                    FORMAT(FirstDelivery, 'yyyy-MM-dd') AS FirstDelivery,
                    FORMAT(LastDelivery, 'yyyy-MM-dd') AS LastDelivery
                FROM vw_FarmerMonthlyDeliveries
                WHERE FarmerId = @farmerId AND TotalLitres > 0
                ORDER BY DeliveryYear ASC, DeliveryMonthNum ASC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/deliveries/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET individual delivery records for a farmer
router.get('/farmer/:farmerId/details', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    DeliveryId, BatchRef,
                    FORMAT(DeliveryDate, 'yyyy-MM-dd') AS DeliveryDate,
                    DeliveryMonthDisplay,
                    MilkQuantity, Grade, RatePerLitre,
                    FactoryName, Amount
                FROM vw_DeliveryDetails
                WHERE FarmerId = @farmerId
                ORDER BY DeliveryDate DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/deliveries/farmer/:id/details failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;