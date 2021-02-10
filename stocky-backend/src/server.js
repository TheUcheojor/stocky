import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'


import userRouter from './routes/userRouter'
import apiRouter from './routes/apiRouter'
import settingsRouter from './routes/settingsRouter'

import initiateStrategies from './auxilliary/initiateStrategies'
import connectToDatabase from './auxilliary/connectToDatabase'

dotenv.config({ path: path.join(__dirname, '.env') });


const app=express();
const PORT= process.env.PORT || 8000

app.use(express.static(path.join(__dirname,'/build')))
app.use(bodyParser.json())


connectToDatabase()//Connect to Database
initiateStrategies() // Start up strategies


app.use('/users',userRouter)
app.use('/settings',settingsRouter)
app.use('/api',apiRouter)

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/build/index.html'))
})

app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}`)
})