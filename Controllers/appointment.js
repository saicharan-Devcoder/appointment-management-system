
const {verifySlotAvailability,createAppointment,getDoctorAppointments,
    getPatientAppointments, cancelAppointment, isCancelable, updatePatientAppointment} = require('../Utils/appointment');
const validateTimeSlotFormat= require('../Utils/validaters/appointment');
const {createPatient}=require('../Utils/patient');
const { Appointment,Patient } = require('../Models');

const createPatientAppointment = async(req,res)=>{
    try{
    const {firstName, lastName, email, phone, gender,age, startTime,endTime,slotDate, doctorId}=req.body;
    const isvalidSlotTimes = validateTimeSlotFormat(startTime) && validateTimeSlotFormat(endTime);

    if(!isvalidSlotTimes){
        return res.status(400).json({
            message:'slotTime format is incorrect: HH:MM AM/PM'
        })
    }

    const patientDetails={
        email,
        phone,
        gender,
        age,
        firstName,
        lastName
    }
    
    const patientId = await createPatient(patientDetails);
    
    const slotDetails={
        slotDate,
        startTime,
        endTime
    }
    
    const isSlotAvailable = await verifySlotAvailability(slotDetails, doctorId);

    
    if(!isSlotAvailable){
        return res.status(200).json({
            message:'Slot is already booked'
        })
    }

    const appointment= await createAppointment(doctorId,slotDetails,patientId);

    return res.status(200).json({
        message:`appointment scheduled successfully`,
        body:{
            appointment
        }
    })

    }catch(err){
        console.error('error',JSON.stringify(err));
        return res.status(500).json({
            message:'internal server error'
        })
    }
}

const createAppointmentWithStatus = async(req,res)=>{
    
    try{
    const { patientId, startTime, endTime, slotDate, doctorId, status}=req.body;

    const isvalidSlotTimes = validateTimeSlotFormat(startTime) && validateTimeSlotFormat(endTime);

    if(!isvalidSlotTimes){
        return res.status(400).json({
            message:'slotTime format is incorrect: HH:MM AM/PM'
        })
    }

    
    const slotDetails={
        slotDate,
        startTime,
        endTime,
        status
    }
    
    const isSlotAvailable = await verifySlotAvailability(slotDetails, doctorId);

    
    if(!isSlotAvailable){
        return res.status(200).json({
            message:'Slot is already booked'
        })
    }

    const appointment= await createAppointment(doctorId,slotDetails,patientId);

    return res.status(200).json({
        message:`appointment scheduled successfully`,
        body:{
            appointment
        }
    })

    }catch(err){
        console.error('error',JSON.stringify(err));
        return res.status(500).json({
            message:'internal server error'
        })
    }
}

const getAppointmentsByDoctor = async(req,res)=>{
    const {name}=req.body;
    const {appointments,error} = await getDoctorAppointments(name);
    
    if(error){
        return res.status(500).json({
            message:'Fetched apointments failed'
         });
    }

    if(!appointments){
     return res.send(200).json({
        message:'No appointments found for doctor'
     });
    }

    return  res.status(200).json({
     message:'appointments for doctor fetched successfully',
     body:appointments
    })

}

const getAppointmentByPatient = async(req,res)=>{

   const { name } = req.body;
   const { appointments , error} = await getPatientAppointments(name);
   
   if(error){
       return res.status(500).json({
           message:'Fetched apointments failed'
        });
   }

   if(!appointments){
    return res.send(200).json({
       message:'No appointments found for patient'
    });
   }

   return res.status(200).json({
    message:'appointments for patient fetched successfully',
    body : appointments
   })

}

const updatePatientAppointmentController = async(req,res)=>{
    // email, old ,new slot
    // response appointment

    const {oldSlotStartTime, newSlotStartTime, oldSlotDate, newSlotDate, email} = req.body;

    const isvalidSlotTimes = validateTimeSlotFormat(newSlotStartTime) && validateTimeSlotFormat(oldSlotStartTime);

    if(!isvalidSlotTimes){
        return res.status(400).json({
            message:'slotTime format is incorrect: HH:MM AM/PM'
        })
    }
    
   const isSameSlot= oldSlotDate === newSlotDate && newSlotStartTime === oldSlotStartTime;
    
    if(!isSameSlot){
        return res.status(200).json({
            message:'Trying to update with same Slot'
        })

    }
    
    const { response ,error, status } = await updatePatientAppointment(
        oldSlotStartTime, newSlotStartTime, oldSlotDate, newSlotDate, email
    );

    if(error){
        return res.status(status).json({
            message : 'Error in updating the Appointment',
            body : JSON.stringify(error)
        });
    }

    return res.status(status).json({
        message:'updated the patient successfully',
        body: response
    });

}

const cancelPatientAppointment= async(req,res)=>{
    // By email, startFrom
    // status: CANCELED, and appointment details canceled
    // stages : 1, 2, 3, 4, 5
   const {startTime, email} = req.body;
   
   if(!validateTimeSlotFormat(startTime)){
     return res.status(400).json({
        message : 'slotTime format is incorrect: HH:MM AM/PM'
    })
   }

   const patient = await Patient.findOne({
    email
   }).lean();

   if(!patient){
    return res.status(400).json({
        message : 'Patient does not exist'
    })
   }

   const appointment = await Appointment.findOne({
    patientId:patient?._id,
    startTime
   }).lean();
    
    if(!appointment){
        return res.status(200).json({
            message : 'Appointment does not exist'
        })
        
    }

    if(!isCancelable(appointment)){
     return res.status(200).json({
            message : 'Appointment cannot be canceled',
            body: appointment
        })
    }

    const { updatedAppointment, isCanceled} = await cancelAppointment( appointment, startTime);

    if(isCanceled){
        return res.status(200).json({
            message : 'Appointment canceled successfully',
            body : updatedAppointment
        })
    }

        return res.status(500).json({
            message : 'Appointment cancelation failed',
            body : updatedAppointment
        })
}


module.exports={
        createPatientAppointment,
        getAppointmentsByDoctor,
        getAppointmentByPatient,
        createAppointmentWithStatus,
        updatePatientAppointmentController,
        cancelPatientAppointment,
}