
const handleEmptyInputs=(references)=>{
    
    let returnFlag=false
    references.forEach(ref=>{
        if(!ref.current.value.trim()){
            ref.current.classList.add("error")
            returnFlag=true;
        }else{
            ref.current.classList.remove("error")
        }
    })
    
    return returnFlag
}

export default handleEmptyInputs