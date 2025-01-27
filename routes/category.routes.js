const express = require('express');
const { body, param, query } = require('express-validator');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Create Category
router.post(
    '/create',
    [
        body('name').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 30 }).withMessage('Name must be between 3 and 30 characters'),
        body('image').isURL().notEmpty().withMessage('Image is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('taxApplicability').isBoolean().withMessage('Tax Applicability must be a boolean')
    ],
    categoryController.createCategory
);

// Get all categories
router.get('/all', categoryController.getAllCategories);

// Get category by name or ID
router.get(
    '/search',
    [
        query('id').optional().isMongoId().withMessage('Invalid ID format'),
        query('name').optional().notEmpty().withMessage('Name is required')
    ],
    categoryController.getCategory
);

// Edit Category
router.put(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid ID format'),
        body('name').optional().notEmpty().withMessage('Name is required').isLength({ min: 3, max: 30 }).withMessage('Name must be between 3 and 30 characters'),
        body('image').optional().isURL().withMessage('Invalid image URL'),
        body('description').optional().notEmpty().withMessage('Description is required').isLength({ min: 3, max: 100 }).withMessage('Description must be between 3 and 100 characters'),
        body('taxApplicability').optional().isBoolean().withMessage('Tax Applicability must be a boolean')
    ],
    categoryController.editCategory
);

module.exports = router;
