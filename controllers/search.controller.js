const { validationResult } = require('express-validator');
const searchService = require('../services/search.service');

// Search items by name
exports.searchItemsByName = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name } = req.query;
        const items = await searchService.searchItemsByName(name);
        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found' });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
