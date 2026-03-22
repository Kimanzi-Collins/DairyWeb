const express = require('express');
const cors = require('cors');
const path = require('path');
const { getConnection } = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---- CRUD ROUTES ----
const farmersRoute = require('./routes/farmers');
// We'll add the rest one by one
// const agentsRoute = require('./routes/agents');
// const factoriesRoute = require('./routes/factories');
// const inputsRoute = require('./routes/inputs');
// const milkQualityRoute = require('./routes/milkQuality');
// const loansRoute = require('./routes/loans');
// const deliveriesRoute = require('./routes/deliveries');
// const inputPurchasesRoute = require('./routes/inputPurchases');
// const salesRoute = require('./routes/sales');

// ---- REPORT ROUTES ----
// const farmersListReport = require('./routes/reports/farmersList');
// const agentsCommissionReport = require('./routes/reports/agentsCommission');
// const deliveriesReportRoute = require('./routes/reports/deliveriesReport');
// const loansReportRoute = require('./routes/reports/loansReport');
// const purchasesReportRoute = require('./routes/reports/purchasesReport');
// const farmerStatementsRoute = require('./routes/reports/farmerStatements');

// ---- REGISTER ROUTES ----
app.use('/api/farmers', farmersRoute);
// app.use('/api/agents', agentsRoute);
// app.use('/api/factories', factoriesRoute);
// app.use('/api/inputs', inputsRoute);
// app.use('/api/milk-quality', milkQualityRoute);
// app.use('/api/loans', loansRoute);
// app.use('/api/deliveries', deliveriesRoute);
// app.use('/api/input-purchases', inputPurchasesRoute);
// app.use('/api/sales', salesRoute);

// app.use('/api/reports/farmers-list', farmersListReport);
// app.use('/api/reports/agents-commission', agentsCommissionReport);
// app.use('/api/reports/deliveries', deliveriesReportRoute);
// app.use('/api/reports/loans', loansReportRoute);
// app.use('/api/reports/purchases', purchasesReportRoute);
// app.use('/api/reports/farmer-statements', farmerStatementsRoute);

// Health check
app.get('/', (req, res) => {
    res.json({ status: '🐄 DairySphereSociety API is running' });
});

// Start server
async function startServer() {
    console.log('🚀 Starting DairySphereSociety API...\n');
    await getConnection();

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log('\n========== ALL SYSTEMS GO ==========');
        console.log(`🐄 API:     http://localhost:${PORT}`);
        console.log(`📡 Farmers: http://localhost:${PORT}/api/farmers`);
        console.log('=====================================');
    });
}

startServer();