
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
        secretKey:{
            type:String,
            unique : true,
        }, 
        apiKey:{
            type:String,
            unique : true,
        },
        stocks:[{
            type:String
        }],
        logs:[{
            type:String
        }]   
    },
    settings:{
        strategy:String,  
    },    
})

export default mongoose.model('User',userSchema,'users');

