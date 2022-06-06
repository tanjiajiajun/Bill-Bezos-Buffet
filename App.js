import React from 'react';
import { StatusBar } from 'expo-status-bar';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import RegisterScreen from './src/screens/RegisterScreen'
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen'
import AnimatedStock from './src/components/AnimatedStock';


const Stack = createStackNavigator();
export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
    //     <Stack.Screen name="Register" component={RegisterScreen}/>
    //     <Stack.Screen name="Home" component={HomeScreen}/>
    //   </Stack.Navigator>
    // </NavigationContainer> 
    <AnimatedStock/>
  );
}
