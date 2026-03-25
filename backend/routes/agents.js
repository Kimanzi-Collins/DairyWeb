const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all agents
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                AgentId, AgentName, Contact, Location, CreatedAt
            FROM Agents
            ORDER BY AgentIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /agents failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single agent
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    AgentId, AgentName, Contact, Location, CreatedAt
                FROM Agents
                WHERE AgentId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Agent not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /agents/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new agent
router.post('/', async (req, res) => {
    try {
        const agentName = (req.body.agentName ?? req.body.AgentName ?? '').trim();
        const contact = (req.body.contact ?? req.body.Contact ?? '').trim();
        const location = (req.body.location ?? req.body.Location ?? '').trim();

        if (!agentName || !contact || !location) {
            return res.status(400).json({ error: 'Agent name, contact and location are required' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('agentName', sql.NVarChar, agentName)
            .input('contact', sql.NVarChar, contact)
            .input('location', sql.NVarChar, location)
            .query(`
                INSERT INTO Agents (AgentName, Contact, Location)
                OUTPUT INSERTED.AgentId, INSERTED.AgentName
                VALUES (@agentName, @contact, @location)
            `);

        console.log('✅ Agent added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /agents failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update agent
router.put('/:id', async (req, res) => {
    try {
        const agentName = (req.body.agentName ?? req.body.AgentName ?? '').trim();
        const contact = (req.body.contact ?? req.body.Contact ?? '').trim();
        const location = (req.body.location ?? req.body.Location ?? '').trim();

        if (!agentName || !contact || !location) {
            return res.status(400).json({ error: 'Agent name, contact and location are required' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('agentName', sql.NVarChar, agentName)
            .input('contact', sql.NVarChar, contact)
            .input('location', sql.NVarChar, location)
            .query(`
                UPDATE Agents 
                SET AgentName = @agentName,
                    Contact = @contact,
                    Location = @location
                WHERE AgentId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Agent not found' });
        }
        res.json({ message: 'Agent updated successfully' });
    } catch (err) {
        console.error('❌ PUT /agents/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE agent
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Agents WHERE AgentId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Agent not found' });
        }
        res.json({ message: 'Agent deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /agents/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;