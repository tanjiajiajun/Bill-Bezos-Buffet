import React,{useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { auth, firestore } from '../../components/firebase';



const ChangeUsernamePage= () => {

    const navigation = useNavigation()
    const [username, setUsername] = useState('')
    const [modalVisible, setModalVisible] = useState(false);


    const changeUsername = () => {
        setModalVisible(!modalVisible)
      }
    
      const confirmLiao = () =>{
        const docRef = firestore.collection('users').doc(auth.currentUser.uid)
        docRef.update({
          name: username
        });
        (error) => {
          alert(error);
        };        navigation.navigate("SettingsScreen")
      }

      const exitFromModal = () => {
        setModalVisible(!modalVisible)
      }

    return(
        <View
            style={styles.container}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.modalTitleText}> Change your Username to "{username}" </Text>
                    <Text style={styles.modalText}> Are you sure? </Text>

                    <TouchableOpacity
                    style={styles.buttonYes}
                    onPress={confirmLiao}
                    >
                    <Text style={styles.textStyle}> Yes! </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.buttonNo}
                    onPress={exitFromModal}
                    >
                        <Text style={styles.textStyle2}> No! </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <Text style={styles.headerTextContainer}>
        Change username
        </Text>

        <Text style={styles.headerTextContainer2}>
        Don't like your Username?
        {`\n`}
        {`\n`}
        Enter your new Username
        </Text>

        <View style={styles.inputContainer}>
            <TextInput
                placeholder="New Username"
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input}
                autoCapitalize={"none"}
            />
        </View>

        <TouchableOpacity
        onPress={changeUsername}
        style={styles.button}>

            <Text style={styles.ChangeUsernameText}>
            Change my Name!
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

    headerTextContainer2:{
        fontSize: 16,
        fontWeight: 'bold',
        color:"white",
        marginBottom: 25,
        backgroundColor:"black"
    },

    inputContainer: {
        width: '80%',
        marginBottom: 25,
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

    //Modal style shit
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalTitleText: {
        marginBottom: 10,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 20,
      },
      modalText: {
        marginBottom: 10,
        textAlign: "center",
        fontWeight: "500",
        fontSize: 16,
      },
      buttonYes: {
        backgroundColor: "#41BE43",
        padding: 10,
        borderRadius: 100,
        width: '80%',
        marginTop: 5,
        marginBottom: 5,
        
      },
      buttonNo: {
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
    },

    textStyle2: {
        color: '#BE4341',
        fontWeight: '700',
        fontSize: 16,
    }

});

export default ChangeUsernamePage;