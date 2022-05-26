import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import Bull from './assets/bull.svg'


export default function App() {
  return <LoginScreen />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alightItems: 'center',
    justifyContent: 'center',
  },
});