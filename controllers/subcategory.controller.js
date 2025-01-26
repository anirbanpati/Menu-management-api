const { validationResult } = require('express-validator');
const subCategoryService = require('../services/subcategory.service');

// Create SubCategory
exports.createSubCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { categoryId } = req.params;
        const savedSubCategory = await subCategoryService.createSubCategory(categoryId, req.body);
        res.status(201).json(savedSubCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all sub-categories
exports.getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await subCategoryService.getAllSubCategories();
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all sub-categories under a category
exports.getSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const subCategories = await subCategoryService.getSubCategoriesByCategory(categoryId);
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a sub-category by name or ID
exports.getSubCategoryByNameOrId = async (req, res) => {
    try {
        const { id, name } = req.query;
        const subCategory = await subCategoryService.getSubCategoryByNameOrId({ id, name });
        if (!subCategory) {
            return res.status(404).json({ message: 'Sub-category not found' });
        }
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Edit SubCategory
exports.editSubCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { subCategoryId } = req.params;
        const updatedSubCategory = await subCategoryService.editSubCategory(subCategoryId, req.body);
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
