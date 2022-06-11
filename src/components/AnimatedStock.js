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
    
    const [count, setCount] = useState(0)
    const [yList, setyList] = useState([])
    const [start, setStart] = useState(false)
    const [startButtonDisable, setStartButtonDisable] = useState(false)
    const [holdChecker, setHoldChecker] = useState(false)
    const [amount, setAmount] = useState(10000)
    const [buyingPrice, setBuyingPrice] = useState(0)
    const [sellingPrice, setSellingPrice] = useState(0)
    const [noShares, setNoShares] = useState(0)


    const startButtonOnPress = () => {
        setStart(prevStart => !prevStart)
        setAmount(10000)
        if (count < 300) {
            setStartButtonDisable(true)
        }
    }

    useEffect( ()=> {
        var id;
        var iv;
        // when game ends
        if (count >= 300) {
            if (holdChecker == true) {
                handleLongOnPressOut()
            }
            alert(`game ended, you have a ${(Math.round((amount-10000)/100))}% return in your investment!`)
            gameEnd()
        }
        //check if start button is pressed
        else if (start == false) {
            console.log('havent start')
        }

        else if (start == true){
            if (yList.length <= 50) {
                var id = setInterval(() => setCount(prevCount => prevCount + 1),100);
                var iv = setInterval(() => setyList(prevyList => [...prevyList, gameArray[count]["Adj Close"]],100))
            } else {
                var id = setInterval(() => setCount(prevCount => prevCount + 1),100);
                var iv = setInterval(() => setyList(prevyList => [...prevyList, gameArray[count]["Adj Close"]].slice(1)),100)
            }
        }
        //console.log(yList) //debugging purpose
        return () => {
            clearInterval(id)
            clearInterval(iv)
            }

        }, [yList, start])

    useEffect( () => {
        console.log(`u bought at ${buyingPrice}`)
        setNoShares(Math.floor(amount/buyingPrice))
        console.log(`u bought ${Math.floor(amount/buyingPrice)} shares`)
        }, [buyingPrice]
    )

    useEffect( () => {
        if (sellingPrice == undefined) {
            //pass
            } else {
            console.log(`u sold at ${sellingPrice}`)
            console.log(`profit per share: ${sellingPrice-buyingPrice}`)
            console.log(`total earnings for the trade: ${(sellingPrice-buyingPrice)*noShares}`)
            setAmount(prev => prev + (sellingPrice-buyingPrice)*noShares )
            }

        }, [sellingPrice]
    )



    const handleLongOnPressIn = () => {
        setBuyingPrice(yList[yList.length-1])
        setHoldChecker(true)
    }

    const handleLongOnPressOut = () => {
        setSellingPrice(yList[yList.length-1])
        setHoldChecker(false)
       
    }

    const gameEnd = () => {
        setCount(0)
        setStart(false)
        setRandomint(Math.floor(Math.random() * (data.length - 300)))
        setyList([])
        setStartButtonDisable(false)
    }


    const handleShortOnPressIn = () => {
        console.log(yList[yList.length-1])
    }
    const handleShortOnPressOut = () => {
        console.log(yList[yList.length-1])
    }
    const startButtonText = () => {
        if (start == false) {
            return 'Start'
        } else {
            return `${(300 - count)/10}s left!`
        }
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

        <Text style={styles.text}>Account balance: ${amount.toFixed(3)}</Text>
        <View style={styles.line}/>
        <View style={{ height: 400, flexDirection: 'row-reverse' }}>
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
        <View style={styles.line}/>
        <TouchableOpacity 
        style={[start == false ? styles.button : styles.disabledbutton]} 
        onPress={startButtonOnPress} 
        disabled={startButtonDisable}>
            <Text style={styles.buttontext}>{startButtonText()}</Text>
        </TouchableOpacity>

        <View style = {styles.longshotview}>
            <TouchableOpacity style={[start == true ? styles.long : styles.disabledlong]}
            onPressIn={handleLongOnPressIn} 
            onPressOut={handleLongOnPressOut}
            disabled={!startButtonDisable}>
                <Text>Long</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {[start == true ? styles.short : styles.disabledshort]} disabled={!startButtonDisable}>
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
        backgroundColor:'#FFFFFF'
    },
    text: {
        fontSize:24,
        color:'#011515',
        paddingTop:5,
        paddingLeft:9,
        fontWeight:'500',
    },
    button: {
        backgroundColor: '#011515',
        width: '60%',
        padding: 15,
        margin: 20,
        marginBottom:10,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
      },
      disabledbutton: {
        backgroundColor: '#011515',
        width: '60%',
        padding: 15,
        margin: 20,
        marginBottom:10,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        opacity: 0.3
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
    disabledlong: {
        backgroundColor: '#32CD32',
        width: '40%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
        opacity: 0.3,
    },
    short: {
        backgroundColor: '#DC143C',
        width: '40%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10
    },
    disabledshort: {
        backgroundColor: '#DC143C',
        width: '40%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
        opacity: 0.3,
    },
    buttontext: {
        fontWeight:'700',
        color: '#FEFEFD'
    },
    line: {
        width: '85%',
        height: 2,
        backgroundColor: '#808080',
        alignSelf: 'center',
        marginTop: 10
    },
    }   
)
export default AnimatedStock;
