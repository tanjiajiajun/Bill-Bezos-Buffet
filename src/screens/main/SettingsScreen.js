<<<<<<< HEAD
import React, {useState} from 'react';
import { View, Text , StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import { auth } from '../../components/firebase';
=======
import React, { useState, useEffect } from 'react';
import { View, Text , StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

>>>>>>> origin/main
import { useNavigation } from '@react-navigation/native';

import WavyHeader from '../../components/WavyHeader';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

<<<<<<< HEAD
//import * as ImagePicker from "react-native-image-picker"

import * as ImagePicker from 'expo-image-picker';  // not react-image-picker

=======
import { auth, firestore } from '../../components/firebase';
>>>>>>> origin/main

function SettingsScreen() {

  const [image, setImage] = useState(null);


  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [avgreturns, setAvgreturns] = useState('')
  const [highscore, setHighscore] = useState('')
    useEffect(()=> {
        const docRef = firestore.collection('users').doc(auth.currentUser.uid)
        docRef.get()
        .then((doc)=>{
            setName(doc.data()['name'])
            setAvgreturns(doc.data()['avgreturns'])
            setHighscore(doc.data()['highscore'])
  
        }).catch((err)=>{
            console.log(err)
        })  

    },[])

  const handleSignOut = () => {
    auth
        .signOut()
        .then(() => {
            console.log('User signed out!')
            navigation.replace('loginStack')
        })
        .catch(e => alert(e.message))
}

const pickImage = async () => { //expo-image-picker
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setImage(result.uri);
  }
};

const changeProfilePic = (type) => { //react-native-image-picker
  ImagePicker.launchImageLibrary(    {mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,}, (response) => {
    console.log('Response = ', response);
    
    if (response.didCancel) {
      alert('User cancelled camera picker');
      return;
    } else if (response.errorCode == 'camera_unavailable') {
      alert('Camera not available on device');
      return;
    } else if (response.errorCode == 'permission') {
      alert('Permission not satisfied');
      return;
    } else if (response.errorCode == 'others') {
      alert(response.errorMessage);
      return;
    } else {
  
      // You can also display the image using data:
      const source = { uri: response.uri };  
      console.log(response)
      setImageUri(response)
      setData(response)
   }
   });
   };

   const openCamera = () => { //react-native-image-picker
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
  
    launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
    
        // You can also display the image using data:
        const source = { uri: response.uri };    
        console.log(response)
        setImageUri(response)
     }
     });
     };


    return (
      <View style={styles.container}>
        <WavyHeader
        customStyles={styles.svgCurve}
        customHeight={330}
        customTop={249}
        customBgColor="#D3F33D"
        customWavePattern="M0,320L80,314.7C160,309,320,299,480,266.7C640,
                          235,800,181,960,181.3C1120,181,1280,235,1360,261.3L1440,
                          288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0
                          ,160,0,80,0L0,0Z"
      />
        <View style={styles.profileHeader}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <Image source={{uri: image}} style={styles.profPic}/>
        <View>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.subTexts}>All-time highscore: {highscore}%</Text>
          <Text style={styles.subTexts}>Average Returns: {avgreturns}%</Text>
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.settingsHeader}>General Settings</Text>
          <View style={styles.innerContainer}>

            <TouchableOpacity style={styles.innerComponent} onPress={pickImage}>
              <MaterialIcons style={{marginHorizontal:15, marginVertical:7}} name='photo-library' size={45} />
              <Text style={styles.settingsText}>Update Profile Picture</Text>
              <MaterialIcons style={{position: 'absolute', marginLeft:310}} name='arrow-forward-ios' size={25} />
            </TouchableOpacity>

          
            <TouchableOpacity style={styles.innerComponent}>
              <MaterialCommunityIcons style={{marginHorizontal:15, marginVertical:7}} name="rename-box" size={45} />
              <Text style={styles.settingsText}>Change Username</Text>
              <MaterialIcons style={{position: 'absolute', marginLeft:310}} name='arrow-forward-ios' size={25} />
            </TouchableOpacity>


            <TouchableOpacity style={styles.innerComponent}>
              <MaterialIcons style={{marginHorizontal:15, marginVertical:7}} name='lock-outline' size={45} />
              <Text style={styles.settingsText}>Change Password</Text>
              <MaterialIcons style={{position: 'absolute', marginLeft:310}} name='arrow-forward-ios' size={25} />
            </TouchableOpacity>


            <TouchableOpacity style={styles.innerComponent}>
              <MaterialCommunityIcons style={{marginHorizontal:15, marginVertical:7}} name="theme-light-dark" size={45} />
              <Text style={styles.settingsText}>Change Theme</Text>
              <MaterialIcons style={{position: 'absolute', marginLeft:310}} name='arrow-forward-ios' size={25} />
            </TouchableOpacity>


            <TouchableOpacity style={styles.innerComponent}>
              <MaterialCommunityIcons style={{marginHorizontal:15, marginVertical:7}} name="google-analytics" size={45} />
              <Text style={styles.settingsText}>Check Play history</Text>
              <MaterialIcons style={{position: 'absolute', marginLeft:310}} name='arrow-forward-ios' size={25} />
            </TouchableOpacity>



            <TouchableOpacity style={styles.innerComponent} onPress={handleSignOut}>
              <MaterialCommunityIcons style={{marginHorizontal:15, marginVertical:7}} name="logout" size={45} />
              <Text style={styles.settingsText}>Log Out</Text>
              <MaterialIcons style={{position: 'absolute', marginLeft:310}} name='arrow-forward-ios' size={25} />
            </TouchableOpacity>


          </View>

        </View>
      </View>

    );
  }
const styles = StyleSheet.create({
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  headerText: {
    color:'black',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 55
  },
  profPic: {
    width: 120,
    height: 120, 
    borderRadius: 400,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: 17
  },
  nameText:{
    fontSize: 33,
    fontWeight:'600',
    alignSelf: 'center',
    marginBottom: 10,
  },
  subTexts: {
    fontSize: 19,
    fontWeight:'500',
    marginVertical:2,
    alignSelf:'center',
    color:'#434444'
  },
  settingsContainer: {
    marginTop: 40,
    backgroundColor: '#F1F3F4'
  },
  settingsHeader: {
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 15,
    marginBottom: 5
  },
  innerContainer: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    borderRadius: 20, 
  },
  innerComponent:{
    flexDirection: 'row',
    alignItems:'center',
  },
  settingsText: {
    fontSize: 17,
    fontWeight: '500'
  }

})

  export default SettingsScreen;