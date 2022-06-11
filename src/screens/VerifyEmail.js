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
            <Text style={styles.verificationText}>Verify Email in your inbox.{"\n"}Then press here to Log In again</Text>
        </TouchableOpacity>

    </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    verificationText: {
        color:"red",
        fontSize: 14,
    },
});

export default VerifyEmail;