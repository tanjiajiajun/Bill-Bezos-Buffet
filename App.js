import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBEd3yG8hljm0SI4uWMy4F--yXOlf-AhPQ",
  authDomain: "bill-bezos-buffet.firebaseapp.com",
  projectId: "bill-bezos-buffet",
  storageBucket: "bill-bezos-buffet.appspot.com",
  messagingSenderId: "423543471715",
  appId: "1:423543471715:web:771af5d230bd4cafef4256",
  measurementId: "G-H432944NB2"
};

const app = initializeApp(firebaseConfig);


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './src/screens/Landing'
import RegisterScreen from './src/screens/Register'

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
      </Stack.Navigator>
    </NavigationContainer> 
  );
}
