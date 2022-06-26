import React from 'react';
import { StatusBar } from 'expo-status-bar';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import RegisterScreen from './src/screens/login/RegisterScreen'
import LoginScreen from './src/screens/login/LoginScreen';
import HomeScreen from './src/screens/main/HomeScreen'
import VerifyEmail from './src/screens/login/VerifyEmail';
import ResetPassword from './src/screens/login/ResetPassword';
import ResetPasswordSplashScreen from './src/screens/login/ResetPasswordSplashScreen';

import loginStack from './src/screens/loginStack';
import mainStack from './src/screens/mainStack';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


export default function App() {
  
  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name="loginStack" component={loginStack} options={{headerShown: false}}/>
        
        <Stack.Screen name="mainStack" component={mainStack} options={{headerShown: false}}/>

      </Stack.Navigator>

    </NavigationContainer>
  );
}
