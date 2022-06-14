import React from 'react';
import { StatusBar } from 'expo-status-bar';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import RegisterScreen from './src/screens/RegisterScreen'
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen'
import VerifyEmail from './src/screens/VerifyEmail';
import ResetPassword from './src/screens/ResetPassword';
import ResetPasswordSplashScreen from './src/screens/ResetPasswordSplashScreen';


const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" >
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{title: "Register"}}/>
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} options={{title: "Verify Email"}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{title: "Reset Password"}}/>
        <Stack.Screen name="ResetPasswordSplashScreen" component={ResetPasswordSplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>


  );
}
