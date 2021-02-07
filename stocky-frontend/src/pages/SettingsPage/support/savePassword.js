
import {NotificationContainer, NotificationManager} from 'react-notifications';


const NEW_PASSWORD_MATCHING_ERROR="You new password does not match"

const savePassword=(email)=>{

    let currentPassword = document.getElementById('current-password').value
    let newPassword=document.getElementById('new-password').value
    let confirmNewPassword=document.getElementById('new-password-confirm').value

    if(newPassword!==confirmNewPassword){
        NotificationManager.error("Password Setting", NEW_PASSWORD_MATCHING_ERROR)
        return;
    }

    const requestParams={
        method:'POST',
        headers:{ 'Content-Type':'application/json'},
        body:JSON.stringify({
            email:email,
            oldPassword:currentPassword,
            newPassword:newPassword,
        })
    }

    fetch('/settings/set-password',requestParams)
    .then(res=>res.json())
    .then( result=>{

        if(result.success){
            NotificationManager.success("Password Settings", "Your password has been updated")
        }else{
            NotificationManager.error("Password Settings", result.message)
        }
    }).catch(error=>{
        NotificationManager.error("Password Settings", "Cannout change your password")

    })

}

export default savePassword;