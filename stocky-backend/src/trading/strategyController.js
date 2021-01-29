
import LongShort from './strategies/long-short'
import MeanReversion from './strategies/mean-reversion'


const STRATEGIES={
    LONG_SHORT:"LONG_SHORT", 
    MEAN_REVERSION:"MEAN_REVERSION", 
    MEAN_REVERSION:"MEAN_REVERSION" 
}


class Strategy{

    constructor(user) {
        this.strategyClass=getStrategyClass(user)
    }

    async runStrategy(){
        this.strategyClass.run();
    }

    getStrategyClass(user){
        
        stopUserStrategies(user);
        if(user.settings.strategy==STRATEGIES.LONG_SHORT){
            return LongShort.create(user)
        }else if( user.settings.strategy==STRATEGIES.MEAN_REVERSION){
            return MeanReversion.create(user)
        }
    }

    stopUserStrategies(user){
        LongShort.remove(user)
        MeanReversion.remove(user)
    }


}


export default Strategy
