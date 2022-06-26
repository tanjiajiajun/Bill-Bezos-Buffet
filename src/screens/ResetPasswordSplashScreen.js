import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'


const ResetPasswordSplashScreen= () => {

    const navigation = useNavigation()

    return(
    <View
        style={styles.container}
        >
    
    <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
        >
            <Text style={styles.ResetPasswordText}>Reset password email sent!{"\n"}Press here to Log In again</Text>
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

    ResetPasswordText: {
        color:"red",
        fontSize: 14,
    },
});

export default ResetPasswordSplashScreen;