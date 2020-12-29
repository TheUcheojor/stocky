
import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    email: {
        type:String 
    },
    password: {
        type:String
    },
    alpaca:{
        secretKey:String,
        apiKey:String,
        equity:Number,
        buying_power:Number
    },
    settings:{
        strategy:String,     
    },
    orderHistoryReference:{ type:mongoose.Schema.Types.ObjectId, ref:'User'},
    
})

export default mongoose.model('User',userSchema,'users');

