import { arrayUnion } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet, TextInput} from 'react-native'

import { Defs, LinearGradient, Stop, Line, Circle, Path } from 'react-native-svg'
import { AreaChart, YAxis } from 'react-native-svg-charts'
import EndModal from './EndModal';

import { auth, firestore  } from './firebase'



function AnimatedStock({ datapointer , datepointer, tickerpointer, passbackfn}) {
    //database functions
    const update = () => {
        const docRef = firestore.collection('users').doc(auth.currentUser.uid)
        const isBelowScore = currentval => currentval < ((amount-10000)/100).toFixed(2)
        docRef.get().then((doc) => {
            const userRef = firestore.collection('users').doc(auth.currentUser.uid)
            if (doc.data()['scores'].every(isBelowScore)){
                return userRef.update({
                    highscore: parseFloat(((amount-10000)/100).toFixed(2)),
                    scores: arrayUnion(parseFloat(((amount-10000)/100).toFixed(2)))
                }).then(() => {
                    console.log('data saved')
                }).catch((error) => {
                    console.log(error)
                })
            }
            else {
                return userRef.update({
                    scores: arrayUnion(parseFloat(((amount-10000)/100).toFixed(2)))
                }).then(() => {
                    console.log('data saved')
                }).catch((error) => {
                    console.log(error)
                })

            }
        })

    }
    // fake data to use while API is not connected (obselete)
    // const data = require('../data/AAPL.json')

    // functions that add fake data (mid pt of every 2 pts of gamearray) 
    // to increase no. of data points 


    const split = function (a) {
        for(let i=0;i<a.length-1;i++){
            let b = (a[i] + a[i+1]) / 2
            a.splice(i+1,0,b)
            i++
        }
        return a

     }

    const [randomint, setRandomint] = useState(0)
    useEffect( () => {
        setRandomint(Math.floor(Math.random() * (datapointer.length - 300)))
    }, [])

    const mapper = datapointer.map((i) => Number(i))
    const gameArray2 = mapper.slice(randomint, randomint + 300)
    const gameArray = split(gameArray2)
    // console.log(gameArray.length)


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
            if (yList.length <= 50) {
                if (holdChecker == true || shortHoldChecker == true)  {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),50)
                    var iv = setInterval(() => {
                        setyList(prevyList => [...prevyList, gameArray[count]],50)
                        startX.current = startX.current -1
                        endY.current = gameArray[count]
                    },50)

                } else {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),50)
                    var iv = setInterval(() => setyList(prevyList => [...prevyList, gameArray[count]],50))
                }



            } else {
                if (holdChecker == true || shortHoldChecker == true) {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),50)
                    var iv = setInterval(() => {
                        setyList(prevyList => [...prevyList, gameArray[count]].slice(1))
                        startX.current = startX.current - 1
                        endY.current = gameArray[count]
                    },50)

                } else {
                    var id = setInterval(() => setCount(prevCount => prevCount + 1),50)
                    var iv = setInterval(() => setyList(prevyList => [...prevyList, gameArray[count]].slice(1)),50)

                }
                    
                    
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
        startY.current = yList[yList.length-1]
        setHoldChecker(true)
    }

    const handleLongOnPressOut = () => {
        setSellingPrice(yList[yList.length-1])
        setHoldChecker(false)
        startY.current = 0
        endY.current = 0
        startX.current = 50
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
        startY.current = yList[yList.length-1]
    }
    const handleShortOnPressOut = () => {
        setShortHoldChecker(false)
        setShortSellingPrice(yList[yList.length-1])
        startY.current = 0
        endY.current = 0
        startX.current = 50
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

    }

    // For graphing of line


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
            stroke={ '#ed3072' }
            fill={ 'none' }
        />
    )

    const DottedLine = (({ x, y }) => (
        <Line
            stroke={ 'grey' }
            strokeDasharray={ [ 4, 8 ] }
            strokeWidth={ 2 }
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
                svg={{ fill: 'url(#gradient)'}}>
                <Gradient/>
                <UpperLine/>
                {/* <Decorator/> */}
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
