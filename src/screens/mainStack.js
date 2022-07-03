import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './main/HomeScreen'
import SettingsScreen from './main/SettingsScreen'
import LeaderboardScreen from './main/LeaderboardScreen'


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{gestureEnabled: false}}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }} />

        <Tab.Screen name="LeaderboardScreen" component={LeaderboardScreen} options={{ 
            tabBarLabel: 'leaderboard',
            headerShown: false,
            gestureEnabled: false,
            tabBarIcon: ({ color }) => (
            <MaterialIcons name="leaderboard" color={color} size={26} />
          ),
        }}
         />

        <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{ 
            tabBarLabel: 'Settings',
            gestureEnabled: false,
            headerShown: false,
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
         />
      </Tab.Navigator>
    );
  };
  
export default BottomTabNavigator;
