import { set } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, TextInput} from 'react-native'

import { Path, Line } from 'react-native-svg'
import { AreaChart, YAxis } from 'react-native-svg-charts'
import EndModal from './EndModal';

import { auth } from './firebase'


function AnimatedStock({ datapointer , datepointer, tickerpointer, passbackfn}) {
    
    //database functions
    const create = () => {
        setDoc(doc(db, "users", auth.currentUser?.email),{
            highscore: ((amount-10000)/100).toFixed(1)
        })
    }
    // fake data to use while API is not connected (obselete)
    // const data = require('../data/AAPL.json')

    const [randomint, setRandomint] = useState(0)
    useEffect( () => {
        setRandomint(Math.floor(Math.random() * (datapointer.length - 300)))
    }, [])

    const mapper = datapointer.map((i) => Number(i))
    const gameArray = mapper.slice(randomint, randomint + 300)

    const dataa = Array.from(datapointer)


    const [count, setCount] = useState(0)
    const [yList, setyList] = useState([])
    const [start, setStart] = useState(false)
    const [end, setEnd] = useState(false)
    const [startButtonDisable, setStartButtonDisable] = useState(false)
    const [holdChecker, setHoldChecker] = useState(false)
    const [amount, setAmount] = useState(10000)
    const [buyingPrice, setBuyingPrice] = useState(0)
    const [sellingPrice, setSellingPrice] = useState(0)
    const [noShares, setNoShares] = useState(0)

    const [startX, setStartX] = useState(50)
    const [startY, setStartY] = useState(0)
    const [endY, setEndY] = useState(0)

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
            }else if (shortHoldChecker == true) {
                handleShortOnPressOut()
            }
            showModal()
        }
        //check if start button is pressed
        else if (start == false) {
            console.log('havent start')
        }

        else if (start == true){
            if (yList.length <= 50) {
                if (holdChecker == true) {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),100)
                    var iv = setInterval(() => setyList(prevyList => [...prevyList, gameArray[count]],100))
                    var hf = setInterval(() => {
                        setStartX(prevX => prevX - 1)
                        setEndY(gameArray[count])
                    }, 100)

                } else {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),100)
                    var iv = setInterval(() => setyList(prevyList => [...prevyList, gameArray[count]],100))

                }



            } else {
                if (holdChecker == true) {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),100)
                    var iv = setInterval(() => {
                        setyList(prevyList => [...prevyList, gameArray[count]].slice(1))
                        // setStartX(prevX => prevX - 1)
                    },100)

                } else {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),100)
                    var iv = setInterval(() => setyList(prevyList => [...prevyList, gameArray[count]].slice(1)),100)

                }
                    
                    
            }
        }
        //console.log(yList) //debugging purpose
        return () => {
            clearInterval(id)
            clearInterval(iv)
            clearInterval(hf)
            }

        }, [yList, start])
    
    // useEffect( ()=> {
    //     var hf;

    //     if (holdChecker==true){
    //         var hf = setInterval(() => {
    //             console.log(count)
    //             setStartX(prevX => prevX - 1)
    //             setEndY(gameArray[count])
    //         }, 100)
    //     }
        
    //     return () => {
    //         clearInterval(hf)
    //     }
    // }, [holdChecker])

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
        setStartY(yList[yList.length-1])
        setHoldChecker(true)
    }

    const handleLongOnPressOut = () => {
        setSellingPrice(yList[yList.length-1])
        setHoldChecker(false)
        setStartY(0)
        setEndY(0)
        setStartX(50)
    }

    const showModal = () => {
        setEnd(true)
    }


    const [shortBuyingPrice, setShortBuyingPrice] = useState(0)
    const [shortSellingPrice, setShortSellingPrice] = useState(0)
    const [shortHoldChecker, setShortHoldChecker] = useState(false)

    useEffect( () => {
        console.log(`you have shorted at: ${shortBuyingPrice}`)
        setNoShares(Math.floor(amount/shortBuyingPrice))
        console.log(`you have shorted ${noShares} shares`)
    }, [shortBuyingPrice])

    useEffect( () => {  
        if (shortSellingPrice == undefined) {
        }
        console.log(`you have exited your short position at ${shortSellingPrice}`)
        console.log(`profit per share: ${shortBuyingPrice-shortSellingPrice}`)
        console.log(`total profit from the trade: ${(shortBuyingPrice-shortSellingPrice) * noShares}`)
        setAmount( prev => prev + (shortBuyingPrice-shortSellingPrice) * noShares )
    }, [shortSellingPrice])

    const handleShortOnPressIn = () => {
        setShortHoldChecker(true)
        setShortBuyingPrice(yList[yList.length-1])
    }
    const handleShortOnPressOut = () => {
        setShortHoldChecker(false)
        setShortSellingPrice(yList[yList.length-1])
    }
    const startButtonText = () => {
        if (start == false) {
            return 'Start'
        } else {
            return `${(300 - count)/10}s left!`
        }
    }
    const sendDataToParnet = () => {
        setAmount(10000)
        setEnd(false)
        setyList([])
        setCount(0)
        setStart(false)
        setRandomint(Math.floor(Math.random() * (datapointer.length - 300)))
        setStartButtonDisable(false)
        passbackfn()

        console.log(dataa)


    }

    // For graphing of line
    
    const UpperLine = ({ line }) => (
        <Path
            d={ line }
            stroke={ '#ed3072' }
            fill={ 'none' }
        />
    )

    const DottedLine = (({ x, y }) => (
        <Line

            stroke={ 'grey' }
            strokeDasharray={ [ 4, 8 ] }
            strokeWidth={ 2 }
            x1={ x(startX) }
            x2={ x(50) }
            y1={ y(startY) }
            y2={ y(endY) }
            

            />

    ))


    return (
    <SafeAreaView style={styles.container}>

        <EndModal 
        ended={end} 
        sendDataToParnet={sendDataToParnet} 
        amnt={amount} 
        gamearraypointer={yList} 
        startdate={datepointer[randomint]} 
        enddate={datepointer[randomint+300]} 
        ticker={tickerpointer}
        />


        <Text style={styles.text}>Account balance: ${amount.toFixed(3)}</Text>
        <View style={{ height: 400, flexDirection: 'row-reverse' }}>
            <YAxis
                data={yList}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{ fill: 'black', fontSize: 10,}}
                numberOfTicks={10}
                formatLabel={(value) => `$${value}`}
            />
            <AreaChart
                style={{flex: 1, }}
                data={yList}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{ fill: 'rgb(237,48,114, 0.2)' }}>
                <UpperLine/>
                <DottedLine d={yList[yList.length-1]}/>
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
            <TouchableOpacity style= {[start == true ? styles.short : styles.disabledshort]}
            onPressIn={handleShortOnPressIn}
            onPressOut={handleShortOnPressOut}
            disabled={!startButtonDisable}>
                <Text> Short </Text>
            </TouchableOpacity>
        </View>


    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor:'rgba(0,0,0,0)'
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
