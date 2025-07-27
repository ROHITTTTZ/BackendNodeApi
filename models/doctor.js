const mongoose = require('mongoose');
const doctorSchema  = new mongoose.Schema({
    name : String,
    specialization: String,
    experience: Number,
    timings:String,
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: Date.now }
})
module.exports = mongoose.model('Doctor_Master', doctorSchema);