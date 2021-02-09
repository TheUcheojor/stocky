 import React, {useState, useEffect, useRef} from 'react'
import loginHandler from '../support/loginHandler'

 const LoginForm=({setUser, setError})=>{

    const emailRef=useRef("")
    const passwordRef=useRef("")

    useEffect(()=>{
        emailRef.current.focus()
    },[])

    return(
            <>
                <div className="form-group">
                        <span className="form-group-name">Email</span>
                        <input ref={emailRef} className="form-group-item" placeholder="Enter Your Email" />
                </div>

                <div className="form-group">
                        <span className="form-group-name">Password</span>
                        <input type="password" ref={passwordRef} className="form-group-item" placeholder="Enter Your Password" />
                </div>

                <div className="form-group">
                        <button className="action-button" onClick={(e)=>loginHandler({
                            e,
                            setUser,
                            emailRef,
                            passwordRef,
                            setError})}>Login</button>
                </div>
                
            </>


    )
 }

 export default LoginForm