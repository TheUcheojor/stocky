import React, {useState, useEffect} from 'react'


const OrderHistory=({email,equity})=>{
    const [ orders, setOrders  ] = useState([])

    

    useEffect( ()=>{
        const EmptyMessageElement=document.getElementsByClassName("empty-results order-history-empty")[0]

        fetch(`/api/get-order-history?email=${encodeURIComponent(email)}`)
        .then(res=>res.json())
        .then(result=>{

            if(result.success){
                setOrders(result.data);
                (result.data)? EmptyMessageElement.classList.add("hide"):EmptyMessageElement.classList.remove("hide")
                
            }else{
                EmptyMessageElement.classList.remove("hide")
            } 
        }).catch(error=>{
            console.log(`error :${error}`)
            EmptyMessageElement.classList.remove("hide")

        })

    },[equity])
    return (



        <div className='container order-history'> 

            <span className="container-title" >Order History</span>
            
            <div className="table-container" >

                <table id="order-history-table" style={{"height":"20px"}} >

                    <tbody>
                        <tr>
                            <th>Stock</th>
                            <th>Order</th>
                            <th>Shares</th>
                            <th>Price Per Place</th>
                            <th>Status</th>
                        </tr>


                        {
                            orders.map((order,i)=>(
                                <tr key={i}> 
                                    <td>{order.symbol}</td>
                                    <td>
                                        {order.order_type.replace(/^\w/, (c) => c.toUpperCase())} {order.type.toUpperCase()}
                                        <br />
                                        
                                        <span style={{fontSize:"10px"}}>
                                            { order.transaction_time.split('T')[0]} - { order.transaction_time.split('T')[1]}
                                        </span>
                                        
                                    
                                    
                                    </td>
                                    <td>{order.quantity}</td>
                                    <td>${order.price}</td>
                                    <td>{order.status.replace(/^\w/, (c) => c.toUpperCase())}</td>


                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                <div className="empty-results order-history-empty hide">
                    No Order History To Display
                </div>
            </div>
        </div>


    )

}

export default OrderHistory