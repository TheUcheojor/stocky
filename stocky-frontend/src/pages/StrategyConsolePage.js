import React,{useEffect, useState} from 'react'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import notificationRefeference from '../support/notificationReference'

const StrategyConsolePage=({email})=>{

    const [logs, setLogs] = useState([])

    useEffect(()=>{

        const EmptyMessageElement=document.getElementsByClassName("empty-results strategy-console-empty")[0];

        fetch(`/api/get-logs?email=${email}`)
        .then((res)=>res.json())
        .then(response=>{
            
            if(response.success){
                setLogs(response.data.reverse());
                (response.data.length>0)? EmptyMessageElement.classList.add("hide"):EmptyMessageElement.classList.remove("hide");
            }else{
                Swal.fire("Logs", response.message, notificationRefeference.FAILURE);
                EmptyMessageElement.classList.remove("hide");
            }

        }).catch(error=>{
            Swal.fire("Logs", "Server Error. Cannot access logs",notificationRefeference.FAILURE)
            EmptyMessageElement.classList.remove("hide")
            console.log(error)
        })


    },[])

    return(
    <div className="content strategy-console">
        <div className="container">
            <div className="container-title">Console</div>

            {
                logs.map((log,i)=>(
                        <span key={i} className="strategy-log">
                        <b>{log.split("^^^")[0]}</b> {log.split("^^^")[1]}
                        </span>
                    )
                )
            }

            <div className="empty-results strategy-console-empty hide">
                No Logs To Display
            </div>
        </div>
    </div>
    )
}
export default StrategyConsolePage