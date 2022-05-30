import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';





export class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password: '',
            name: '',
        }

        this.onSignup = this.onSignup.bind(this)
    }

    onSignup() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textContainer}>Create account</Text>
                <TextInput style={styles.inputContainer}
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput style={styles.inputContainer}
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                 />
                <TextInput style={styles.inputContainer}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => this.onSignup()}>
                        <Text style={styles.buttonTextContainer}>Sign Up</Text>
                </TouchableOpacity>
             </View>
             </View>
    )
  }
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 150
    },
    textContainer:{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 40
    },
    inputContainer: {
        width: '80%',
        backgroundColor:'white',
        borderRadius:10,
        padding:8,
        paddingLeft:15,
        margin:5
    },
    buttonContainer: {
        margin: 5,
        padding: 5,
        backgroundColor:'#0782F9',
        borderRadius:15,
        width: '60%',
        alignItems:'center',
    
    },
    buttonTextContainer: {
        color:'white',
        padding:5,
        fontSize:16,
        fontWeight:'700'
    }
})