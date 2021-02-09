import handleEmptyInputs from './handleEmptyInputs'

 const loginHandler=({e, emailRef,passwordRef,setUser, setError})=>{

    e.preventDefault()

    if( handleEmptyInputs([emailRef,passwordRef]) ) return;

    const requestParams={
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            email:emailRef.current.value.toLowerCase().trim(),
            password:passwordRef.current.value
        })
    }

    fetch('/users/login',requestParams)
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

export default loginHandler