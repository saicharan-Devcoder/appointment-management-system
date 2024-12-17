const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', 
    required: true,
  },
  doctorId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', 
    required: true,
  },
  slotDate:{
    type: Date, required: true  // DD/MM/YYYY
  },
  startTime:{
    type: String, required: true //10:00 AM
  },
  endTime:{
    type: String
  },
  status:{
    type: String, required: true
  }
},{
    timestamps:true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;