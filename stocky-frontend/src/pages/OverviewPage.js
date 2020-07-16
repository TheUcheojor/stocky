import React from 'react'

const OverviewPage=()=>(

    <div id='content'> 
        <div className='container account-details'> Account Details </div>
        <div className='container daily-profit'> Daily Profit </div>
        <div className='container live-overview'> Live Overview</div>
        <div className='container api-info'> Alpaca API Info</div>
        <div className='container order-history'> Order History </div>
        <div className='container manual-order'> Manual Order </div>
    
    </div>

)
// "account-details .  daily-profit"
// "live-overview live-overview api-info"
// "order-history order-history manual-order"
export default OverviewPage;