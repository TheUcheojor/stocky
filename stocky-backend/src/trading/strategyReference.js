

import LongShort from './strategies/long-short'
import MeanReversion from './strategies/mean-reversion'


const STRATEGIES={
    LONG_SHORT:{ key:"LONG_SHORT", name: "Long Short", strategyClass: LongShort}, 
    MEAN_REVERSION:{key:"MEAN_REVERSION", name: "Mean Reverison",strategyClass: MeanReversion }, 
}


export default STRATEGIES