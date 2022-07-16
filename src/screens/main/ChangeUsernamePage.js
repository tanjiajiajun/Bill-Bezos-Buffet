import React,{useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { auth, firestore } from '../../components/firebase';



const ChangeUsernamePage= () => {

    const navigation = useNavigation()

    const [username, setUsername] = useState('')

    const [modalVisible, setModalVisible] = useState(false);



    const changeUsername = () => {
        const docRef = firestore.collection('users').doc(auth.currentUser.uid)
        docRef.update({
          name: username
        });
        (error) => {
          alert(error);
        };

        setModalVisible(true)
  
      }
    
      const confirmLiao = () =>{
        setModalVisible(!modalVisible)
        navigation.navigate("SettingsScreen")
      }

    return(
    <View
        style={styles.container}>




        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to change your Username?</Text>
            <TouchableOpacity
              style={[styles.button1, styles.buttonClose]}
              onPress={confirmLiao}
            >
              <Text style={styles.textStyle}>Yes!</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>




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
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#41BE43",
        borderRadius: 10,
      },

});

export default ChangeUsernamePage;