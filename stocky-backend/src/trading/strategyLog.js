import { response } from 'express'
import User from '../models/User'
import Strategy from './strategyController'

const MAX_LOGS=-30

const strategyLog =(email, message)=>{

    User.updateOne({email:email}, {
        $push:{
            'alpaca.logs':{
                $each:[message],
                $slice:MAX_LOGS
            }
        }
    }).then((response)=>{
        
        if(response.n<1 || response.nModified<1){
            console.log(`\nSTRATEGY LOG [${email}] ERROR -> Cannot update logs!`)
        }else{
            console.log(`\nSTRATEGY LOG [${email}]  Updated User's logs`)
        }
    }).catch(error=>{
        console.log(`\NSTRATEGY LOG [${email}]  ERROR - ${error}`)
    })


}

export default strategyLog
