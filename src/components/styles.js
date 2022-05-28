import styled from "styled-components";
import {View} from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBECF0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: width * 0.6,
        height: 240,
        alignSelf: 'center'
    },
    inputContainer: {
        alignItems: 'center'
    },
    input: {
        marginVertical: 4,
        width: 200,
        height: 30,
        borderColor: 'black',
        borderWidth: 2,
        paddingHorizontal: 8
    },
    button: {
        backgroundColor: '#003D7C',
        marginTop: 46, // Deducting off from the marginBottom of input i.e. 4dp
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 12,
        color: 'white'
    },
    responseText: {
        color: 'green',
        fontSize: 20,
        marginTop: 40
    }
});