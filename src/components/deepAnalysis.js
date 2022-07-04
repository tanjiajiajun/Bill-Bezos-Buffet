import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

export default function DeepAnalysis({ showDeep , exitDeepAnalysis}) {


  return (
    <Modal visible={showDeep} transparent>
        <View style={styles.center}>
            <View style={styles.modal}>
                <Text>This is your deep analysis page</Text>
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