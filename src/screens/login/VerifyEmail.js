import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'


const VerifyEmail = () => {

    const navigation = useNavigation()

    return(
    <View
        style={styles.container}
        >
    
    <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
        >
            <Text style={styles.verificationText}>To continue, please verify your email we sent to your inbox.{"\n"}Then press here to log in again</Text>
        </TouchableOpacity>

    </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"black"
    },

    verificationText: {
        color:"#723AC5",
        fontSize: 20,
        textAlign: "center",
    },
});

export default VerifyEmail;