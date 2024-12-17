const express= require('express');

const {
    getAppointmentsByDoctor,
    createPatientAppointment,
    getAppointmentByPatient, 
    createAppointmentWithStatus,
    updatePatientAppointmentController,
    cancelPatientAppointment
} = require('../Controllers/appointment');

const appointmentRouter= express.Router();

appointmentRouter.post('/create',createPatientAppointment);
appointmentRouter.post('/doctorAppointments',getAppointmentsByDoctor);
appointmentRouter.post('/patientAppointments',getAppointmentByPatient);
appointmentRouter.post('/create/status',createAppointmentWithStatus);
appointmentRouter.post('/update',updatePatientAppointmentController);
appointmentRouter.post('/cancel',cancelPatientAppointment);


module.exports=appointmentRouter;



