const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // নিশ্চিত করুন User মডেলের নাম ঠিক আছে
    required: true,
  },
  salon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salon", // আপনার ফাইলের নাম অনুযায়ী Salone হতে পারে
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);