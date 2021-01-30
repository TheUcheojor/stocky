
const setAccountInformation= async ( email, setEquity,setBuyingPower)=>{

    const res=await fetch(`/users/account?email=${encodeURIComponent(email)}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    });

    
    const {success,data}=await res.json()

    if(success){
        console.log(`GET /users/account - Success - data: ${JSON.stringify(data) } `)
        setEquity(data.equity)
        setBuyingPower(data.buying_power)
    }else{
        console.log(`GET /users/account - Failure - data: ${JSON.stringify(data)} `)

        setEquity(' N/A')
        setBuyingPower('N/A')
    }

}

export default setAccountInformation;