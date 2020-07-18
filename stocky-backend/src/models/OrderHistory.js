import mongoose, { mongo } from 'mongoose'

const OrderHistory=mongoose.Schema({

    orders:[ 
        {
            stock:String,
            date:String,
            shares:Number,
            pricePerShare:Number,
            status:String,
        }
    ]


})


export default  mongoose.model('Order History',OrderHistory,'order-histories' )  