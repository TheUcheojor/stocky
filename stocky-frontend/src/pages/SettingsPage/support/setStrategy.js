import {NotificationContainer, NotificationManager} from 'react-notifications';

const setStrategy=(email)=>{

    const requestParams={
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            email:email,
            strategy: document.getElementById("select-strategy").value,
            stocks: Array.from( document.getElementById("select-stock-collection")
                        .querySelectorAll(':scope option:checked ')
                    ).map( (element)=>element.value ) 
        })
    }

    fetch('/settings/set-strategy',requestParams)
    .then(res=>res.json())
    .then(result=>{

        if(result.success){
            NotificationManager.success("Trading Strategy","Your strategy has been saved")
        }else{
            NotificationManager.error("Trading Strategy",result.message)

        }

    }).catch(error=>{
        NotificationManager.error("Trading Strategy","Cannot save strategy settings")
    })

}

export default setStrategy