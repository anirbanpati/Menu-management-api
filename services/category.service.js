const Category = require('../models/category.model');
const isImageURL = require('../utils/isImageURL');

// Create Category
exports.createCategory = async (categoryData) => {
    if (!categoryData) {
        throw new Error('Category data is required');
    }

    const { name, image, description, taxApplicability, tax, taxType } = categoryData;

    // Validate required fields
    if (!name || !image || !description || taxApplicability === undefined) {
        throw new Error('Required fields are missing');
    }

    // Validate image URL
    if (!isImageURL(image)) {
        const error = new Error('Invalid image URL');
        error.statusCode = 400;
        throw error;
    }
    // Create new category
    const newCategory = new Category({
        name,
        image,
        description,
        taxApplicability,
        tax: taxApplicability ? tax : 0,
        taxType: taxApplicability ? taxType : null
    });

    // Save category to database
    return await newCategory.save();
};

// Get all categories
exports.getAllCategories = async () => {
    return await Category.find();
};

// Get category by name or ID
exports.getCategory = async (query) => {
    const { id, name } = query;

    let category;
    if (id) {
        category = await Category.findById(id);
    } else if (name) {
        category = await Category.findOne({ name });
    } else {
        throw new Error('ID or name is required');
    }

    if (!category) {
        throw new Error('Category not found');
    }

    return category;
};

// Edit Category
exports.editCategory = async (id, updateData) => {
    const { name, image, description, taxApplicability, tax, taxType } = updateData;

    // Validate required fields
    if (!id) {
        throw new Error('Category ID is required');
    }

     // Validate image URL
     if (!isImageURL(image)) {
        throw new Error('Invalid image URL');
    }

    // Find category by ID and update
    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        {
            name,
            image,
            description,
            taxApplicability,
            tax: taxApplicability ? tax : 0,
            taxType: taxApplicability ? taxType : null
        },
        { new: true } // Return the updated document
    );

    if (!updatedCategory) {
        throw new Error('Category not found');
    }

    return updatedCategory;
};
