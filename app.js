const express= require('express');
const patientRouter=require('./Routes/patient')
const doctorRouter=require('./Routes/doctor')
const appointmentRouter=require('./Routes/appointment')

const bodyParser = require('body-parser');
const db = require('./DB/connection')

const app=express();
app.use(bodyParser.json());
const PORT=3000;


app.use('/patient',patientRouter)
app.use('/doctor',doctorRouter)
app.use('/appointment',appointmentRouter)

;(async()=>{
    await db.connectWithPool();
})();

app.listen(PORT,()=>{
    console.log('Listening on port',3000)
});



