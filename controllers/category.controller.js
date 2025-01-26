const { validationResult } = require('express-validator');
const categoryService = require('../services/category.service');

// Create Category
exports.createCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const savedCategory = await categoryService.createCategory(req.body);
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get category by name or ID
exports.getCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const category = await categoryService.getCategory(req.query);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Edit Category
exports.editCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedCategory = await categoryService.editCategory(req.params.id, req.body);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


