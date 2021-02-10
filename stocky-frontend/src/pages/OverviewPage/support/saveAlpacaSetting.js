
import Swal from 'sweetalert2/dist/sweetalert2.js'
import notificationRefeference from '../../../support/notificationReference';


const saveAplacaSettings= async ({email, apiKey, secretKey, setApiKey, setSecretKey})=>{

    
    fetch(`/settings/set-alpaca`,{
        method:'POST',
        headers:{
            "Accept": "application/json",
            'Content-Type':'application/json'
        },
        body:JSON.stringify({"email":email, "apiKey":apiKey, "secretKey":secretKey})
    }).then(res=>res.json())
    .then(response=>{

        if(response.success){
            Swal.fire("Aplaca Settings", "Your Aplaca keys have been saved",notificationRefeference.SUCCESS)
            console.log(`GET /users/account - Success } `)
            setApiKey(apiKey)
            setSecretKey(secretKey)
    
        }else{
            Swal.fire("Aplaca Settings", response.message, notificationRefeference.FAILURE)
            console.log(`GET /users/account - Failure `)
        }

    }).catch(error=>{
        Swal.fire("Aplaca Settings", "Cannot connect to server", notificationRefeference.FAILURE)

    })


    

    




}


export default saveAplacaSettings;