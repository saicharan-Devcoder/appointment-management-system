const {Doctor,Appointment,Patient} = require('../Models/index');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;



const verifySlotAvailability= async(slotDetails,doctorId) => {
    // slot 
    let isAvailable=true;

    const doctorAppointments = await Appointment.find({
        doctorId,
        status: 'IN_PROGRESS'
    });
    
    if(doctorAppointments.length===0){
        isAvailable=true;
        return isAvailable;
    }

    doctorAppointments.forEach((appointment)=>{
    
    if(appointment.slotDate.toISOString() === new Date(slotDetails?.slotDate).toISOString() 
        && appointment.startTime.split(':')[0] == slotDetails.startTime.split(':')[0]
    ){
        isAvailable=false;
        return isAvailable;
    }

    });

    return isAvailable;
}

const createAppointment = async(doctorId, slotDetails, patientId) => {

const appointment =await Appointment.create({
      doctorId,
      slotDate: slotDetails.slotDate,
      startTime: slotDetails.startTime,
      endTime: slotDetails.endTime,
      patientId,
      status: slotDetails.status ?? 'INPROGRESS'
});

return appointment;
}

const getDoctorAppointments = async(doctorName)=>{
    try{
        const doctor= await Doctor.findOne({
            name: doctorName
        }).lean();

    const appointments = await Appointment.find({
        doctorId: doctor?._id
    }).lean();

     return {
        appointments,
        error: null
    };

    }catch(err){
    console.log(JSON.stringify(err));
     return {
       error:err,
       appointments:null
     }
    }
}
const getPatientAppointments = async(patientName)=>{
    try{
        const [firstName,lastName]= patientName.split(' ');
        const patient= await Patient.findOne({
            firstName,
            lastName
        }).lean();

    const appointments = await Appointment.find({
        patientId: patient?._id
    }).lean();

     return {
        appointments,
        error: null
    };

    }catch(err){
    console.log(JSON.stringify(err));
     return {
       error:err,
       appointments:null
     }
    }
}

const cancelAppointment = async(appointment,startTime) => {
    
    try{        
        const updatedAppointment = await Appointment.findOneAndUpdate(
        { _id: appointment?._id, startTime },
        { $set: { status:'CANCELED'} },
        { new: true }
        ).lean();

       if(updatedAppointment){
        return{
            updatedAppointment,
            isCanceled : true
        }
    }

    return{
        updatedAppointment,
        isCanceled : false
    }
  }catch(err){
    return{ 
            updatedAppointment : null,
            isCanceled : false
         }
    }

}

const isCancelable=(appointment)=>{
    // INQUIRY, IN_PROGRESS, IN_REVIEW, COMPLETED
    if(appointment.status==='COMPLETED'||
        appointment.status==='IN_REVIEW'
    ){
        return false;
    }
    return true;
}

const updatePatientAppointment = async( oldSlotStartTime, newSlotStartTime, oldSlotDate, newSlotDate, email) => {

    try{
    const patient= await Patient.findOne({
        email
    }).lean();

    if(!patient){
        console.log('Patient does not exist')
        return {
            response : null,
            error:'Patient does not exist',
            status: 200
        }

    }

    const updatedAppointment = await Appointment.findOneAndUpdate(
    {
        startTime: oldSlotStartTime,
        slotDate: oldSlotDate,
        patientId: patient?._id,
    },
    { $set: { startTime : newSlotStartTime, slotDate :  newSlotDate } },
    { new: true }
    ).lean();

    if(updatedAppointment){
        return {
            response: updatedAppointment,
            status: 200,
            error: null
        }
    }

    return {
            status: 200,
            error:'Appointment not updated',
            response: updatedAppointment
        }

   }catch(error){

    return {
        error:'Interal Server Error',
        status: 500,
        response: null
    }

   }
}


module.exports={
    verifySlotAvailability,
    createAppointment,
    getDoctorAppointments,
    getPatientAppointments,
    cancelAppointment,
    isCancelable,
    updatePatientAppointment
}

