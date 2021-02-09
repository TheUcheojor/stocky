import express from 'express'
import bcrypt from 'bcrypt'

import User from '../models/User'

import connectToAlpaca from '../auxilliary/connectToAlpaca'

const userRouter = express.Router();

const SALT_ROUNDS= 10;

userRouter.post('/register',(req,res)=>{

    const { email, name, password } = req.body

    bcrypt.hash(password, SALT_ROUNDS)
    .then((hashedPassword)=>{

        new User({
            email:email.toLowerCase().trim(),
            name:name,
            password:hashedPassword,
        }).save()
        .then((user)=>{

            const userInfo={
                email:user.email,
                name:user.name,
            };

            console.log(`\n /users/login - SUCCESS`)
            res.status(200).json({success:true, data:userInfo})
            res.status(200).json({success:true,message:'Account Created'})
        }).catch( (err)=>{
            console.log(err)
            res.status(500).json({success:false,message:"Cannot create account. Try a different email", error:`${err}` } )
        })


    })
   
})

userRouter.post('/login',(req,res)=>{

    const {email, password}= req.body

    User.findOne({email:email.toLowerCase().trim()})
    .then((user)=>{

        bcrypt.compare(password, user.password)
        .then(result=>{
            if(result){

                const userInfo={
                    email:user.email,
                    name:user.name,
                };
    
                console.log(`\n /users/login - SUCCESS`)
                res.status(200).json({success:true, data:userInfo})
            }else{
                console.log(`\n /users/login - FAILED -Password are not equal `)
    
                res.status(500).json({
                    success:false,
                    message:'Enter valid credentials',
                    error:'Passwords are not equal',
                })
            }

        })

    }).catch( (err)=>{
        console.log(`\n /users/login - FAILED -${err} `)
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
        res.status(500).json({success:false, message:`Cannot connect to Alpaca`})
    })



} )



export default userRouter