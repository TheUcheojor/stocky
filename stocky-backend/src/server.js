import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import path from 'path'

import keys from './config/setup'

import userRouter from './routes/userRouter'
import apiRouter from './routes/apiRouter'
import settingsRouter from './routes/settingsRouter'


dotenv.config({ path: path.join(__dirname, '.env') });


//Connect to Database
(async ()=>{

    const URI = keys.URI 
    console.log(URI)

    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("Connection success!")
    }).catch((err)=>{
        console.log(err)
    } );
    
})()



const app=express();
const PORT= process.env.PORT || 8000

app.use(bodyParser.json())

app.use('/users',userRouter)
app.use('/settings',userRouter)
app.use('/api',userRouter)


app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}`)
})