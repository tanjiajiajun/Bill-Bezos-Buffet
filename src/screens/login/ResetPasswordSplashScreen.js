import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { AnimatedBackground } from './AnimatedBackground'



const ResetPasswordSplashScreen= () => {

    const navigation = useNavigation()

    return(
    <View
        style={styles.container}>

        <AnimatedBackground/>

        <View style={styles.textContainer}>

        <TouchableOpacity
            onPress={() => navigation.navigate("Login")}>

            <Text style={styles.ResetPasswordText}>
            Reset password email sent!{"\n"}
            Press here to Log In again{"\n"}
            Check Junk Email if you cant find the email
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

export default ResetPasswordSplashScreen;