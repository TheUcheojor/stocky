
import React from 'react'

const DailyProfit = ({dailyEarning})=>(

    <div className='container daily-profit'> 
        <div className='container-subtitles daily-profit'>
            {dailyEarning} <div style={{fontSize:"12px"}}>DAILY PROFIT</div>
        </div>
    </div>

)

export default DailyProfit