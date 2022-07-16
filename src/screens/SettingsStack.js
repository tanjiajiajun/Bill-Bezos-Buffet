import React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import SettingsScreen from './main/SettingsScreen';
import ChangeUsernamePage from './main/ChangeUsernamePage';



const Stack = createStackNavigator();

const SettingsStack = () => {

    return (
        <Stack.Navigator initialRouteName="SettingsScreen">

            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}}/>

            <Stack.Screen name="ChangeUsernamePage" component={ChangeUsernamePage} options={
                {title: "ChangeUsernamePage",
                headerTintColor: 'white',
                headerStyle: {
                backgroundColor:"black"
                }
                }}/>
        </Stack.Navigator>
  );
}

export default SettingsStack;