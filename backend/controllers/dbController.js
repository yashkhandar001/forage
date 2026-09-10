const fs = require('fs');
const path = require('path');

// Helper to load fallback data from db_export.json
let fallbackData = null;
function getFallbackData() {
    if (!fallbackData) {
        try {
            const dataPath = path.join(__dirname, '..', '..', 'db_export.json');
            if (fs.existsSync(dataPath)) {
                fallbackData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
            }
        } catch (e) {
            fallbackData = {};
        }
    }
    return fallbackData || {};
}

// In-memory store for newly added crop listings
let inMemoryListings = [
    {
        id: 'F-CROP-101',
        name: 'Fresh Roma Tomatoes',
        category: 'Vegetables',
        variety: 'Roma Grade-A Export',
        quantity: 850,
        capacityMax: 1000,
        unit: 'kg',
        pricePerUnit: 27.45,
        mandiBenchmark: 23.00,
        farmGatePrice: 27.45,
        wholesalePrice: 32.01,
        retailPrice: 45.19,
        harvestDate: '2026-09-09',
        location: 'Patil Farm Cold Storage #1',
        status: 'Available',
        color: '#E11D48',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 'F-CROP-102',
        name: 'Nashik Red Onions',
        category: 'Vegetables',
        variety: 'Piquant Red Export',
        quantity: 1200,
        capacityMax: 1500,
        unit: 'kg',
        pricePerUnit: 31.01,
        mandiBenchmark: 26.50,
        farmGatePrice: 31.01,
        wholesalePrice: 35.67,
        retailPrice: 44.36,
        harvestDate: '2026-09-08',
        location: 'Nashik Agro Warehouse B',
        status: 'Available',
        color: '#A855F7',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 'F-CROP-103',
        name: 'Organic Kufri Potatoes',
        category: 'Vegetables',
        variety: 'Kufri Jyoti Clean',
        quantity: 950,
        capacityMax: 1200,
        unit: 'kg',
        pricePerUnit: 24.55,
        mandiBenchmark: 21.00,
        farmGatePrice: 24.55,
        wholesalePrice: 28.30,
        retailPrice: 37.12,
        harvestDate: '2026-09-07',
        location: 'Pune Cold Storage Unit 4',
        status: 'Available',
        color: '#EAB308',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80'
    }
];

// Fetch all listings (crops)
exports.getAllListings = async (req, res) => {
    try {
        const db = req.app.locals.db;
        if (db) {
            const listings = await db.collection('listings').find({}).toArray();
            if (listings && listings.length > 0) {
                return res.json(listings);
            }
        }
        res.json(inMemoryListings);
    } catch (error) {
        console.error('Database fetch error:', error.message);
        res.json(inMemoryListings);
    }
};

// Add a new crop listing
exports.addListing = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const newCropData = req.body;
        if (!newCropData.id) {
            newCropData.id = 'F-CROP-' + (Date.now() % 10000);
        }

        if (db) {
            const result = await db.collection('listings').insertOne(newCropData);
            return res.json({ 
                message: 'Crop added successfully to MongoDB!', 
                id: result.insertedId,
                item: newCropData
            });
        }
        inMemoryListings.unshift(newCropData);
        res.json({ 
            message: 'Crop added successfully (In-Memory / MongoDB Offline)!', 
            id: newCropData.id,
            item: newCropData
        });
    } catch (error) {
        console.error('Database insert error:', error.message);
        inMemoryListings.unshift(req.body);
        res.json({ message: 'Crop added successfully (Fallback Mode)', item: req.body });
    }
};

// Fetch pantry inventory (from pantry_inventory collection)
exports.getPantry = async (req, res) => {
    try {
        const db = req.app.locals.db;
        if (db) {
            const pantry = await db.collection('pantry_inventory').find({}).toArray();
            if (pantry && pantry.length > 0) {
                return res.json(pantry);
            }
        }
        const fb = getFallbackData();
        res.json(fb.pantry_inventory || []);
    } catch (error) {
        const fb = getFallbackData();
        res.json(fb.pantry_inventory || []);
    }
};

// Fetch price index (from price_index collection)
exports.getPrices = async (req, res) => {
    try {
        const db = req.app.locals.db;
        if (db) {
            const prices = await db.collection('price_index').find({}).toArray();
            if (prices && prices.length > 0) {
                return res.json(prices);
            }
        }
        const fb = getFallbackData();
        res.json(fb.price_index || []);
    } catch (error) {
        const fb = getFallbackData();
        res.json(fb.price_index || []);
    }
};

// Fetch transit degradation logs (from transit_logs collection)
exports.getTransitLogs = async (req, res) => {
    try {
        const db = req.app.locals.db;
        if (db) {
            const logs = await db.collection('transit_logs').find({}).toArray();
            if (logs && logs.length > 0) {
                return res.json(logs);
            }
        }
        const fb = getFallbackData();
        res.json(fb.transit_logs || []);
    } catch (error) {
        const fb = getFallbackData();
        res.json(fb.transit_logs || []);
    }
};
