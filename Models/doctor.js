const mongoose = require('mongoose');

const defaultWorkingHours=[
  {
      day:0,
      workinghours:{
          startFrom:'10',
          end:'16'
      },
      isWorking:false
  },
  {
      day:1,
      workinghours:{
          startFrom:'10',
          end:'16'
      },
      isWorking:true
  },
  {
      day:2,
      workinghours:{
          startFrom:'10',
          end:'16'
      },
      isWorking: true
  },
  {
      day:3,
      workinghours:{
          startFrom:'10',
          end:'16'
      },
      isWorking:true
  },
  {
      day:4,
      workinghours:{
          startFrom:'10',
          end:'16'
      },
      isWorking: true
  },
  {
      day:5,
      workinghours:{
          startFrom:'10',
          end:'16'
      },
      isWorking:true
  },
  {
      day:6,
      workinghours:{
          startFrom:'10',
          end:'16'
      },
      isWorking:true
  },
];

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  qualification: {
    type: String, required:true
  },
  gender: { type: String, enum: ['M','F'] ,required: true },
  timeSlots:{ type: Array, 
    default: defaultWorkingHours, 
    required: true }
},
{
    timestamps:true
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;

