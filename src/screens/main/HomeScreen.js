import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { auth } from '../../components/firebase';

import Stock from '../../components/Stock';
import AnimatedStock from '../../components/AnimatedStock';

const HomeScreen = (props) => {

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                console.log('User signed out!')
                navigation.replace('loginStack')
            })
            .catch(e => alert(e.message))
    }
    return (
        <SafeAreaView
        style={styles.container}
        >
          <ScrollView style={styles.scrollView} contentContainerStyle={{paddingBottom: 100}}
        >


            <View
            style={styles.textContainer}>
            <Text style={styles.headerText}>Welcome back, </Text>
            <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
            </View>


            <AnimatedStock/>

            <TouchableOpacity
            style={styles.signoutButton}
            onPress={handleSignOut}>
                <Text style={styles.signoutButtonText}>Sign Out</Text>
            </TouchableOpacity>

            </ScrollView>

        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,

    },
    scrollView:{
        backgroundColor: 'black',
        paddingBottom: 100

    },

    textContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    
    headerText:{
        fontSize: 16,
        fontWeight: '700',
        color:"#723AC5"
    },
    emailText:{
        fontSize: 18,
        fontWeight:'700',
        color:"#723AC5"
    },

    signoutButton:{
        padding: 5,
        backgroundColor:'#723AC5',
        borderRadius:10,
        width: '60%',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:"20%"  
    },

    signoutButtonText:{
        color:'white',
        padding:5,
        fontSize:16,
        fontWeight:'700',      
        
    }
})