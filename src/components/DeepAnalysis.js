import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


export default function DeepAnalysis({ showDeep , exitDeepAnalysis, gameArrayDataPoints}) {

    //data points from AnimatedStock. Have to pass as property in function DeepAnalysis and subsequently in EndModal
    const data = gameArrayDataPoints

  return (
    <Modal visible={showDeep} transparent>
        <View style={styles.center}>
            <View style={styles.modal}>
                <Text>This is how the stock performed</Text>
                
                <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
                <Grid />
            </AreaChart>

                <TouchableOpacity onPress={exitDeepAnalysis}>
                    <Text>Exit</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>

  )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    modal: {
        width: 300,
        height: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
    
    },
})
