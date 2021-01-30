import express from 'express'

import User from '../models/User'
import keys from '../config/setup'

import connectToAlpaca from '../auxilliary/connectToAlpaca'
import account from '@alpacahq/alpaca-trade-api/lib/resources/account'

const userRouter = express.Router()


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
        res.status(500).json({success:false,message:"Cannot create the user", error:`${err}` } )
    })
})

userRouter.post('/login',(req,res)=>{

    const {email, password}= req.body

    console.log("Recieved /user/login request")

    User.findOne({email:email.toLowerCase().trim()})
    .then((user)=>{

        console.log(user._id)

        if(password==user.password){
            res.status(200).json({success:true, data:user.email})
        }
        
        res.status(500).json({
            success:false,
            message:'Enter valid creditials',
            error:'Passwords are not equal',
        })

    }).catch( (err)=>{
        console.log(`\n /users/login - FAILE -${err} `)
        res.status(500).json({
            success:false,
            message:'Enter valid creditials',
            error:`${err}`,
        })
    })



})



userRouter.get('/account', (req,res)=>{


    const { email }=req.query

    User.findOne({email:email })
    .then((user)=>{

        const alpaca=connectToAlpaca(user);

        alpaca.getAccount()
        .then((account)=>{

            account['strategy']=user['settings']['strategy']
            account['alpaca']=user['alpaca']

            console.log(`\n /users/account - SUCCESS `)
            res.status(200).json({success:true,data:account})
        
        }).catch((err)=>{
            console.log(`\n /users/account - FAILURE - ${err} `)
            res.status(500).json({success:false,message:`${err}`})
        })

    }).catch((err)=>{
        console.log(`\n /users/account - FAILURE - ${err} `)
        res.status(500).json({success:false, message:`${err}`})
    })



} )



export default userRouter