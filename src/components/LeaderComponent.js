import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth, firestore } from './firebase'

export default function LeaderComponent({name, highscore, index}) {
    return (
    <View style={styles.container}>
        <View style={styles.rankNumber}>
            <Text style={styles.texts}>{index + 1}</Text>
        </View>
        <View style={styles.profPic}></View>
        <View style={styles.nameContainer}>
            <Text style={styles.texts}>{name}</Text>
        </View>
        <View style={styles.returnsContainer}>
            <Text style={styles.percentages}>{highscore}%</Text>
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
        alignItems: 'center',
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
    percentages: {
        marginLeft: 50,
        fontSize: 16,
        fontWeight: '500',
    },
    rankNumber: {
        marginHorizontal: 20
    },
    nameContainer: {
        marginHorizontal: 125,
        position:'absolute'
    },
    returnsContainer: {
        marginHorizontal: 225,
        position:'absolute'
    }

})