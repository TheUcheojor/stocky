import React from 'react'

const AboutPage=()=>(
    <div className='content about-page'> 
         

        <div className="container" style={{textAlign:'left'}}>
            <h1>Stocky</h1>
            <p style={{marginTop:'10px'}}>
                Stocky is a simple automated stock-trading platform.
            </p>
            <p style={{marginTop:'10px'}}>

                Stocky offers various trading strategies that can be implemented on paper trading accounts. At this moment, Stocky supports Long/Short and Mean Reversion strategies.
            </p>

            <p style={{marginTop:'20px'}}>
                For more information, please visit the <a target="_blank" href="https://github.com/TheUcheojor/stocky">Stocky Repository </a> 
            </p>
            
            <p style={{marginTop:'20px'}}>
                To get your Alpaca keys, visit the <a target="_blank" href="https://alpaca.markets/">Alpaca Website </a> 
            </p>
           

        </div>
         
     

    
    </div>
   
)

export default AboutPage;