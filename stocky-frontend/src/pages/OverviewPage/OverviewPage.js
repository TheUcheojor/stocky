import React, {useState, useEffect, useCallback} from 'react'
import setAccountInformation from './support/SetAccountInformation'
import formatNumber from './support/FormatNumbers'
import saveAplacaSettings from './support/saveAlpacaSetting'

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



    
    // alert(email)

    return (
        <div id='content'> 

            <div className='container account-details'> 
                <span className="container-title">Account Balance</span>
                <div className='container-subtitles equity'>{formatNumber(equity)}   <span style={{fontSize:"10px"}}>EQUITY</span> </div>
                <div className='container-subtitles buying_power'>{formatNumber(buyingPower)}  <span style={{fontSize:"10px"}}>BUYING POWER</span> </div>
            </div>

            <div className='container daily-profit'> 
                <div className='container-subtitles daily-profit'>
                    {formatNumber(dailyEarning)} <span style={{fontSize:"12px"}}>DAILY PROFIT</span>
                </div>
            </div>

            <div className='container live-overview'>
                <span className="container-title">Live Overview</span>
            </div>

            <div className='container api-info'> 
                <span className="container-title">Alpaca API Info</span>
                <div className="alpaca-form" >

                    <span className="aplaca-info-title" >Secret Key</span>
                    <input type="text" className="aplaca-info" id="secretKey" placeholder={secretKey}></input>

                    <span className="aplaca-info-title">Api Key</span>
                    <input type="text" className="aplaca-info" id="apiKey" placeholder={apiKey}></input>
                    
                    <button id="saveApiSettings" 
                        // onClick={console.log("Pressed")}
                        onClick={()=>saveAplacaSettings(
                            {
                                email:email, 
                                apiKey:(document.getElementById('apiKey').value)? document.getElementById('apiKey').value: apiKey, 
                                secretKey:(document.getElementById('secretKey').value)? document.getElementById('secretKey').value:secretKey,
                                setApiKey:setApiKey, 
                                setSecretKey:setSecretKey, 
                            })}
                        >
                        Save
                    </button>

                </div>
            </div>

            <div className='container order-history'> 

                <span className="container-title" >
                    Order History
                </span>
 
            </div>

            <div className='container manual-order'>
                <span className="container-title">Manual Order </span>
                 
            </div>
        
        </div>
    )

}
// "account-details .  daily-profit"
// "live-overview live-overview api-info"
// "order-history order-history manual-order"
export default OverviewPage;