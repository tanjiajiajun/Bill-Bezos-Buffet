import React from 'react';
import { StatusBar } from 'expo-status-bar';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import RegisterScreen from './login/RegisterScreen'
import LoginScreen from './login/LoginScreen';
import VerifyEmail from './login/VerifyEmail';
import ResetPassword from './login/ResetPassword';
import ResetPasswordSplashScreen from './login/ResetPasswordSplashScreen';






const Stack = createStackNavigator();

const LoginStackNavigator = () => {

    return (
        <Stack.Navigator initialRouteName="LoginScreen">

            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>

            <Stack.Screen name="Register" component={RegisterScreen} options={
                {title: "Register",
                headerTintColor: 'white',
                headerStyle: {
                backgroundColor:"white"
                }
                }}/>
                
            <Stack.Screen name="VerifyEmail" component={VerifyEmail} options={
                {title: "Verify Email",
                headerTintColor: 'white',
                headerStyle: {
                backgroundColor:"black"
                }
                }}/>
                
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={
                {title: "Reset Password",
                headerTintColor: 'white',
                headerStyle: {
                backgroundColor:"black"
                }
                }}/>

            <Stack.Screen name="ResetPasswordSplashScreen" component={ResetPasswordSplashScreen} options={{headerShown: false}}/>




        </Stack.Navigator>
  );
}

export default LoginStackNavigator;