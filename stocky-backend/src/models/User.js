import mongoose from 'mongoose'
import strategyReference from '../trading/strategyReference'

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required : [true, "Please enter a name"],
    },
    email: {
        type:String, 
        unique : true,
        required : [true,"Please enter an email"],
        dropDups: true,
    },
    password: {
        type:String
    },
    alpaca:{
        secretKey:{
            type:String
        },
        apiKey:{
            type:String
        },
        stocks:[{
            type:String
        }],
        logs:[{
            type:String
        }]   
    },
    settings:{
        strategy:{
            type:String,
            default: strategyReference.MEAN_REVERSION.name
        },  
    },    
})

export default mongoose.model('User',userSchema,'users');

