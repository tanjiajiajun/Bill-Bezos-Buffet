import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../../firebase';

import Stock from '../components/Stock';
import AnimatedStock from '../components/AnimatedStock';

const HomeScreen = (props) => {

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .catch(e => alert(e.message))
    }
    return (
        <View>
            <Text style={styles.headerText}>Welcome back, </Text>
            <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
            <AnimatedStock/>
            <TouchableOpacity style={styles.signoutButton}
            onPress={handleSignOut}>
                <Text style={styles.signoutButtonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>

    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1 ,
        alignItems: 'center',
        justifyContent:'center'
    },
    headerText:{
        fontSize: 30,
        fontWeight: '700',
        padding: 15,
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