
const CASH_SYMBOL="$";
const NEGATIVE_SIGN="-";

const formatNumber=(num)=>{

    if(!num) return num;

    let numString=JSON.stringify(num)

    let rawDecimals=(numString.split(".")[1])? numString.split(".")[1]:""
    let rawIntegers=numString.split(".")[0]

    let sign="";
    if( rawIntegers.includes(NEGATIVE_SIGN) ){
        sign=NEGATIVE_SIGN
        rawIntegers=rawIntegers.split(NEGATIVE_SIGN)[1]
    }
    
    let formattedIntegers=""

    for(var i =0; i<rawIntegers.length; i++){
        if( (i+1)%3==0 ){
            formattedIntegers+=rawIntegers[i]+", "
        }else{
            formattedIntegers+=rawIntegers[i]
        }
    }

    return CASH_SYMBOL+(sign+formattedIntegers+rawDecimals).slice(1, -1)


}

export default formatNumber