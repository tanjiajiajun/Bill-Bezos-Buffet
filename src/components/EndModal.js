import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

import DeepAnalysis from './DeepAnalysis'

export default function EndModal({ ended, sendDataToParnet, amnt, gamearraypointer, startdate, enddate, ticker }) {

    const [showDeep, setShowDeep] = useState(false)

    const deepAnalysisButton = () => {
        setShowDeep(true)
    }
    const exitDeepAnalysis = () => {
        setShowDeep(false)
        sendDataToParnet()

    }
    
    if (showDeep == false) {
        return (
            <Modal
                visible={ended}
                transparent
                >   
                    <View style={styles.center}>
                        <View style={styles.modal}>
                            <Text style={styles.bigmodaltext}>Game Ended!</Text>
                            <Text style={styles.returnstext}>You have obtained a return of {((amnt-10000)/100).toFixed(1)}%,</Text>
                            <Text style={styles.returnstext}>compared to the stock's return of {((gamearraypointer[gamearraypointer.length-1] - gamearraypointer[0]) / gamearraypointer[0] * 100).toFixed(1)}% </Text>
                            <Text style={styles.exposetext}>The stock that you have just traded is {ticker},</Text>
                            <Text style={styles.exposetext}>from {startdate} to {enddate}</Text>
                            <View style={styles.wrapper}>
                                <TouchableOpacity
                                onPress={deepAnalysisButton}>                        
                                    <Text style={styles.modalbuttontext}>Deep Analysis</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.modalbuttontext}>Share</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={sendDataToParnet}>
                                    <Text style={styles.modalbuttontext}>Return</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
          )

    } else {
        return (
            <DeepAnalysis showDeep={showDeep} gameArray={gamearraypointer} exitDeepAnalysis={exitDeepAnalysis}/>
        )
    }
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
bigmodaltext: {
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
    padding: 15,

},
returnstext: {
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
    padding:5,

},
exposetext: {
    alignSelf: 'center',
    fontSize: 13,
    fontWeight: '500',
    paddingTop: 5
},
wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 105
},
modalbuttontext: {
    margin: 10,
    fontSize: 14,
    fontWeight: '400'
}
})