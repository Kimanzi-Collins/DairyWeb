const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        trustServerCertificate: true,  // Required for local dev
        encrypt: false                  // Fine for localhost
    }
};

let pool;

async function getConnection() {
    if (!pool) {
        pool = await sql.connect(config);
        console.log('✅ Connected to SQL Server!');
    }
    return pool;
}

module.exports = { getConnection, sql };