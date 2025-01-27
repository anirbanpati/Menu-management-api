const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlenght: 30, minlenght: 3 },
  image: { type: String, required: true },
  description: { type: String, required: true, maxlenght: 100, minlenght: 3 },
  taxApplicability: { type: Boolean, default: null }, // Defaults to the category's value
  tax: { type: Number, default: 0 }, // Defaults to the category's value
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model('Subcategory', SubcategorySchema);
