
import React,{useState,useEffect,useRef} from 'react'
import { StyleSheet, Text, View,FlatList,TextInput, Image, ScrollView ,
  Animated, TouchableOpacity,Alert, ImageBackground} from 'react-native'



import { db,auth } from './firebase.jsx';
import Entypo from 'react-native-vector-icons/Entypo'
import { } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'

import moment from 'moment';
const Bookings = () => {
  const [animationValue,setAnimationValue]=useState(-1000)
  const showAnimation= useRef(new Animated.Value(animationValue)).current
  
  const toggleAnimation=()=>{
    
    const val= animationValue === 0 ? -1000 : 0
    Animated.timing(showAnimation,{
      useNativeDriver: false,
      toValue:val,
      duration:350

    }).start()
    setAnimationValue(val)
  }
  const [name,setName]=useState('')
  const [Booking,setBooking]=useState()
  const user =auth.currentUser.uid
  useEffect(()=>{
    
    
    db.ref('/TollPayment/').on('value',snap=>{
          
      const Booking=[]
         snap.forEach(action=>{
             const key=action.key
             const data =action.val()
             Booking.push({
                 key:key,
                 hotelimg:data.hotelimg,
                 price:data.price,
                Classes:data.Classes,
                 description:data.description,
                 hotelname:data.hotelname,
                 Status:data.Status,
                 userid:data.userid,
                 NoPlate:data.NoPlate,

                 
             })
            })
    // db.ref('/users/'+ user).on('value',snap=>{
    //  setBooking(snap.val().Booking)
    
    // })
    if(user){
      const userinfor = Booking.filter(function(item){
       const itemData = item.userid?

(  item.userid)
       :   ( '')
       const textData = user;
       return itemData.indexOf( textData)>-1;

   })
         
             const text='Pending'
             if(text){
              const newData = userinfor.filter(function(item){
                  const itemData = item.Status ? item.Status
                  :'';
                  const textData = text;
                  return itemData.indexOf( textData)>-1;
  
              })
              setBooking(newData)
              setFilteredDataSource(newData);
             setMasterDataSource(newData);
             console.log(newData,'booooking')
            }
          }
          
             
        
     })
  },[])
    const [searchtext,setSearchtext] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
   
const day=moment(new Date()).format('YYYY/MM/DD')
    const updateBooking = (key, status) => {
      Alert.alert('Confirm','Are you sure you want to cancel?',[
        {text:'Yes',
       onPress:()=>db.ref('TollPayment').child(key).update({Status:status,description:status})
       .then(()=>db.ref('TollPayment').once('value'))
       .then(snapshot=>snapshot.val())
       .catch(error => ({
         errorCode: error.code,
         errorMessage: error.message
       })),
      },
      {text:'No'},
      ]);
      
   
      
    };
    const searchFilterFunction =(text)=>{
        if(text){
            const newData = masterDataSource.filter(function(item){
                const itemData = item.hotelname ? item.hotelname.toUpperCase()
                :''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf( textData)>-1;

            })
            setFilteredDataSource(newData);
            setSearchtext(text)
        }else {
            setFilteredDataSource(masterDataSource);
            setSearchtext(text)
        }
    }
    const ItemView = ({item}) => {
        return (
           // Flat List Item
           <View style={{width:230,height:380,margin: 20,
           justifyContent:'center',alignItems:'center'}}>
          <ImageBackground source={require('../images/ticket1.jpg')}
           style={{height:220,width:220,justifyContent:'center',alignItems:'center',
           margin:10}}>
            {/* <Text style={{color:"#fff"}}>Ticket ID{item.key}</Text> */}
            <View style={{justifyContent:'flex-start',alignItems:'flex-start',width:'100%'}}>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',}}>
            <Text
            style={{color:'#fff',fontWeight:'bold',}}
            >  
              Tollgate Name
          </Text>
            <Text  style={{color:'#fff',}}>  {item.hotelname} </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'stretch',}}>
            <View>
            <Text
            style={{color:'#fff',fontWeight:'bold',}}
            >  
              Class No:   
          </Text>
            <Text  style={{color:'#fff',}}>  {item.Classes} </Text>
            </View>
            <View>

            </View>
            <View>
            <Text
            style={{color:'#fff',fontWeight:'bold',}}
            >  
              Price:
          </Text>
            <Text  style={{color:'#fff',}}>  {item.price} </Text>
            </View>
            <View>
              
            </View>
            </View>
            </View>

           <Text
            style={{color:'#fff',fontWeight:'bold',}}
            >  
              Number Plate:
          </Text>
            <Text  style={{color:'#fff',}}>  {item.NoPlate} </Text>
   
          <View style={{width:'100%',}}><Text style={{color:'#fff'}}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - </Text></View>
          <Image style={{height:40,width:150}} source={require('../images/Barcode.jpg')}/>
          
          <Text style={{color:"#fff"}}>{item.key}</Text>
          <Text style={{color:"#fff"}}>Ticket ID</Text>
          </ImageBackground>
          <View style={{alignItems:'center'}}>
          <Text
            style={{fontWeight:'bold',}}
            >  
              Information
          </Text>
          <Text  > 1. Cancellation of
             payment must
             be done at least 2 hours before 
            arrival ,there will be no refund
          </Text>
         
          <View style={{alignItems:'center',justifyContent:'center',width:'100%'}}>
          <TouchableOpacity style={{height:30,width:70,justifyContent:'center',borderColor:'red',
          alignItems:'center',borderWidth:0.5}}  onPress={()=>updateBooking(item.key,'Cancelled',item.checkout)}>
          <Text style={{color:'red'}}>Cancel</Text>
          </TouchableOpacity>
          </View>
          </View>
          </View>
        );
      };
    
      const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
      };
    
      const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.name);
      };
    
    return (
        <View>
           {/* <SearchBar
           placeholder="Looking for your bookings?"
           onChangeText={(text) => searchFilterFunction(text)}
           onClear={(text) => searchFilterFunction('')}
           value={searchtext}
           round
     https://dribbble.com/shots/18357823-Parking-Mobile-app
           /> */}
           {/* <View style={styles.header}>
                <Text style={{color:'#fff'}}>My Payments</Text>
                </View> */}
           <View style={{
            marginTop:20,
            flexDirection:'row',
            paddingHorizontal:20,
        }}>
        <View style={styles.inputContainer}>
        <Ionicons name="search" size={24}/>
        <TextInput 
        style={{fontSize:18,flex:1,marginLeft:10}}
        placeholder="Looking for your payments?"
        onChangeText={(text) => searchFilterFunction(text)}
        />
        {/* <TouchableOpacity onPress={(text) => searchFilterFunction('')}>
       <Entypo name='circle-with-cross' size={20}/>
       </TouchableOpacity> */}
        </View>
        </View>
        {/* <View style={{padding:10,width:'100%'}}> */}
           <FlatList
          data={filteredDataSource}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingLeft: 20 }}
     
          renderItem={ItemView}
        />
        {/* </View> */}
         {/* <Cancellation
     onCancel={()=>{toggleAnimation()}}
     animation={showAnimation}/> */}
        </View>
    )
}

export default Bookings

const styles = StyleSheet.create({
  inputContainer:{
    flex:1,
    height:50,
    borderRadius:10,
    flexDirection:'row',
    backgroundColor:'#eee',
    alignItems:'center',
    paddingHorizontal:20, 
},
header: {
  width:'100%',
  height:50,
  paddingVertical: 10,
  // borderRadius:10,
  alignItems:'center',
  backgroundColor: '#0225A1',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  marginBottom:12,
  justifyContent:'center',
 
  },
})


