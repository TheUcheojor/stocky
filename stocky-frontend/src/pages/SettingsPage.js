import React from 'react'


const SettingsPage=()=>{

    const savePassword=()=>{

        let currentPassword = document.getElementById('current-password').value
        let newPassword=document.getElementById('new-password').value
    }
    
    return (
        <div className='content settings'> 
            <div className="container settings-item change-password">
                <div className="container-title">
                    Change Your Password
                </div>

                <span className="setting-container-item" >Your Current Password</span>
                <input type="text" className="setting-container-item-input" id="current-password" ></input>

                <span className="setting-container-item">Your New Pasword</span>
                <input type="text" className="setting-container-item-input" id="new-password" ></input>

                <span className="setting-container-item">Confirm Your New Pasword</span>
                <input type="text" className="setting-container-item-input" id="new-password-confirm" ></input>
                
                <button id="save-password-button" >Save Password</button>
            </div>

            <div className="container settings-item change-password">
                <div className="container-title">
                    Strategy Options
                </div>

                <span className="setting-container-item" >Select Your Strategy</span>
                <select type="text" className="setting-container-item-select" id="select-strategy" >
                    <option value="LONG_SHORT">Long Short</option>
                    <option value="MEAN_REVERSION">Mean Reversion</option>
                </select>

                <span className="setting-container-item" > Select Stocks To Trade</span>
                <select type="text" className="setting-container-item-select" id="select-stock-collection"  multiple='multiple'
                    defaultValue={["APPL","SNAP","NFMT" ]}
                >
                    <option value="APPL">APPL - Apple</option>
                    <option value="SNAP" >SNAP - Snap</option>
                    <option value="GOOG" >GOOG - Google</option>
                    <option value="TSLA" >TSLA - Tesla</option>
                    <option value="NFMT" >NFMT - Nascar</option>

                </select>

                
                <button id="save-password-button" >Save Trading Stocks</button>
            </div>
        </div>
    )
}

export default SettingsPage