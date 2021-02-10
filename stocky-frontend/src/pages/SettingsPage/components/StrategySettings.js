import React,{useState, useEffect} from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import notificationRefeference from '../../../support/notificationReference'

import setStrategy from '../support/setStrategy'


const StrategySetttings=({email})=>{

    const [stockOptions, setStockOptions]=useState([])
    const [stockStrategies, setStockStrategies ]=useState([])

    useEffect(() => {

        const targetUrls=[`/api/all-stock-profiles?email=${email}`,`/settings/get-strategies?email=${email}`]
       
        Promise.all(targetUrls.map(url=>fetch(url).then(res=>res.json())))
        .then( (result)=>{

            const stockProfileRespone=result[0]
            if(stockProfileRespone.success){
                setStockOptions(stockProfileRespone.data)
            }else{
                Swal.fire("Stock Profiles", stockProfileRespone.message, notificationRefeference.FAILURE)
            }

            const stockStrategyResponse=result[1]
            if(stockStrategyResponse.success){
                setStockStrategies(stockStrategyResponse.data)
            }else{
                Swal.fire("Stock Strategy", stockProfileRespone.message,notificationRefeference.FAILURE)
            }
        }).catch(error=>{
            Swal.fire("Stock Strategy", "Cannot fetch strategy data", notificationRefeference.FAILURE)

        })


    },[])

    return(
        <div className="container settings-item set-strategy">
            <div className="container-title">
                Strategy Options
            </div>

            <span className="setting-container-item" >Select Your Strategy</span>
            <select type="text" className="setting-container-item-select" id="select-strategy" >
                {
                    stockStrategies.map((strategy,i)=>(
                        <option  key={i} value={strategy.strategyKey} selected={strategy.isSetStrategy? "selected":"" }>{strategy.strategyName}</option>

                    ))
                }
            </select>

            <span className="setting-container-item" > Select Stocks To Trade</span>


            <select type="text" className="setting-container-item-select" id="select-stock-collection"  multiple='multiple'>
                {
                    stockOptions.map((stockProfile,i)=>(
                        <option key={i} value={stockProfile.symbol} selected={stockProfile.isInStockCollection? "selected":""}> {stockProfile.symbol} - {stockProfile.name}</option>
                    ))

                }

            </select>


            <button id="settings-save-button" onClick={()=>setStrategy(email)}>Save Trading Strategy</button>
        </div>
    )
}

export default StrategySetttings