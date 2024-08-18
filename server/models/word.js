const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  term: { type: String, required: true, unique: true },
  definition: { type: String },
  isFavorite: { type: Boolean, default: false }
});

module.exports = mongoose.model('Word', wordSchema);
