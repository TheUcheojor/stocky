
import LongShort from './strategies/long-short'
import MeanReversion from './strategies/mean-reversion'


const STRATEGIES={
    LONG_SHORT:"LONG_SHORT", 
    MEAN_REVERSION:"MEAN_REVERSION", 
}


class Strategy{

    constructor(user) {
        this.strategyClass=this.getStrategyClass(user)
    }

    async runStrategy(){

        if(this.strategyClass!=null){
            try{
                this.strategyClass.run()
            }catch(error){
                console.log("An error occurred: "+error)
            }
        }else{
            console.log("No strategy to run ")
        } 
        
    }

    getStrategyClass(user){

        this.stopUserStrategies(user);

        if(user.settings.strategy==STRATEGIES.LONG_SHORT){
            return LongShort.create(user)
        }else if( user.settings.strategy==STRATEGIES.MEAN_REVERSION){
            return MeanReversion.create(user)
        }
        return null
    }

    stopUserStrategies(user){
        // console.log(user)
        LongShort.remove(user)
        MeanReversion.remove(user)
    }


}


export default Strategy
