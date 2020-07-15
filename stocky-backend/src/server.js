import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '.env') });


//Connect to Database
(async ()=>{

    const URI = process.env.URI 

    console.log(URI)
    // await mongoose.connect(URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }).then(()=>{
    //     console.log("Connection success!")
    // }).catch((err)=>{
    //     console.log(err)
    // } );
    
})()



const app=express();
const PORT= process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}`)
})