import STRATEGIES from './strategyReference'


class Strategy{

    constructor(user) {

        this.userStrategy=user.settings.strategy
        this.email=user.email
        this.strategyClass=this.getStrategyClass(user)
    }

    async runStrategy(){

        if(this.strategyClass!=null){
            try{
                this.strategyClass.run()
                console.log(`\nInitiated strategy ${this.userStrategy} for ${this.email}`)
            }catch(error){
                console.log("\nAn error occurred: "+error)
            }
        }else{
            console.log("\nCannot run strategy. No strategy to run or keys. Error occurred ")
        } 
        
    }

    getStrategyClass(user){

        this.stopUserStrategies(user);

        if( Object.keys(STRATEGIES).includes(user.settings.strategy)){
            return STRATEGIES[user.settings.strategy].strategyClass.create(user)
        }

        return null
    }

    stopUserStrategies(user){
        // console.log(user)

        for( let strategyKey in STRATEGIES){
            STRATEGIES[strategyKey].strategyClass.remove(user)
        }

    }


}


export default Strategy
