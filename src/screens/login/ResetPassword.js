import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { AnimatedBackground } from './AnimatedBackground'



const ResetPassword = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const navigation = useNavigation()

    const auth = getAuth();

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            navigation.navigate("ResetPasswordSplashScreen")
            alert("Reset password email sent! You may need to check junk mail for the email");
            console.log("Reset password email sent to", email)
        })
        .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        backgroundColor="black">

            <AnimatedBackground/>

            <Text style={styles.headerText}>Forgot Password?</Text>

            <Text style={styles.secondHeaderTextContainer}>Please enter your name and email to reset your password</Text>

                <View style={styles.inputContainer}>

                    <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                    autoCapitalize={"none"}
                    />

                    <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    autoCapitalize={"none"}
                    />

                </View>

            <TouchableOpacity
                onPress={handleResetPassword}
                style={styles.button}>

                <Text style={styles.ResetPasswordText}>
                Confirm
                </Text>

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
    
    headerText:{
        flex:1,
        fontSize: 36,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop:"25%",
        color:'white',
    },


    secondHeaderTextContainer:{
        fontSize: 16,
        textAlign: 'center',
        color:'white',
        marginTop:10,
        backgroundColor:"black"

    },
    
    inputContainer: {
        flex:1,
        width: "80%",
        marginTop:10
    },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    button: {
        backgroundColor: '#723AC5',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width:"60%",
        marginBottom:"50%"
    },

    ResetPasswordText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default ResetPassword;