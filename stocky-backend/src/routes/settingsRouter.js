import express from 'express'

import User from '../models/User'
import Strategy from '../trading/strategyController'
import connectToAlpaca from '../auxilliary/connectToAlpaca'
import STRATEGIES from '../trading/strategyReference'



const settingsRouter = express.Router()


settingsRouter.post("/set-password",(req,res)=>{

    const {email, oldPassword, newPassword}= req.body;


    User.updateOne( {email: email, password:oldPassword}, {$set: {password: newPassword}})
    .then( (response)=>{
        if(response.n<1 || response.nModified<1){
            res.status(500).json({success:false, message:`Incorrect Password for ${email}`,error:"Invalid Password"})
        }else{
            console.log(`\n/settings/set-password - SUCCESS`)
            res.status(200).json( {success:true, data:email})} 
        }
        
    ).catch(error=>{
        console.log(`\n/settings/set-password - FAILURE - ${error}`)
        res.status(500).json({success:false, message:`Cannot update password associated to email: ${email}`,error:`${error}`})
    })

})


settingsRouter.post("/set-alpaca",(req,res)=>{

    const {email, secretKey, apiKey}= req.body;

    console.log(`\n/set-alpaca - email:${email}, secretKey:${secretKey}, apiKey:${apiKey}`)
    
    const userTestAlpaca= connectToAlpaca({
        alpaca:{
            secretKey:secretKey,
            apiKey:apiKey,
        }
    })

    //Test that given keys are valid 
        
    userTestAlpaca.getAccount()
     .then((placeholder)=>{

        User.updateOne( {email: email}, {$set: {
            "alpaca.secretKey": secretKey,
            "alpaca.apiKey": apiKey  
        }}).then( ()=>{
            console.log(`\n/settings/set-alpaca - SUCCESS`)
            res.status(200).json( {success:true, data:email})
        })

    }).catch(error=>{
        console.log(`\n/settings/set-alpaca - FAILURE - ${error}`)
        res.status(500).json( {success:false, message:"Invalid Aplaca Keys!", error:`${error}`})
    })




    

})

settingsRouter.get('/get-strategies',(req,res)=>{

    const {email}=req.query

    User.findOne({email:email})
    .then((user)=>{
        
        let formatStategies=[]
        
        Object.keys(STRATEGIES).forEach(strategy=>{
            formatStategies.push({
                strategyKey:strategy,
                strategyName:STRATEGIES[strategy].name,
                isSetStrategy: user.settings.strategy ==strategy
            })
        })
        res.status(200).json( {success:true, data:formatStategies})


    }).catch(error=>{
        console.log(`\n/settings/get-strategies - FAILURE - ${error}`)
        res.status(500).json( {success:false, message:`Cannout find user ${email}`, error:`${error}`})
    })

})


settingsRouter.post("/set-strategy",(req,res)=>{

    const {email, strategy, stocks}= req.body;

    // console.log(stocks)
    User.updateOne( {email: email}, {$set: {
        "settings.strategy": strategy,
        "alpaca.stocks":stocks
    }})
    .then( ()=>{
        
        User.findOne({email:email})
        .then( (user)=>{
            
            // console.log(user)
            const userStrategy=new Strategy(user);
            userStrategy.runStrategy();
            
            console.log(`\n/settings/set-strategy - SUCCESS`)
            console.log(`\nStrategy ${strategy} has been started for ${user.email}`)
            res.status(200).json( {success:true, data:email})
            
        })
        .catch(error=>{
            console.log(`\n/settings/set-strategy - FAILURE - ${error}`)
            res.status(500).json({success:false, message:`Cannot find account associated to email: ${email}`,error:`${error}`})
        })



    

    }).catch(error => {
        console.log(`\n/settings/set-strategy - FAILURE - ${error}`)
        res.status(500).json({success:false, message:`Cannot set strategy: ${strategy}`,error:`${error}`})
    })

})

settingsRouter.post("/add-stock", (req, res)=>{

    const {email, stockSymbol }= req.body;

    User.updateOne({email:email}, {$addToSet: {'alpaca.stocks': stockSymbol} })
    .then(()=>{

        User.findOne({email:email})
        .then((user)=>{
            const userStrategy= new Strategy(user);
            
            userStrategy.runStrategy();
           
           
            console.log(`\n/settings/add-stock - SUCCESS`) 
            console.log(`\nStrategy ${user.settings.strategy} has been restarted for ${user.email}`)
            console.log(`\n${stockSymbol} has been added the stock container associated to ${user.email}\n`) 
            res.status(200).json( {success:true, data:email})
        })
        .catch(error=>{
            console.log(`\n/settings/add-stock - FAILURE - ${error}`)
            res.status(500).json({success:false, message:`Cannot find account associated to email: ${email}`, error:`${error}`})
        })
        

    }).catch(error=>res.status(500).json({success:false, message:`Cannot add stock: ${stock}`, error:`${error}`}))
    

})

settingsRouter.delete("/remove-stock", (req, res)=>{

    const {email, stockSymbol }= req.body;

    User.updateOne({email:email}, {$pull: {'alpaca.stocks': stockSymbol} })
    .then(()=>{

        User.findOne({email:email})
        .then((user)=>{
            const userStrategy=new  Strategy(user);
            userStrategy.runStrategy();
                
            console.log(`\n/settings/remove-stock - SUCCESS`)
            console.log(`\tStrategy ${user.settings.strategy} has been restarted for ${user.email}`)
            console.log(`\n${stockSymbol} has been removed the stock container associated to ${user.email}\n`)
    
            res.status(200).json( {success:true, data:email})
        })
        .catch(error=>{
            console.log(`\n/settings/remove-stock - FAILURE - ${error}`)
            res.status(500).json({success:false, message:`Cannot find account associated to email: ${email}`, error:`${error}`})
        })
       

    }).catch(error=>{
        console.log(`\n/settings/remove-stock - FAILURE - ${error}`)
        res.status(500).json({success:false, message:`Cannot remove the following stock: ${stockSymbol}`, error:`${error}`})
    })
    

})







export default settingsRouter