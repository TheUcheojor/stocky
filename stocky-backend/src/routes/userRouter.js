import express from 'express'

import User from '../models/User'
import OrderHistory from '../models/OrderHistory'
import keys from '../config/setup'

import connectToAlpaca from '../auxilliary/connectToAlpaca'
import account from '@alpacahq/alpaca-trade-api/lib/resources/account'

const userRouter = express.Router()

//const ObjectID = require('mongodb').ObjectID;
//ObjectID.createFromHexString(organization.connection_str.trim());

userRouter.post('/sign-up',(req,res)=>{

    const { email, password } = req.body

    // const newUser =new User
    new User({
        email:email.toLowerCase().trim(),
        password:password,
        alpaca:{secretKey:'',apiKey:'', equity:0, buying_power:0},
        settings:{strategy:'' },
        orderHistoryReference:null
        
    }).save()
    .then(()=>{
        res.status(200).json({success:true,message:'Account Created'})
    }).catch( (err)=>{
        console.log(err)
        res.status(500).json({success:false,message:err} )
    })
})

userRouter.post('/login',(req,res)=>{

    const {email, password}= req.body

    console.log("Recieved /user/login request")

    User.findOne({email:email.toLowerCase().trim()})
    .then((user)=>{

        console.log(user._id)

        if(password==user.password){

            // console.log("EQUAL!")
            // var infoPackage={
            //     email:user.email,
            //     userReference:user._id.toHexString(),
            //     alpaca:user.alpaca,
            //     settings:user.settings,
            //     orderHistoryReference:(user.orderHistoryReference)? user.orderHistoryReference.toHexString():'' ,
            // }
            res.status(200).json({success:true, data:user.email})

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
            error:`${err}`,
        })
    })



})



userRouter.get('/account', (req,res)=>{


    const { email}=req.body

    User.findOne({email:email })
    .then((user)=>{

        const alpaca=connectToAlpaca(user);

        alpaca.getAccount()
        .then((account)=>{

            account['strategy']=user['settings']['strategy']
            res.status(200).json({success:true,data:account})
        
        }).catch((err)=>{
            res.status(500).json({success:false,message:`${err}`})
        })

    }).catch((err)=>{
        console.log(`error: ${err}`)
        res.status(500).json({success:false, message:`${err}`})
    })



} )



export default userRouter