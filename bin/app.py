import sys,time,json
from yahoo_finance_api2 import share
from yahoo_finance_api2.exceptions import YahooFinanceError

# from yahoo_finance import Share #Depreacated BAD :{

#Resources
    #https://pypi.org/project/yahoo-finance-api2/

#Connects well:
#For example, try NBR




#import pandas as pd
#import yfinance as yf
#from alpha_vantage.timeseries import TimeSeries

#ts = TimeSeries(key=api_key, output_format='pandas')
#data, meta_data = ts.get_intraday(symbol = stockName, interval = '1min', outputsize = 'full')
#stockTicker = yf.Ticker(stockName)
#data, meta_data = stockTicker.info

timeInterval = 60
#boughtStock = True       #Activates when a stock is bought, so true
methodStyle = 1 #getMethod() #user settings, AI of choice
orgStockVal = 0
numberStocks = 0
minSellVal = 0.0
totalEarnings = 0.0
#orgStockVal = getStockVal() #Input from stock trading website
#numberStocks = getStockAmount() #Input from stock trading website, how many stocks
#minSellVal = getMinSellVal() #User input for original min sell value
# stockName = getStockName() #user input
# updatePercentNoti = getNotificationPercentage() #User input for percentage change for a notification
# myShare = Share(stockName)
# percentage_change = 0.0
#api_key = '3BDG44KUTR81ZTQF'
#5 API requests per minute 500 per day, 1 Stock would require 390 requests, link time interval to #of stocks purchased (60/(500/(390*#differentstocksPurchased)))


def mainInterface():

    try:
        print('Main Interface - Set up preferences \n')
        stockName=input("Please enter your stock name: ").upper()
        numberStocks=int(input("Please enter total shares purchased: "))
        methodStyle=int(input("Please enter your method style:\n\t 1 - increasingMinMethod\n\t 2 - graphicalAnalysisMethod\n Your method: "))
        isAutomated=input("Would you like full automation? (y/n): ")
        isAutomated=True if isAutomated=='y' else False
        minSellVal=float(input("Please enter your minimum limit: "))
        confrimContinuation=input("Would you like to continue? (y/n): ")

        if(confrimContinuation!='n'):
            # yahoo = Share('YHOO')
            # To improve vode readability, it may be best that we convert  methodStyle 1 and 2 back
            # to their corresponding string representation
            methodStyleIntToString={1:'increasingMinMethod', 2:'graphicalAnalysisMethod'}
            initiateAI({
                        'stockName':stockName,
                        'methodStyle':methodStyleIntToString[methodStyle],
                        'isAutomated':isAutomated,
                        'minSellVal':minSellVal,
                        'numberStocks':numberStocks
                        })

    except Exception as err:
        print("\n Error:")
        print(err) #Google for error detection analys
        # print("\nError - Incorrect input")
        mainInterface()






#for increasing minimum sell value method
def increasingMinMethod(stock,isAutomated): #Remove from testStock to increasingMinMethod
    # getStockVal()
    stockInfo=getStockInfo(stock)
    stockPrice = stockInfo['close'][0]
    numberStocks=stock['stockNumber']
    minSellVal=stock['minSellVal']
    print("\n")
    print(stockInfo)
    print(stockPrice)
    print("minSellVal: "+ str(minSellVal) )

    if numberStocks > 0:
        if stockPrice <= minSellVal: #Check for selling value
            if(isAutomated):
                #sellStock()

                numberStocks = 0

                print(" Automated - Perform Action")
            else:
                print(" Not Automated - Perform Action")
        elif stockPrice*numberStocks < orgStockVal*numberStocks + 2500: #Performs no operations if the stock is below profit making ranges
            pass
        elif 0.95*stockPrice > minSellVal: #sets new minSellVal at 5% below current stock value if the stock has increased to a new highest point
            minSellVal = 0.95*stockPrice

            print("new min sell limit: " + str(minSellVal))

    totalEarnings = numberStocks*stockPrice - numberStocks*orgStockVal


def graphicalAnalysisMethod(stock):

    if abs(last_change) > updatePercentNoti:
        pass
    pass


def getMethod(): #Probably base this on checking variables in main settings - Probably not needed for now
    if increasingMinMethod:
        return 1
    elif graphicalAnalysisMethod:
        return 2

def sellStock():
    pass
    #Stop this stocks thread and sell the stock on website

def getStockVal():
    return myShare.get_price()
    #percentage_change = close_data.pct_change()
    #close_data = data['4. close']
    #last_change = percentage_change[-1]

def getStockInfo(stock):


    print("Stock: "+json.dumps(stock))

    try:
            apistock= share.Share(stock['name'])

            # print (apistock.get_price_sales())
            return apistock.get_historical(share.PERIOD_TYPE_DAY,1,
                                          share.FREQUENCY_TYPE_MONTH,1)
    except YahooFinanceError as e:
        print(e.message)
        sys.exit(1)


def initiateAI(params):

    orgStockVal = getStockInfo({'name':params['stockName']})['close'][0]

    while True: #Loop
        #data, meta_data = ts.get_intraday(symbol = stockName, interval = '1min', outputsize = 'full')
        if(params['methodStyle']=='increasingMinMethod'):
            increasingMinMethod({
                                    'name':params['stockName'],
                                    'stockNumber':params['numberStocks'],
                                    'minSellVal':params['minSellVal'],
                                },
                                params['isAutomated'] )

        if(params['methodStyle']=='graphicalAnalysisMethod'):
            graphicalAnalysisMethod({'name':params['stockName']},params['isAutomated'])


        print("Refreshing in 60s")
        print("Total Earnings: " + str(totalEarnings))
        time.sleep(timeInterval)#causes the system to wait variable interval # of seconds




# Main Areo
mainInterface()
