import handleEmptyInputs from './handleEmptyInputs'

const PASSWORDS_NOT_MATCHING_ERROR="Passwords do not match"
const NAME_LENGTH_ERROR="Name must between 3 to 20 characters"
const INVALID_EMAIL_ERROR="Enter a valid email"

const NAME_SPEFICATION={
    MAX:25,
    MIN:3,
}

const validateEmail=(email)=> {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
 

const registerHandler=({e,emailRef,nameRef, passwordRef, confirmPasswordRef ,setUser, setError})=>{

    e.preventDefault();

    if( handleEmptyInputs([emailRef,nameRef, passwordRef, confirmPasswordRef]) ) return;

    if(passwordRef.current.value!==confirmPasswordRef.current.value){
        setError(PASSWORDS_NOT_MATCHING_ERROR);
        return;
    }

    if(nameRef.current.value.trim().length>NAME_SPEFICATION.MAX || nameRef.current.value.trim().length<NAME_SPEFICATION.MIN){
        setError(NAME_LENGTH_ERROR)
        return;
    }

    if( !validateEmail(emailRef.current.value)){
        setError(INVALID_EMAIL_ERROR)
        return;
    }

    const requestParams={
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            name:nameRef.current.value.toLowerCase().trim(),
            email:emailRef.current.value.toLowerCase().trim(),
            password:passwordRef.current.value
        })
    }

    fetch('/users/register',requestParams)
    .then( res=>res.json() )
    .then(response=>{
        
        if(response.success){
            setError("")
            setUser(response.data);
        }else{
            setError(response.message)
        }
    }).catch(error=>{
        setError(`${error}`)
    })

}

export default registerHandler