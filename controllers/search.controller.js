const { validationResult } = require('express-validator');
const searchService = require('../services/search.service');
const logger = require('../utils/logger'); // Import logger

// Search items by name
exports.searchItemsByName = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors', { errors: errors.array() });
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name } = req.query;
        const items = await searchService.searchItemsByName(name);
        if (items.length === 0) {
            logger.info('No items found', { name });
            return res.status(404).json({ message: 'No items found' });
        }
        res.status(200).json(items);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        logger.error('Error searching items', { error: error.message });
        res.status(statusCode).json({ message: error.message });
    }
};
