const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true , maxlenght: 30, minlenght: 3},
  image: { type: String, required: true },
  description: { type: String, required: true, maxlenght: 100, minlenght: 3 },
  taxApplicability: { type: Boolean, default: false },
  tax: { type: Number, default: 0 },
  baseAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true }, // Should be calculated as (Base - Discount)
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', default: null },
});



module.exports = mongoose.model('Item', ItemSchema);
