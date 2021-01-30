import Alpaca from '@alpacahq/alpaca-trade-api'

const connectToAlpaca=(user)=>{

    // console.log(`\n connectToAlpaca - user: ${JSON.stringify(user)}`)
    const userStockyConfig={
        keyId:user.alpaca.apiKey,
        secretKey:user.alpaca.secretKey,
        paper:true
    }

    return new Alpaca(userStockyConfig)

}

export default connectToAlpaca