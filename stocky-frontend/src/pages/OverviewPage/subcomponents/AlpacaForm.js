import React, { useEffect } from 'react'
import saveAplacaSettings from '../support/saveAlpacaSetting'


const AlpacaForm= ({email,apiKey,secretKey,setApiKey,setSecretKey})=>{
    
    useEffect( ()=>{

        if(apiKey=="" || secretKey==""){
            document.getElementsByClassName("alpaca-form")[0].classList.add("glow")
        }else{
            document.getElementsByClassName("alpaca-form")[0].classList.remove("glow")
        }
    },[apiKey,secretKey])
    
    
    return (

        <div className='container alpaca-form api-info'> 
            <span className="container-title">Alpaca API Info</span>
            <div style={{paddingTop:"5px"}} >

                <span className="aplaca-info-title" >Secret Key</span>
                <input type="text" className="aplaca-info" id="secretKey" placeholder={secretKey}></input>

                <span className="aplaca-info-title">Api Key</span>
                <input type="text" className="aplaca-info" id="apiKey" placeholder={apiKey}></input>
                            
                <button id="saveApiSettings" 
                    onClick={()=>saveAplacaSettings(
                                    {
                                        email:email, 
                                        apiKey:(document.getElementById('apiKey').value)? document.getElementById('apiKey').value: apiKey, 
                                        secretKey:(document.getElementById('secretKey').value)? document.getElementById('secretKey').value:secretKey,
                                        setApiKey:setApiKey, 
                                        setSecretKey:setSecretKey, 
                    })}>
                        Save
                    </button>

            </div>
        </div>
    )

}

export default AlpacaForm