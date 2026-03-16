const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        trustServerCertificate: true,
        encrypt: false
    },
    connectionTimeout: 10000,
    requestTimeout: 10000
};

let pool;

async function getConnection() {
    if (!pool) {
        try {
            console.log('⏳ Connecting to SQL Server...');
            pool = await sql.connect(config);
            console.log('✅ Connected to SQL Server!');

            const result = await pool.request().query('SELECT 1 AS TestResult');
            console.log('✅ Test query passed');
        } catch (err) {
            console.error('❌ Connection failed:', err.message);
            process.exit(1);
        }
    }
    return pool;
}

module.exports = { getConnection, sql };