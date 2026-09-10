const express = require('express');
const router = express.Router();

// Import controllers
const logisticsController = require('../controllers/logisticsController');
const marketController = require('../controllers/marketController');
const aiController = require('../controllers/aiController');
const dbController = require('../controllers/dbController');

// System Check
router.get('/status', (req, res) => {
    res.json({
        status: "online",
        message: "🚀 Forage Fullstack API is online and ready!",
        database: req.app.locals.db ? "Connected (live MongoDB supply_chain_db)" : "Hybrid/Offline (Cached fallback)",
        endpoints: [
            "/api/status",
            "/api/listings",
            "/api/pantry",
            "/api/prices",
            "/api/transit",
            "/api/logistics/health",
            "/api/market/markup",
            "/api/ai/recipe"
        ]
    });
});

// Database Routes (Native MongoDB)
router.get('/listings', dbController.getAllListings);
router.post('/listings', dbController.addListing);
router.get('/pantry', dbController.getPantry);
router.get('/prices', dbController.getPrices);
router.get('/transit', dbController.getTransitLogs);

// Algorithm Routes
router.post('/logistics/health', logisticsController.calculateHealth);
router.post('/market/markup', marketController.calculateMarkup);
router.post('/ai/recipe', aiController.getRecipe);

module.exports = router;
