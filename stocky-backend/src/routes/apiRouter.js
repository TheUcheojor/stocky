import express from 'express'

import async from 'async'
import axios from 'axios'
import StringSimilarity from 'string-similarity'

import User from '../models/User'

import connectToAlpaca from '../auxilliary/connectToAlpaca'


const apiRouter = express.Router()



apiRouter.get('/get-order-history', (req,res)=>{

    const { email } = req.query;

    User.findOne({email:email})
    .then((user)=>{
        
        const alpaca=connectToAlpaca(user)

        const MAX_ACTIVITIES= 10;
        // { activityTypes, until, after, direction, date, pageSize }: 
        // { activityTypes: any; until: any; after: any; direction: any; date: any; pageSize: any; }
       
        alpaca.getAccountActivities({activityTypes:["FILL"], pageSize: MAX_ACTIVITIES, direction:'desc'})
        .then( (activities)=>{
            
            let formattedActivities=[];

            async.each(activities, function(activity, callback){

    
                alpaca.getOrder(activity.order_id)
                .then((order)=>{
                    formattedActivities.push(
                        {
                            order_id:activity.order_id, 
                            symbol: activity.symbol,
                            type: activity.type,
                            quantity:activity.qty,
                            price:activity.price,
                            transaction_time:activity.transaction_time.split(".")[0],
                            order_type:order.type,
                            status: order.status
                        }
                    )



                    callback()

                }).catch(error=>{
                    console.log(`\n/get-order-history - FAILURE - error: ${error}`)
                    res.status(500).json({success:false, message:`${error}`})
                })


            }  ).then( ()=>{
                let orderedIds=activities.map(activity=>activity.order_id)
                
                let orderedActivities=[]
                orderedIds.forEach( orderId=>{

                    let targetActivity=formattedActivities.find(activity=>activity.order_id==orderId)
                    orderedActivities.push(targetActivity)

                })


                console.log(`\n/get-order-history - SUCCESS`)
                res.status(200).json({success:true, data:orderedActivities})

            }).catch(err=>{
                console.log(`\n/get-order-history - FAILURE - error: ${err}`)
                res.status(500).json({success:false, message:`Error getting account activities`,error:`${err}`})
            })
            



        }).catch( (error)=>{
            console.log(`\n/get-order-history - FAILURE - error: ${error}`)

            res.status(500).json({success:false, message:`Cannot connect to Alpaca`,error:`${error}`})
        })


    }).catch( (error)=>{
        console.log(`\n/get-order-history - FAILURE - error: ${error}`)
        res.status(500).json({success:false, message:"No User associated with the given email", error:`${error}`})

    } )



});



apiRouter.get('/search',(req,res)=>{

    const {query}=req.query

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
        console.log(`\n/api/search - SUCCESS`)
        console.log(`\n${query} : ${desiredStockProfiles}`)
        res.status(200).json({success:true, data: desiredStockProfiles })
    }).catch(err=>{
        res.status(500).json({success:false, message:`Server Error. Cannot access stock profiles`, error:`${err}`})
    })
    
})

//May not be needed in the future as search provides similar functionality
apiRouter.get('/stocks',(req,res)=>{

    const {name}=req.query

    const STOCK_PROFILE_API="https://TheUcheojor.github.io/stocky-reference-data/stock-profiles.json"
    
    console.log(`Requesting https://TheUcheojor.github.io/stocky-reference-data/stock-profiles.json for ${name}`)

    axios.get(STOCK_PROFILE_API)
    .then(axiosResponse=>{

        let stockProfiles=axiosResponse.data

        let desiredStockProfile=stockProfiles.find((stockProfile)=> 
            stockProfile.symbol.toLowerCase()==name.toLowerCase()
            || stockProfile.name.toLowerCase()==name.toLowerCase() )

        console.log(`\n/api/stocks - SUCCESS`)
        console.log(`${name} : ${desiredStockProfile}`)

        res.status(200).json({success:true, data: desiredStockProfile })
    }).catch(err=>{
        console.log(`\n/api/stocks - FAILURE - ${err}`)
        res.status(500).json({success:false, message:`Server Error. Cannot access stock-profiles`,error:`${err}`})
    })
    
})

