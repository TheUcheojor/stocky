import Swal from 'sweetalert2/dist/sweetalert2.js'
import notificationRefeference from '../../../support/notificationReference'

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
            Swal.fire("Trading Strategy","Your strategy has been saved",notificationRefeference.SUCCESS)
        }else{
            Swal.fire("Trading Strategy",result.message,notificationRefeference.FAILURE)

        }

    }).catch(error=>{
        Swal.fire("Trading Strategy","Cannot save strategy settings",notificationRefeference.FAILURE)
    })

}

export default setStrategy