import express from 'express'

import User from '../models/User'
import OrderHistory from '../models/OrderHistory'

const userRouter = express.Router()

//const ObjectID = require('mongodb').ObjectID;
//ObjectID.createFromHexString(organization.connection_str.trim());

userRouter.post('/sign-up',(req,res)=>{

    const { email, password } = req.body

    // const newUser =new User
    new User({
        email:email.toLowerCase().trim(),
        password:password,
        alpaca:{key:'', equity:0, buying_power:0},
        settings:{strategy:'' },
        orderHistoryReference:''
        
    }).save()
    .then(()=>{
        res.status(200).json({success:true,message:'Account Created'})
    }).catch( (err)=>{
        res.status(500).json({success:false,message:err} )
    })
})

userRouter.post('/login',(req,res)=>{

    const {email, password}= req.body


    User.findOne({email:email.toLowerCase().trim()})
    .then((user)=>{

        console.log(user._id)

        if(password==user.password){

            // console.log("EQUAL!")
            var infoPackage={
                userReference:user._id.toHexString(),
                alpaca:user.alpaca,
                settings:user.settings,
                orderHistoryReference:(user.orderHistoryReference)? user.orderHistoryReference.toHexString():'' ,
            }
    
            res.status(200).json(infoPackage)

        }
        
        res.status(500).json({
            success:false,
            message:'Wrong Credentials',
            error:'',
        })
        

        

    }).catch( (err)=>{
        
        console.log(err)
        res.status(500).json({
            success:false,
            message:'Wrong Credentials ',
            error:err,
        })
    })



})




export default userRouter