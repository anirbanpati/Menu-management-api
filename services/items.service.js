const Item = require('../models/items.model');
const SubCategory = require('../models/subcategory.model');
const Category = require('../models/category.model');
const mongoose = require('mongoose');
const isImageURL = require('../utils/isImageURL');

// Create Item
exports.createItem = async (itemData) => {
    if (!itemData) {
        const error = new Error('Item data is required');
        error.statusCode = 400;
        throw error;
    }

    const { name, image, description, taxApplicability, tax, baseAmount, discount, categoryId, subcategoryId } = itemData;

    // Validate required fields
    if (!name || !image || !description || baseAmount === undefined || discount === undefined) {
        const error = new Error('Required fields are missing');
        error.statusCode = 400;
        throw error;
    }

    // Validate image URL
    if (!isImageURL(image)) {
        const error = new Error('Invalid image URL');
        error.statusCode = 400;
        throw error;
    }

    // Calculate total amount
    const totalAmount = baseAmount - discount;

    // Check if category or subcategory exists
    if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
        const error = new Error('Invalid Category ID');
        error.statusCode = 400;
        throw error;
    }
    if (subcategoryId && !mongoose.Types.ObjectId.isValid(subcategoryId)) {
        const error = new Error('Invalid SubCategory ID');
        error.statusCode = 400;
        throw error;
    }

    try {
        if (categoryId) {
            const category = await Category.findById(categoryId);
            if (!category) {
                const error = new Error('Category not found');
                error.statusCode = 400;
                throw error;
            }
        }

        if (subcategoryId) {
            const subCategory = await SubCategory.findById(subcategoryId);
            if (!subCategory) {
                const error = new Error('SubCategory not found');
                error.statusCode = 400;
                throw error;
            }
        }

        // Create new item
        const newItem = new Item({
            name,
            image,
            description,
            taxApplicability,
            tax: taxApplicability ? tax : 0,
            baseAmount,
            discount,
            totalAmount,
            categoryId,
            subcategoryId
        });

        // Save item to database
        return await newItem.save();
    } catch (error) {
        const serverError = new Error('Internal Server Error');
        serverError.statusCode = 500;
        throw serverError;
    }
};

// Edit Item
exports.editItem = async (itemId, itemData) => {
    if (!itemId || !itemData) {
        const error = new Error('Item ID and Item data are required');
        error.statusCode = 400;
        throw error;
    }

    const { name, image, description, taxApplicability, tax, baseAmount, discount, categoryId, subcategoryId } = itemData;

    // Validate required fields
    if (!name || !image || !description || baseAmount === undefined || discount === undefined) {
        const error = new Error('Required fields are missing');
        error.statusCode = 400;
        throw error;
    }

    // Validate image URL
    if (!isImageURL(image)) {
        const error = new Error('Invalid image URL');
        error.statusCode = 400;
        throw error;
    }

    // Calculate total amount
    const totalAmount = baseAmount - discount;

    // Find the item
    const item = await Item.findById(itemId);
    if (!item) {
        const error = new Error('Item not found');
        error.statusCode = 400;
        throw error;
    }

    // Update item attributes
    item.name = name;
    item.image = image;
    item.description = description;
    item.taxApplicability = taxApplicability !== undefined ? taxApplicability : item.taxApplicability;
    item.tax = taxApplicability ? tax : 0;
    item.baseAmount = baseAmount;
    item.discount = discount;
    item.totalAmount = totalAmount;
    item.categoryId = categoryId || item.categoryId;
    item.subcategoryId = subcategoryId || item.subcategoryId;

    // Save updated item to database
    return await item.save();
};

// Get all items
exports.getAllItems = async () => {
    return await Item.find();
};

// Get all items under a category
exports.getItemsByCategory = async (categoryId) => {
    return await Item.find({ categoryId });
};

// Get all items under a sub-category
exports.getItemsBySubCategory = async (subcategoryId) => {
    return await Item.find({ subcategoryId });
};

// Get an item by name or ID
exports.getItemByNameOrId = async (query) => {
    const { id, name } = query;

    let item;
    if (id) {
        item = await Item.findById(id);
    } else if (name) {
        item = await Item.find({ name: new RegExp(name, 'i') });
    } else {
        throw new Error('ID or name is required');
    }

    if (!item || (Array.isArray(item) && item.length === 0)) {
        throw new Error('Item not found');
    }

    return item;
};


