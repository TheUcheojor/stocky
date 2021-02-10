import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import notificationRefeference from '../support/notificationReference'


const addStockToStrategy=(email,symbol)=>{

    const requestParams={
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            email:email,
            stockSymbol:symbol
        })
    }
    
    fetch(`/settings/add-stock`,requestParams)
    .then(res=>res.json())
    .then(result=>{

        if(result.success) {
            Swal.fire('Stock Collection', `Added ${symbol.toUpperCase()} to your stock collection`, notificationRefeference.SUCCESS)
        }else{
            Swal.fire('Stock Collection',result.message, notificationRefeference.FAILURE)
        }
    })


}


const StockPage =({match,email})=>{
    
    const {symbol}=match.params

    
    const [stockProfile,setStockProfile]=useState({})
    
    useEffect(()=>{

        fetch(`/api/stocks?name=${encodeURIComponent(symbol)}`)
        .then(res=>res.json())
        .then(result=>{
            
            if(result.success){
                setStockProfile(result.data)
            }else{
                Swal.fire("Stock Profile", result.message,notificationRefeference.SUCCESS)
            }

        }).catch(error=>{
            Swal.fire("Stock Profile", error, notificationRefeference.FAILURE)
        })



    },[])

    return(

        <div className='content stock'> 
            
            <div className="container stock-profile">
                <div className="subcontainer symbol">
                    <b>{stockProfile.symbol}</b> Profile
                    <br/>
                    <span style={{fontSize:"15px"}}>{stockProfile.name}</span> 
                </div>
                <div className="subcontainer section">
                    <span className="property">Section:</span>
                    <span className="value"> {stockProfile.section}</span>
                </div>
                <div className="subcontainer industry">
                    <span className="property">Industry:</span>
                    <span className="value"> {stockProfile.industry}</span>
                </div>
                <div className="subcontainer employees">
                    <span className="property">Employees:</span>
                    <span className="value"> {stockProfile.employees}</span>
                </div>
                <div className="subcontainer desc">
                    <span className="property">Description:</span>
                    <span className="value"> {stockProfile.desc}</span>
                </div>

                <button id="add-stock-to-strategy" onClick={()=>addStockToStrategy(email,symbol)}>
                    Add <b>{stockProfile.symbol}</b> To Your Stock Collection
                </button>

            </div>


            {/* {JSON.stringify(stockProfile)} */}
            {/* <h1>This is the Stock Page</h1>
            You searched for {symbol} */}
        </div>
    )
}

export default StockPage