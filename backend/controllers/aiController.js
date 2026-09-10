exports.getRecipe = (req, res) => {
    const { expiringIngredients } = req.body; 

    if (!expiringIngredients || expiringIngredients.length === 0) {
        return res.status(400).json({ error: "Provide ingredients array" });
    }

    // The string you will eventually send to the Gemini/OpenAI API
    const prompt = `I have ${expiringIngredients.join(', ')} that are about to expire. Give me a creative, exotic recipe using these ingredients.`;

    // Mock response for the presentation
    const mockAiResponse = `Here is a creative idea: Try making a spiced ${expiringIngredients[0]} and ${expiringIngredients[1]} stir-fry! Sauté them with garlic, ginger, and a dash of soy sauce.`;

    res.json({
        ai_prompt_used: prompt,
        recommendation: mockAiResponse
    });
};