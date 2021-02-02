
import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    email: {
        type:String, 
        unique : true,
        required : true,
        dropDups: true,
    },
    password: {
        type:String
    },
    alpaca:{
        secretKey:String,//Should be unique to avoid conflicting strategies 
        apiKey:String,//Should be unique to avoid conflicting strategies 
        stocks:[{
            type:String
        }]   
    },
    settings:{
        strategy:String,  
    },    
})

export default mongoose.model('User',userSchema,'users');

