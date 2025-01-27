const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const itemService = require('../services/items.service');

// Create Item
exports.createItem = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const savedItem = await itemService.createItem(req.body);
        res.status(201).json({ message: "Item created successfully", response: savedItem });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await itemService.getAllItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all items under a category
exports.getItemsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid categoryId' });
        }
        const items = await itemService.getItemsByCategory(categoryId);
        res.status(200).json(items);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};

// Get all items under a sub-category
exports.getItemsBySubCategory = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
            return res.status(400).json({ message: 'Invalid subcategoryId' });
        }
        const items = await itemService.getItemsBySubCategory(subcategoryId);
        res.status(200).json(items);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};

// Get an item by name or ID
exports.getItemByNameOrId = async (req, res) => {
    try {
        const { id, name } = req.query;
        const item = await itemService.getItemByNameOrId({ id, name });
        if (!item || (Array.isArray(item) && item.length === 0)) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};

// Edit Item
exports.editItem = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { itemId } = req.params;
        const updatedItem = await itemService.editItem(itemId, req.body);
        res.status(200).json({ message: "Item updated successfully", response: updatedItem });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};


