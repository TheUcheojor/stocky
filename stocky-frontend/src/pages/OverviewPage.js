import React, {useState, useEffect} from 'react'

const OverviewPage=({ email })=>{


    const [ equity, setEquity ] =useState('');
    const [ buyingPower, setBuyingPower ] =useState('');

    useEffect(()=>{


        const date=new Date()

        //Check that stock market is open
        if( (date.getHours()>9 && date.getHours()<=4 )
            && (date.getDay()>0 && date.getDay()<6 )
        ){
            //Check every 30 seconds for equity and buying power updates
            const updateInterval=setInterval(()=>{

            ( async()=>{

                
                const res=await fetch('/users/account',{
                    method:'post',
                    body:JSON.stringify({
                        email:email
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });

                
                const {success,data}=await res.json()

                if(success){
                    setEquity(data.equity)
                    setBuyingPower(data.buying_power)
                }else{

                    setEquity(' N/A')
                    setBuyingPower('N/A')

                }

                    })();

            },30000 )
                

            return () => clearInterval(updateInterval);

        }else{

            ( async()=>{

                
                const res=await fetch('/users/account',{
                    method:'post',
                    body:JSON.stringify({
                        email:email
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });

                
                const {success,data}=await res.json()

                if(success){
                    setEquity(data.equity)
                    setBuyingPower(data.buying_power)
                }else{

                    setEquity(' N/A')
                    setBuyingPower('N/A')

                }

            })();

        }


       

    })



    
    // alert(email)

    return (
        <div id='content'> 
            <div className='container account-details'> 

                <div className='equity'>Equity - {equity}</div>
                <div className='buying_power'> Buying Power - {buyingPower}</div>
            
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