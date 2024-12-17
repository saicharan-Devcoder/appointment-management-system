const Doctor= require('../Models/doctor');

const storeDoctor = async(doctorDetails) => {

try {
    const {isDoctorExists, doctorId }= await getDoctor(doctorDetails?.email);
    
    if(isDoctorExists){
        return doctorId;
    }

    const doctor= await Doctor.create({
    email:doctorDetails.email,
    phone:doctorDetails.phone,
    name:doctorDetails.name,
    age:doctorDetails.age,
    gender:doctorDetails.gender,
    qualification:doctorDetails.qualification
    });

    return {
        response:doctor,
        error: null
    }

}catch(error){
        return {
            response:null,
            error 
    }

}
}

const getDoctor = async(email)=>{

const doctor = await Doctor.findOne({
    email
}).lean();

if(!doctor){
    return{
        isDoctorExists:false
    }
}

return{
    isDoctorExists:true,
    doctor
}

}

module.exports={
    storeDoctor,
    getDoctor
}

