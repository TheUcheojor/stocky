
import {NotificationContainer, NotificationManager} from 'react-notifications';


const createOrder=({email})=>{

    let operation=document.getElementById('operation-options').value;
    let orderType=document.getElementById('order-type-options').value;
    let symbol=document.getElementById('symbol-options').value;
    let timeInForce=document.getElementById('time-in-force-options').value;
    let qty=(document.getElementById('order-quantity').value)? document.getElementById('order-quantity').value:1;

    console.log(operation,orderType,symbol,timeInForce,qty)

    const requestOptions={
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify(
            {
                "email":email,
                "symbol":symbol,
                 "qty": qty,
                "side": operation,
                "type": orderType,
                "timeInForce": timeInForce 
            }
        )

    }
    
    fetch('/api/create-order',requestOptions)
    .then( response=>response.json())
    .then( result =>{

        if(result.success){
            console.log(`Your ${symbol} order has been created.`)
            NotificationManager.success("Order Creation", `Your ${symbol} order has been created.`)
        }else{
            NotificationManager.warning("Order Creation", result.message)
            console.log(`Your order has not been created: ${result.message}`)
        }


    }).catch(error=>{
        console.log('error creating orders: '+error)
    })





}

export default createOrder