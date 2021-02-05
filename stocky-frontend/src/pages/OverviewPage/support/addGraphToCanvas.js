import Chart from 'chart.js';


const addGraphToCanvas=({canvasId, xValues, yValues, timeScale})=>{

    const canvas=document.getElementById(canvasId)

    let newChart=new Chart(canvas, {
        type:"line",
        data:{

            labels: xValues.map((xVal,i)=>new Date(xVal*1000).toLocaleString()), 
            datasets:[{
                fill: true,
                data:yValues,
                backgroundColor: "rgba(0,0,0,0.2)",
                borderColor: "rgba(0,0,0,1)"

            }],

        },
        options: {
            maintainAspectRatio: false,
            responsive:true,
            legend: {
                display: false
            },
            scales: {
                
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                          return value.toLocaleString("en-US",{style:"currency", currency:"USD"});
                        }
                      }
                }],
                xAxes: [{
                    type: 'time',
                    distribution: 'linear',
                    time:{
                         unit:timeScale
                    },

                }]
            },
            elements: {
                point:{
                    radius: 0
                }
            }
        }
    })

}


export default addGraphToCanvas