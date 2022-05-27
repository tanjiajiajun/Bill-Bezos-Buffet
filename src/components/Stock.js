import React from 'react'
import {View, Text} from 'react-native'

import { Path } from 'react-native-svg'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
class Stock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const pointerToThis = this;
        const API_KEY = '648ESNV7HZIHWW1M';
        let SYMBOL = 'FB';
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&outputsize=full&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(API_CALL) 
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);

                    }
                    //console.log(stockChartYValuesFunction) works fine here
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction
                    });
                    
            })

    }
    render() { 
        const array = this.state.stockChartYValues.map((i) => Number(i))

        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'rgb(134, 65, 244)'}
                fill={'none'}
            />)

        return (

            <View style={{width:'100%'}}>
                <AreaChart
                style={{ height: 200 }}
                data={array}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                animate={true}
                animationDuration={3000}
            >
                <Grid/>
                <Line/>
            </AreaChart>
                <Text>Hello DKISHDKJDSHKHK</Text>
            </View>

            

        );
    }
}
 
export default Stock;