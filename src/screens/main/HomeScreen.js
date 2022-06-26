import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView ,View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { auth } from '../../components/firebase';

import StockDataGetter from '../../components/StockDataGetter';
import BottomSheet from '../../components/BottomSheet';


const HomeScreen = (props) => {

    const navigation = useNavigation()

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


            <StockDataGetter/>
            <BottomSheet/>

            </ScrollView>

        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',

    },
    scrollView:{
        paddingBottom: 100,

    },

    headerText:{
        fontSize: 24,
        fontWeight: '500',
        padding: 10,
        paddingLeft:15,
        paddingBottom: 0,
    },
    emailText:{
        fontSize: 20,
        fontWeight:'700',
        paddingLeft: 15,
    },

})