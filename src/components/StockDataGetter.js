import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import AnimatedStock from './AnimatedStock'
import DataFetchingSplash from '../screens/main/DataFetchingSplash'

export default function StockDataGetter({fees, stopLoss, takeProfit}) {
  const tickerjson = require('../data/filtered_listing.json')

  const [date, setDate] = useState([])
  const [data, setData] = useState([])
  const [ticker, setTicker] = useState('')

  const passback = () => {
    setData([])
    setTicker(tickerjson[Math.floor(Math.random() * (tickerjson.length))]['symbol'])
  }

    useEffect( ()=> {
      setTicker(tickerjson[Math.floor(Math.random() * (tickerjson.length))]['symbol'])
      
    }, [])


    useEffect( ()=> {
        const API_KEY = '648ESNV7HZIHWW1M'
        const INTERVAL = 'DAILY'
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

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
                  stockChartYValuesFunction.push(response['Time Series (Daily)'][key]['4. close']);
                }
          
                setDate(stockChartXValuesFunction.reverse())
                setData(stockChartYValuesFunction.reverse())
              }  
            )

            return () => {
              
            }
    }, [ticker])
    


  if (data.length > 0) {
    return (
      <View>
        <AnimatedStock 
          datapointer={data} 
          datepointer={date} 
          tickerpointer={ticker} 
          passbackfn={passback}
          fees={fees}
          stopLoss={stopLoss}
          takeProfit={takeProfit}/>
      </View>
    )
  }else {
    return (
      <DataFetchingSplash/>
    )
  }
}

