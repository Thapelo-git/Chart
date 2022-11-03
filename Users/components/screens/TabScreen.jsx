import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen';

import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PayHistory from './PayHistory';
import ProfileScreen from './ProfileScreen';
// import ProfileScreen from './ProfileScreen';
// import PayHistory from './PayHistory';
// import AddVehicle from './AddVehicle';
const Tab = createMaterialBottomTabNavigator();


    
const TabScreen = () => {
    return (
        <Tab.Navigator
        initialRouteName="HomeScreen"
        activeColor="#0225A2"
        barStyle={{
            backgroundColor:'#fff',
              borderRadius: 15, elevation: 6, alignItems:'center', justifyContent: 'center', position:'absolute', marginVertical:-10,marginHorizontal:25, height:65,paddingBottom:10, paddingLeft:10, paddingRight:10,bottom:20, paddingTop:10
          }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen}
            options={{
                tabBarLabel:'Home',
                tarBarColor:'#4A1DD6',
                tabBarIcon:({color}) =>
            <Icon name="ios-home" color={color} size={26}/>}}/>
           
           
            <Tab.Screen name="Bookings" component={PayHistory}
            options={{
                tabBarLabel:'Payments',
                tarBarColor:'#4A1DD6',
                tabBarIcon:({color}) =>
                <Icon name="ios-wallet" color={color} size={26}/>}}/>
             <Tab.Screen name="ProfileScreen" component={ProfileScreen}
            options={{
                tabBarLabel:'Profile',
                tarBarColor:'#4A1DD6',
                tabBarIcon:({color}) =>
            <FontAwesome name="user" color={color} size={26}/>}}/>
        </Tab.Navigator> 
    )
}

export default TabScreen

const styles = StyleSheet.create({})
