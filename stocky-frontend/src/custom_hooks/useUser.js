import React, {useState} from 'react'


const useUser=()=>{

    const getUser=()=>{
        const userString=sessionStorage.getItem("user")
        const userObject=JSON.parse(userString)

        return  userObject;
    }

    const [user, setUser] = useState(getUser())

    const saveUser=(user)=>{

        user.name=user.name.trim().replace(/\b\w/g, l => l.toUpperCase())
        const userString=JSON.stringify(user);
        sessionStorage.setItem("user", userString);
        setUser(getUser())
    }

    const logoutUser=()=>{
        sessionStorage.removeItem("user")
        setUser(null)
    }

    return{
        user: user,
        setUser:saveUser,  
        logoutUser:logoutUser  
    }
}

export default useUser