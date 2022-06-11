import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView ,View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { auth } from '../../firebase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedStock from '../components/AnimatedStock';
import BottomSheet from '../components/BottomSheet';
import { StatusBar } from 'expo-status-bar';


const HomeScreen = (props) => {

    const navigation = useNavigation()

    // const handleSignOut = () => {
    //     auth
    //         .signOut()
    //         .then(() => {
    //             navigation.replace('Login')
    //         })
    //         .catch(e => alert(e.message))
    // }
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <SafeAreaView style={styles.container}>
                <StatusBar style="dark"></StatusBar>
                <Text style={styles.headerText}>Welcome back, </Text>
                {/* <Text style={styles.emailText}>{auth.currentUser?.email}</Text> */}
                <AnimatedStock/>
                <BottomSheet/>
            </SafeAreaView>
        </GestureHandlerRootView>

    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1 ,

    },
    headerText:{
        fontSize: 24,
        fontWeight: '500',
        padding: 9,
        paddingBottom: 0,
    },
    emailText:{
        fontSize: 20,
        fontWeight:'700',
        paddingLeft: 15,
    },
    signoutButton:{
        margin: 5,
        padding: 5,
        backgroundColor:'#0782F9',
        borderRadius:15,
        width: '60%',
        alignItems:'center'       
    },
    signoutButtonText:{
        color:'white',
        padding:5,
        fontSize:16,
        fontWeight:'700'        
    }
})