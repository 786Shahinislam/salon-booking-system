const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/db"); // এই ৩ নম্বর লাইনে "../" ঠিক আছে কি না দেখুন

// Load config
dotenv.config();

// Connect to Database
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", require("../routes/userRoutes"));
app.use("/api/salons", require("../routes/saloneRoutes"));
app.use("/api/appointments", require("../routes/appointmentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});