
import React,{useState,useEffect,useRef} from 'react'
import { StyleSheet, Text, View,FlatList,TextInput, Image, ScrollView ,
  Animated, TouchableOpacity} from 'react-native'
import { SearchBar } from 'react-native-elements';
import Hotels from '../onbording/Hotels.jsx'
import NearHotels from '../onbording/NearHotels.jsx';
import { COLORS } from '../styles/Colors'
import { db,auth } from './firebase.jsx';
import Entypo from 'react-native-vector-icons/Entypo'
import { } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Cancellation from './RouteN1.jsx';
import moment from 'moment';
const Notification = () => {
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
    
    
    db.ref('/Booking/').on('value',snap=>{
          
      const Booking=[]
         snap.forEach(action=>{
             const key=action.key
             const data =action.val()
             Booking.push({
                 key:key,
                 hotelimg:data.hotelimg,
                 totPrice:data.totPrice,
                 checkin:data.checkin,
                 checkout:data.checkout,
                 description:data.description,
                 hotelname:data.hotelname,
                 Status:data.Status,
                 userid:data.userid,
                 diff:data.diff,
                 datetoday:data.datetoday

                 
             })
            })
    
    if(user){
      const userinfor = Booking.filter(function(item){
       const itemData = item.userid?

(  item.userid)
       :   ( '')
       const textData = user;
       return itemData.indexOf( textData)>-1;

   })
          console.log(userinfor,'ytrtdyrhtd')
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
             console.log(newData)
            }
          }
          
             
        
     })
  },[])
    const [searchtext,setSearchtext] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
   

    const updateBooking = (key, status) => {

      db.ref('Booking').child(key).update({Status:status})
      .then(()=>db.ref('BookEvent').once('value'))
      .then(snapshot=>snapshot.val())
      .catch(error => ({
        errorCode: error.code,
        errorMessage: error.message
      }));
   
      
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
          <View >
            <ScrollView>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Text></Text>
          {/* <Text
            style={{color:'#032B7A'}}
            onPress={() => getItem(item)}>
              
              {item.hotelname.toUpperCase()}

          </Text> */}
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{padding:10}}>
          <Image source={{uri:item.hotelimg}} style={{height:120,width:120,borderRadius:10}}/>
          </View>
          <View style={{marginTop:5}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text
            style={{color:'#032B7A',fontWeight:'bold',fontSize:18}}
            onPress={() => getItem(item)}>
              
              {item.hotelname}

          </Text>
          <Text>                           </Text>
          <Text>{moment(item.datetoday).fromNow()}</Text>
          </View>
          <Text >{item.diff} nights</Text>
            <View style={{flexDirection:'row'}}>
          
          <Text>{item.checkin}  -  {item.checkout}</Text>
          </View>
          <Text>{item.description}</Text>
       
              
          <Text>Price  {item.totPrice}</Text>
         
          
          </View>
          </View>
          </ScrollView>
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
     
           /> */}
           {/* <View style={styles.header}>
                <Text style={{color:'#fff'}}>My Bookings</Text>
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
        placeholder="Looking for previews hotel?"
        onChangeText={(text) => searchFilterFunction(text)}
        />
        {/* <TouchableOpacity onPress={(text) => searchFilterFunction('')}>
       <Entypo name='circle-with-cross' size={20}/>
       </TouchableOpacity> */}
        </View>
        </View>
           <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
         <Cancellation
     onCancel={()=>{toggleAnimation()}}
     animation={showAnimation}/>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
  inputContainer:{
    flex:1,
    height:50,
    borderRadius:10,
    flexDirection:'row',
    backgroundColor:COLORS.lightgray,
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


