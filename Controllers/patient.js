// const Patient=require('../Models/patient');

// const getPatient = async(req,res)=>{
// try{
// return res.status(200).send({
//     message:'ssss'
// });
// }catch(error){
//     return res.status(500).send({
//         message:'ssss'
//     });
// }
// }

// const getAllPatients = async(req,res)=>{
    
//     try{

//     const patients=await Patient.find({});
    
//     if(patients.length===0){
//         return res.status(200).json({
//             message:'No patients exists'
//         })
//     }
   
//  return res.status(200).json({
//         message:'patients fetched successfully',
//         data:'fff'
//     });

//     }catch(error){

//         return res.status(500).json({
//             message:'patients fetching failed'
//         });
//     }
// };



// module.exports={
//     getAllPatients,
//     getPatient
// }

