import express from 'express'
import User from '../models/User'

const userRouter = express.Router()


userRouter.post('/sign-up',(req,res)=>{

    const { email, password } = req.body

    // const newUser =new User
    new User({
        email:email,
        password:password,
        alpaca:{key:'', equity:0, buying_power:0},
        settings:{strategy:'' }
    }).save()
    .then(()=>{
        res.status(200).json({success:true,message:'Account Created'})
    }).catch( (err)=>{
        res.status(500).json({success:false,message:err} )
    })
})


export default userRouter