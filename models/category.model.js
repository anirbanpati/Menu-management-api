const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true , maxlenght: 10, minlenght: 3},
  image: { type: String, required: true , },
  description: { type: String, required: true , maxlenght: 100, minlenght: 3},
  taxApplicability: { type: Boolean, default: false },
  tax: { type: Number, default: 0 },
  taxType: { type: String, default: null },
});



module.exports = mongoose.model('Category', CategorySchema);
