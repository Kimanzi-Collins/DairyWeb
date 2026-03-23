const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all loans (with farmer names)
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                l.LoanId, l.FarmerId, f.FarmerName,
                l.LoanAmount, l.RepaymentPeriod,
                FORMAT(l.DateBorrowed, 'yyyy-MM-dd') AS DateBorrowed,
                l.CreatedAt
            FROM Loans l
            INNER JOIN Farmers f ON l.FarmerId = f.FarmerId
            ORDER BY l.LoanIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /loans failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single loan
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    l.LoanId, l.FarmerId, f.FarmerName,
                    l.LoanAmount, l.RepaymentPeriod,
                    FORMAT(l.DateBorrowed, 'yyyy-MM-dd') AS DateBorrowed,
                    l.CreatedAt
                FROM Loans l
                INNER JOIN Farmers f ON l.FarmerId = f.FarmerId
                WHERE l.LoanId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /loans/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET loans by farmer
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    l.LoanId, l.FarmerId, f.FarmerName,
                    l.LoanAmount, l.RepaymentPeriod,
                    FORMAT(l.DateBorrowed, 'yyyy-MM-dd') AS DateBorrowed,
                    l.CreatedAt
                FROM Loans l
                INNER JOIN Farmers f ON l.FarmerId = f.FarmerId
                WHERE l.FarmerId = @farmerId
                ORDER BY l.DateBorrowed DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /loans/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new loan
router.post('/', async (req, res) => {
    try {
        const { farmerId, loanAmount, repaymentPeriod, dateBorrowed } = req.body;

        if (!loanAmount || loanAmount <= 0) {
            return res.status(400).json({ error: 'Loan amount must be greater than 0' });
        }
        if (!repaymentPeriod || repaymentPeriod <= 0) {
            return res.status(400).json({ error: 'Repayment period must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, farmerId)
            .input('loanAmount', sql.Decimal(12, 2), loanAmount)
            .input('repaymentPeriod', sql.Int, repaymentPeriod)
            .input('dateBorrowed', sql.Date, dateBorrowed)
            .query(`
                INSERT INTO Loans (FarmerId, LoanAmount, RepaymentPeriod, DateBorrowed)
                OUTPUT INSERTED.LoanId, INSERTED.FarmerId, INSERTED.LoanAmount
                VALUES (@farmerId, @loanAmount, @repaymentPeriod, @dateBorrowed)
            `);

        console.log('✅ Loan added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /loans failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update loan
router.put('/:id', async (req, res) => {
    try {
        const { farmerId, loanAmount, repaymentPeriod, dateBorrowed } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('farmerId', sql.VarChar, farmerId)
            .input('loanAmount', sql.Decimal(12, 2), loanAmount)
            .input('repaymentPeriod', sql.Int, repaymentPeriod)
            .input('dateBorrowed', sql.Date, dateBorrowed)
            .query(`
                UPDATE Loans 
                SET FarmerId = @farmerId,
                    LoanAmount = @loanAmount,
                    RepaymentPeriod = @repaymentPeriod,
                    DateBorrowed = @dateBorrowed
                WHERE LoanId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        res.json({ message: 'Loan updated successfully' });
    } catch (err) {
        console.error('❌ PUT /loans/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE loan
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Loans WHERE LoanId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        res.json({ message: 'Loan deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /loans/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;