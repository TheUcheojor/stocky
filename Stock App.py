import time
import pandas as pd
#import yfinance as yf
from alpha_vantage.timeseries import TimeSeries

ts = TimeSeries(key=api_key, output_format='pandas')
data, meta_data = ts.get_intraday(symbol = stockName, interval = '1min', outputsize = 'full')
#stockTicker = yf.Ticker(stockName)
#data, meta_data = stockTicker.info

timeInterval = 60
boughtStock = true        #Activates when a stock is bought, so true
methodStyle = getMethod() #user settings, AI of choice
orgStockVal = getStockVal() #Input from stock trading website
numberStocks = getStockAmount() #Input from stock trading website, how many stocks
minSellVal = getMinSellVal() #User input for original min sell value
stockName = getStockName() #user input
updatePercentNoti = getNotificationPercentage() #User input for percentage change for a notification
percentage_change = 0.0
api_key = '3BDG44KUTR81ZTQF'
#5 API requests per minute 500 per day, 1 Stock would require 390 requests, link time interval to #of stocks purchased (60/(500/(390*#differentstocksPurchased)))

def testStock():
    getStockVal()
    if boughtStock:
        if methodStyle = 1: #for increasing minimum sell value method
            if close_data <= minSellVal: #Check for selling value
                sellStock()
            elif close_data*numberStocks < orgStockVal*numberStocks + 2500: #Performs no operations if the stock is below profit making ranges
                break
            elif 0.95*getStockVal > minSellVal: #sets new minSellVal at 5% below current stock value if the stock has increased to a new highest point
                    minSellVal = 0.95*close_data
        elif methodStyle = 2:
            if abs(last_change) > updatePercentNoti:
                #perform action

def getMethod(): #Probably base this on checking variables in main settings
    if increasingMinMethod:
        return 1
    elif graphicalAnalysisMethod:
        return 2

def sellStock():
    #Stop this stocks thread and sell the stock on website

def getStockVal():
    percentage_change = close_data.pct_change()
    close_data = data['4. close']
    last_change = percentage_change[-1]

while True: #Loop
    data, meta_data = ts.get_intraday(symbol = stockName, interval = '1min', outputsize = 'full')
    testStock()
    time.sleep(timeInterval)#causes the system to wait variable interval # of seconds
