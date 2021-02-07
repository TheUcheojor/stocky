import React,{useEffect, useState} from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications';


const StrategyConsolePage=({email})=>{

    const [logs, setLogs] = useState([])

    useEffect(()=>{

        const EmptyMessageElement=document.getElementsByClassName("empty-results strategy-console-empty")[0]

        fetch(`/api/get-logs?email=${email}`)
        .then((res)=>res.json())
        .then(response=>{
            
            if(response.success){
                setLogs(response.data.reverse());
                (response.data)? EmptyMessageElement.classList.add("hide"):EmptyMessageElement.classList.remove("hide")
            }else{
                NotificationManager.error("Logs", response.message)
                EmptyMessageElement.classList.remove("hide")
            }

        }).catch(error=>{
            NotificationManager.error("Logs", "Server Error. Cannot access logs")
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
                        <b>{log.split("|")[0]}</b> {log.split("|")[1]}
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