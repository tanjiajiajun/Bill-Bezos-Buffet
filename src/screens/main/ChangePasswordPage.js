import React,{useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useTogglePasswordVisibility } from '../../components/useTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ChangePasswordPage= () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

    const credential = EmailAuthProvider.credential(email, oldPassword);
    const auth = getAuth();
    const user = auth.currentUser;


    const changePassword = () => {

        if (newPassword.length > 5) {
            reauthenticateWithCredential(user, credential).then(() => {
                console.log("Successfully reauthenticated")
                updatePassword(user, newPassword).then(() => {
                    alert("Successfully Changed Password")
                  }).catch((error) => {
                    alert(error.message)
                  });
                navigation.navigate("SettingsScreen")
            }).catch((error) => {
                alert(error.message)
              });
    } else {
            alert("Password must be longer than 5 characters")
    }
    }

    return(
    <View
        style={styles.container}>

        <Text style={styles.headerTextContainer}>
        Change Password
        </Text>

        <View style={styles.inputContainer}>
        <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                autoCapitalize={"none"}
            />
        </View>

        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={text => setOldPassword(text)}
                style={styles.input}
                autoCapitalize={"none"}
            />
        </View>

        <View style={styles.inputContainer}>

            <TextInput
                placeholder="New Password"
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
                style={styles.input}
                autoCapitalize={"none"}
                secureTextEntry={passwordVisibility}
            />

            <TouchableOpacity onPress={handlePasswordVisibility} style={styles.eye}>
                <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
            </TouchableOpacity>

        </View>

        <TouchableOpacity
                onPress={changePassword}
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
        marginBottom:"20%",
        marginTop: 10,

    },

    ChangeUsernameText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

    eye:{
        position: 'absolute',
        right: 10,
        top:12,
        },
});

export default ChangePasswordPage;