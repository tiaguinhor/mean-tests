const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  title: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

categorySchema.pre('findByIdAndUpdate', next => {
  updated_at = Date.now;
  next();
});

categorySchema.statics = {};

module.exports = mongoose.model('Category', categorySchema);
