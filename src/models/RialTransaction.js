
const mongoose = require('mongoose');

const RialtransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default:false, required: true },
  orderId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RialTransaction', RialtransactionSchema);
