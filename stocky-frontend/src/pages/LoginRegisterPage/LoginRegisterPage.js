import React, {useState, useEffect, useRef} from 'react'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const LOGIN="login"
const REGISTER="register"

const LoginRegisterPage=({setUser})=>{

   const [error,setError] = useState()

   const [isLogin, setIsLogin] = useState(true)

    const switchForm=(targetForm)=>{
        setIsLogin( targetForm==LOGIN? true:false )

        document.querySelectorAll(".container-options .option").forEach(e=> e.classList.remove("highlight"))
        document.getElementById(targetForm).classList.add("highlight")
    }

   return(
       <>
        <div className="project-title">STOCKY</div>

        <div className="login-register-container">

                <div className="container-options">      
                    <span id={LOGIN} className="option highlight" onClick={()=>{ switchForm(LOGIN) }} >Login</span>
                    <span id={REGISTER} className="option" onClick={()=>{ switchForm(REGISTER) }} >Register</span>    
                </div>

            <form>

                {error?(
                    <div className="form-group error">
                        {error}
                    </div>

                        ):""
                }

                { isLogin? 
                        (<LoginForm setUser={setUser} setError={setError} /> ):
                        (<RegisterForm setUser={setUser} setError={setError}/> ) 
                }
                    
            </form>


        </div>
       </>
   )
}

export default LoginRegisterPage