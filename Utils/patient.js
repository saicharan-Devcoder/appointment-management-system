const Patient= require('../Models/patient');

const createPatient=async(patientDetails)=>{
const {isPatientExists,patientId}= await getPatient(patientDetails?.email);
    
   if(isPatientExists){
        return patientId;
    }
    const patient= await Patient.create({
    email:patientDetails.email,
    phone:patientDetails.phone,
    firstName:patientDetails.firstName,
    lastName:patientDetails.lastName,
    age:patientDetails.age,
    gender:patientDetails.gender
    });

    return patient.id;
}

const getPatient = async(email)=>{
const patient = await Patient.findOne({
    email
}).lean();

if(!patient){
    return{
        isPatientExists:false
    }
}

return{
    isPatientExists:true,
    patientId:patient?._id
}
}

module.exports={
    createPatient
}

