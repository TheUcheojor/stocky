

const setAccountInformation= async ( email, {setEquity,setBuyingPower,setDailyEarning,setSecretKey,setApiKey})=>{

    await fetch(`/users/account?email=${encodeURIComponent(email)}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>res.json())
    .then(response=>{

        if(response.success){
            console.log(`GET /users/account - Success`)
            setEquity(parseFloat(response.data.equity))
            setBuyingPower(parseFloat(response.data.buying_power))
            setDailyEarning( parseFloat(response.data.equity) - parseFloat(response.data.last_equity))
            setSecretKey(response.data.alpaca.secretKey)
            setApiKey(response.data.alpaca.apiKey)
        }else{
            setEquity(0)
            setBuyingPower(0)
            setDailyEarning(0)
        }



    })
    
    

}

export default setAccountInformation;