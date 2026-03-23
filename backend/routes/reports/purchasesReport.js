const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET monthly purchase report per farmer
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                PurchaseYear, PurchaseMonthNum,
                PurchaseMonth, PurchaseMonthDisplay,
                TotalTransactions, UniqueInputs,
                TotalQuantity, TotalSpent,
                AvgTransactionAmount,
                SmallestPurchase, LargestPurchase,
                TopInput,
                FORMAT(FirstPurchase, 'yyyy-MM-dd') AS FirstPurchase,
                FORMAT(LastPurchase, 'yyyy-MM-dd') AS LastPurchase
            FROM vw_FarmerMonthlyPurchases
            WHERE TotalSpent > 0
            ORDER BY FarmerId ASC, PurchaseYear ASC, PurchaseMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/purchases failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET monthly totals across all farmers (for charts)
router.get('/monthly-totals', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                PurchaseMonth, PurchaseMonthDisplay,
                PurchaseYear, PurchaseMonthNum,
                TotalTransactions, ActiveBuyers, UniqueInputs,
                TotalQuantity, TotalSpent, AvgTransactionAmount,
                SpentOnFeeds, SpentOnChemicals,
                SpentOnMinerals, SpentOnSilage
            FROM vw_MonthlyPurchaseTotals
            ORDER BY PurchaseYear ASC, PurchaseMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/purchases/monthly-totals failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET farmer purchase overview cards
router.get('/farmer-overview', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                TotalTransactions, UniqueInputsBought, ActiveMonths,
                TotalQuantity, TotalSpent,
                AvgTransactionAmount, AvgMonthlySpend,
                LargestSinglePurchase, SmallestSinglePurchase,
                FORMAT(FirstEverPurchase, 'yyyy-MM-dd') AS FirstEverPurchase,
                FORMAT(MostRecentPurchase, 'yyyy-MM-dd') AS MostRecentPurchase
            FROM vw_FarmerPurchaseOverview
            ORDER BY TotalSpent DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/purchases/farmer-overview failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET input popularity ranking
router.get('/popular-inputs', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                InputId, InputName, InputPrice,
                TimesPurchased, UniqueBuyers,
                TotalQuantitySold, TotalRevenue,
                AvgQuantityPerPurchase,
                MonthsActive, AvgMonthlyRevenue
            FROM vw_InputPopularity
            ORDER BY TotalRevenue DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/purchases/popular-inputs failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer purchase history
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    PurchaseId,
                    FORMAT(DateOfPurchase, 'yyyy-MM-dd') AS DateOfPurchase,
                    PurchaseMonthDisplay,
                    InputId, InputName,
                    InputPrice, Quantity,
                    PurchaseAmount, PriceStatus
                FROM vw_PurchaseDetails
                WHERE FarmerId = @farmerId
                ORDER BY DateOfPurchase DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/purchases/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET portfolio summary (dashboard cards)
router.get('/portfolio', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                COUNT(*) AS TotalTransactions,
                COUNT(DISTINCT FarmerId) AS TotalBuyers,
                COUNT(DISTINCT InputId) AS UniqueInputs,
                COUNT(DISTINCT PurchaseMonth) AS ActiveMonths,
                SUM(Quantity) AS TotalQuantity,
                SUM(PurchaseAmount) AS TotalRevenue,
                AVG(PurchaseAmount) AS AvgTransaction,
                MAX(PurchaseAmount) AS LargestPurchase,
                MIN(PurchaseAmount) AS SmallestPurchase
            FROM vw_PurchaseDetails
        `);
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /reports/purchases/portfolio failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;