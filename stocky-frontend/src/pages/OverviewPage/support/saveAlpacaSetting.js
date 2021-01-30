


const saveAplacaSettings= async ({email, apiKey, secretKey, setApiKey, setSecretKey})=>{

    const res=await fetch(`/settings/set-alpaca`,{
        method:'POST',
        headers:{
            "Accept": "application/json",
            'Content-Type':'application/json'
        },
        body:JSON.stringify({"email":email, "apiKey":apiKey, "secretKey":secretKey})
    });

    const {success,data}=await res.json()

    if(success){
        console.log(`GET /users/account - Success } `)
        setApiKey(apiKey)
        setSecretKey(secretKey)

    }else{
        console.log(`GET /users/account - Failure - data: ${JSON.stringify(data)} `)
    }

    




}


export default saveAplacaSettings;