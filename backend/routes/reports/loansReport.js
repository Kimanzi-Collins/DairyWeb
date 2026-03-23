const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET all loan details with interest calculations
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                LoanId, FarmerId, FarmerName, FarmerLocation,
                LoanAmount, RepaymentPeriod,
                FORMAT(DateBorrowed, 'yyyy-MM-dd') AS DateBorrowed,
                DateBorrowedDisplay, BorrowedMonthDisplay,
                BorrowedYear, BorrowedMonthNum,
                InterestAmount, TotalRepayable, MonthlyInstallment,
                FORMAT(DueDate, 'yyyy-MM-dd') AS DueDate,
                DueDateDisplay, LoanStatus,
                MonthsElapsed, MonthsRemaining,
                ExpectedPaidToDate, OutstandingBalance,
                InterestRatePA
            FROM vw_LoanDetails
            ORDER BY BorrowedYear ASC, BorrowedMonthNum ASC, LoanId ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/loans failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET monthly loan summary
router.get('/monthly', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                BorrowedYear, BorrowedMonthNum,
                BorrowedMonth, BorrowedMonthDisplay,
                TotalLoans, UniqueBorrowers,
                TotalPrincipal, AvgLoanAmount,
                SmallestLoan, LargestLoan,
                TotalInterest, TotalRepayable,
                AvgRepaymentMonths, ShortestTerm, LongestTerm,
                TotalMonthlyInstallments,
                ActiveLoans, CompletedLoans,
                TotalOutstanding
            FROM vw_MonthlyLoanSummary
            ORDER BY BorrowedYear ASC, BorrowedMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/loans/monthly failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET farmer loan overview cards
router.get('/farmer-overview', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                TotalLoans, ActiveLoans, CompletedLoans,
                TotalBorrowed, TotalInterest, TotalRepayable,
                TotalExpectedPaid, TotalOutstanding,
                CurrentMonthlyObligation,
                AvgLoanSize, AvgRepaymentPeriod,
                FORMAT(FirstLoanDate, 'yyyy-MM-dd') AS FirstLoanDate,
                FORMAT(LatestLoanDate, 'yyyy-MM-dd') AS LatestLoanDate
            FROM vw_FarmerLoanOverview
            ORDER BY TotalOutstanding DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/loans/farmer-overview failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET active loans only
router.get('/active', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                LoanId, FarmerId, FarmerName,
                LoanAmount, InterestAmount, TotalRepayable,
                MonthlyInstallment, RepaymentPeriod,
                MonthsElapsed, MonthsRemaining,
                CAST(
                    (MonthsElapsed * 100.0 / RepaymentPeriod) 
                AS DECIMAL(5,1)) AS ProgressPercent,
                DueDateDisplay,
                ExpectedPaidToDate, OutstandingBalance
            FROM vw_LoanDetails
            WHERE LoanStatus = 'Active'
            ORDER BY OutstandingBalance DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/loans/active failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer loans
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    LoanId, FarmerId, FarmerName,
                    LoanAmount, RepaymentPeriod,
                    FORMAT(DateBorrowed, 'yyyy-MM-dd') AS DateBorrowed,
                    DateBorrowedDisplay,
                    InterestAmount, TotalRepayable, MonthlyInstallment,
                    DueDateDisplay, LoanStatus,
                    MonthsElapsed, MonthsRemaining,
                    ExpectedPaidToDate, OutstandingBalance,
                    InterestRatePA
                FROM vw_LoanDetails
                WHERE FarmerId = @farmerId
                ORDER BY DateBorrowed DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/loans/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET portfolio summary (dashboard cards)
router.get('/portfolio', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                COUNT(*) AS TotalLoans,
                SUM(CASE WHEN LoanStatus = 'Active' THEN 1 ELSE 0 END) AS ActiveLoans,
                SUM(CASE WHEN LoanStatus = 'Completed' THEN 1 ELSE 0 END) AS CompletedLoans,
                COUNT(DISTINCT FarmerId) AS TotalBorrowers,
                SUM(LoanAmount) AS TotalDisbursed,
                SUM(InterestAmount) AS TotalInterestEarned,
                SUM(TotalRepayable) AS TotalPortfolio,
                SUM(ExpectedPaidToDate) AS TotalCollected,
                SUM(OutstandingBalance) AS TotalOutstanding,
                AVG(LoanAmount) AS AvgLoanSize,
                AVG(RepaymentPeriod) AS AvgTerm
            FROM vw_LoanDetails
        `);
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /reports/loans/portfolio failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;