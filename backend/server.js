const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from parent directory (D:\MiniProjectzip)
app.use(express.static(path.join(__dirname, '..')));

// Native MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'supply_chain_db';
const client = new MongoClient(mongoURI, { serverSelectionTimeoutMS: 2000 });

async function startServer() {
    try {
        await client.connect();
        const db = client.db(dbName);
        console.log('[OK] Connected to native MongoDB (' + dbName + ') at ' + mongoURI);
        app.locals.db = db;
    } catch (err) {
        console.warn('[WARN] Local MongoDB not reachable on port 27017 (' + err.message + ').');
        console.log('[INFO] Server running in resilient Hybrid mode (serving API & Frontend with cached datasets).');
        app.locals.db = null;
    }

    // Hook up API routes
    app.use('/api', apiRoutes);

    // Root route serves the All-In-One Unified Master Cockpit (app.html)
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'app.html'));
    });

    // Landing marketing route
    app.get('/landing', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'index.html'));
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log('================================================================');
        console.log('🚀 FORAGE ALL-IN-ONE MASTER PLATFORM RUNNING');
        console.log(' 👉 Main Cockpit:     http://localhost:' + PORT + '/');
        console.log(' 👉 All-in-One App:   http://localhost:' + PORT + '/app.html');
        console.log(' 👉 Landing Portal:   http://localhost:' + PORT + '/index.html');
        console.log(' 👉 Farmer Portal:    http://localhost:' + PORT + '/farmer.html');
        console.log(' 👉 Shopkeeper Hub:   http://localhost:' + PORT + '/shopkeeper.html');
        console.log(' 👉 Consumer Pantry:  http://localhost:' + PORT + '/customer.html');
        console.log(' 👉 DB Explorer:      http://localhost:' + PORT + '/supply_chain_dashboard.html');
        console.log(' 👉 API Status:       http://localhost:' + PORT + '/api/status');
        console.log('================================================================');
    });
}

startServer();
