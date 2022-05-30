import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';

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
            <Text>Welcome back, {auth.currentUser?.email}</Text>
            <TouchableOpacity
            onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen;

// const styles = StyleSheet.create({

// })