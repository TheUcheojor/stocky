
import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    email: {
        type:String 
    },
    password: {
        type:String
    },
    alpaca:{
        key:String,
        equity:Number,
        buying_power:Number
    },
    settings:{
        strategy:String,     
    }

})

export default mongoose.model('User',userSchema,'users');

