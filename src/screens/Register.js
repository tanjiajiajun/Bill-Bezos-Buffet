import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'


import firebase from "firebase/app";
import "firebase/auth";


export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password: '',
            name: '',
        }

        this.onSignup = this.onSignup.bind(this)
    }

    onSignup(){
        const{ email, password, name } = this.state;
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
      <View>
          <TextInput
            placeholder="name"
            onChangeText={(name) => this.setState({ name })}
          />
            <TextInput
            placeholder="email"
            onChangeText={(email) => this.setState({ email })}
          />
            <TextInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />

          <Button
            onPress={() => this.onSignup()}
            title="Sign Up"
            />
      </View>
    )
  }
}

export default Register