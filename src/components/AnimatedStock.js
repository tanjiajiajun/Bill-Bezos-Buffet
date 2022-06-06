import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native'

import { Path } from 'react-native-svg'
import { AreaChart, Grid, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'



function AnimatedStock(props) {

    const data = require('../data/AAPL.json')
    const [randomint, setRandomint] = useState(0)

    useEffect( () => {
        setRandomint(Math.floor(Math.random() * (data.length - 300)))
    }, [])

    const gameArray = data.slice(randomint, randomint + 301)

    const n = gameArray[0]['Adj Close']
    
    let xData = []
    let yData = [
        n, n, n, n, n, n, n, n, n, n,
        n, n, n, n, n, n, n, n, n, n,
        n, n, n, n, n, n, n, n, n, n,
    ]

    const [count, setCount] = useState(0)
    const [yList, setyList] = useState(yData)
    const [start, setStart] = useState(false)



    const onpress = () => {
        setStart(prevStart => !prevStart)
        console.log(start)

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
    
    const Line = ({ line }) => (
        <Path
            key={'line'}
            d={line}
            stroke={'rgb(134, 65, 244)'}
            fill={'none'}
        >
        </Path>
        )


    return (
    <SafeAreaView style={styles.container}>
        <Text>This is the graph below!</Text>
        <View>
            <AreaChart
                style={{
                    height: 500 ,
                    width: '95%',

                }}
                data={yList}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
            >
            <Line/>
            </AreaChart>

        </View>
        <TouchableOpacity style={styles.button} onPress={onpress}>
            <Text>Start</Text>
        </TouchableOpacity>
        <View>
        <TouchableOpacity>
            <Text>Long</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text>Short</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        margin: 40,
        borderRadius: 10,
        alignItems: 'center',
        
      }
    }   
)
export default AnimatedStock;
