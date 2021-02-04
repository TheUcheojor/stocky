import React, {useState, useEffect} from 'react'


const OrderHistory=({email,equity})=>{
    const [ orders, setOrders  ] = useState([])

    

    useEffect( ()=>{
        fetch(`/api/get-order-history?email=${encodeURIComponent(email)}`)
        .then(res=>res.json())
        .then(result=>{
            if(result.success) setOrders(result.data);
        }).catch(error=>{
            console.log(`error :${error}`)
        })

    },[equity])
    return (



        <div className='container order-history'> 

            <span className="container-title" >Order History</span>
            
            <div class="table-container" >

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
                            orders.map(order=>(
                                <tr>
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
            </div>
        </div>


    )

}

export default OrderHistory