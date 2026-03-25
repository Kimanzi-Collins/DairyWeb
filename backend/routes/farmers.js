const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const farmersUploadsDir = path.join(__dirname, '..', 'uploads', 'farmers');
if (!fs.existsSync(farmersUploadsDir)) {
    fs.mkdirSync(farmersUploadsDir, { recursive: true });
}

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    },
});

// GET all farmers
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, DateOfBirth, Age,
                Gender, Email, Location, Contact,
                FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                ProfilePicUrl, CreatedAt
            FROM Farmers
            ORDER BY FarmerIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /farmers failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer by FarmerId
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    FarmerId, FarmerName, DateOfBirth, Age,
                    Gender, Email, Location, Contact,
                    FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                    ProfilePicUrl, CreatedAt
                FROM Farmers
                WHERE FarmerId = @id
            `);
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /farmers/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new farmer
router.post('/', async (req, res) => {
    try {
        const { farmerName, dateOfBirth, gender, email, location, contact } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerName', sql.NVarChar, farmerName)
            .input('dateOfBirth', sql.Date, dateOfBirth)
            .input('gender', sql.NVarChar, gender)
            .input('email', sql.NVarChar, email || null)
            .input('location', sql.NVarChar, location)
            .input('contact', sql.NVarChar, contact)
            .query(`
                INSERT INTO Farmers (FarmerName, DateOfBirth, Gender, Email, Location, Contact)
                OUTPUT INSERTED.FarmerId, INSERTED.FarmerName
                VALUES (@farmerName, @dateOfBirth, @gender, @email, @location, @contact)
            `);

        console.log('✅ Farmer added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /farmers failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update farmer
router.put('/:id', async (req, res) => {
    try {
        const { farmerName, dateOfBirth, gender, email, location, contact } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('farmerName', sql.NVarChar, farmerName)
            .input('dateOfBirth', sql.Date, dateOfBirth)
            .input('gender', sql.NVarChar, gender)
            .input('email', sql.NVarChar, email || null)
            .input('location', sql.NVarChar, location)
            .input('contact', sql.NVarChar, contact)
            .query(`
                UPDATE Farmers 
                SET FarmerName = @farmerName,
                    DateOfBirth = @dateOfBirth,
                    Gender = @gender,
                    Email = @email,
                    Location = @location,
                    Contact = @contact
                WHERE FarmerId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json({ message: 'Farmer updated successfully' });
    } catch (err) {
        console.error('❌ PUT /farmers/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE farmer
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Farmers WHERE FarmerId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json({ message: 'Farmer deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /farmers/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST upload farmer profile picture
router.post('/:id/profile-pic', upload.single('profilePic'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const farmerId = req.params.id;
        const safeFarmerId = farmerId.replace(/[^a-zA-Z0-9_-]/g, '');
        const fileName = `${safeFarmerId}-${Date.now()}.jpg`;
        const relativeUrl = `/uploads/farmers/${fileName}`;
        const outputPath = path.join(farmersUploadsDir, fileName);

        await sharp(req.file.buffer)
            .rotate()
            .resize(512, 512, { fit: 'cover' })
            .jpeg({ quality: 86, mozjpeg: true })
            .toFile(outputPath);

        const pool = await getConnection();

        const oldPicResult = await pool.request()
            .input('id', sql.VarChar, farmerId)
            .query('SELECT ProfilePicUrl FROM Farmers WHERE FarmerId = @id');

        if (oldPicResult.recordset.length === 0) {
            if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
            return res.status(404).json({ error: 'Farmer not found' });
        }

        const oldPicUrl = oldPicResult.recordset[0].ProfilePicUrl;

        await pool.request()
            .input('id', sql.VarChar, farmerId)
            .input('profilePicUrl', sql.NVarChar, relativeUrl)
            .query(`
                UPDATE Farmers
                SET ProfilePicUrl = @profilePicUrl
                WHERE FarmerId = @id
            `);

        if (oldPicUrl && oldPicUrl.startsWith('/uploads/farmers/')) {
            const oldFilePath = path.join(__dirname, '..', oldPicUrl.replace(/^\//, ''));
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        res.json({
            message: 'Profile picture uploaded successfully',
            profilePicUrl: relativeUrl,
        });
    } catch (err) {
        console.error('❌ POST /farmers/:id/profile-pic failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;