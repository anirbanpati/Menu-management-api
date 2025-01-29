const express = require('express');
const { body, param, query } = require('express-validator');
const router = express.Router();
const itemsController = require('../controllers/items.controller');

// Create Item
router.post(
    '/create',
    [
        body('name').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 30 }).withMessage('Name must be between 3 and 30 characters'),
        body('image').isURL().notEmpty().withMessage('Image is required'),
        body('description').notEmpty().withMessage('Description is required').isLength({ min: 3, max: 100 }).withMessage('Description must be between 3 and 100 characters'),
        body('taxApplicability').isBoolean().withMessage('Tax Applicability must be a boolean'),
        body('tax').optional().isNumeric().withMessage('Tax must be a number'),
        body('baseAmount').isNumeric().withMessage('Base Amount is required'),
        body('discount').isNumeric().withMessage('Discount is required'),
        body('categoryId').optional().isMongoId().withMessage('Invalid Category ID format'),
        body('subcategoryId').optional().isMongoId().withMessage('Invalid SubCategory ID format')
    ],
    itemsController.createItem
);

// Get all items
router.get('/all', itemsController.getAllItems);

// Get items by category
router.get(
    '/category/:categoryId',
    [
        param('categoryId').isMongoId().withMessage('Invalid Category ID format')
    ],
    itemsController.getItemsByCategory
);

// Get items by sub-category
router.get(
    '/subcategory/:subcategoryId',
    [
        param('subcategoryId').isMongoId().withMessage('Invalid SubCategory ID format')
    ],
    itemsController.getItemsBySubCategory
);

// Get item by name or ID
router.get(
    '/search',
    [
        query('id').optional().isMongoId().withMessage('Invalid ID format'),
        query('name').optional().notEmpty().withMessage('Name is required')
    ],
    itemsController.getItemByNameOrId
);

// Edit Item
router.put(
    '/:itemId',
    [
        param('itemId').isMongoId().withMessage('Invalid Item ID format'),
        body('name').optional().notEmpty().withMessage('Name is required').isLength({ min: 3, max: 30 }).withMessage('Name must be between 3 and 30 characters'),
        body('image').optional().isURL().notEmpty().withMessage('Image is required'),
        body('description').optional().notEmpty().withMessage('Description is required'). isLength({ min: 3, max: 100 }).withMessage('Description must be between 3 and 100 characters'),
        body('baseAmount').optional().isNumeric().withMessage('Base Amount is required'),
        body('discount').optional().isNumeric().withMessage('Discount is required'),
        body('categoryId').optional().isMongoId().withMessage('Invalid Category ID format'),
        body('subcategoryId').optional().isMongoId().withMessage('Invalid SubCategory ID format')
    ],
    itemsController.editItem
);

module.exports = router;