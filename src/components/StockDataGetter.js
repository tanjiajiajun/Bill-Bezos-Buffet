import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import AnimatedStock from './AnimatedStock'
import DataFetchingSplash from '../screens/main/DataFetchingSplash'

export default function StockDataGetter({fees, stopLoss, takeProfit, D20, D50, D200}) {
  const tickerjson = require('../data/filtered_listing.json')

  const [date, setDate] = useState([])
  const [data, setData] = useState([])
  const [ticker, setTicker] = useState('')
  const [MA20, setMA20] = useState([])
  const [MA50, setMA50] = useState([])
  const [MA200, setMA200] = useState([])

  const passback = () => {
    setData([])
    setMA20([])
    setTicker(tickerjson[Math.floor(Math.random() * (tickerjson.length))]['symbol'])
  }

    useEffect( ()=> {
      setTicker(tickerjson[Math.floor(Math.random() * (tickerjson.length))]['symbol'])
      
    }, [])

    function sma(tIndex, N, array) {
      // return undefined if array is falsy, if range lookback or N exceeds array length
      if (!array || (tIndex - N) < 0 || N > array.length) return;
      const range = array.slice((tIndex - N), tIndex);
      const sum = range.reduce((acc, num) => acc += num, 0);
      return (sum / N);
  }

    useEffect( ()=> {
        const API_KEY = '648ESNV7HZIHWW1M'
        const INTERVAL = 'DAILY'
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        let MA20array = []
        let MA50array = []
        let MA200array = []

        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${API_KEY}`
        fetch(API_CALL)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                (response) => {
                for (var key in response[`Time Series (Daily)`]) {
                  stockChartXValuesFunction.push(key);
                  stockChartYValuesFunction.push(Number(response['Time Series (Daily)'][key]['4. close']));
                }
          
                setDate(stockChartXValuesFunction.reverse())
                setData(stockChartYValuesFunction.reverse())

                return stockChartYValuesFunction.reverse()
              }  
            ).then(
              (response) => {
                for (var i=0; i<response.length; i++) {
                  MA20array.push(sma(i,20,response))
                  MA50array.push(sma(i,50,response))
                  MA200array.push(sma(i,200,response))
                }
                setMA20(MA20array)
                setMA50(MA50array)
                setMA200(MA200array)
              }
            )

            return () => {
              
            }
    }, [ticker])
    


  if (MA20.length > 0) {
    return (
      <View>
        <AnimatedStock 
          datapointer={data} 
          datepointer={date} 
          tickerpointer={ticker} 
          passbackfn={passback}
          fees={fees}
          stopLoss={stopLoss}
          takeProfit={takeProfit}
          D20={D20}
          D50={D50}
          D200={D200}
          MA20={MA20}
          MA50={MA50}
          MA200={MA200}
          />
      </View>
    )
  }else {
    return (
      <DataFetchingSplash/>
    )
  }
}

