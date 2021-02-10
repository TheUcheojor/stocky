import React, {useState, useEffect} from 'react'

import logoutIcon from '../resources/logout.png'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import notificationRefeference from '../support/notificationReference'

const HorizontalBar=({name,logoutUser})=>{

    const [results, setResults] = useState([])

    const stockSearch=()=>{

        const query = document.getElementById('search-query').value;

        fetch(`/api/search?query=${encodeURIComponent(query)}`)
        .then(res=>res.json())
        .then(response=>{

            if(response.success){
                setResults(response.data)
            }else{
                Swal.fire('Search', response.message,notificationRefeference.FAILURE)
            }
        })
    }
    
    return(
    <div id='hor-bar'>
        <div className="search-bar-container">
            <input className='search-bar' id='search-query' type='text' onKeyUp={stockSearch} placeholder='Search...' />
            <ul className="search-results">
                {results.map((stockProfile,i)=>(
                
                <a className="stock-link" key={i} href={`/stocks/${stockProfile.symbol}`} >

                    <li style={{position:"relative"}} > 
                            <span className="result-item-name"> {stockProfile.name}</span> 
                            <span className="result-item-symbol"> {stockProfile.symbol}</span> 
                          
                    </li>
                </a>

                ))}
            </ul>

        </div> 
        <span className='username'>{name} </span>

        <img src={logoutIcon} id="logout" onClick={logoutUser}></img>
     </div>

)}

export default HorizontalBar