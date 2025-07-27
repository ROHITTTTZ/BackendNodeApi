const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    DoctorId : {type: mongoose.Schema.Types.ObjectId,ref : 'Doctor_Master'},
    PatientId : String,
    Date : String,
    Time : String,
    Status : {type: String, default: 'Pending'},
});

module.exports = mongoose.model('Appointment_Master', appointmentSchema);

        