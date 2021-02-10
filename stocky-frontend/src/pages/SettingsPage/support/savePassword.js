
import Swal from 'sweetalert2/dist/sweetalert2.js'
import notificationRefeference from '../../../support/notificationReference'


const NEW_PASSWORD_MATCHING_ERROR="You new password does not match"

const savePassword=(email)=>{

    let currentPassword = document.getElementById('current-password').value
    let newPassword=document.getElementById('new-password').value
    let confirmNewPassword=document.getElementById('new-password-confirm').value

    if(newPassword!==confirmNewPassword){
        Swal.fire("Password Setting", NEW_PASSWORD_MATCHING_ERROR, notificationRefeference.FAILURE)
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
            Swal.fire("Password Settings", "Your password has been updated",notificationRefeference.SUCCESS)
        }else{
            Swal.fire("Password Settings", result.message,notificationRefeference.FAILURE)
        }
    }).catch(error=>{
        Swal.fire("Password Settings", "Cannout change your password".notificationRefeference.FAILURE)

    })

}

export default savePassword;