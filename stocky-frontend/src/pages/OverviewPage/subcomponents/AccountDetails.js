import React from 'react'


const AccountDetails=({equity,buyingPower })=>(
    <div className='container account-details'> 
                <span className="container-title">Account Balance</span>
                <div className='container-subtitles equity'>{equity}   <span style={{fontSize:"10px"}}>EQUITY</span> </div>
                <div className='container-subtitles buying_power'>{buyingPower}  <span style={{fontSize:"10px"}}>BUYING POWER</span> </div>
    </div>

)

export default AccountDetails;