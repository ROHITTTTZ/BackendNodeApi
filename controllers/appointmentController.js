const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');

exports.bookAppointment = async (req, res) => {
  try {
    const { DoctorId, PatientId, Date, Time } = req.body;
    const { role, id } = req.user;
    if (role !== 'patient') {
      return res.status(403).json({ message: 'Only patients can book appointments' });
    }

    const doctorExist = await Doctor.findById(DoctorId);
    if (!doctorExist) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const appointmentExists = await Appointment.findOne({ DoctorId, Date, Time });
    if (appointmentExists) {
      return res.status(400).json({ message: "Appointment already exists for this doctor at the specified time" });
    }

        
    const newAppointment = new Appointment({
      DoctorId,
      PatientId,
      Date,
      Time
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
}

exports.getAllAppointments = async (req, res) => {
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
    const appointments = await Appointment.find().populate('DoctorId', 'name specialization');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
}

exports.getAppointments = async (req, res) => {
    try{
        const {DoctorId, PatientId} = req.query;
        const { role, id } = req.user;
        let filter = {};
        if (role === 'doctor') {
      filter.DoctorId = id;
    } else if (role === 'patient') {
      filter.PatientId = id;
    } else {
      return res.status(403).json({ message: 'Role not authorized or missing' });
    }
         if (DoctorId) filter.DoctorId = DoctorId;
    if (PatientId) filter.PatientId = PatientId;

    if (!DoctorId && !PatientId) {
      return res.status(400).json({ message: "Please provide DoctorId or PatientId" });
    }
        const appointments = await Appointment.find(filter).populate('DoctorId', 'name specialization');
        res.status(200).json(appointments);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error });
    }
}
