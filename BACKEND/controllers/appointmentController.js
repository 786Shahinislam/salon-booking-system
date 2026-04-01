const Appointment = require("../models/Appointment");

exports.bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId")
      .populate("salonId");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};