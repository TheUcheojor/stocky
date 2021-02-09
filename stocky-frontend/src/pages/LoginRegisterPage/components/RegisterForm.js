 import React, {useState, useEffect, useRef} from 'react'

 import registerHandler from '../support/registerHandler'

 const RegisterForm=({setUser, setError})=>{
        
    const nameRef=useRef("");
    const emailRef=useRef("");
    const passwordRef=useRef("")
    const confirmPasswordRef=useRef("")




    return(
            <>
                <div className="form-group">
                        <span className="form-group-name">Name</span>
                        <input ref={nameRef} className="form-group-item" placeholder="Enter Your Name" />
                </div>

                <div className="form-group">
                        <span className="form-group-name">Email</span>
                        <input ref={emailRef} className="form-group-item" placeholder="Enter Your Email" />
                </div>

                <div className="form-group">
                        <span className="form-group-name">Password</span>
                        <input  type="password" ref={passwordRef} className="form-group-item" placeholder="Enter Your Password" />
                </div>

                <div className="form-group">
                        <span className="form-group-name">Confirm Your Password</span>
                        <input type="password" ref={confirmPasswordRef} className="form-group-item" placeholder="Re-enter Your Password" />
                </div>

                <div className="form-group">
                        <button className="action-button" onClick={ (e)=>{
                                registerHandler({
                                        e,
                                        nameRef,
                                        setError,
                                        emailRef,
                                        passwordRef,
                                        setUser,
                                        confirmPasswordRef

                                })
                        }}>Register</button>
                </div>
                
            </>

    )
 }

 export default RegisterForm