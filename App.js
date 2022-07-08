import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import loginStack from './src/screens/loginStack';
import mainStack from './src/screens/mainStack';

import { AnimatedBackground } from './src/screens/login/AnimatedBackground';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


export default function App() {
  
  return (
    <NavigationContainer screenOptions={{gestureEnabled: false}}>

      <Stack.Navigator>
      

        <Stack.Screen name="loginStack" component={loginStack} options={{headerShown: false}}/>
        
        <Stack.Screen name="mainStack" component={mainStack} options={{headerShown: false}}/>

      </Stack.Navigator>

    </NavigationContainer>

  );
}
