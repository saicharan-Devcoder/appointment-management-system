const Doctor = require('../Models/doctor');

const { getDoctor,storeDoctor } = require('../Utils/doctor')

const getDoctorByEmail = async(req,res)=>{

    try{
    const email = req.query.email;
    const {doctor,isDoctorExists} = await getDoctor(email);
    
    if(!isDoctorExists){
        return res.status(200).send({
            message:'Doctor with email does not exist',
        }); 
    }

    return res.status(200).send({
    message:'Doctor details fetched succesfully',
    body:doctor
    });

    }catch(error){

    return res.status(500).send({
        message:'Unable to fetch doctor details',
        error
    });
    }
}

const getAllDoctors = async(req,res)=>{
    try{
    
    const doctors = await Doctor.find({});
    
    if(doctors.length===0){
        return res.status(200).json({
            message:'No doctors exists'
        })
    }
   
    return res.status(200).json({
        message:'doctors fetched successfully',
        data: doctors
    });

    }catch(error){
        return res.status(500).json({
            message:'doctors fetching failed'
        });
    }
};

const createDoctor= async(req,res)=>{
    
    const {name,email,phone,qualification,age,gender}= req.body;
    
    const doctorDetails={
        name,
        email,
        age,
        gender,
        qualification,
        phone
    }
    
    const {response, error} = await storeDoctor(doctorDetails);
    
    if(error){
        return res.status(500).json({
          Message:'Unable to store doctor',
          error: JSON.stringify(error)
        })
    }

  
    return res.status(200).json({
                message:'Doctor details saved successfully',
                body:response?.id
            }
        )

}

module.exports={
    getAllDoctors,
    getDoctor,
    getDoctorByEmail,
    createDoctor
}

