
const setAccountInformation= async ( email, {setEquity,setBuyingPower,setDailyEarning,setSecretKey,setApiKey})=>{

    const res=await fetch(`/users/account?email=${encodeURIComponent(email)}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    });
    
    const {success,data}=await res.json()

    if(success){
        console.log(`GET /users/account - Success`)
        setEquity(parseFloat(data.equity))
        setBuyingPower(parseFloat(data.buying_power))
        setDailyEarning( parseFloat(data.equity) - parseFloat(data.last_equity))
        setSecretKey(data.alpaca.secretKey)
        setApiKey(data.alpaca.apiKey)
    }else{
        console.log(`GET /users/account - Failure`)

        setEquity('0')
        setBuyingPower('0')
    }

}

export default setAccountInformation;