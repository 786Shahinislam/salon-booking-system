const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ওনারকে নোটিফাই করার জন্য
  bookingDate: { type: String, required: true }, // যেমন: "2026-04-10"
  bookingTime: { type: String, required: true }, // যেমন: "02:30 PM"
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", appointmentSchema);