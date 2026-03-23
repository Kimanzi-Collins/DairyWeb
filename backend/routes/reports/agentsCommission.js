const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET all agents monthly commission
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                AgentId, AgentName, AgentLocation, AgentContact,
                SaleMonth, SaleMonthDisplay, SaleYear, SaleMonthNum,
                TotalTransactions, UniqueFarmers,
                TotalSales, TotalCommission,
                AvgSaleAmount, MinSale, MaxSale
            FROM vw_AgentsCommissionMonthly
            ORDER BY AgentId ASC, SaleYear ASC, SaleMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/agents-commission failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET agent summary cards
router.get('/summary', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                AgentId, AgentName, AgentLocation, AgentContact,
                TotalTransactions, UniqueFarmers, ActiveMonths,
                TotalSales, TotalCommission, AvgSaleAmount,
                FORMAT(FirstSaleDate, 'yyyy-MM-dd') AS FirstSaleDate,
                FORMAT(LastSaleDate, 'yyyy-MM-dd') AS LastSaleDate
            FROM vw_AgentsSummary
            ORDER BY TotalSales DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/agents-commission/summary failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single agent detail
router.get('/agent/:agentId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('agentId', sql.VarChar, req.params.agentId)
            .query(`
                SELECT 
                    SaleId, SaleDate,
                    FORMAT(SaleDate, 'yyyy-MM-dd') AS SaleDateDisplay,
                    SaleMonthDisplay,
                    AgentId, AgentName,
                    FarmerId, FarmerName, FarmerLocation,
                    SaleAmount, Commission
                FROM vw_AgentSalesDetail
                WHERE AgentId = @agentId
                ORDER BY SaleDate DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/agents-commission/agent/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET monthly trend data (for charts)
router.get('/trends', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                AgentId, AgentName,
                SaleMonth, SaleMonthDisplay,
                TotalSales, TotalCommission, TotalTransactions
            FROM vw_AgentsCommissionMonthly
            ORDER BY AgentId, SaleYear, SaleMonthNum
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/agents-commission/trends failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;