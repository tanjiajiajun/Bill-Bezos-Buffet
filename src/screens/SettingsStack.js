import React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import SettingsScreen from './main/SettingsScreen';
import ChangeUsernamePage from './main/ChangeUsernamePage';
import ChangePasswordPage from './main/ChangePasswordPage';
import DeleteAccountPage from './main/DeleteAccountPage';




const Stack = createStackNavigator();

const SettingsStack = () => {

    return (
        <Stack.Navigator initialRouteName="SettingsScreen">

            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}}/>

            <Stack.Screen name="ChangeUsernamePage" component={ChangeUsernamePage} options={
                {title: "Enter Password",
                headerTintColor: 'white',
                headerStyle: {
                backgroundColor:"black",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                }
                }}/>


            <Stack.Screen name="ChangePasswordPage" component={ChangePasswordPage} options={
                {title: "Change Password",
                headerTintColor: 'white',
                headerStyle: {
                backgroundColor:"black",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                },
                }}/>
            
            <Stack.Screen name="DeleteAccountPage" component={DeleteAccountPage} options={
                {title: "Delete Account",
                headerTintColor: 'white',
                headerStyle: {
                backgroundColor:"black",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                }
                }}/>

        </Stack.Navigator>
  );
}

export default SettingsStack;