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
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    connectionTimeout: 10000,
    requestTimeout: 30000
};

let pool;

async function getConnection() {
    if (!pool) {
        try {
            console.log('⏳ Connecting to SQL Server...');
            pool = await sql.connect(config);
            console.log('✅ Connected to SQL Server!');
        } catch (err) {
            console.error('❌ Connection failed:', err.message);
            process.exit(1);
        }
    }
    return pool;
}

module.exports = { getConnection, sql };