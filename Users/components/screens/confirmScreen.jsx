import React ,{useState}from 'react'
import { StyleSheet, Text, View ,Animated,TouchableOpacity,
ScrollView,Pressable,Dimensions,SafeAreaView,TextInput, Image} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Flatbutton from "../../../Tollplaz/components/styles/button"
import { db,auth } from './firebase'
import moment from 'moment'
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const ConfirmScreen = ({navigation,route}) => {
    
       const room=route.params.room
          const [roomnumber,setRoomnumber]=useState(0)  
          const hotelinfor=route.params.hotelinfor
          const diff=route.params.diff
          const Phonenumber=route.params.Phonenumber
          const checkin=route.params.checkin
          const checkout=route.params.checkout
          const hotelname=hotelinfor.name
          const [adultPlus,setAdultPlus]=useState(1)
          const roomT=room.bedType
          const hotelimg=hotelinfor.url
          const [childPlus,setChildPlus]=useState(0)
          const [Status,setStatus]=useState('Pending')
          const [description,setDescription]=useState('Successfully paid booking')
          const [statement,setStatement]=useState('Successfully paid booking'+checkin+' '+checkout)
  
          var totPrice=0
          const datetoday=moment(new Date()).format('YYYY/MM/DD')
          const addBooking=()=>{
        
            const userid= auth.currentUser.uid
    
            
            db.ref('Booking').push({
                userid,Status,
                description,hotelname,
                diff,checkin,checkout,adultPlus,roomnumber,totPrice,roomT,hotelimg,
                datetoday
           
            })
      
        }
    return (
        
      <SafeAreaView >
              
                <View style={{
                  flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                   <TouchableOpacity onPress={()=>navigation.goBack()}> 
                  <Feather name="arrow-left" size={30}/>
                  </TouchableOpacity>
                  <Text style={styles.headerTitle}>Room</Text>
                </View>
                <View style={{padding:10,width:screenWidth}}>
                <Image source={{uri:room.roomurl}} style={{height:190,width:'100%',borderRadius:7}}/>
                </View>
                
             
              <View style={{
                  flexDirection:'row',paddingHorizontal:20,justifyContent:'space-between'}} >
                    <View>
                    <Text style={{color:'#4A1DD6', fontWeight:'bold', fontSize:18}}>Room Type</Text>
                    <View style={{paddingVertical:10}}>
                    <Text style={{color:'gray'}}>{room.bedType}</Text>
                    </View>
              </View>
              <View>
              <Text style={{color:'#4A1DD6', fontWeight:'bold', fontSize:18,marginRight:40}}>Capacity</Text>
              <View style={{paddingVertical:10}}>
                  
                  <Text style={{color:'gray'}}>{room.roomname}</Text>
              </View>
              </View>
               
               </View>
               <View style={{
                  flexDirection:'row',paddingHorizontal:20,justifyContent:'space-between',}} >
                    <View>
                    <Text style={{color:'#4A1DD6', fontWeight:'bold', fontSize:18 }}>Check In</Text>
                    <View style={{paddingVertical:10}}>
                    <Text style={{color:'gray'}}>{checkin}</Text>
                    </View>
              </View>
              <View>
              <Text style={{color:'#4A1DD6', fontWeight:'bold', fontSize:18, marginRight:30}}>Check Out</Text>
              <View style={{paddingVertical:10}}>
                  
                  <Text style={{color:'gray'}}>{checkout}</Text>
              </View>
              </View>
               
               </View>
              
                   
                  
               <View style={{flexDirection:'row' ,paddingHorizontal:20, justifyContent:'space-between'}}>
               <View>
               <Text style={{color:'#4A1DD6', fontWeight:'bold', fontSize:18}}>No of Rooms </Text>
      <View style={{flexDirection:'row',justifyContent:'space-around',
    borderRadius:10,padding:10,alignItems:'center',backgroundColor:'#EDEDED',
    elevation:2, marginTop:10}}>
                <Pressable style={[
                  styles.buttonAdding,{backgroundColor: '#fff',flexDirection:"row"}
                ] }
              onPress={()=>setRoomnumber(Math.min(hotelinfor.size,roomnumber+1))}>
                <Feather
                       name="plus" size={22}
                       color='black'
                       />
            
                </Pressable>
                <Text style={{fontSize:21}}> {roomnumber} </Text>
                <Pressable style={[
                  styles.buttonAdding,{backgroundColor: '#fff',flexDirection:"row"}
                ] }
              onPress={()=>setRoomnumber(Math.max(0,roomnumber-1))}>
                <Feather
                       name="minus" size={22}
                       color='black'
                       />
            
                </Pressable>
                </View>
                </View>

                <View>
               <Text style={{color:'#4A1DD6', fontWeight:'bold', fontSize:18}}> No. Of Guests</Text>
      <View style={{flexDirection:'row',justifyContent:'space-around',
    borderRadius:10,padding:10,alignItems:'center',backgroundColor:'#EDEDED',
    elevation:2, marginTop:10}}>
                <Pressable style={[
                  styles.buttonAdding,{backgroundColor: '#fff',flexDirection:"row"}
                ] }
              onPress={()=>setAdultPlus(Math.max(0,adultPlus+1))}>
                <Feather
                       name="plus" size={22}
                       color='black'
                       />
            
                </Pressable>
                <Text style={{fontSize:21}}> {adultPlus} </Text>
                <Pressable style={[
                  styles.buttonAdding,{backgroundColor: '#fff',flexDirection:"row"}
                ] }
              onPress={()=>setAdultPlus(Math.max(1,adultPlus-1))}>
                <Feather
                       name="minus" size={22}
                       color='black'
                       />
            
                </Pressable>
                </View>
                </View>
               
                </View>
                {
                  ( roomnumber > adultPlus  ) ?(
                    <Text style={{color:'red'}}>Only 1 or 2 guests per room</Text>
                  ):(
                    <></>
                  )
                }
                {
                  (roomnumber+roomnumber) < adultPlus?(
                    <Text style={{color:'red'}}>Only 1 or 2 guests per room</Text>
                  ):(
                    <></>
                  )
                }
               <Text style={{marginTop:30}}>{roomnumber} rooms x {diff} nights</Text>
                <View style={{paddingVertical:10,paddingHorizontal:18,flexDirection:'row',
           justifyContent:'space-between',padding:20,borderWidth:3, marginTop:20, borderColor:'#4A1DD6',}}>
                <Text style={{fontSize:21}}>Total    </Text>
                <Text style={{fontSize:20}}>R  {totPrice=(room.beds * roomnumber)*diff}</Text>
                {/* <View style={{justifyContent:'space-between',
    borderRadius:10,padding:10,alignItems:'center',backgroundColor:'#EDEDED',
    elevation:2,}}>88648132230
      <Text style={{fontSize:25}}>{room.beds * roomnumber}</Text>
    </View> */}
    </View>
                <View style={{left:70, marginTop:30}}>
                {
                  ( roomnumber > adultPlus  ) ?(
                    <TouchableOpacity disabled={true}
                    onPress={()=>navigation.navigate('Creditcard')}  >
            <View style={styles.buttonstyle}>
            <Text style={styles.buttonText}>Book Now</Text>
            </View>
        </TouchableOpacity>
                  ):(
                    (roomnumber+roomnumber) < adultPlus?(
                      <TouchableOpacity disabled={true}
                       onPress={()=>navigation.navigate('Creditcard')}  >
                    <View style={styles.buttonstyle}>
                    <Text style={styles.buttonText}>Book Now</Text>
                    </View>
                </TouchableOpacity>
                    ):(
                      <TouchableOpacity  onPress={()=>navigation.navigate('PaymentScreen',{
                        hotelinfor:hotelinfor,diff:diff,
                        checkin:checkin,checkout:checkout,
                        adultPlus:adultPlus,roomnumber:roomnumber,
                        totPrice:totPrice,room:room,roomT:roomT,
                        Phonenumber:Phonenumber,
                        
                      })}  >
                    <View style={styles.buttonstyle}>
                    <Text style={styles.buttonText}>Book Now</Text>
                    </View>
                </TouchableOpacity>
                    )
                    
                  
                  )
                }
                  {/* {
                  (roomnumber+roomnumber) < adultPlus?(
                    <TouchableOpacity disabled={true}
                     onPress={()=>navigation.navigate('Creditcard')}  >
            <View style={styles.buttonstyle}>
            <Text style={styles.buttonText}>Book Now</Text>
            </View>
        </TouchableOpacity>
                  ):(
                   <></>
                  )
                }
                
                 */}
                </View>
                
              </SafeAreaView>
            
    )
}

export default ConfirmScreen

const styles = StyleSheet.create({
  headerTitle:{
    marginLeft:130
  },
  buttonstyle:{
    borderRadius:10,
    paddingVertical:10,
    width:200,
    backgroundColor:'#4A1DD6',
    

},
buttonText:{
    color:'#fff',
    fontWeight:'normal',
    // textTransform:'uppercase',
    fontSize:20,
    fontStyle:'normal',
    textAlign:'center'
},
})
