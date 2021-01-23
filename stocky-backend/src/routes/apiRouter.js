import express from 'express'

import async from 'async'
import axios from 'axios'

import Alpaca from '@alpacahq/alpaca-trade-api'
import MeanReversion from '../trading/strategies/mean-reversion'
import keys from '../config/setup'
import User from '../models/User'

import connectToAlpaca from '../auxilliary/connectToAlpaca'


const apiRouter = express.Router()


apiRouter.get('/user-portfolio', (req,res)=>{

    const { email }= req.body

    User.findOne({email:email})
    .then( (user)=>{


        const alpaca=connectToAlpaca(user)

        console.log("Getting Positions..")
        alpaca.getPositions()
        .then((portfolio) => {

            let portfolioDetails={};

            // Print the quantity of shares for each position.
            portfolio.forEach(function (position) {
                portfolioDetails[position.symbol]=position.qty
            })

            res.status(200).json({success:true, data:portfolioDetails})

        }).catch(err=>{
            console.log(err)
            res.status(500).json({success:false,message:'Cannot get portfolio'})
        })

    }).catch(err=>{
        console.log(err)
        res.status(500).json({success:false,message:' Account does not exist'})
    })
    
    
})

apiRouter.get('/get-order-history', (req,res)=>{

    const { email } = req.body;

    User.findOne({email:email})
    .then((user)=>{
        
        const alpaca=connectToAlpaca(user)

        const MAX_ACTIVITIES= 10;
        // { activityTypes, until, after, direction, date, pageSize }: 
        // { activityTypes: any; until: any; after: any; direction: any; date: any; pageSize: any; }
       
        alpaca.getAccountActivities({activityTypes:["FILL"], pageSize: MAX_ACTIVITIES})
        .then( (activities)=>{
            
            let formattedActivities=[];

            async.each(activities, function(activity, callback){

                alpaca.getOrder(activity["order_id"])
                .then((order)=>{
                    
                    formattedActivities.push(
                        {
                            symbol: activity.symbol,
                            type: activity.type,
                            quantity:activity.quantity,
                            price:activity.price,
                            transaction_time:activity.transaction_time,
                            order_type:order.type,
                            status: order.status
                        }
                    )

                    callback()

                }).catch(error=>{
                    console.log(`error: ${error}`)
                    res.status(500).json({success:false, message:`${error}`})
                })


            }  ).then( ()=>{

                res.status(200).json({success:true, data:formattedActivities})

            }).catch(err=>{
                res.status(500).json({success:false, message:`${err}`})
            })
            



        }).catch( (error)=>{
            console.log(`error: ${error}`)

            res.status(500).json({success:false, message:`${error}`})
        })


    }).catch( (error)=>{

        res.status(500).json({success:false, message:"No User associated with the given email"})

    } )



});



apiRouter.get('/stocks/:name',(req,res)=>{

    const name=req.params.name

    console.log(name)
    console.log(`https://kgsearch.googleapis.com/v1/entities:search?query=${name}&key=${keys.SEARCH_API_KEY}&limit=1&indent=True`)
    
    axios.get(`https://kgsearch.googleapis.com/v1/entities:search?query=${name}&key=${keys.SEARCH_API_KEY}&limit=1&indent=True`)
    .then(axiosResponse=>{
        console.log(axiosResponse.data)
        res.status(200).json({success:true, data: axiosResponse.data.itemListElement[0] })
    }).catch(err=>{
        res.status(500).json({success:false, message:`${err}`})
    })
    

    
})











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