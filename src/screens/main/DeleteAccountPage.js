import React,{useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore  } from '../../components/firebase'

const DeleteAccountPage= () => {

    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(email, oldPassword);

    const confirmDeleteData = () => {
        reauthenticateWithCredential(user, credential).then(() => {
            console.log("Successfully reauthenticated")
            const collectionRef = firestore.collection('users')
            const userRef = firestore.collection('users').doc(auth.currentUser.uid)
            deleteDoc(doc(collectionRef, user.uid));
            //collectionRef.doc(userRef).delete();
            console.log("DATA successfully deleted")
            setModalVisible(false)
            setModalVisible2(true)
        }).catch((error) => {
            console.log("Unsuccessfully reauthenticated", error)
            alert("Password or Email is incorrect. Unable to delete account")
        });
    }

    const confirmLiao = () =>{
        setModalVisible(true)
      }

    const exitFromModal = () => {
        setModalVisible(!modalVisible)
      }

    const confirmDeleteAccount = () => {
        deleteUser(user).then(() => {
            alert("Account successfully deleted")
            console.log("Account successfully deleted")
            navigation.replace("LoginStack")
        }).catch((error) => {
            alert(error);
            console.log(error)})
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
                        <Text style={styles.modalTitleText}> Delete DATA? </Text>
                        <Text style={styles.modalText}> Are you sure you want to proceed? </Text>
                        <TouchableOpacity
                        style={styles.buttonYes}
                        onPress={confirmDeleteData}
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


            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitleText}> Delete ACCOUNT? </Text>
                        <TouchableOpacity
                        style={styles.buttonYes}
                        onPress={confirmDeleteAccount}
                        >
                            <Text style={styles.textStyle}> Yes! </Text>
                        </TouchableOpacity>
                     </View>
                </View>
            </Modal>



        <Text style={styles.headerTextContainer}>
        DELETE ACCOUNT
        </Text>

        <Text style={styles.headerTextContainer2}>
        HEY, YOU!🫵🏻
        {`\n`}
        {`\n`}
        Are you sure you want to delete your account?😢
        {`\n`}
        {`\n`}
        Please be reminded that all of your past scores and settings will deleted and it is irrevisible😱
        {`\n`}
        {`\n`}
        Enter your email and password below and then press Continue to say Goodbye👋🏻
        {`\n`}
        {`\n`}
        PS: you can always create a new account with us again!😸
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


        <TouchableOpacity
                onPress={confirmLiao}
                style={styles.button}
                >
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
    headerTextContainer2:{
        fontSize: 16,
        fontWeight: 'bold',
        color:"white",
        marginBottom: 25,
        backgroundColor:"black",
    },
    inputContainer: {
        width: '80%',
        margin: 1,
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
        margin: 10,
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

export default DeleteAccountPage;