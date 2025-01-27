const SubCategory = require('../models/subcategory.model');
const Category = require('../models/category.model');
const isImageURL = require('../utils/isImageURL');

// Create SubCategory
exports.createSubCategory = async (categoryId, subCategoryData) => {
    if (!categoryId || !subCategoryData) {
        throw new Error('Category ID and SubCategory data are required');
    }

    const { name, image, description, taxApplicability, tax } = subCategoryData;

    // Validate required fields
    if (!name || !image || !description) {
        throw new Error('Required fields are missing');
    }

     // Validate image URL
     if (!isImageURL(image)) {
        throw new Error('Invalid image URL');
    }

    // Find the parent category
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new Error('Category not found');
    }

    // Create new subcategory
    const newSubCategory = new SubCategory({
        name,
        image,
        description,
        taxApplicability: taxApplicability !== undefined ? taxApplicability : category.taxApplicability,
        tax: tax !== undefined ? tax : category.tax,
        categoryId 
    });

    // Save subcategory to database
    return await newSubCategory.save();
};

// Edit SubCategory
exports.editSubCategory = async (subCategoryId, subCategoryData) => {
    if (!subCategoryId || !subCategoryData) {
        throw new Error('SubCategory ID and SubCategory data are required');
    }

    const { name, image, description, taxApplicability, tax } = subCategoryData;

    // Validate required fields
    if (!name || !image || !description) {
        throw new Error('Required fields are missing');
    }

     // Validate image URL
     if (!isImageURL(image)) {
        throw new Error('Invalid image URL');
    }

    // Find the subcategory
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
        throw new Error('SubCategory not found');
    }

    // Update subcategory attributes
    subCategory.name = name;
    subCategory.image = image;
    subCategory.description = description;
    subCategory.taxApplicability = taxApplicability !== undefined ? taxApplicability : subCategory.taxApplicability;
    subCategory.tax = tax !== undefined ? tax : subCategory.tax;

    // Save updated subcategory to database
    return await subCategory.save();
};

// Get all sub-categories
exports.getAllSubCategories = async () => {
    return await SubCategory.find();
};

// Get all sub-categories under a category
exports.getSubCategoriesByCategory = async (categoryId) => {
    return await SubCategory.find({ categoryId });
};

// Get a sub-category by name or ID
exports.getSubCategoryByNameOrId = async (query) => {
    const { id, name } = query;

    const subCategory = id ? await SubCategory.findById(id) : await SubCategory.findOne({ name });
    if (!subCategory) {
        throw new Error('Sub-category not found');
    }

    return subCategory;
};
