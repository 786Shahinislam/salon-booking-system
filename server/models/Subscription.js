const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  planName: { type: String, enum: ['Basic', 'Premium', 'Pro'], default: 'Basic' },
  amount: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);