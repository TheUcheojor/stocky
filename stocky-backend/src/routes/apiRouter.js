import express from 'express'

import async from 'async'
import axios from 'axios'
import StringSimilarity from 'string-similarity'

import User from '../models/User'

import connectToAlpaca from '../auxilliary/connectToAlpaca'


const apiRouter = express.Router()


// apiRouter.get('/user-portfolio', (req,res)=>{

//     const { email }= req.body

//     User.findOne({email:email})
//     .then( (user)=>{


//         const alpaca=connectToAlpaca(user)

//         console.log("Getting Positions..")
//         alpaca.getPositions()
//         .then((portfolio) => {

//             let portfolioDetails={};

//             // Print the quantity of shares for each position.
//             portfolio.forEach(function (position) {
//                 portfolioDetails[position.symbol]=position.qty
//             })

//             res.status(200).json({success:true, data:portfolioDetails})

//         }).catch(err=>{
//             console.log(err)
//             res.status(500).json({success:false,message:'Cannot get portfolio'})
//         })

//     }).catch(err=>{
//         console.log(err)
//         res.status(500).json({success:false,message:' Account does not exist'})
//     })
    
    
// })

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



apiRouter.get('/search/:query',(req,res)=>{

    const {query}=req.params

    const STOCK_PROFILE_API="https://TheUcheojor.github.io/stocky-reference-data/stock-profiles.json"
    const SIMILARITY_CONSTANT=0.3
    
    console.log(`Requesting https://TheUcheojor.github.io/stocky-reference-data/stock-profiles.json for ${query}`)

    axios.get(STOCK_PROFILE_API)
    .then(axiosResponse=>{

        let stockProfiles=axiosResponse.data

        let desiredStockProfiles=stockProfiles.filter((stockProfile)=>{ 
            
            console.log(`${query} : StringSimilarity.compareTwoStrings(stockProfile.symbol, query ):  ${StringSimilarity.compareTwoStrings(stockProfile.symbol.toLowerCase(), query.toLowerCase() )}`)
        console.log(`${query} : StringSimilarity.compareTwoStrings(stockProfile.name, query ) : ${StringSimilarity.compareTwoStrings(stockProfile.name.toLowerCase(), query.toLowerCase() )}`)


              return  StringSimilarity.compareTwoStrings(stockProfile.symbol.toLowerCase(), query.toLowerCase() ) > SIMILARITY_CONSTANT
            || StringSimilarity.compareTwoStrings(stockProfile.name.toLowerCase(), query.toLowerCase() ) > SIMILARITY_CONSTANT
        }
            )
        console.log(`${query} : ${desiredStockProfiles}`)
        
        res.status(200).json({success:true, data: desiredStockProfiles })
    }).catch(err=>{
        res.status(500).json({success:false, message:`${err}`})
    })
    
})

//May not be needed in the future as search provides similar functionality
apiRouter.get('/stocks/:name',(req,res)=>{

    const name=req.params.name

    const STOCK_PROFILE_API="https://TheUcheojor.github.io/stocky-reference-data/stock-profiles.json"
    
    console.log(`Requesting https://TheUcheojor.github.io/stocky-reference-data/stock-profiles.json for ${name}`)

    axios.get(STOCK_PROFILE_API)
    .then(axiosResponse=>{

        let stockProfiles=axiosResponse.data

        let desiredStockProfile=stockProfiles.find((stockProfile)=> 
            stockProfile.symbol.toLowerCase()==name.toLowerCase()
            || stockProfile.name.toLowerCase()==name.toLowerCase() )

        console.log(`${name} : ${desiredStockProfile}`)

        res.status(200).json({success:true, data: desiredStockProfile })
    }).catch(err=>{
        res.status(500).json({success:false, message:`${err}`})
    })
    
})









export default apiRouter