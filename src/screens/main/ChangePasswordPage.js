import React,{useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { auth, firestore } from '../../components/firebase';



const ChangePasswordPage= () => {

    const navigation = useNavigation()

    const [username, setUsername] = useState('')


    const changeUsername = () => {
        const docRef = firestore.collection('users').doc(auth.currentUser.uid)
        docRef.update({
          name: username
        });
        (error) => {
          alert(error);
        };

        navigation.navigate("SettingsScreen")
  
      }

    return(
    <View
        style={styles.container}>

        <Text style={styles.headerTextContainer}>
        Change username
        </Text>

        <View style={styles.inputContainer}>
            <TextInput
                placeholder="New Username"
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input}
            />
        </View>


        <TouchableOpacity
                onPress={changeUsername}
                style={styles.button}>

                <Text style={styles.ChangeUsernameText}>
                Confirm
                </Text>
        </TouchableOpacity>

    </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "black"
    },

    headerTextContainer:{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 25,
        color:"white",
        backgroundColor:"black"
    },

    inputContainer: {
        width: '80%',
    },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    button: {
        backgroundColor: '#723AC5',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width:"60%",
        marginBottom:"50%"
    },

    ChangeUsernameText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default ChangePasswordPage;