const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema({
  regNo: String,
  brand: String,
  model: String,
  purchaseDate: Date,
  warrantyPeriodMonths: Number,
});

module.exports = mongoose.model('Warranty', warrantySchema);
