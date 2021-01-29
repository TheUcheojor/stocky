
import Alpaca from '@alpacahq/alpaca-trade-api'
import keys from '../../config/setup'


const PAPER=true

class MeanReversion {

  constructor({apiKey, secretKey, stocks}){
    // this.Alpaca = require('@alpacahq/alpaca-trade-api');

    // console.log(API_KEY, API_SECRET, stocks)

    this.alpaca = new Alpaca({
      keyId: apiKey,
      secretKey: secretKey,
      paper: PAPER
    });

    this.keyId=apiKey;
    this.secretKey=secretKey;

    this.stocks=stocks
    this.runningAverages = {};
    this.lastOrders = {};

    //Initialize each stock's running average to zero
    this.stocks.forEach((stock)=>{
        this.runningAverages[stock]=0
        this.lastOrders[stock]=null
    })

    
    // this.timeToClose = null;
    
    // Stock that the algo will trade.

    // this.stock = "AAPL";
        
  }
  
  getStrategyName(){
    return "MEAN_REVERSION"
  }

  getAuthentication(){
    return {
      apiKey:this.keyId,
      secretKey:this.secretKey
    }
  }

  async run(){
    // First, cancel any existing orders so they don't impact our buying power.
    var orders;
    await this.alpaca.getOrders({
      status:'all',
      direction:'asc'
    }).then((resp) => {
      orders = resp;
    }).catch((err) => {console.log(err.error);})

    orders.forEach(async (order) => {//Cancel All Orders
      this.alpaca.cancelOrder(order.id).catch((err) => {console.log(err.error);});
    });

    // Wait for market to open.
    console.log("Waiting for market to open...");
    var promMarket = this.awaitMarketOpen();
    await promMarket;
    console.log("Market opened.");

    for (var i=0;i<this.stocks.length;i++){
        runStategyOnStock(this.stocks[i])
    }
    

  }


   async runStategyOnStock(stock){


     // Get the running average of prices of the last 20 minutes, waiting until we have 20 bars from market open.
    var promBars = new Promise((resolve, reject) => {

        var barChecker = setInterval(async () => {
          await this.alpaca.getCalendar(Date.now()).then(async (resp) => {
            var marketOpen = resp[0].open;
            await this.alpaca.getBars('minute', stock, {start: marketOpen}).then((resp) => {
              var bars = resp[stock];
              if(bars.length >= 20) {
                clearInterval(barChecker);
                resolve();
              }
            }).catch((err) => {console.log(err.error);});
          });
        }, 60000);

    });

    console.log(`Waiting for 20 bars for ${stock} ....`);
    await promBars;
    console.log(`We have 20 bars for ${stock}.`);


    // Rebalance our portfolio every minute based off running average data.
    var spin = setInterval(async () => {

    // Clear the last order so that we only have 1 hanging order.
        if(this.lastOrders[stock] != null) await this.alpaca.cancelOrder(this.lastOrders[stock].id).catch((err) => {console.log(err.error);});
  
        // Figure out when the market will close so we can prepare to sell beforehand.
        var closingTime;
        var currTime;
        var timeToClose;

        await this.alpaca.getClock().then((resp) =>{

          closingTime = new Date(resp.next_close.substring(0, resp.next_close.length - 6));
          currTime = new Date(resp.timestamp.substring(0, resp.timestamp.length - 6));

        }).catch((err) => {console.log(err.error);});
        
        timeToClose = closingTime - currTime;
  
        if(timeToClose < (60000 * 15)) {

          // Close all positions when 15 minutes til market close.
          console.log(`Market closing soon.  Closing positions for ${stock}`);

          try{
            await this.alpaca.getPosition(stock).then(async (resp) => {
              var positionQuantity = resp.qty;
              var promOrder = this.submitMarketOrder(positionQuantity, stock, "sell");
              await promOrder;
            }).catch((err) => {console.log(err.error);});
          } catch(err){/*console.log(err.error);*/}

          clearInterval(spin);

        //   console.log("Sleeping until market close (15 minutes).");


        //   setTimeout( () => {
        //     // Run script again after market close for next trading day.

        //     this.run();

            
        //   }, 60000*15);

        }
        else {
          // Rebalance the portfolio.
          await this.rebalance(stock);
        }
    }, 60000);

   }




  // Spin until the market is open
  awaitMarketOpen(){
    var prom = new Promise((resolve, reject) => {
      var isOpen = false;
      var marketChecker = setInterval(async ()=>{
        await this.alpaca.getClock().then(async (resp) => {
          isOpen = resp.is_open;
          if(isOpen) {
            clearInterval(marketChecker);
            resolve();
          } else {
            var openTime, currTime;
            await this.alpaca.getClock().then((resp) =>{
              openTime = new Date(resp.next_open.substring(0, resp.next_close.length - 6));
              currTime = new Date(resp.timestamp.substring(0, resp.timestamp.length - 6));
            }).then(() => {
              this.timeToClose = Math.floor((openTime - currTime) / 1000 / 60);
            }).catch((err) => {console.log(err.error);});
            console.log(this.timeToClose + " minutes til next market open.")
          }
        }).catch((err) => {console.log(err.error);});
      }, 60000);
    });
    return prom;
  }

