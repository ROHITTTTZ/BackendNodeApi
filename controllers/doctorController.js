const Doctor = require("../models/doctor");

exports.getDoctors = async (req, res) => {
  try {
    const { role, id } = req.user;
    let filter = {};
    if (role === 'doctor') {
      filter.DoctorId = id;
    } else if (role === 'patient') {
      filter.PatientId = id;
    } else {
      return res.status(403).json({ message: 'Role not authorized or missing' });
    }
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, timings } = req.body;
    const newDoctor = new Doctor({
      name,
      specialization,
      experience,
      timings,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error creating doctor", error });
  }
};
