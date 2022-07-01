import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


export default function LeaderComponent() {
  return (
    <View style={styles.container}>
        <View style={styles.rankNumber}>
            <Text style={styles.texts}>1</Text>
        </View>
        <View style={styles.profPic}></View>
        <View style={styles.nameContainer}>
            <Text style={styles.texts}>Stephen Curry</Text>
        </View>
        <View style={styles.returnsContainer}>
            <Text style={styles.texts}>50.11%</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 80, 
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    profPic: {
        height: 60,
        width: 60,
        borderRadius: 400, 
        backgroundColor: '#F2F2F2'
    },
    texts: {
        fontSize: 16,
        fontWeight: '500',
    },
    rankNumber: {
        marginHorizontal: 20
    },
    nameContainer: {
        marginHorizontal: 30
    },
    returnsContainer: {
        marginHorizontal: 17
    }

})