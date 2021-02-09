import mongoose from 'mongoose'

const connectToDatabase=()=>{
    const DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("Connection success!")
    }).catch((err)=>{
        console.log(err)
    } );
    
}

export default connectToDatabase