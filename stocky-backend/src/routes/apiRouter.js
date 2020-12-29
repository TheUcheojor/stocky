import express from 'express'

import Alpaca from '@alpacahq/alpaca-trade-api'
import MeanReversion from '../trading/strategies/mean-reversion'
import keys from '../config/setup'
import User from '../models/User'

import connectToAlpaca from '../auxilliary/connectToAlpaca'

const apiRouter = express.Router()






// apiRouter.get('/stocks/:name',(req,res)=>{

//     const { email }= req.body
//     const name=req.params.name

//     User.findOne({email:email})
//     .then( (user)=>{

//         const alpaca=connectToAlpaca(user)



        

        
//     }).catch(err=>{
//         console.log(err)
//         res.status(500).json({success:false,message:' Account does not exist'})
//     })
    

    
// })











//Temporary Setup to test stategies


// const userTradingConfig ={
//     API_KEY: keys.API_KEY,
//     API_SECRET: keys.SECRET_KEY,
//     stocks: ["AAPLE","GOOG","MSFT"],
//     exitPoint: 0,
//     fixedStopLoss:0,
// }


// const MS= new MeanReversion(userTradingConfig);
// MS.run()

export default apiRouter