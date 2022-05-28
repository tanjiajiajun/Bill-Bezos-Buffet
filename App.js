import React from 'react';
import { StatusBar } from 'expo-status-bar';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';


const firebaseConfig = {
  apiKey: "AIzaSyBEd3yG8hljm0SI4uWMy4F--yXOlf-AhPQ",
  authDomain: "bill-bezos-buffet.firebaseapp.com",
  projectId: "bill-bezos-buffet",
  storageBucket: "bill-bezos-buffet.appspot.com",
  messagingSenderId: "423543471715",
  appId: "1:423543471715:web:771af5d230bd4cafef4256",
  measurementId: "G-H432944NB2"
};


let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './src/screens/Landing'
import RegisterScreen from './src/screens/RegisterScreen'

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