apiRouter.get('/all-stock-profiles',(req,res)=>{

    const {email}=req.query


    const STOCK_PROFILE_API="https://TheUcheojor.github.io/stocky-reference-data/stock-profiles.json"
    
    axios.get(STOCK_PROFILE_API)
    .then(axiosResponse=>{

        const stockProfiles=axiosResponse.data

        if(email){
            User.findOne({email:email})
            .then((user)=>{
                stockProfiles.forEach((stockProfile,i)=>{
                    stockProfiles[i].isInStockCollection=user.alpaca.stocks.includes(stockProfile.symbol)
                })

                res.status(200).json({success:true, data:stockProfiles  })

            }).catch(error=>{
                console.log(`\n/api/stocks - FAILURE - ${error}`)
                res.status(500).json({success:false, message:`Server Error. Cannot access user profile`,error:`${error}`})

            })

        }else{
            res.status(200).json({success:true, data:stockProfiles  })
        }
      

    }).catch(err=>{
        console.log(`\n/api/stocks - FAILURE - ${err}`)
        res.status(500).json({success:false, message:`Server Error. Cannot access stock-profiles`,error:`${err}`})
    })
    
})


apiRouter.post("/create-order", (req, res)=>{

    const {email, symbol, side, qty, type,timeInForce}= req.body


    User.findOne({email:email})
    .then( user=>{

        const userAlpaca = connectToAlpaca(user);

        userAlpaca.createOrder({
            symbol: symbol, // any valid ticker symbol
            qty: qty, //number
            side: side, //'buy' | 'sell',
            type: type, //'market' | 'limit' | 'stop' | 'stop_limit' | 'trailing_stop',
            time_in_force:timeInForce, //'day' | 'gtc' | 'opg' | 'ioc',
        }).then((order)=>{
            console.log(`\n/api/create-order - SUCCESS - ${email} - ${symbol}`)
            res.status(200).json({success:true, data:email})
        }).catch(error=>{
            console.log(`\n/api/create-order - FAILURE - ${error}`)
            res.status(500).json({success:false, message:`Error creating ${type} ${side} order for ${symbol}`,error:`${error}`})
        })



    }).catch(error=>{
        console.log(`\n/api/create-order - FAILURE - ${error}`)
        res.status(500).json({success:false, message:`Cannot connect to Alpaca`,error:`${error}`})
    })





})

apiRouter.get('/portfolio-history',(req,res)=>{

    const {email, period}=req.query

    //Period Options are 1D, 1M, 1A

    User.findOne({email:email})
    .then((user)=>{

        const userAlpaca=connectToAlpaca(user)

        userAlpaca.getPortfolioHistory({period:period})
        .then(portfolioHistory=>{
            console.log(`/api/portfolio-history - SUCCESS `)
            res.status(200).json({success:true, data:portfolioHistory})

        }).catch(error=>{
            console.log(`/api/portfolio-history - FAILURE -${error}`)
            res.status(500).json({success:false, messeage:`Cannot get the portfolio history of ${email}`, error:`${error}`})
        })



    }).catch( error=>{
        console.log(`/api/portfolio-history - FAILURE -${error}`)
        res.status(500).json({success:false, message:`Cannot connect to Alpaca`, error:`${error}`})
    })


})

apiRouter.get('/get-logs',(req,res)=>{

    const {email}=req.query

    User.findOne({email:email})
    .then(user=>{
        res.status(200).json({success:true, data:user.alpaca.logs})
    }).catch(error=>{
        console.log(`/api/get-logs - FAILURE -${error}`)
        res.status(500).json({success:false, message:`Cannout find user with email ${email}`, error:`${error}`})
    })
})





export default apiRouter