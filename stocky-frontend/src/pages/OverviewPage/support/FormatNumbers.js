
const CASH_SYMBOL="$";
const NEGATIVE_SIGN="-";

const formatNumber=(num)=>{

    if(!num) return 0;

    let numString=parseFloat(num).toFixed(2)
    let rawDecimals=(numString.split(".")[1])? numString.split(".")[1]:""
    let rawIntegers=numString.split(".")[0]

    //Check if the number is negative
    let sign="";
    if( rawIntegers.includes(NEGATIVE_SIGN) ){
        sign=NEGATIVE_SIGN
        rawIntegers=rawIntegers.split(NEGATIVE_SIGN)[1]
    }
    
    //Add commas to integers
    let formattedIntegers=""
    for(var i =0; i<rawIntegers.length; i++){
        
        if( (i+1)%3 ===0 ){
            formattedIntegers+=rawIntegers[i]+", "
        }else{
            formattedIntegers+=rawIntegers[i]
        }

    }

    formattedIntegers=(formattedIntegers[formattedIntegers.length-2]===',')?  
                            formattedIntegers.substring(0, formattedIntegers.length-2):formattedIntegers 


    return CASH_SYMBOL+(sign+formattedIntegers+'.'+rawDecimals)


}

export default formatNumber