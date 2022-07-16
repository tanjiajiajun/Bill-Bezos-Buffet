import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'



const DeleteAccountPage= () => {

    const navigation = useNavigation()

    return(
    <View
        style={styles.container}>

        <AnimatedBackground/>

        <View style={styles.textContainer}>

        <TouchableOpacity
            onPress={}>

            <Text style={styles.ResetPasswordText}>

            </Text>

        </TouchableOpacity>

        </View>

    </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "black"
    },

    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"black",
        borderRadius: 100,

    },

    ResetPasswordText: {
        color:"#723AC5",
        fontSize: 20,
        textAlign: "center"
    },
});

export default DeleteAccountPage;