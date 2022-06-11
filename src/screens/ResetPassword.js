import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const ResetPassword = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const navigation = useNavigation()

    const auth = getAuth();

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            navigation.navigate("ResetPasswordSplashScreen")
        // Password reset email sent!
        // ..
        })
        .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        >
            <Text style={styles.headerTextContainer}>Key in your name and email</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
        </View>

        <TouchableOpacity
            onPress={handleResetPassword}
            >
            <Text style={styles.bottomButtonLogInText}>Press here to confirm</Text>
            </TouchableOpacity>
        
        </KeyboardAvoidingView>
  )
}
    


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    ResetPasswordText: {
        color:"red",
        fontSize: 14,
    },
    
    bottomButtonLogInText: {
        alignItems: 'center',
        color:"red",
        fontSize: 16,

    },
});

export default ResetPassword;