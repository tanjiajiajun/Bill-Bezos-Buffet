import React, { Component, useState, useEffect } from 'react';
import {View, Text, TouchableHighlight} from 'react-native'

import { Path } from 'react-native-svg'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

function AnimatedStock(props) {

    const data = require('../data/AAPL.json')
    let xData = []
    let yData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    const [count, setCount] = useState(0)
    const [yList, setyList] = useState(yData)
    const [toggle, setToggle] = useState(false)


    
    const onpress = () => {
        setToggle(prevToggle => !prevToggle)
        console.log(toggle)
    }

    const textValue = toggle ? 'ON' : 'OFF'

    //if (toggle === true) {
    useEffect( ()=> {
        const id = setInterval(() => setCount(prevCount => prevCount + 1),1000);
        const iv = setInterval(() => setyList(prevyList => [...prevyList, data[count]["Adj Close"]].slice(1)),1000)
        console.log(yList)
        return () => {
            clearInterval(id)
            clearInterval(iv)
            }

        }, [yList])
    //}
    const Line = ({ line }) => (
        <Path
            key={'line'}
            d={line}
            stroke={'rgb(134, 65, 244)'}
            fill={'none'}
        />)

    

    
    


    return (
    <View style={{width:'100%'}}>
        <Text>Hello!</Text>
        <TouchableHighlight onPress={() => onpress()}>
            <Text>{textValue}</Text>
        </TouchableHighlight>
        <AreaChart
                style={{ height: 200 }}
                data={yList}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                animate={true}
                animationDuration={100}
            >
    
                <Line/>
            </AreaChart>
    </View>
    );
}

export default AnimatedStock;
