import React, {useState, useEffect} from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications';

import logoutIcon from '../resources/logout.png'


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
                NotificationManager.error(response.message)
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