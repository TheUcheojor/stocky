import React from 'react'
import { Link } from 'react-router-dom'

const VerticalNavBar = ()=>(
    
    <nav id='vert-bar'>
        <Link to='/'> Overview</Link>
        <Link to='/settings'> Settings </Link>
        <Link to='/about'> About </Link>

    </nav>


)

export default VerticalNavBar;