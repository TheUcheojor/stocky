

config=require('../setup/config');
const Alpaca = require('@alpacahq/alpaca-trade-api');

let LongShort=require('./strategies/long-short')
let MeanReversion=require('./strategies/mean-reversion')
// console.log(config);

// const alpaca = new Alpaca({
//   keyId: config.apiKey,
//   secretKey: config.secretKey,
//   paper: true,
//   usePolygon: false
// })
//
// alpaca.getAccount().then((account) => {
//   console.log('Current Account:', account)
// });

USE_POLYGON=false


class Alpaca_Client {

  constructor({keyId, secretKey, paper = true}){

      //Creating Alpaca Instance
      const alpaca = new Alpaca({
          keyId:config.apiKey,
          secretKey:config.secretKey,
          paper:paper,
          usePolygon:false
      });

      // console.log(alpaca);

      const client=alpaca.data_ws;

      client.onConnect(function() {
              log("Connected")
              client.subscribe(['alpacadatav1/T.FB', 'Q.AAPL', 'A.FB', 'AM.AAPL'])
      })

      client.onDisconnect(() => {
        log("Disconnected")
      })
      client.onStateChange(newState => {
        log(`State changed to ${newState}`)
      })
      client.onStockTrades(function(subject, data) {
        log(`Stock trades: ${subject}, price: ${data.price}`)
      })
      client.onStockQuotes(function(subject, data) {
        log(`Stock quotes: ${subject}, bid: ${data.bidprice}, ask: ${data.askprice}`)
      })
      client.onStockAggSec(function(subject, data) {
        log(`Stock agg sec: ${subject}, ${data}`)
      })
      client.onStockAggMin(function(subject, data) {
        log(`Stock agg min: ${subject}, ${data}`)
      })
      client.connect()

      // let ls = new LongShort({
      //   keyId:config.apiKey,
      //   secretKey:config.secretKey,
      //   paper: true
      // })
      //
      // ls.run()

      let mr = new MeanReversion(
        config.apiKey,
        config.secretKey,
        true
      )

      mr.run()

  }


}

function log(text){
  console.log(text);
}


let client =new  Alpaca_Client({
  keyId: config.apiKey,
  secretKey: config.secretKey,
  paper: true

})
