import React, {useEffect, useState} from 'react'
import createOrder from '../support/CreateOrder'

const ManualOrder= ({email})=>{


    const [stockSymbols, setStockSymbols]=useState([])

    useEffect( ()=>{

        fetch('/api/all-stock-profiles')
        .then( res=> res.json())
        .then(result => {
            let newStockSymbols=[]
            
            if(result.success){
                console.log(` /api/all-stock-profiles - Success`)

                result.data.forEach( (stockProfile)=>{
                    newStockSymbols.push(stockProfile.symbol)
                })
                setStockSymbols(newStockSymbols)

            }else{
                console.log(` /api/all-stock-profiles - Error - ${result.message}`)
            }
            
        }).catch(error=>{
            console.log(` /api/all-stock-profiles - Error ${error}`)
        })
        


    },[])
    

    return (
        <div className='container manual-order'>

            <div className="container-title">Manual Order </div>   

            <div className="operation">
                <div className="info-title">Operation</div>
                <select id="operation-options" className='options'>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                </select>
            </div>

            <div className="order-type">
                <div  className="info-title" >Order Type</div>
                <select id="order-type-options" className='options'>
                    <option value="market">Market</option>
                    <option value="limit">Limit</option>
                    <option value="stop">Stop</option>
                    <option value="stop_limit">Stop Limit</option>
                    <option value="trailing_stop">Trailing Stop</option>
                </select>
            </div>
            
            <div className="stock-symbols">
                <div className="info-title"> Symbol</div>
                <select  id="symbol-options" className='options symbol-options'>
                    {
                        stockSymbols.map( (symbol,i)=>(
                            <option key={i} vaulue={symbol.toLowerCase()}>{symbol}</option>
                         ))
                    }
                </select>

            </div>
                
            <div className="time-in-force">
                <div className="info-title"> Time In Force</div>
                <select  id="time-in-force-options" className='options '>
                    <option value="day">Day</option>
                    <option value="gtc">GTC</option>
                    <option value="opg">OPG</option>
                    <option value="ioc">IOC</option>
                </select>
            </div>
            
            <div className="quantity">
                <div className="info-title"> Quantity</div>
                <input id="order-quantity"  className=" options" placeholder="1" min="1" type="number" /> 
            </div>

            <div className="create-order">
                <button id="create-order-button" type="number"  onClick={()=>createOrder({email:email})}>Create Order</button> 
            </div>
        </div>
    )
}

// grid-template-areas: 
//   'info-title info-title'
//   'order-type market-type'
//   'symbol time-in-force',
//   'quantity quantity' 
//   'create-order create-order' ; 


// symbol: symbol, // any valid ticker symbol
//             qty: qty, //number
//             side: side, //'buy' | 'sell',
//             type: type, //'market' | 'limit' | 'stop' | 'stop_limit' | 'trailing_stop',
//             time_in_force:timeInForce, //'day' | 'gtc' | 'opg' | 'ioc',

export default ManualOrder