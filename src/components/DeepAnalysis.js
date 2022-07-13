import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Path} from 'react-native-svg'

export default function DeepAnalysis({ showDeep , exitDeepAnalysis, gameArrayDataPoints}) {


    //data points from AnimatedStock. Have to pass as property in function DeepAnalysis and subsequently in EndModal
    const data = gameArrayDataPoints

    const max = Math.max.apply(Math, data);
    const indexOfMaxPoint = data.indexOf(max);

    const min = Math.min.apply(Math, data);
    const indexOfMinPoint = data.indexOf(min);

    const minMaxdata = [min,max];
    const minMaxIndexdata = [indexOfMinPoint,indexOfMaxPoint];

    const [num, setNum] = useState('');
    
    const Decorator = ({ x, y, minMaxdata, minMaxIndexdata, fullData }) => {

        console.log(minMaxIndexdata)
        return minMaxIndexdata.map((value, index) => (
            <Circle
                key={ index }
                cx={ x(minMaxIndexdata[index]) }
                cy={ y(fullData[value]) }
                r={ 5 }
                stroke={ 'rgb(134, 65, 244)' }
                fill={ 'rgb(0, 0, 0)' }
            />
        ))
        }

    




    const Line = () => (
        <Path
            stroke={ 'rgba(134, 65, 244)' }
            fill={ 'none' }
        />
    )

    return (
    <Modal visible={showDeep} transparent>
        <View style={styles.center}>
            <View style={styles.modal}>

                <Text style={styles.returnstext}>This is how the stock performed</Text>
                
                <AreaChart
                style={{ height: 300 }}
                data={data}
                contentInset={{ top: 30, bottom: 10 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
                <Grid/>
                <Line/>
                <Decorator
                    minMaxdata={minMaxdata}
                    fullData={data}
                    minMaxIndexdata={minMaxIndexdata}
                />
            </AreaChart>

                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={exitDeepAnalysis}>
                        <Text style={styles.modalbuttontext}>Back</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    </Modal>
  )}
 


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    modal: {
        animationType:"slide",
        width: 400,
        height: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
    
    },

    returnstext: {
        fontSize: 15,
        fontWeight: '500',
        alignSelf: 'center',
        padding: 5,
    
    },

    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 0
    },

    modalbuttontext: {
        margin: 50,
        fontSize: 14,
        fontWeight: '400'
    }

})
