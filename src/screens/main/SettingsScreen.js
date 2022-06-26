import React from 'react';
import { View, Text , StyleSheet, TouchableOpacity} from 'react-native';
import { auth } from '../../components/firebase';
import { useNavigation } from '@react-navigation/native';


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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.signoutButton}
          onPress={handleSignOut}>
          <Text style={styles.signoutButtonText}>Sign Out</Text>
      </TouchableOpacity>
      </View>

    );
  }
const styles = StyleSheet.create({
  signoutButton:{
    padding: 5,
    backgroundColor:'#723AC5',
    borderRadius:10,
    width: '60%',
    alignItems:'center',
    justifyContent:'center',
},

signoutButtonText:{
    color:'white',
    padding:5,
    fontSize:16,
    fontWeight:'700',      
    
}
})

  export default SettingsScreen;