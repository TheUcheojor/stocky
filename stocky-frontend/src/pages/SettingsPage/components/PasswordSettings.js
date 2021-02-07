import React from 'react'
import savePassword from '../support/savePassword'

const PasswordSettings=({email})=>(

    <div className="container settings-item change-password">
                <div className="container-title">
                    Change Your Password
                </div>

                <span className="setting-container-item" >Your Current Password</span>
                <input type="password" className="setting-container-item-input" id="current-password" ></input>

                <span className="setting-container-item">Your New Pasword</span>
                <input type="password" className="setting-container-item-input" id="new-password" ></input>

                <span className="setting-container-item">Confirm Your New Pasword</span>
                <input type="password" className="setting-container-item-input" id="new-password-confirm" ></input>
                
                <button id="settings-save-button"  onClick={()=>savePassword(email)}>Save Password</button>
    </div>


)

export default PasswordSettings;