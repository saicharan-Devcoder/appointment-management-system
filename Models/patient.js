const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  email: { type: String, required: true },
  phone: { type: String },
  gender: { type: String }
},
{
    timestamps:true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;