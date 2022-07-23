import React , { useState, useEffect, useRef } from 'react';
import { Image, View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import WavyHeader from '../../components/WavyHeader';
import LeaderComponent from '../../components/LeaderComponent';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { auth, firestore  } from '../../components/firebase';
import { getStorage, ref, getDownloadURL } from "firebase/storage";


function LeaderboardScreen() {

  const [imageURL, setURL] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([])
  const [rank, setRank] = useState('')
  const [avgreturns, setAvgreturns] = useState('')
  const userData = useRef(0)


  useEffect(() => {
    const userRef = firestore.collection('users').doc(auth.currentUser.uid)
    userRef.get()
    .then((doc) => {
      setAvgreturns(doc.data()['avgreturns'])
      userData.current=doc.data()['highscore']
    })
    .then(() => {
      console.log(leaderboardData.findIndex(x => x['highscore'] === userData.current))
    })
    .catch(error=>{
      console.log(error)
    })

    const storage = getStorage();
    const reference = ref(storage, `profilepics/${auth.currentUser.uid}`);
    getDownloadURL(reference).then((x) => {
    setURL(x);
    })

    const collectionRef = collection(firestore, 'users')
    const q = query(collectionRef, orderBy("highscore", "desc"))

    const unsub = onSnapshot(q, (snapshot) => {
      setLeaderboardData(snapshot.docs.map((doc) => doc.data()))
      setRank(leaderboardData.findIndex(x => x['highscore'] == userData.current))
    })

    return unsub
  }
  , [])


  useEffect(() => {
    const unsub = onSnapshot(doc(firestore, 'users', auth.currentUser.uid), (doc) => {
      setURL(doc.data()["profpic"])
    })
    return unsub
  })

  
    return (
      <View style={styles.container}>

        <WavyHeader
        customStyles={styles.svgCurve}
        customHeight={160}
        customTop={130}
        customBgColor="#ec296d"
        customWavePattern="M0,96L48,112C96,128,192,160,288,
        186.7C384,213,480,235,576,213.3C672,192,768,128,864,
        128C960,128,1056,192,1152,208C1248,224,1344,192,1392,
        176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,
        0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,
        0,96,0,48,0L0,0Z"
        />

        <View>
          <Text style={styles.headerText}>Leaderboard</Text>
        </View>

        <LinearGradient 
          colors={['#840b55','#ec296d']} 
          start={{x:0, y:0}}
          end={{x:1, y:1}}
          style={styles.yourStanding}>
          <View style={styles.yourRank}>
            <Text style={styles.yourStandingText}>RANK</Text>
            <Text style={styles.yourStandingText}>{rank}</Text>
          </View>
          <Image source={{uri : imageURL}} style={styles.profPic}/>
          <View style={styles.yourAvgReturns}>
            <Text style={styles.yourStandingText}>AVG. RETURNS:</Text>
            <Text style={styles.yourStandingText}>{avgreturns}%</Text>
          </View>
        </LinearGradient>

        <View style={styles.leaderboard}>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button}><Text style={styles.buttontext}>Weekly Top</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={styles.buttontext}>All-Time Average</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.line}></View>

        <FlatList
          keyExtractor={(item) => leaderboardData.indexOf(item)}
          data={leaderboardData}
          renderItem={({ item }) => (
            <LeaderComponent 
              index={leaderboardData.findIndex(x => x==item)}
              name={item['name']}
              highscore={item['highscore']}
              imageURL={item['profpic']}
              />
            )}>
          </FlatList>

      </View>
    );
  }


  export default LeaderboardScreen;

  const styles = StyleSheet.create({

    container: {
      flex: 1,
    },

    svgCurve: {
      position: 'absolute',
      width: Dimensions.get('window').width
    },

    headerText: {
      color:'white',
      fontSize: 30,
      fontWeight: '700',
      textAlign: 'center',
      marginTop: 55
    },

    yourStanding: {
      width: '80%',
      height: 106, 
      backgroundColor: '#220056',
      alignSelf: 'center',
      borderRadius: 15,
      marginTop: 60,
      flexDirection: 'row',
      alignItems:'center',
      
    },
    yourStandingText: {
      fontWeight: '600',
      fontSize: 15,
      color: 'white',
    },

    yourRank: {
      alignItems: 'center',
      marginHorizontal: 25,
    },

    profPic: {
      height: 60,
      width: 60,
      backgroundColor: '#F2F2F2',
      borderRadius: 400,

    }, 

    yourAvgReturns: {
      marginHorizontal: 20,
      alignItems:'center'
    },

    buttons:{
      flexDirection:'row',
      justifyContent: 'center',
      border:1,
      height: 50,
      
    }, 

    leaderboard: {
      width: '100%',
      height: 50,
      backgroundColor: 'white',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      marginTop: 50,
    },

    button: {
      marginHorizontal:25,
      paddingVertical: 10,
    },

    buttontext: {
      fontSize: 20,
      fontWeight: '700',
      alignSelf: 'center',
    },

    line: {
      height: 1,
      width: '100%',
      backgroundColor:'black',

    }, 



  })