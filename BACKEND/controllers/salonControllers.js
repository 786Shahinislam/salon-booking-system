const Salon = require("../models/Salon");

exports.createSalon = async (req, res) => {
  try {
    const salon = await Salon.create(req.body);
    res.json(salon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSalons = async (req, res) => {
  try {
    const salons = await Salon.find();
    res.json(salons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};