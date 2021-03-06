import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity, Platform} from 'react-native'
import React, { useEffect, useState } from 'react'

import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'



const {height: SCREEN_HEIGHT} = Dimensions.get('window')

export default function BottomSheet({setFees, setStopLoss, setTakeProfit, D20, D50, D200, showD20, showD50, showD200}) {

  const MAX_TRANSLATE_Y =  -SCREEN_HEIGHT + 500
  const ORIGINAL_VALUE = Platform.OS === 'ios' ? 150 : 180

  const translateY = useSharedValue(ORIGINAL_VALUE)
  const context = useSharedValue({ y: 0 })


  const gesture = Gesture.Pan()
    .onStart((event) => {
      context.value = {y: translateY.value};
     })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
      translateY.value = Math.min(translateY.value, ORIGINAL_VALUE)
      // console.log(translateY.value)
    })
    .onEnd(() => {
      if (translateY.value > -40){
        translateY.value = withSpring(ORIGINAL_VALUE, {damping: 50 })
      } else if ( translateY.value < -40){
        translateY.value = withSpring(MAX_TRANSLATE_Y, {damping: 50})
      }
    })
  ;
  
  useEffect( () => {
    translateY.value = withSpring(ORIGINAL_VALUE, {damping: 50})
    
  }, [])
  const rBottomSheetStyle = useAnimatedStyle( () => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomStyleSheet, rBottomSheetStyle]}>
        <View style={styles.line}/>
        <Text style={styles.advancedsettingstext}>Advanced Settings</Text>
        <View style={styles.innercontainer}>
          <View style={styles.firstinnercomponent}>

            <Text style={styles.componenttext}>Include Trading Fees (%)</Text>
            <TextInput 
              style={styles.textinput} 
              keyboardType={'numeric'} 
              onChangeText={text => setFees(text)}
              placeholder='0'
              textAlign='center'/>
          </View>

          <View style={styles.innercomponent}>
            <Text style={styles.componenttext}>Stop Loss Threshold (%)</Text>
            <TextInput 
              style={styles.textinput} 
              keyboardType={'numeric'} 
              onChangeText={text => setStopLoss(text)}
              placeholder='0'
              textAlign='center'/>
          </View>

          <View style={styles.innercomponent}>
            <Text style={styles.componenttext}>Take Profit Threshold (%)</Text>
            <TextInput 
              style={styles.textinput} 
              keyboardType={'numeric'} 
              onChangeText={text => setTakeProfit(text)}
              placeholder='0'
              textAlign='center'/>
          </View>

          <View style={styles.innercomponent}>
            <Text style={styles.componenttext}>Show Moving Averages</Text>
            <TouchableOpacity style={D20 ? styles.selected20 : styles.touchables} onPress={showD20}><Text>20D</Text></TouchableOpacity>
            <TouchableOpacity style={D50 ? styles.selected50 : styles.touchables} onPress={showD50}><Text>50D</Text></TouchableOpacity>
            <TouchableOpacity style={D200 ? styles.selected200 : styles.touchables} onPress={showD200}><Text>200D</Text></TouchableOpacity>
          </View>
          

        </View>
      </Animated.View>
    </GestureDetector>
  )
}



const styles = StyleSheet.create({
  bottomStyleSheet: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#F1F3F4',
    position: 'absolute',
    top: SCREEN_HEIGHT / 1.5, 
    borderRadius: 25,

  },
  line: {
    width: 72, 
    height: 4,
    backgroundColor:'#070B10',
    alignSelf: 'center',
    borderRadius: 2,
    margin: 15,

  },
  innercontainer: {
    alignSelf: 'center',
    backgroundColor: '#E5E5E5',
    width: '90%',
    height: '87%', 
    borderRadius: 15,

  },
  firstinnercomponent: {
    width: '100%',
    height: 76,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems:'center',
    flexDirection: 'row',

  },
  innercomponent: {
    width: '100%',
    height: 76,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    alignItems:'center',
    flexDirection: 'row',

  }, 
  advancedsettingstext: {
    fontSize: 17,
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: 30,

  },
  componenttext: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 9,

  },
  textinput: {
    backgroundColor: '#F1F3F4',
    width: 45,
    height: 30,
    marginLeft: 250,
    borderRadius: 5,
    position: 'absolute',
    justifyContent: 'center'
  },
  touchables: {
    backgroundColor: '#D9D9D9',
    width: 40,
    height: 30,
    borderRadius: 5,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedtouchables: {
    backgroundColor: 'yellow',
    width: 40,
    height: 30,
    borderRadius: 5,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected20: {
    backgroundColor: '#7BB662',
    width: 40,
    height: 30,
    borderRadius: 5,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected50: {
    backgroundColor: '#FBB149',
    width: 40,
    height: 30,
    borderRadius: 5,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  selected200: {
    backgroundColor: '#F58024',
    width: 40,
    height: 30,
    borderRadius: 5,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  }

})