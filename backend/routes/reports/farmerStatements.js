const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET all farmers monthly statements
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                FarmerContact, FarmerEmail, ProfilePicUrl,
                Age, Gender,
                TxnMonth, TxnYear, TxnMonthNum, MonthDisplay,
                DeliveryCount, TotalLitres, DeliveryAmount,
                SaleCount, SalesAmount, CommissionDeduction,
                ActiveLoans, LoanDeduction,
                PurchaseCount, TotalItemsBought, InputsDeduction,
                TotalDeductions, NetPayment, PaymentStatus
            FROM vw_FarmerMonthlyStatement
            ORDER BY FarmerId ASC, TxnYear ASC, TxnMonthNum ASC
            OPTION (MAXRECURSION 200)
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer monthly statement
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    FarmerId, FarmerName, FarmerLocation,
                    FarmerContact, FarmerEmail, ProfilePicUrl,
                    Age, Gender,
                    FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                    TxnMonth, TxnYear, TxnMonthNum, MonthDisplay,
                    DeliveryCount, TotalLitres, DeliveryAmount,
                    SaleCount, SalesAmount, CommissionDeduction,
                    ActiveLoans, LoanDeduction,
                    PurchaseCount, TotalItemsBought, InputsDeduction,
                    TotalDeductions, NetPayment, PaymentStatus
                FROM vw_FarmerMonthlyStatement
                WHERE FarmerId = @farmerId
                ORDER BY TxnYear ASC, TxnMonthNum ASC
                OPTION (MAXRECURSION 200)
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET lifetime earnings all farmers
router.get('/lifetime', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                FarmerContact, FarmerEmail, ProfilePicUrl,
                Age, Gender,
                FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                ActiveMonths, FirstActiveMonth, LastActiveMonth,
                LifetimeDeliveries, LifetimeLitres, LifetimeDeliveryAmount,
                LifetimeCommission, LifetimeLoanDeductions,
                LifetimeInputsPurchased, LifetimeTotalDeductions,
                LifetimeNetEarnings,
                AvgMonthlyDelivery, AvgMonthlyDeductions, AvgMonthlyNetPayment,
                BestMonthEarning, WorstMonthEarning,
                MonthsInDeficit, MonthsInCredit, MonthsAtZero,
                TotalDeficitAmount, MostRecentMonthPayment
            FROM vw_FarmerLifetimeEarnings
            ORDER BY LifetimeNetEarnings DESC
            OPTION (MAXRECURSION 200)
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements/lifetime failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer lifetime + profile
router.get('/farmer/:farmerId/profile', async (req, res) => {
    try {
        const pool = await getConnection();

        // Part A: Lifetime Summary
        const lifetime = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    FarmerId, FarmerName, FarmerLocation,
                    FarmerContact, FarmerEmail, ProfilePicUrl,
                    Age, Gender,
                    FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                    ActiveMonths, FirstActiveMonth, LastActiveMonth,
                    LifetimeDeliveries, LifetimeLitres, LifetimeDeliveryAmount,
                    LifetimeCommission, LifetimeLoanDeductions,
                    LifetimeInputsPurchased, LifetimeTotalDeductions,
                    LifetimeNetEarnings,
                    AvgMonthlyDelivery, AvgMonthlyDeductions, AvgMonthlyNetPayment,
                    BestMonthEarning, WorstMonthEarning,
                    MonthsInDeficit, MonthsInCredit, MonthsAtZero,
                    TotalDeficitAmount, MostRecentMonthPayment
                FROM vw_FarmerLifetimeEarnings
                WHERE FarmerId = @farmerId
                OPTION (MAXRECURSION 200)
            `);

        // Part B: Monthly Breakdown
        const monthly = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    TxnMonth, MonthDisplay,
                    TxnYear, TxnMonthNum,
                    DeliveryCount, TotalLitres, DeliveryAmount,
                    SaleCount, SalesAmount, CommissionDeduction,
                    ActiveLoans, LoanDeduction,
                    PurchaseCount, TotalItemsBought, InputsDeduction,
                    TotalDeductions, NetPayment, PaymentStatus
                FROM vw_FarmerMonthlyStatement
                WHERE FarmerId = @farmerId
                ORDER BY TxnYear ASC, TxnMonthNum ASC
                OPTION (MAXRECURSION 200)
            `);

        if (lifetime.recordset.length === 0) {
            return res.status(404).json({ error: 'Farmer not found or has no transactions' });
        }

        res.json({
            profile: lifetime.recordset[0],
            monthlyStatements: monthly.recordset
        });
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements/farmer/:id/profile failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET monthly trend across all farmers (for dashboard charts)
router.get('/monthly-trends', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                TxnMonth, MonthDisplay, TxnYear, TxnMonthNum,
                COUNT(DISTINCT FarmerId) AS ActiveFarmers,
                SUM(DeliveryAmount) AS TotalDeliveries,
                SUM(CommissionDeduction) AS TotalCommission,
                SUM(LoanDeduction) AS TotalLoanDeductions,
                SUM(InputsDeduction) AS TotalInputs,
                SUM(TotalDeductions) AS TotalAllDeductions,
                SUM(NetPayment) AS TotalNetPayments,
                SUM(CASE WHEN PaymentStatus = 'Credit' THEN 1 ELSE 0 END) AS FarmersInCredit,
                SUM(CASE WHEN PaymentStatus = 'Deficit' THEN 1 ELSE 0 END) AS FarmersInDeficit,
                SUM(CASE WHEN PaymentStatus = 'Zero' THEN 1 ELSE 0 END) AS FarmersAtZero
            FROM vw_FarmerMonthlyStatement
            GROUP BY TxnMonth, MonthDisplay, TxnYear, TxnMonthNum
            ORDER BY TxnYear ASC, TxnMonthNum ASC
            OPTION (MAXRECURSION 200)
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements/monthly-trends failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET society-wide summary (dashboard top cards)
router.get('/society-summary', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                COUNT(DISTINCT FarmerId) AS TotalFarmers,
                COUNT(DISTINCT TxnMonth) AS TotalMonths,
                SUM(DeliveryAmount) AS TotalDeliveryRevenue,
                SUM(CommissionDeduction) AS TotalCommissionPaid,
                SUM(LoanDeduction) AS TotalLoanCollected,
                SUM(InputsDeduction) AS TotalInputsSold,
                SUM(TotalDeductions) AS TotalDeductions,
                SUM(NetPayment) AS TotalDisbursed,
                AVG(NetPayment) AS AvgMonthlyPayment
            FROM vw_FarmerMonthlyStatement
            OPTION (MAXRECURSION 200)
        `);
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements/society-summary failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;