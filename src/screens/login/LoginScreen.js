import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../components/firebase'
import { useTogglePasswordVisibility } from '../../components/useTogglePasswordVisibility'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AnimatedBackground } from './AnimatedBackground'




const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
      }
    })
    return unsubscribe
  }, [])


  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        if (!user.emailVerified) {
          navigation.navigate('VerifyEmail')
        } else {
          console.log("Logged in with", user.email)
          navigation.replace("mainStack")
        }
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


      <Image 
        source={require('../../../assets/Layer8.png')}
        style={{ resizeMode:"contain", width:300, height:200, backgroundColor:"black", }}
        />

      <Text style={styles.headerTextContainer}>Welcome to Bulls Vs Bears</Text>

      <View style={styles.inputContainer}>
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


      <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPassword")}
          style={[styles.button]}
        >
          <Text style={styles.buttonText}>Forgot my password?</Text>
        </TouchableOpacity>

      </View>

    
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({


  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  headerTextContainer:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
    backgroundColor:"black"
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


  eye:{
    position: 'absolute',
    right: 10,
    top:55,
    },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  button: {
    backgroundColor: '#723AC5',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonOutlineText: {
    color: '#723AC5',
    fontWeight: '700',
    fontSize: 16,
  },
})