  // Rebalance our position after an update.
  async rebalance(stock){
    var positionQuantity = 0;
    var positionValue = 0;

    // Get our position, if any.
    try{
      await this.alpaca.getPosition(stock).then((resp) => {
        positionQuantity = resp.qty;
        positionValue = resp.market_value;
      });
    } catch (err){/*console.log(err.error);*/}

    // Get the new updated price and running average.
    var bars;
    await this.alpaca.getBars('minute', stock,{limit: 20}).then((resp) => {

      bars = resp[stock];

    }).catch((err) => {console.log(err.error);});

    var currPrice = bars[bars.length - 1].closePrice;
    this.runningAverages[stock] = 0;

    bars.forEach((bar) => {
      this.runningAverages[stock] += bar.closePrice;
    })

    this.runningAverages[stock] /= 20;

    if(currPrice > this.runningAverages[stock]){
      // Sell our position if the price is above the running average, if any.
      if(positionQuantity > 0){
        console.log("Setting position to zero.");
        await this.submitLimitOrder(positionQuantity, stock, currPrice, 'sell');
      }
      else console.log("No position in the stock.  No action required.");
    }
    else if(currPrice < this.runningAverages[stock]){
      // Determine optimal amount of shares based on portfolio and market data.
      var portfolioValue;
      var buyingPower;
      await this.alpaca.getAccount().then((resp) => {
        portfolioValue = resp.portfolio_value;
        buyingPower = resp.buying_power;
      }).catch((err) => {console.log(err.error);});
      var portfolioShare = (this.runningAverages[stock] - currPrice) / currPrice * 200;
      var targetPositionValue = portfolioValue * portfolioShare;
      var amountToAdd = targetPositionValue - positionValue;

      // Add to our position, constrained by our buying power; or, sell down to optimal amount of shares.
      if(amountToAdd > 0){
        if(amountToAdd > buyingPower) amountToAdd = buyingPower;
        var qtyToBuy = Math.floor(amountToAdd / currPrice);
        await this.submitLimitOrder(qtyToBuy, stock, currPrice, 'buy');
      }
      else{
        amountToAdd *= -1;
        var qtyToSell = Math.floor(amountToAdd / currPrice);
        if(qtyToSell > positionQuantity) qtyToSell = positionQuantity;
        await this.submitLimitOrder(qtyToSell, stock, currPrice, 'sell');
      }
    }
  }

  // Submit a limit order if quantity is above 0.
  async submitLimitOrder(quantity, stock, price, side){
    if(quantity > 0){
      await this.alpaca.createOrder({
        symbol: stock,
        qty: quantity,
        side: side,
        type: 'limit',
        time_in_force: 'day',
        limit_price: price
      }).then((resp) => {
        this.lastOrders[stock] = resp;
        console.log("Limit order of |" + quantity + " " + stock + " " + side + "| sent.");
      }).catch((err) => {
        console.log("Order of |" + quantity + " " + stock + " " + side + "| did not go through.");
      });
    }
    else {
      console.log("Quantity is <=0, order of |" + quantity + " " + stock + " " + side + "| not sent.");
    }
  }

  // Submit a market order if quantity is above 0.
  async submitMarketOrder(quantity, stock, side){
    if(quantity > 0){
      await this.alpaca.createOrder({
        symbol: stock,
        qty: quantity,
        side: side,
        type: 'market',
        time_in_force: 'day'
      }).then((resp) => {
        this.lastOrders[stock] = resp;
        console.log("Market order of |" + quantity + " " + stock + " " + side + "| completed.");
      }).catch((err) => {
        console.log("Order of |" + quantity + " " + stock + " " + side + "| did not go through.");
      });
    }
    else {
      console.log("Quantity is <=0, order of |" + quantity + " " + stock + " " + side + "| not sent.");
    }
  }
}


MeanReversion.instances=[];
MeanReversion.create=function(user){
    let meanReversionClass=new MeanReversion(user.alpaca);
    MeanReversion.instances.push(meanReversionClass);
    return meanReversionClass;
}

MeanReversion.remove=function(user){

  MeanReversion.instances= MeanReversion.instances.filter((meanReversionInstance)=>{
      
    const instanceAuthentication=meanReversionInstance.getAuthentication()
    const userAuthentication=user.alpaca

    if(instanceAuthentication.apiKey==userAuthentication.apiKey &&
      instanceAuthentication.secretKey==userAuthentication.secretKey){

        console.log(`\nRemoving currently-running strategy (${meanReversionInstance.getStrategyName()}) of ${user.email}`)
    }

    return instanceAuthentication.apiKey!=userAuthentication.apiKey &&
      instanceAuthentication.secretKey!=userAuthentication.secretKey    
  })

}

export default MeanReversion;


// // Run the mean reversion class.
// var MR = new MeanReversion(API_KEY, API_SECRET, PAPER);
// MR.run();
