import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native'

import { Path } from 'react-native-svg'
import { AreaChart, YAxis } from 'react-native-svg-charts'




function AnimatedStock(props) {

    const data = require('../data/AAPL.json')
    const [randomint, setRandomint] = useState(0)

    useEffect( () => {
        setRandomint(Math.floor(Math.random() * (data.length - 300)))
    }, [])

    const gameArray = data.slice(randomint, randomint + 300)

    const n = gameArray[0]['Adj Close']
    
    let xData = []
    let yData = [
        n,n,n,n,n,n,n,n,n,n,
        n,n,n,n,n,n,n,n,n,n,
        n,n,n,n,n,n,n,n,n,n,
    ]

    const [count, setCount] = useState(0)
    const [yList, setyList] = useState(yData)
    const [start, setStart] = useState(false)
    


    const onpress = () => {
        setStart(prevStart => !prevStart)
    }

    // const textValue = toggle ? 'ON' : 'OFF'

    useEffect( ()=> {
        var id;
        var iv;
        if (count == 300) {
            alert('game ended')
        }
        else if (start == false) {
            console.log('havent start')
        }
        else if (start == true){
            var id = setInterval(() => setCount(prevCount => prevCount + 1),100);
            var iv = setInterval(() => setyList(prevyList => [...prevyList, gameArray[count]["Adj Close"]].slice(1)),100)
        }
        //console.log(yList) //debugging purpose
        return () => {
            clearInterval(id)
            clearInterval(iv)
            }

        }, [yList, start])
    

    const [amount, setAmount] = useState(10000)
    const [buyingPrice, setBuyingPrice] = useState(0)
    const [sellingPrice, setSellingPrice] = useState(0)
    const [noShares, setNoShares] = useState(0)

    useEffect( () => {
        console.log(`u bought at ${buyingPrice}`)
        setNoShares(Math.floor(amount/buyingPrice))
        console.log(`u bought ${Math.floor(amount/buyingPrice)} shares`)
        }, [buyingPrice]
    )

    useEffect( () => {
        console.log(`u sold at ${sellingPrice}`)
        console.log(`profit per share: ${sellingPrice-buyingPrice}`)
        console.log(`total earnings for the trade: ${(sellingPrice-buyingPrice)*noShares}`)
        setAmount(prev => prev + (sellingPrice-buyingPrice)*noShares )
        }, [sellingPrice]
    )

    const handleLongOnPressIn = () => {
        setBuyingPrice(yList[yList.length-1])
    }
    const handleLongOnPressOut = () => {
        setSellingPrice(yList[yList.length-1])
    }



    const handleShortOnPressIn = () => {
        console.log(yList[yList.length-1])
    }
    const handleShortOnPressOut = () => {
        console.log(yList[yList.length-1])
    }

    // For graphing of line
    const Line = ({ line }) => (
        <Path
            d={ line }
            stroke={ 'rgba(134, 65, 244)' }
            fill={ 'none' }
        />
    )
    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Account balance: ${amount}</Text>
        <View style={{ height: 500, flexDirection: 'row-reverse' }}>
            <YAxis
                data={yList}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{ fill: 'grey', fontSize: 10,}}
                numberOfTicks={10}
                formatLabel={(value) => `$${value}`}
            />
            <AreaChart
                style={{flex: 1}}
                data={yList}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}>
                <Line/>
            </AreaChart>
        </View>

        <TouchableOpacity style={styles.button} onPress={onpress}>
            <Text>Start</Text>
        </TouchableOpacity>

        <View style = {styles.longshotview}>
            <TouchableOpacity style={styles.long}
            onPressIn={handleLongOnPressIn} 
            onPressOut={handleLongOnPressOut}>
                <Text>Long</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.short}>
                <Text>Short</Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor:'black'
    },
    text: {
        fontSize:28,
        color:'white'

    },
    button: {
        backgroundColor: 'white',
        width: '60%',
        padding: 15,
        margin: 40,
        marginBottom:10,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        
      },
    longshotview: {
        flexDirection:'row',
        justifyContent:'center'
    },
    long: {
        backgroundColor: '#32CD32',
        width: '40%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10
    },
    short: {
        backgroundColor: '#DC143C',
        width: '40%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10
    }
    }   
)
export default AnimatedStock;
