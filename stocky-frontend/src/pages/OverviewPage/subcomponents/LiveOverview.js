import React, {useEffect} from 'react'
import addGraphToCanvas from '../support/addGraphToCanvas'

const DAY='1D'
const WEEK='1W'
const YEAR='1A'

const fetchPortfolioHistory= (period, canvasId,email,timeScale)=>{

    fetch(`/api/portfolio-history?email=${encodeURIComponent(email)}&period=${period}`)
        .then((res)=>res.json())
        .then(result=>{
            // console.log(result)
            if(result.success){

                    addGraphToCanvas(
                        {
                            canvasId:canvasId,
                            xValues:result.data.timestamp,
                            yValues:result.data.equity,
                            timeScale:timeScale
                        }
                    )                
            }
        }).catch(error=>{
            console.log("/api/portfolio-history - Failure"+error)
        })

}

const LiveOverview=({email,equity})=>{

    const changeView=(classIdentifer, period)=>{

        document.getElementsByClassName(`overview-options`)[0].querySelectorAll(':scope > div.overview-option').forEach(element=>{
            element.classList.remove('selected')
            document.getElementById(element.getAttribute("target-id")).classList.add("hide")

        })

        let targetElement=document.getElementsByClassName(`overview-option ${classIdentifer}`)[0]
        targetElement.classList.add("selected")
        document.getElementById(targetElement.getAttribute("target-id")).classList.remove("hide")
    }

    useEffect(()=>{
        fetchPortfolioHistory(DAY,"overview-day-graph",email,"hour" )
        fetchPortfolioHistory(WEEK,"overview-week-graph",email,"day" )
        fetchPortfolioHistory(YEAR,"overview-year-graph",email,"month" )

    },[equity])

    return(
        <div className='container live-overview'>
            <span className="container-title">Live Overview</span>
            <div className="overview-options">
                    <div target-id="overview-day-graph" className="overview-option day-overview selected" onClick={()=> changeView("day-overview",DAY)}>Day</div>
                    <div target-id="overview-week-graph" className="overview-option week-overview" onClick={()=> changeView("week-overview",WEEK)} >Week</div>
                    <div target-id="overview-year-graph" className="overview-option year-overview"onClick={()=> changeView("year-overview",YEAR)} >Yearly</div>
            </div>
            <div className="overview-graphs">
                    <canvas className="overview-graph" id="overview-day-graph"> </canvas>
                    <canvas className="overview-graph hide" id="overview-week-graph"> </canvas>
                    <canvas className="overview-graph hide" id="overview-year-graph"> </canvas>
            </div>
        </div>
    )

}

export default LiveOverview