import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { auth } from '../components/firebase';
import { getAuth, sendEmailVerification } from "firebase/auth";




const RegisterScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigation = useNavigation()

    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredential => {
            const user = userCredential.user;
            userCredential.user.sendEmailVerification();
            handleStatusMessage(AUTH_SUCCESS);
            auth.signOut();
            alert("Email sent");
            console.log('Registered with:', user.email);
            navigation.navigate("VerifyEmail")

        })
        .catch(error => alert(error.message))
    }



    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        >
            <Text style={styles.headerTextContainer}>Create account</Text>

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
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
        </View>


        <View style={styles.ButtonContainer}>
            <TouchableOpacity
            onPress={handleSignUp}
            style={styles.signUpButton}
            >
            <Text style={styles.signUpButtonText}>Register</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            >
            <Text style={styles.bottomButtonLogInText}>If you already have an account.{"\n"}Log In</Text>
            </TouchableOpacity>
        
        </KeyboardAvoidingView>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTextContainer:{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 25,
    },

    inputContainer: {
        width: '80%',
    },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    buttonContainer: {
        justifyContent: 'center',
        paddingHorizontal: 1,
        width: "60%",
    },

    signUpButton: {
        backgroundColor: '#0782F9',
        width: "100%",
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },

    signUpButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

    bottomButtonLogInText: {
        alignItems: 'center',
        color:"red",
        fontSize: 16,

    },

})
