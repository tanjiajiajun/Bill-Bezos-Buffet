import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DataFetchingSplash() {
  return (
    <View style={styles.containter}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%'
      },
      text: {
        alignSelf: 'center',
        paddingTop: 250,
        fontSize: 40,
        fontWeight: '800'
      }
})