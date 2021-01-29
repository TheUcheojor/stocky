import express from 'express'
import User from '../models/User'
import Strategy from '../trading/strategyController'

const settingsRouter = express.Router()


settingsRouter.get("/set-password",(req,res)=>{

    const {email, password}= req.body;


    User.updateOne( {email: email}, {$set: {password: password}})

    .then( ()=>res.status(200).json( {success:true, data:email}) )

})


settingsRouter.get("/set-alpaca",(req,res)=>{

    const {email, secretKey, apiKey}= req.body;

    User.updateOne( {email: email}, {$set: {
        "alpaca.secretKey": secretKey,
        "alpaca.apiKey": apiKey
    
    }})

    .then( ()=>res.status(200).json( {success:true, data:email}) )

})

settingsRouter.get("/set-strategy",(req,res)=>{

    const {email, strategy}= req.body;

    //COME BACK TO THIS....Thinking of how to integrate background tasks
    User.updateOne( {email: email}, {$set: {
        "settings.strategy": strategy,
    }})
    .then( ()=>{
        
        User.find({email:email})
        .then( (user)=>{
            
            const userStrategy= Strategy(user);
            userStrategy.runStrategy();
            
        })
        .catch(error=>res.status(500).json({success:false, message:`${error}`}))



        // res.status(200).json( {success:true, data:email})
    

    }).catch(error => res.status(500).json({success:false, message:`${error}`}))

})




export default settingsRouter