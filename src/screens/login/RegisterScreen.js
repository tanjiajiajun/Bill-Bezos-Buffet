import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { auth, createUserDocument } from '../../components/firebase';
import { getAuth, sendEmailVerification } from "firebase/auth";

import { useTogglePasswordVisibility } from '../../components/useTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AnimatedBackground } from './AnimatedBackground'


import { doc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore' 


const RegisterScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();


    const navigation = useNavigation()



    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email,password)
        .then(userCredential => {
            navigation.navigate('VerifyEmail')
            createUserDocument(userCredential.user, {name})
            const user = userCredential.user;
            userCredential.user.sendEmailVerification();
            auth.signOut();
            alert("Email Sent! You may need to check junk mail for the email");

            console.log('Registered with:', user.email);
        })
        .catch(error => alert(error.message))

    }


    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        backgroundColor="black"
        >

            <AnimatedBackground/>

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
                    secureTextEntry={passwordVisibility}
                />

                <TouchableOpacity onPress={handlePasswordVisibility} style={styles.eye}>
                    <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                </TouchableOpacity>

            </View>
            
            <TouchableOpacity
            onPress={handleSignUp}
            style={styles.signUpButton}
            >
                <Text style={styles.signUpButtonText}>Register</Text>
            </TouchableOpacity>

        <View style={styles.bottomButtonLogInContainer}>
            <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            >
            <Text style={styles.bottomButtonLogInText}>If you already have an account.{"\n"}Log In here</Text>
            </TouchableOpacity>
        </View>


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
        color:"white",
        backgroundColor:"black"
    },

    inputContainer: {
        width: '80%',
    },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 100,
        marginTop: 5,
    },

    signUpButton: {
        backgroundColor: '#723AC5',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width:"60%",
        marginTop:20
    },

    signUpButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

    bottomButtonLogInContainer:{
        position: 'absolute',
        bottom: 100, 
    },

    bottomButtonLogInText: {
        alignItems: 'center',
        color:"#8352cc",
        fontSize: 16,
        textAlign:"center",
        fontWeight: "bold"

    },

    eye:{
        position: 'absolute',
        right: 10,
        top:98,
        },

})
