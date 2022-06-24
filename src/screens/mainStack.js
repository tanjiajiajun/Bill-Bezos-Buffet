import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './main/HomeScreen'
import SettingsScreen from './main/SettingsScreen'
import LeaderboardScreen from './main/LeaderboardScreen'

import Icons from 'react-native-vector-icons/FontAwesome';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }} />

        <Tab.Screen name="LeaderboardScreen" component={LeaderboardScreen} options={{ 
            tabBarLabel: 'leaderboard',
            tabBarIcon: ({ color }) => (
            <MaterialIcons name="leaderboard" color={color} size={26} />
          ),
        }}
         />

        <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{ 
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
         />
      </Tab.Navigator>
    );
  };
  
export default BottomTabNavigator;
