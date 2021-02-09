import Alpaca from '@alpacahq/alpaca-trade-api'

const connectToAlpaca=(user)=>{

    const userStockyConfig={
        keyId:user.alpaca.apiKey,
        secretKey:user.alpaca.secretKey,
        paper:true
    }

    return new Alpaca(userStockyConfig)

}

export default connectToAlpaca