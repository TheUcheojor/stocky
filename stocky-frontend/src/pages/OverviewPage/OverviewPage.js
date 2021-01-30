import React, {useState, useEffect} from 'react'
import setAccountInformation from './support/SetAccountInformation'
import formatNumber from './support/FormatNumbers'

const OverviewPage=({ email })=>{


    const [ equity, setEquity ] =useState('');
    const [ buyingPower, setBuyingPower ] =useState('');

    // setAccountInformation(email, setEquity, setBuyingPower);
    console.log("Rendered")
    useEffect(()=>{
        console.log("CHANGE")

        setAccountInformation(email, setEquity, setBuyingPower);

        // Check every 30 seconds for equity and buying power updates
        const updateInterval=setInterval(()=>{
            setAccountInformation(email, setEquity, setBuyingPower);
        },30000 )
                

        return () => clearInterval(updateInterval);

    },[])



    
    // alert(email)

    return (
        <div id='content'> 
            <div className='container account-details'> 
                <span className="container-title">Account Balance</span>
                <div className='container-subtitles equity'>${formatNumber(equity)}   <span style={{fontSize:"10px"}}>EQUITY</span> </div>
                <div className='container-subtitles buying_power'>${formatNumber(buyingPower)}  <span style={{fontSize:"10px"}}>BUYING POWER</span> </div>
            
            </div>
            <div className='container daily-profit'> Daily Profit </div>
            <div className='container live-overview'> Live Overview</div>
            <div className='container api-info'> Alpaca API Info</div>
            <div className='container order-history'> Order History </div>
            <div className='container manual-order'> Manual Order </div>
        
        </div>
    )

}
// "account-details .  daily-profit"
// "live-overview live-overview api-info"
// "order-history order-history manual-order"
export default OverviewPage;