/**
 * goods model
 */
const mongoose = require('mongoose');
let goodsSechma = {
  userId: String,
  name: String,
  type: Number,
  price: String,
  weight: String,
  salecount: Number,
  count: Number,
  direction: String,
  img: String
};
module.exports = mongoose.model('goods', goodsSechma);
