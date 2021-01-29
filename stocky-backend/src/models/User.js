
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
        stocks:[{
            type:String
        }]   
    },
    settings:{
        strategy:String,  
    },    
})

export default mongoose.model('User',userSchema,'users');

