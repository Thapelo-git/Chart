// import React,{useState,useEffect,useRef} from 'react'
// import MapView, { PROVIDER_GOOGLE ,Marker} from "react-native-maps";
// import { StyleSheet, Text, View,FlatList,TextInput, Image, ScrollView ,
//   Animated, TouchableOpacity} from 'react-native'
//   import Feather from 'react-native-vector-icons/Feather'
// const MapScreen=({navigation})=>{
//     const coordinates = {  latitude:-23.896172,
//         longitude:29.448626,
//         latitudeDelta:0.015,
//         longitudeDelta:0.0121,}
//  return(
// <>
// <View style={styles.headerContainer} 
//             >
//                <View style={{backgroundColor: 'white',
// opacity: 0.7,width:30,
//       height:30,justifyContent:'center',alignItems:'center',
//       borderRadius:10,}}>
//                <Feather name="arrow-left" size={30} color='black'
//              onPress={()=>navigation.goBack()} /> 
//              </View>
//             <Text style={styles.headerTitle}></Text>
//             </View>
//             <View style={{flex:1,
//             backgroundColor:"#fff",alignItems:'center',justifyContent:'center'}}>
//                 <MapView
//                 style={styles.map}
//                 provider={PROVIDER_GOOGLE}
//               //  initialRegion={list.coordinates}
//               region={coordinates}
//               >
//                   <Marker coordinate={coordinates}
//                   />
               
//                 </MapView>
//             </View>
// </>
//  )   
// }
//  export default MapScreen
//  const styles = StyleSheet.create({
  
//     headerContainer:{
//       top:10,
//       flexDirection:'row',justifyContent:'space-between',
//       alignContent:'center',
//       height:60,
      
  
//     },
//     map:{...StyleSheet.absoluteFillObject},
//    buttonstyle:{
//   borderRadius:10,
//   paddingVertical:10,
//   width:200,
//   backgroundColor:'#4A1DD6',
  

// },
// })