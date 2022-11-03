import React,{useEffect, useState,useRef} from 'react'

import { SafeAreaView,FlatList, StyleSheet, Text, View ,Picker,ScrollView,
  Pressable,TextInput, Image,TouchableOpacity,Animated} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Hotels from '../onbording/Hotels'
import Flatbutton from '../../../Tollplaz/components/styles/button'
import ConfirmScreen from './confirmScreen'

const CheckAvailability = ({navigation,route}) => {
  const [roomnumber,setRoomnumber]=useState(0)
  const [roomtwo,setRoomtwo]=useState(0)
  const [roomthree,setRoomthree]=useState(0)
  const [roomfour,setRoomfour]=useState(0)
  // const [count1,setcount1]=useState(1)
  const [count2,setcount2]=useState(1)
  const [pickerindex,setpickerindex]=useState(0)
    const [sorts,setSorts]=useState('')
    
    const childPlus=route.params.childPlus
    const diff=route.params.diff
    const adultPlus=route.params.adultPlus
    const checkin=route.params.checkin
    const checkout=route.params.checkout
const Phonenumber=route.params.Phonenumber
    const hotelinfor=route.params.hotelinfor
   const roominfor=hotelinfor.room
   const roominfor2=hotelinfor.room2
   const [animationValue,setAnimationValue]=useState(-1000)
  const showAnimation= useRef(new Animated.Value(animationValue)).current
  console.log(hotelinfor.room)
  const toggleAnimation=()=>{
    
    const val= animationValue === 0 ? -1000 : 0
    Animated.timing(showAnimation,{
      useNativeDriver: false,
      toValue:val,
      duration:350

    }).start()
    setAnimationValue(val)
  }
    return (
        <SafeAreaView >
            <View style={styles.header}>
            <View style={{
            marginTop:10,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'stretch',
            // paddingHorizontal:20,
        }}>
           <Feather name="arrow-left" size={20} color='#fff'
             onPress={()=>navigation.goBack()} /> 
      
        </View>
        
                </View>
          
             {/* <View style={{flexDirection:'row',
      height:30,justifyContent:'flex-start',alignItems:'center',
      }}>
         
               <Feather name="arrow-left" size={30} color='#000'
             onPress={()=>navigation.goBack()} /> 
             
            <Text style={styles.headerTitle}>Bookings</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center'}}> */}
            {/* <Text style={styles.titles}>Sort By</Text>
              <Picker 
              selectedValue={sorts}
              
              onValueChange={(value,index)=>setSorts( value)}
              >
                  <Picker.Item label='Lowest Price' value='Lowest Price'/>
                  <Picker.Item label='Highest Price' value='Highest Price'/>
               
              </Picker> */}
              {/* </View> */}
              {/* <Text style={styles.text}> {price.price}</Text> */}
            
                 
                    {
                     hotelinfor.room.map((item)=>
                     <View >
            <ScrollView>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Text></Text>
         
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{paddingHorizontal:15}}>
          <Image source={{uri:item.roomurl}} style={{height:120,width:160,borderRadius:10}}/>
          </View>
          <View style={{}}>
          <Text
            style={{color:'#0225A1',fontWeight:'bold', fontSize:18}}
            >
              
              {item.roomname.toUpperCase()}

          </Text>
            <View style={{flexDirection:'row'}}>
              {/* <Ionicons name='location-sharp' size={21}/> */}
          <Text style={{color:'gray', fontSize:18}}>{item.bedType}</Text>
          </View>
          {/* <Text>Successfully paid booking</Text> */}
       
              
          <Text style={{color:'gray', fontSize:18}}>R{item.beds}</Text>
          <View style={{flexDirection:'row', alignContent:'flex-end'}}>
                      <Text>{hotelinfor.size} Available rooms</Text>

                      
                    
                    
          </View>
          <TouchableOpacity   onPress={()=>navigation.navigate('confirmScreen',{room:item,
          hotelinfor:hotelinfor,diff:diff,adultPlus:adultPlus,childPlus:childPlus,checkin:checkin,
          checkout:checkout,Phonenumber:Phonenumber})}>


        <AntDesign name='rightcircleo' size={30} color='#0225A1' style={{marginLeft:120, marginBottom:10}}/>
          </TouchableOpacity>
          
          </View>
          </View>
          </ScrollView>
          </View>
                //         <View style={{height:100,backgroundColor:'#eee'}}>
                //         <View style={styles.cardItemContainer}>
                //         <View style={{width:90,
                //         height:80,marginLeft:-10}}>
                //         <Image  source={{uri:text.roomurl}} style={{height:'100%',width:'100%',borderRadius:10,top:10}}/>
                //         </View>
                //         <View style={{flex:1}}>
                //         <Text style={{fontSize:16,fontWeight:'bold'}}>{text.roomname}</Text>
                          
                //           <Text >{text.bedType}</Text>
                          
                          
                   
                //         <Text style={{fontSize:16,fontWeight:'bold'}}>Price R {text.beds}</Text>
                        
                       
                //         </View>
                        
                //            <View style={{width:80}}>
                           
                //   <View style={{flexDirection:'row',justifyContent:'space-between',
                // borderRadius:10,padding:10,alignItems:'center',backgroundColor:'#EDEDED',
                // elevation:2,}}>
                //             <Pressable style={[
                //               styles.buttonAdding,{backgroundColor: '#fff',flexDirection:"row"}
                //             ] }
                //           onPress={()=>setRoomnumber(Math.max(0,roomnumber+1))}>
                //             <Feather
                //                    name="plus" size={22}
                //                    color='black'
                //                    />
                        
                //             </Pressable>
                //             <Text style={{fontSize:21}}> {roomnumber} </Text>
                //             <Pressable style={[
                //               styles.buttonAdding,{backgroundColor: '#fff',flexDirection:"row"}
                //             ] }
                //           onPress={()=>setRoomnumber(Math.max(0,roomnumber-1))}>
                //             <Feather
                //                    name="minus" size={22}
                //                    color='black'
                //                    />
                        
                //             </Pressable>
            
                //             </View>
                //             </View>
                           
                //         </View>
                //         </View>
               
                      )
                    }
                    
         
   
   
               
        </SafeAreaView>
    )
}

export default CheckAvailability

const styles = StyleSheet.create({
    buttonAdding:{
        // borderWidth:1,
        // width:30,
        // height:30,
        // borderRadius:15,
        // borderColor:'black',
        // justifyContent:'center',
        // alignItems:'center'
    },
    inputContainer:{
      borderRadius:30,
      height:48,
      marginVertical:12,
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
      elevation:2,
      

  },
  inputIconView:{
      width:50,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#4A1DD6',
      height:'100%',
      borderRadius:30,
      alignSelf:'center',
      borderTopRightRadius:0,
      borderBottomRightRadius:0,
      elevation:2,
  },
  buttonstyle:{
    borderRadius:5,
   marginStart:80,
    width:100,
    backgroundColor:'#4A1DD6',
    

},
buttonText:{
    color:'#fff',
    fontWeight:'normal',
    // textTransform:'uppercase',
    fontSize:16,
    fontStyle:'normal',
    textAlign:'center'
},
headerTitle:{
  marginLeft:130
},
cardItemContainer:{
  flexDirection:'row',
  alignItems:'center',
  marginTop:-5,
  paddingHorizontal:12,
 
  borderRadius:10,
},
header: {
  width:'100%',
  height:90,
  // paddingVertical: 10,
  // borderRadius:10,
  // alignItems:'center',
  backgroundColor: '#0225A1',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  marginBottom:12,
  // justifyContent:'center',
  // flexDirection:'row',
  

 
  },
})
