exports.calculateMarkup = (req, res) => {
    const { baseFarmPrice, currentMarketPrice } = req.body;

    if (!baseFarmPrice || !currentMarketPrice) {
        return res.status(400).json({ error: "Missing price data" });
    }

    // Profit Margin Algorithm
    const markupPercentage = ((currentMarketPrice - baseFarmPrice) / baseFarmPrice) * 100;

    res.json({
        farm_price: baseFarmPrice,
        market_price: currentMarketPrice,
        markup_percentage: markupPercentage.toFixed(2) + '%',
        insight: `Shopkeepers are marking this up by ${markupPercentage.toFixed(1)}%`
    });
};