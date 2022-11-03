import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import ForgetPassword from './components/screens/ForgetPassword';
import TabScreen from './components/screens/TabScreen';
import HotelDetails from './components/screens/HotelDetails';
import AddVehicle from './components/screens/AddVehicle';
import PaymentScreen from './components/screens/PaymentScreen';
//https://dribbble.com/shots/19391326-Parking-mobile-app-concept-showcase
import ComfirmPay from './components/screens/ComfirmPay';
import Creditcard from './components/screens/Creditcard';
import PaySucc from './components/screens/PaySucc';
import ProfileScreen from './components/screens/ProfileScreen';
import EditProfile from './components/screens/EditProfile';
import { auth } from './components/screens/firebase';
const Stack =createStackNavigator()
export default function App({navigation}) {
  const [signedIn,setSignedIn]=useState(false)
 

  auth.onAuthStateChanged((user)=>{
    if(user){
        setSignedIn(true);
       console.log(user.uid,"user------------")
     
    }else{
     
        setSignedIn(false);
    }
});
  return (
    
    <NavigationContainer>
      {!signedIn ?(
        <>
      <Stack.Navigator screenOptions={{headerShown:true}}>
      <Stack.Screen name='Login' options={{headerShown:false}} component={Login}/>
      <Stack.Screen name='Register' options={{headerShown:false}} component={Register}/>
      <Stack.Screen name='ForgetPassword' options={{headerShown:false}} component={ForgetPassword}/>
      </Stack.Navigator>
      </>
      ):(
        <>
        <Stack.Navigator >
      <Stack.Screen name='TabScreen' options={{headerShown:false}} component={TabScreen}/>
      <Stack.Screen name='HotelDetails' options={{headerShown:false}} component={HotelDetails}/>
      <Stack.Screen name='AddVehicle' options={{headerShown:false}} component={AddVehicle}/>
      <Stack.Screen name='ComfirmPay' options={{headerShown:false}} component={ComfirmPay}/>
      <Stack.Screen name='PaymentScreen' options={{headerShown:false}} component={PaymentScreen}/>
      <Stack.Screen name='Creditcard' options={{headerShown:false}} component={Creditcard}/>
      <Stack.Screen name='PaySucc' options={{headerShown:false}} component={PaySucc}/>
      <Stack.Screen name='ProfileScreen' options={{headerShown:false}} component={ProfileScreen}/>
      <Stack.Screen name='EditProfile' options={{headerShown:false}} component={EditProfile}/>
      </Stack.Navigator>
      </>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
