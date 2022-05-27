import React from 'react';
import { View, Text, Button } from 'react-native';
import Stock from '../components/Stock';

function HomeScreen(props) {
    return (
        <View>
            <Text> Hello World</Text>
            <Button title='Start!'></Button>
            <Stock/>
        </View>
    );
}

export default HomeScreen;