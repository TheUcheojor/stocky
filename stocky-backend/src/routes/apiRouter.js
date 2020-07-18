import express from 'express'
import MeanReversion from '../trading/strategies/mean-reversion'


const apiRouter = express.Router()


//Temporary Setup to test stategies

import keys from '../config/setup'

const userTradingConfig ={
    API_KEY: keys.API_KEY,
    API_SECRET: keys.SECRET_KEY,
    stocks: ["AAPLE","GOOG","MSFT"],
    exitPoint: 0,
    fixedStopLoss:0,
}


const MS= new MeanReversion(userTradingConfig);
MS.run()

export default apiRouter