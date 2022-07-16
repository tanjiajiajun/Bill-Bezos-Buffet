import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginStack from './src/screens/LoginStack';
import MainStack from './src/screens/MainStack';
import SettingsStack from './src/screens/SettingsStack';

import { AnimatedBackground } from './src/screens/login/AnimatedBackground';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


export default function App() {
  
  return (
    <NavigationContainer screenOptions={{gestureEnabled: false}}>

      <Stack.Navigator>
      

        <Stack.Screen name="LoginStack" component={LoginStack} options={{headerShown: false}}/>
        
        <Stack.Screen name="MainStack" component={MainStack} options={{headerShown: false}}/>

        <Stack.Screen name="SettingsStack" component={SettingsStack} options={{headerShown: false}}/>

      </Stack.Navigator>

    </NavigationContainer>

  );
}
