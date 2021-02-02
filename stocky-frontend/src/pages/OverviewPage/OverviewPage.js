import React, {useState, useEffect, useCallback} from 'react'
import setAccountInformation from './support/SetAccountInformation'
import formatNumber from './support/FormatNumbers'

import AccountDetails from './subcomponents/AccountDetails'
import DailyProfit from './subcomponents/DailyProfit'
import LiveOverview from './subcomponents/LiveOverview'
import AlpacaForm from './subcomponents/AlpacaForm'
import OrderHistory from './subcomponents/OrderHistory'
import ManualOrder from './subcomponents/ManualOrder'

const OverviewPage=({ email })=>{


    const [ equity, setEquity ] =useState(0);
    const [ buyingPower, setBuyingPower ] =useState(0);
    const [ dailyEarning, setDailyEarning ] =useState(0)
    const [ secretKey, setSecretKey ] =useState('')
    const [ apiKey, setApiKey ] =useState('')


    // setAccountInformation(email, setEquity, setBuyingPower);
    console.log("Rendered")
    useEffect(()=>{
        console.log("CHANGE")

        setAccountInformation(email, {
            setEquity: setEquity, 
            setBuyingPower:setBuyingPower,
            setDailyEarning:setDailyEarning,
            setSecretKey:setSecretKey,
            setApiKey:setApiKey,
        });

        // Check every 30 seconds for equity and buying power updates
        const updateInterval=setInterval(()=>{
            setAccountInformation(email, {
                setEquity: setEquity, 
                setBuyingPower:setBuyingPower,
                setDailyEarning:setDailyEarning,
                setSecretKey:setSecretKey,
                setApiKey:setApiKey,
            });
        },30000 )
                

        return () => clearInterval(updateInterval);

    },[])



    return (
        <div id='content'> 

            <AccountDetails  equity={formatNumber(equity)} buyingPower={formatNumber(buyingPower)}/>

            <DailyProfit dailyEarning={formatNumber(dailyEarning)} />
            

            <LiveOverview />
            
            <AlpacaForm email={email} secretKey={secretKey}  apiKey={apiKey} setApiKey={setApiKey} setSecretKey={setSecretKey} />
            
            <OrderHistory />
            

            <ManualOrder />
        
        </div>
    )

}

export default OverviewPage;