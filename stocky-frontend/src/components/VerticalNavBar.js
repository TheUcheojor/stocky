import React from 'react'
import { Link } from 'react-router-dom'
import showMobileNavigationMenu from '../support/showMobileNavigationMenu';



const VerticalNavBar = ()=>(
    <>
        <nav id='vert-bar' >
            <Link to='/'> Overview</Link>
            <Link to='/strategy-console'>Strategy Console</Link>
            <Link to='/settings'> Settings </Link>
            <Link to='/about'> About </Link>
        </nav>

        <nav id='vert-bar-mobile' onClick={showMobileNavigationMenu}>
            <Link to='/'> Overview</Link>
            <Link to='/strategy-console'>Strategy Console</Link>
            <Link to='/settings'> Settings </Link>
            <Link to='/about'> About </Link>
        </nav>

    </>


)

export default VerticalNavBar;