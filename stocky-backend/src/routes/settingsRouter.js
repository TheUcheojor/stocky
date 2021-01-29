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

    User.updateOne( {email: email}, {$set: {
        "settings.strategy": strategy,
    }})
    .then( ()=>{
        
        User.findOne({email:email})
        .then( (user)=>{
            
            // console.log(user)
            const userStrategy=new Strategy(user);
            userStrategy.runStrategy();
            
            console.log(`\nStrategy ${strategy} has been started for ${user.email}`)
            res.status(200).json( {success:true, data:email})
            
        })
        .catch(error=>res.status(500).json({success:false, message:`${error}`}))



    

    }).catch(error => res.status(500).json({success:false, message:`${error}`}))

})

settingsRouter.get("/add-stock", (req, res)=>{

    const {email, stockSymbol }= req.body;

    User.updateOne({email:email}, {$addToSet: {'alpaca.stocks': stockSymbol} })
    .then(()=>{

        User.findOne({email:email})
        .then((user)=>{
            const userStrategy= new Strategy(user);
            
            userStrategy.runStrategy();
                
            console.log(`\nStrategy ${user.settings.strategy} has been restarted for ${user.email}`)
            console.log(`${stockSymbol} has been added the stock container associated to ${user.email}\n`)

            res.status(200).json( {success:true, data:email})
        })
        .catch(error=>res.status(500).json({success:false, message:`${error}`}))
        

    }).catch(error=>res.status(500).json({success:false, message:`${error}`}))
    

})

settingsRouter.get("/remove-stock", (req, res)=>{

    const {email, stockSymbol }= req.body;

    User.updateOne({email:email}, {$pull: {'alpaca.stocks': stockSymbol} })
    .then(()=>{

        User.findOne({email:email})
        .then((user)=>{
            const userStrategy=new  Strategy(user);
            userStrategy.runStrategy();
                
            console.log(`\nStrategy ${user.settings.strategy} has been restarted for ${user.email}`)
            console.log(`${stockSymbol} has been removed the stock container associated to ${user.email}\n`)
    
            res.status(200).json( {success:true, data:email})
        })
        .catch(error=>res.status(500).json({success:false, message:`${error}`}))
       

    }).catch(error=>res.status(500).json({success:false, message:`${error}`}))
    

})







export default settingsRouter