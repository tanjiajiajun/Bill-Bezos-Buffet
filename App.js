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
import StockDataGetter from './src/components/StockDataGetter';
import AnimatedStock from './src/components/AnimatedStock';


const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="VerifyEmail" component={VerifyEmail}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword}/>
        <Stack.Screen name="ResetPasswordSplashScreen" component={ResetPasswordSplashScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
      


  );
}
