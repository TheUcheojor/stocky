import Alpaca from '@alpacahq/alpaca-trade-api'
import User from '../models/User'
import Strategy from '../trading/strategyController'

const initiateStrategies= ()=>{

    User.find({})
    .then(users=>{

        //Filter out users that do not have a set strategy and aplaca keys
        users=users.filter(user=>user.settings.strategy && user.alpaca.apiKey && user.alpaca.secretKey)

        console.log(users)
        users.forEach(user=>{
            let userStrategy=new Strategy(user);
            userStrategy.runStrategy()
        })

    }).catch(error=>{
        console.log("Cannot initiate strategies for all users: "+error)
    })



}

export default initiateStrategies;