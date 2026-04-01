const User = require("../models/User");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Auth User
exports.authUser = async (req, res) => {
  try {
    // আপনার লগইন লজিক এখানে থাকবে
    res.json({ message: "Login success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};