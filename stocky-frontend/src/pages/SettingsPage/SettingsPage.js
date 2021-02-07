import React from 'react'
import PasswordSettings from './components/PasswordSettings'
import StrategySetttings from './components/StrategySettings'



const SettingsPage=({email})=>{

    
    
    return (
        <div className='content settings'> 

            <PasswordSettings email={email}/>
            <StrategySetttings email={email} />
            
        </div>
    )
}

export default SettingsPage