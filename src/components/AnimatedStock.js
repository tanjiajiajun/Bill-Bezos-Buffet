import { arrayUnion } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, TextInput} from 'react-native'

import { Defs, LinearGradient, Stop, Line, Circle, Path } from 'react-native-svg'
import { AreaChart, YAxis, LineChart } from 'react-native-svg-charts'
import EndModal from './EndModal';

import { auth, firestore  } from './firebase'
import * as shape from 'd3-shape'



function AnimatedStock({ datapointer , datepointer, tickerpointer, passbackfn, fees, stopLoss, takeProfit, MA20, MA50, MA200, D20, D50, D200}) {
    //database functions
    
    const updateAvg = (arr, incData) => {
        const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
        if (arr.length == 0){
            return incData
        }
        else {
            return +parseFloat(average([...arr, incData])).toFixed(2)
        }
    }

    const update = () => {
        const lj = +parseFloat((amount-10000)/100).toFixed(2)
        console.log(lj)
        const docRef = firestore.collection('users').doc(auth.currentUser.uid)
        const isBelowScore = currentval => currentval < lj
        docRef.get().then((doc) => {
            const userRef = firestore.collection('users').doc(auth.currentUser.uid)
            if (doc.data()['scores'].every(isBelowScore)){
                return userRef.update({
                    highscore: lj,
                    scores: arrayUnion(lj),
                }).then(() => {
                    return userRef.update({
                        avgreturns: updateAvg(doc.data()['scores'],
                        lj)
                    })
                
                }).then(()=> {
                    console.log('data saved')
                })
                .catch((error) => {
                    console.log(error)
                })
            }
            else {
                return userRef.update({
                    scores: arrayUnion(lj),
                }).then(() => {
                    return userRef.update({
                        avgreturns: updateAvg(doc.data()['scores'],
                        lj)
                    })
                }).then(() => {
                    console.log('data saved2')
                }).catch((error) => {
                    console.log(error)
                })

            }
        })

    }

    const split = function (a) {
        for(let i=0;i<a.length-1;i++){
            let b = (a[i] + a[i+1]) / 2
            a.splice(i+1,0,b)
            i++
        }
        return a

     }

    const [randomint, setRandomint] = useState(0)
    const [gameArray, setGameArray] = useState([])
    const [ma20Array, setMA20Array] = useState([])
    const [ma50Array, setMA50Array] = useState([])
    const [ma200Array, setMA200Array] = useState([])

    useEffect( () => {
        setRandomint(Math.floor(Math.random() * (datapointer.length - 300)))
    }, [])

    useEffect( () => {
        setGameArray(split(datapointer.slice(randomint, randomint + 300)))      
        setMA20Array(split(MA20.slice(randomint, randomint+300)))
        setMA50Array(split(MA50.slice(randomint, randomint+300)))
        setMA200Array(split(MA200.slice(randomint, randomint+300)))
        
    }, [randomint])
    
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


    const startX = useRef(50)
    const startY = useRef(0)
    const endY = useRef(0)
    const automatedPressoutTimes = useRef(false)

    const yList2 = useRef([])
    const yList3 = useRef([])
    const yList4 = useRef([])

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
        if (count >= 599) {

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
            if (yList.length <= 50) { // if the entire array has not been populated yet
                if (holdChecker == true)  {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),50)
                    var iv = setInterval(() => {
                        setyList(prevyList => [...prevyList, gameArray[count]],50)
                        startX.current = startX.current -1
                        endY.current = gameArray[count]
                        yList2.current = [...yList2.current, ma20Array[count]]
                        yList3.current = [...yList3.current, ma50Array[count]]
                        yList4.current = [...yList4.current, ma200Array[count]]
                    },50)
                    if (yList[50] >= buyingPrice*(1+takeProfit/100)) {
                        automatedHandleLongOnPressOut()
                    }

                } else if (shortHoldChecker == true) {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),50)
                    var iv = setInterval(() => {
                        setyList(prevyList => [...prevyList, gameArray[count]],50)
                        startX.current = startX.current -1
                        endY.current = gameArray[count]
                        yList2.current = [...yList2.current, ma20Array[count]]
                        yList3.current = [...yList3.current, ma50Array[count]]
                        yList4.current = [...yList4.current, ma200Array[count]]
                    },50)

                } else {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),50)
                    // var iv = setInterval(() => {yList2.current = [...yList2.current, gameArray[count]]}, 50)
                    var iv = setInterval(() => {
                        setyList(prevyList => [...prevyList, gameArray[count]])
                        yList2.current = [...yList2.current, ma20Array[count]]
                        yList3.current = [...yList3.current, ma50Array[count]]
                        yList4.current = [...yList4.current, ma200Array[count]]
                    }, 50)
                }



            } else { // when the entire array has been populated
                if (holdChecker == true) {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),50)
                    var iv = setInterval(() => {
                        setyList(prevyList => [...prevyList, gameArray[count]].slice(1))
                        startX.current = startX.current - 1
                        endY.current = gameArray[count]
                        yList2.current = [...yList2.current, ma20Array[count]].slice(1)
                        yList3.current = [...yList3.current, ma50Array[count]].slice(1)
                        yList4.current = [...yList4.current, ma200Array[count]].slice(1)
                    },50)

                    if (yList[50] >= buyingPrice*(1+takeProfit/100) && takeProfit != 0 || // take profit if share price is x% above buying price
                        yList[50] <= buyingPrice*(1-stopLoss/100) && stopLoss != 0) {     // sell your holdings if share price is x% below buying price
                        automatedHandleLongOnPressOut()
                    }

        
                } else if (shortHoldChecker==true) {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),50)
                    var iv = setInterval(() => {
                        setyList(prevyList => [...prevyList, gameArray[count]].slice(1))
                        startX.current = startX.current - 1
                        endY.current = gameArray[count]
                        yList2.current = [...yList2.current, ma20Array[count]].slice(1)
                        yList3.current = [...yList3.current, ma50Array[count]].slice(1)
                        yList4.current = [...yList4.current, ma200Array[count]].slice(1)
                    },50)

                    if (yList[50] <= shortBuyingPrice*(1-takeProfit/100) && takeProfit != 0 || 
                        yList[50] >= shortBuyingPrice*(1+stopLoss/100) && stopLoss != 0) {
                            automatedHandleShortOnPressOut()
                        }
                }

                 else {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),50)
                    // var iv = setInterval(() => {yList2.current = [...yList2, gameArray[count]].slice(1)}, 50)
                    var iv = setInterval(() => {setyList(prevyList => [...prevyList, gameArray[count]].slice(1))
                        yList2.current = [...yList2.current, ma20Array[count]].slice(1)
                        yList3.current = [...yList3.current, ma50Array[count]].slice(1)
                        yList4.current = [...yList4.current, ma200Array[count]].slice(1)
                    },50)
                        

                }
                    
                    
            }
        }
        //console.log(yList) //debugging purpose
        return () => {
            clearInterval(id)
            clearInterval(iv)
                    }

        }, [yList, start])
        // console.log(automatedPressoutTimes.current)

    // LONGING
    useEffect( () => {
        console.log(`u bought at ${buyingPrice}`)
        setNoShares(Math.floor(amount/buyingPrice))
        console.log(`u bought ${Math.floor(amount/buyingPrice)} shares`)
        console.log(`u have incurred a trading fee of ${Math.max(fees/100,0)*Math.floor(amount/buyingPrice)*buyingPrice}`)
        }, [buyingPrice]
    )

    useEffect( () => {
        if (sellingPrice == undefined) {
            //pass
            } else {
            console.log(`u sold at ${sellingPrice}`)
            console.log(`profit per share: ${sellingPrice-buyingPrice}`)
            console.log(`total earnings for the trade: ${(sellingPrice-buyingPrice)*noShares - Math.max(fees/100,0)*Math.floor(amount/buyingPrice)*buyingPrice}`)
            setAmount(prev => prev + (sellingPrice-buyingPrice)*noShares - Math.max(fees/100,0)*Math.floor(amount/buyingPrice)*buyingPrice)
            }

        }, [sellingPrice]
    )

    const handleLongOnPressIn = () => {
        setBuyingPrice(yList[yList.length-1])
        startY.current = yList[yList.length-1]
        setHoldChecker(true)
    }

    const handleLongOnPressOut = () => {
        if (automatedPressoutTimes.current == false) {
            setSellingPrice(yList[yList.length-1])
            setHoldChecker(false)
            startY.current = 0
            endY.current = 0
            startX.current = 50
         } else {
            automatedPressoutTimes.current = false
         }  

    }
    const automatedHandleLongOnPressOut = () => {
        automatedPressoutTimes.current = true
        setSellingPrice(yList[yList.length-1])
        setHoldChecker(false)
        startY.current = 0
        endY.current = 0
        startX.current = 50
    }

    const showModal = () => {
        setEnd(true)
    }

    // Shorting
    const [shortBuyingPrice, setShortBuyingPrice] = useState(0)
    const [shortSellingPrice, setShortSellingPrice] = useState(0)
    const [shortHoldChecker, setShortHoldChecker] = useState(false)

    useEffect( () => {
        console.log(`you have shorted at: ${shortBuyingPrice}`)
        setNoShares(Math.floor(amount/shortBuyingPrice))
        console.log(`you have shorted ${noShares} shares`)
        console.log(`u have incurred a trading fee of ${Math.max(fees/100,0)*Math.floor(amount/shortBuyingPrice)*shortBuyingPrice}`)
    }, [shortBuyingPrice])

    useEffect( () => {  
        if (shortSellingPrice == undefined) {
        }
        console.log(`you have exited your short position at ${shortSellingPrice}`)
        console.log(`profit per share: ${shortBuyingPrice-shortSellingPrice}`)
        console.log(`total profit from the trade: ${(shortBuyingPrice-shortSellingPrice) * noShares - Math.max(fees/100,0)*Math.floor(amount/shortBuyingPrice)*shortBuyingPrice}`)
        setAmount( prev => prev + (shortBuyingPrice-shortSellingPrice) * noShares - Math.max(fees/100,0)*Math.floor(amount/shortBuyingPrice)*shortBuyingPrice)
    }, [shortSellingPrice])

    const handleShortOnPressIn = () => {
        setShortHoldChecker(true)
        setShortBuyingPrice(yList[yList.length-1])
        startY.current = yList[yList.length-1]
    }
    const handleShortOnPressOut = () => {
        if (automatedPressoutTimes.current == false) {
            setShortHoldChecker(false)
            setShortSellingPrice(yList[yList.length-1])
            startY.current = 0
            endY.current = 0
            startX.current = 50
        } else {
            automatedPressoutTimes.current = false
        }
    }
    const automatedHandleShortOnPressOut = () => {
        setShortHoldChecker(false)
        setShortSellingPrice(yList[yList.length-1])
        startY.current = 0
        endY.current = 0
        startX.current = 50
        automatedPressoutTimes.current = true
    }
    const startButtonText = () => {
        if (start == false) {
            return 'Start'
        } else {
            return `${((600 - count)/20).toFixed(1)}s left!`
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
        update()
    }

    // For graphing of line
    const color = useRef('#FFFFFF')
    const MAfunction = () => {
        if (D20==true) {
            color.current = '#7BB662'
            return yList2.current
        }
        else if (D50==true) {
            color.current = '#FBB149'
            return yList3.current
        }
        else if (D200==true) {  
            color.current='#F58024'
            return yList4.current
        }
        else {return [undefined]}
    }

    const Gradient = () => (
        <Defs key={ 'defs' }>
            <LinearGradient id={ 'gradient' } x1={ '100%' } y={ '0%' } x2={ '100%' } y2={ '100%' }>
                <Stop offset={ '0%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.2 }/>
                <Stop offset={ '100%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.8 }/>
            </LinearGradient>
        </Defs>
    )
    
    const UpperLine = ({ line }) => (
        <Path
            d={ line }
            stroke={ '#5000ca' }
            fill={ 'none' }
        />
    )

    const DottedLine = (({ x, y }) => (
        <Line
            stroke={ 'grey' }
            strokeDasharray={ [ 6, 8 ] }
            strokeWidth={ 3 }
            x1={ x(startX.current) }
            x2={ x(50) }
            y1={ y(startY.current) }
            y2={ y(endY.current) }
            />
    ))




    // const Decorator = ({ x, y, data }) => {
    //     return data.map((value, index) => (
    //         <Circle
    //             key={ index }
    //             cx={ x(index) }
    //             cy={ y(value) }
    //             r={ 4 }
    //             stroke={ 'rgb(134, 65, 244)' }
    //             fill={ 'white' }
    //         />
    //     ))
    // }



    return (
    <SafeAreaView style={styles.container}>

        <EndModal 
        ended={end} 
        sendDataToParnet={sendDataToParnet} 
        amnt={amount} 
        gamearraypointer={gameArray} 
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
                curve={shape.curveNatural}
                svg={{ fill: 'url(#gradient)'}}>
                <Gradient/>
                <UpperLine/>
                {/* <Decorator/> */}
                <DottedLine d={yList[yList.length-1]}/>
            </AreaChart>
            <LineChart
                data={ MAfunction() }
                contentInset={ { top: 20, bottom: 20 } }
                style={StyleSheet.absoluteFill}
                svg={{stroke: color.current, strokeWidth: 2}}>

            </LineChart>
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
