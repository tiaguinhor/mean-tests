const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  category: Object,
  image: String,
  description: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

productSchema.pre('findByIdAndUpdate', (next) => {
  updated_at = Date.now;
  next();
});

productSchema.statics = {};

module.exports = mongoose.model('Product', productSchema);
