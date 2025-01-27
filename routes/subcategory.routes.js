const express = require('express');
const { body, param, query } = require('express-validator');
const router = express.Router();
const subCategoryController = require('../controllers/subcategory.controller');

// Create SubCategory
router.post(
    '/create/:categoryId',
    [
        param('categoryId').isMongoId().withMessage('Invalid Category ID format'),
        body('name').notEmpty().withMessage('Name is required'),
        body('image').notEmpty().isURL().withMessage('Image is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('taxApplicability').isBoolean().withMessage('Tax Applicability must be a boolean')
    ],
    subCategoryController.createSubCategory
);

// Get all sub-categories
router.get('/all', subCategoryController.getAllSubCategories);

// Get all sub-categories under a category
router.get(
    '/category/:categoryId',
    [
        param('categoryId').isMongoId().withMessage('Invalid Category ID format')
    ],
    subCategoryController.getSubCategoriesByCategory
);

// Get a sub-category by name or ID
router.get(
    '/search',
    [
        query('id').optional().isMongoId().withMessage('Invalid ID format'),
        query('name').optional().notEmpty().withMessage('Name is required')
    ],
    subCategoryController.getSubCategoryByNameOrId
);

// Edit SubCategory
router.put(
    '/:subCategoryId',
    [
        param('subCategoryId').isMongoId().withMessage('Invalid SubCategory ID format'),
        body('name').optional().notEmpty().withMessage('Name is required'),
        body('image').optional().isURL().notEmpty().withMessage('Image is required'),
        body('description').optional().notEmpty().withMessage('Description is required'),
        body('taxApplicability').optional().isBoolean().withMessage('Tax Applicability must be a boolean')
    ],
    subCategoryController.editSubCategory
);

module.exports = router;
