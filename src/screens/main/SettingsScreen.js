import React, { useState, useEffect } from 'react';
import { View, Text , StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import WavyHeader from '../../components/WavyHeader';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import * as ImagePicker from "react-native-image-picker"
import * as ImagePicker from 'expo-image-picker';  // not react-image-picker

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, firestore } from '../../components/firebase';


function SettingsScreen() {

  const [image, setImage] = useState('');
  const [imageURL, setURL] = useState('');

  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [avgreturns, setAvgreturns] = useState('')
  const [highscore, setHighscore] = useState('')
  
    useEffect(()=> {

      const storage = getStorage();
      const reference = ref(storage, `profilepics/${auth.currentUser.uid}`);
      getDownloadURL(reference).then((x) => {
      setURL(x);
      console.log("url file from firebase", imageURL);
      })

      const docRef = firestore.collection('users').doc(auth.currentUser.uid)
      docRef.get()
      .then((doc)=>{
        setName(doc.data()['name'])
        setAvgreturns(doc.data()['avgreturns'])
        setHighscore(doc.data()['highscore'])
        setImage(doc.data()['profpic'])
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
    quality: 0.1,
  });

  console.log(result);

  if (!result.cancelled) {
    const uri = result.uri;
    //let uploadUri =
    //Platform.OS === 'ios' ? uri.replace('file:///', '') : uri;
    setImage(uri);
    console.log("uri file from machine", image) //supposed to always show the uri of the image but somehow sometimes it doesnt work and it shows undefined, so i try not to use Image and i use result.uri
    const storage = getStorage();  //the storage itself
    const imageRef = ref(storage, `profilepics/${auth.currentUser.uid}`);  //how the image will be addressed inside the storage. Idk why the file is saved as 'undefined'

    const img = await fetch(uri);
    const bytes = await img.blob();

    await uploadBytes(imageRef,bytes).then(() => {
      alert("Image Uploaded")
      console.log("Image Uploaded");
      getDownloadURL(imageRef).then((x) => {
        setURL(x);
      })
    });

    const docRef = firestore.collection('users').doc(auth.currentUser.uid)
    docRef.update({
      profpic: imageURL
    });
    (error) => {
      alert(error);
    };
  }
}


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
        <Image source={{uri : imageURL}} style={styles.profPic}/>
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

          
            <TouchableOpacity style={styles.innerComponent} onPress={() => navigation.navigate("ChangeUsernamePage")
}>
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