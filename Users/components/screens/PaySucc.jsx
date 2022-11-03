import { StyleSheet, Text, View ,Button,SafeAreaView, TouchableOpacity,Image} from 'react-native'
import React from 'react'
// import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';

const PaySucc = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar
   backgroundColor="#0225A1"
   barStyle="light-content"
   />

   
   {/* <LottieView style={styles.hotel}
source={require('../onbording/animation2.json')} autoPlay loop/> */}
  <Image style={styles.hotel} source={require('../images/paysucc.jpg')}/>
  <TouchableOpacity style={{ justifyContent:'center',alignItems:'center',borderRadius:10,
        backgroundColor:'#4A1DD6',width:200,height:50}} onPress={()=>navigation.navigate('TabScreen')}>
       <Text style={{color:'#fff'}}>Back To  HomePage</Text>
   </TouchableOpacity>
{/* 
   <TouchableOpacity style={{ justifyContent:'center',alignItems:'center',borderRadius:10,
   paddingTop:20,
        backgroundColor:'#4A1DD6',width:200,height:50}} onPress={()=>navigation.navigate('HomeTap')}>
       <Text style={{color:'#fff'}}>View Ticket</Text>
   </TouchableOpacity> */}
                
</SafeAreaView>
  )
}

export default PaySucc

const styles = StyleSheet.create({
    container: {
        flex:1,
        // padding:80,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#fff"
      },
      hotel: {
        width:300,
        height:250,
        borderRadius:10
      },
})