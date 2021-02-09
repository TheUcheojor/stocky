import React, {useState} from 'react'


const useUser=()=>{

    const getUser=()=>{
        const userString=sessionStorage.getItem("user")
        const userObject=JSON.parse(userString)

        return  userObject;
    }

    const [user, setUser] = useState(getUser())

    const saveUser=(user)=>{
        const userString=JSON.stringify(user);
        sessionStorage.setItem("user", userString);
        setUser(getUser())
    }

    return{
        user: user,
        setUser:saveUser    
    }
}

export default useUser