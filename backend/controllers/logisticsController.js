exports.calculateHealth = (req, res) => {
    const { crop, hoursInTransit, tempCelsius } = req.body;
    
    // Fragility Constants (Higher means it rots faster)
    const fragilityConstants = {
        'Tomatoes': 1.5,
        'Onions': 0.3,
        'Potatoes': 0.2,
        'Mangoes': 1.8
    };

    const k = fragilityConstants[crop] || 1.0;
    
    // Transit Degradation Algorithm
    let healthScore = 100 - (hoursInTransit * (tempCelsius / 20) * k);
    healthScore = Math.max(0, Math.min(100, healthScore)); // Clamp between 0-100

    let statusMsg = healthScore < 50 ? 'Warning: Degrading rapidly' : 'Optimal Condition';

    res.json({
        crop: crop,
        current_health_score: Math.round(healthScore),
        status: statusMsg
    });
};