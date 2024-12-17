const express= require('express');
const { createDoctor,getDoctorByEmail,getAllDoctors } = require('../Controllers/doctor');
const doctorRouter=express.Router();

doctorRouter.post('/create',createDoctor);
doctorRouter.get('/',getDoctorByEmail);
doctorRouter.get('/doctors',getAllDoctors);


module.exports=doctorRouter;
