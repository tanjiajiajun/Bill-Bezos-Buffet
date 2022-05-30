import React, { Component, useState, useEffect } from 'react';
import {View, Text, TouchableHighlight} from 'react-native'

import { Path } from 'react-native-svg'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

function AnimatedStock(props) {

    const data = require('../data/AAPL.json')
    let xData = []
    let yData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

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
        const id = setInterval(() => setCount(prevCount => prevCount + 1),10);
        const iv = setInterval(() => setyList(prevyList => [...prevyList, data[count]["Adj Close"]].slice(1)),10)
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
        <AreaChart
                style={{ height: 200 }}
                data={yList}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                animate={true}
                animationDuration={10}
            >
    
                <Line/>
            </AreaChart>
        <TouchableHighlight title='Long'></TouchableHighlight>
        <TouchableHighlight title='Short'></TouchableHighlight>
    </View>
    );
}

export default AnimatedStock;
