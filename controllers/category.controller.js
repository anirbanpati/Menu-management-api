const { validationResult } = require('express-validator');
const categoryService = require('../services/category.service');
const logger = require('../utils/logger'); // Import logger

// Create Category
exports.createCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors', { errors: errors.array() });
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const savedCategory = await categoryService.createCategory(req.body);
        res.status(201).json({
            message: 'Category created successfully', response: savedCategory
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        logger.error('Error creating category', { error: error.message });
        res.status(statusCode).json({ message: error.message });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        logger.error('Error fetching categories', { error: error.message });
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get category by name or ID
exports.getCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors', { errors: errors.array() });
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const category = await categoryService.getCategory(req.query);
        res.status(200).json(category);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        logger.error('Error fetching category', { error: error.message });
        res.status(statusCode).json({ message: error.message });
    }
};

// Edit Category
exports.editCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors', { errors: errors.array() });
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedCategory = await categoryService.editCategory(req.params.id, req.body);
        res.status(200).json({ message: 'Category updated successfully', response: updatedCategory });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        logger.error('Error updating category', { error: error.message });
        res.status(statusCode).json({ message: error.message });
    }
};


