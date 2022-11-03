import React,{useState,useEffect,useRef} from 'react'
import { StyleSheet, Text, View,FlatList,TextInput, Image, ScrollView ,
  Animated, TouchableOpacity ,Alert,ImageBackground} from 'react-native'
//https://dribbble.com/shots/14463817-Car-Parking-mobile-app

import { db,auth } from './firebase.jsx';
import Entypo from 'react-native-vector-icons/Entypo'
import { } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import moment from 'moment'

const HistoryScreen = () => {
    const [searchtext,setSearchtext] = useState('');
    const [Booking,setBooking]=useState()
    const [cancelled,setCancelled]=useState()
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const user = auth.currentUser.uid;
  const [userid,setUserid]=useState()
  useEffect(()=>{
    
    
    db.ref('/TollPayment/').on('value',snap=>{
          
      const Booking=[]
         snap.forEach(action=>{
             const key=action.key
             const data =action.val()
             Booking.push({
                 key:key,
                 hotelimg:data.hotelimg,
                 totPrice:data.totPrice,
                 price:data.price,
                 Classes:data.Classes,
                 description:data.description,
                 hotelname:data.hotelname,
                 Status:data.Status,
                 userid:data.userid,
                 NoPlate:data.NoPlate,
                 
             })
            })
   
            console.log(user)
            
           
             if(user){
               const userinfor = Booking.filter(function(item){
                const itemData = item.userid?
       
  (  item.userid)
                :   ( '') 
                const textData = user;
                return itemData.indexOf( textData)>-1;

            })
            setBooking(userinfor)
              setFilteredDataSource(userinfor);
             setMasterDataSource(userinfor);
            // const text='Cancelled'
            // const Completed='Completed'
            // if(text && Completed){
            //   const newData = userinfor.filter(function(item){
            //     const itemData = item.Status ? item.Status
            //     :'';
            //     const textData = (text && Completed);
            //     return itemData.indexOf( textData)>-1;

            // })
          
            
            // }
             
              
             
            }
          
             
        //  })
     })
     
  },[])
  
  const handleDelete=(key)=>{
    Alert.alert('Confirm','Are you sure you want to delete?',[
      {text:'Yes',
     onPress:()=>db.ref('TollPayment').child(key).remove(),
    },
    {text:'No'},
    ]);
    

    }
  const onClick=(key)=>{
    db.ref('Booking').child(key).update({Status:'Completed'})
    .then(()=>db.ref('Booking').once('value'))
    .then(snapshot=>snapshot.val())
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message
    }))
  }

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
    var Status='Pending'
    const ItemView = ({item}) => {
      
        return (
          // Flat List Item
         <>
          
       {
        item.Status != 'Pending'?(
          <>
          
      
          <ScrollView>
          <View style={{width:230,height:380,margin: 20,
           justifyContent:'center',alignItems:'center'}}>
          <ImageBackground source={require('../images/ticket1.jpg')}
           style={{height:220,width:'100%',justifyContent:'center',alignItems:'center',
           padding:10}}>
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
   
          <View style={{width:'100%',}}><Text style={{color:'#fff'}}>- - - - - - - - - - - - - - - - - - - - - - - - - - </Text></View>
          <Image style={{height:40,width:150}} source={require('../images/Barcode.jpg')}/>
          
          <Text style={{color:"#fff"}}>{item.key}</Text>
          <Text style={{color:"#fff"}}>Ticket ID</Text>
          </ImageBackground>
          <View style={{alignItems:'center',width:'100%'}}>
        
          <View style={{alignItems:'center',justifyContent:'center',width:'100%',flexDirection:'row'}}>
          <View style={{height:30,width:70,justifyContent:'center',borderColor:'red',
          alignItems:'center',borderWidth:0.5}}  >
           {
        item.description == 'Cancelled'?(
          <Text style={{color:'red'}}>{item.description}</Text>
        ):(<Text style={{color:'green'}}>{item.Status}</Text>)
      }
          </View>
          <TouchableOpacity onPress={()=>handleDelete(item.key)}>
        <MaterialIcons name='delete' size={25} color='red'/>
        </TouchableOpacity>
          </View>
          </View>
          </View>
       
       
   
        
        
        </ScrollView>
        </>
        ):(<></>)
      }
        </>
      
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
           placeholder="Looking for previews hotel?"
           onChangeText={(text) => searchFilterFunction(text)}
           onClear={(text) => searchFilterFunction('')}
           value={searchtext}
           round
     
           /> */}
            {/* <View style={styles.header}>
                <Text style={{color:'#fff'}}>My History</Text>
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
        placeholder="Looking for previews payment?"
        onChangeText={(text) => searchFilterFunction(text)}
        />
        {/* <TouchableOpacity onPress={(text) => searchFilterFunction('')}>
       <Entypo name='circle-with-cross' size={20}/>
       </TouchableOpacity> */}
        </View>
        </View>
           <FlatList
           horizontal
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          
          renderItem={ItemView}
        />
        </View>
    )
}

export default HistoryScreen

const styles = StyleSheet.create({
  inputContainer:{
    flex:1,
    height:50,
    borderRadius:10,
    flexDirection:'row',
    backgroundColor:'#eee',
    alignItems:'center',
    paddingHorizontal:20, 
},header: {
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
