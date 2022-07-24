import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { View, Text,  StyleSheet, ScrollView, Dimensions } from 'react-native';
import { auth, firestore } from '../../components/firebase';

import StockDataGetter from '../../components/StockDataGetter';
import BottomSheet from '../../components/BottomSheet';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { doc, onSnapshot } from "firebase/firestore";



const HomeScreen = (props) => {

    const navigation = useNavigation()
    const [name, setName] = useState('')

    useEffect(()=> {
        const docRef = firestore.collection('users').doc(auth.currentUser.uid)
        docRef.get()
        .then((doc)=>{
            setName(doc.data()['name'])
        }).catch((err)=>{
            console.log(err)
        })  

        const unsub = onSnapshot(doc(firestore, 'users', auth.currentUser.uid), (doc) => {
            setName(doc.data()["name"])
          })
          return unsub

    },[])
 
    const [fees, setFees] = useState(0)
    const [stopLoss, setStopLoss] = useState(0)
    const [takeProfit, setTakeProfit] = useState(0)

    const [D20, setD20] = useState(false)
    const [D50, setD50] = useState(false)
    const [D200, setD200] = useState(false)

    const showD20 = () => {
        if (D20 == true) {
            setD20(false)
        } else if (D20 == false) {
            setD20(true)
            setD50(false)
            setD200(false)
        }
    }

    const showD50 = () => {
        if (D50 == true) {
            setD50(false)
        } else if (D50 == false) {
            setD50(true)
            setD20(false)
            setD200(false)
        }
    }
    
    const showD200 = () => {
        if (D200 == true) {
            setD200(false)
        } else if (D200 == false) {
            setD200(true)
            setD50(false)
            setD20(false)
        }
    }
    
    
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.box}>
                    <Svg 
                        height={160}
                        width={Dimensions.get('screen').width}
                        viewBox='0 0 1440 320'
                        style={styles.topNavy}
                        >
                        <Path 
                            fill='#5000ca' 
                            d="M0,192L34.3,170.7C68.6,149,137,107,206,122.7C274.3,
                            139,343,213,411,213.3C480,213,549,139,617,106.7C685.7,75,754,85,
                            823,117.3C891.4,149,960,203,1029,202.7C1097.1,203,1166,149,1234,
                            154.7C1302.9,160,1371,224,1406,256L1440,288L1440,0L1405.7,
                            0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,
                            0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,
                            0,69,0,34,0L0,0Z"/>
                    </Svg>
                </View>
            </View>
          <View style={styles.scrollView}
        >


            <LinearGradient 
            colors={['#220056', '#5000ca']} 
            start={{x:0, y: 0.1}}
            end={{x:1, y:1}}
            style={styles.textContainer}>
                <Text style={styles.headerText}>Welcome back,</Text>
                <Text style={styles.emailText}>{name}</Text>
            </LinearGradient>


            <StockDataGetter 
                fees={fees} 
                stopLoss={stopLoss} 
                takeProfit={takeProfit}
                D20={D20}
                D50={D50}
                D200={D200}
                />
            <BottomSheet 
                setFees={setFees} 
                setStopLoss={setStopLoss} 
                setTakeProfit={setTakeProfit} 
                D20={D20}
                D50={D50}
                D200={D200}
                showD20={showD20}
                showD50={showD50}
                showD200={showD200}
                />

            </View>

        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    top: {
        position:'absolute',
        width: Dimensions.get('screen').width,
        top: 0,
    },
    box: {
        backgroundColor: '#5000ca',
        height: 40
    },
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width
      },

    scrollView:{
        paddingBottom: 100,
    },

    textContainer: {
        alignSelf: 'center',
        marginTop: 60,
        marginHorizontal: 30,
        borderRadius: 10, 
        width: '80%',


    },

    headerText:{
        color:'white',
        fontSize: 24,
        fontWeight: '700',
        padding: 9,
        paddingBottom: 0,
        alignSelf: 'center'
    },

    emailText:{
        color:'white',
        fontSize: 20,
        fontWeight:'700',
        alignSelf:'center',
        paddingBottom: 9    },

})