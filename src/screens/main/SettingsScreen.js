import React from 'react';
import { View, Text , StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { auth } from '../../components/firebase';
import { useNavigation } from '@react-navigation/native';

import WavyHeader from '../../components/WavyHeader';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { BadgeIcon } from '@mui/icons-material';

function SettingsScreen() {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
        .signOut()
        .then(() => {
            console.log('User signed out!')
            navigation.replace('loginStack')
        })
        .catch(e => alert(e.message))
}
    return (
      <View style={styles.container}>
        <WavyHeader
        customStyles={styles.svgCurve}
        customHeight={330}
        customTop={240}
        customBgColor="#D3F33D"
        customWavePattern="M0,320L80,314.7C160,309,320,299,480,266.7C640,235,800,181,960,181.3C1120,181,1280,235,1360,261.3L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      />
        <View style={styles.profileHeader}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <View style={styles.profPic}></View>
        <View>
          <Text style={styles.nameText}>Doogy Doge</Text>
          <Text style={styles.subTexts}>Win Rate: </Text>
          <Text style={styles.subTexts}>Average Returns: </Text>
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.settingsHeader}>General Settings</Text>
          <View style={styles.innerContainer}>

            <TouchableOpacity style={styles.innerComponent}>
              <MaterialIcons style={{marginHorizontal:15, marginVertical:7}} name='insert-photo' size={45} />
              <Text>Update Profile Picture</Text>
            </TouchableOpacity>

          
            <TouchableOpacity style={styles.innerComponent}>
              <MaterialCommunityIcons style={{marginHorizontal:15, marginVertical:7}} name="rename-box" size={45} />
              <Text>Change Username</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.innerComponent}>
              <MaterialIcons style={{marginHorizontal:15, marginVertical:7}} name='lock-outline' size={45} />
              <Text>Change Password</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.innerComponent}>
              <MaterialCommunityIcons style={{marginHorizontal:15, marginVertical:7}} name="theme-light-dark" size={45} />
              <Text>Change Theme</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.innerComponent}>
              <MaterialCommunityIcons style={{marginHorizontal:15, marginVertical:7}} name="google-analytics" size={45} />
              <Text>Check Play history</Text>
            </TouchableOpacity>



            <TouchableOpacity style={styles.innerComponent} onPress={handleSignOut}>
              <MaterialCommunityIcons style={{marginHorizontal:15, marginVertical:7}} name="logout" size={45} />
              <Text>Log Out</Text>
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

})

  export default SettingsScreen;