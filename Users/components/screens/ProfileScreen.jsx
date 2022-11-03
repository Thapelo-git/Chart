import React ,{useEffect,useState}from 'react'
import { StyleSheet, Text, View ,StatusBar,Image,SafeAreaView,TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ListItem from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
//https://www.marcusoft.net/2021/05/uploading-pictures-to-firebase-in-react-native.html
import { auth,db } from './firebase';
const ProfileScreen = ({navigation}) => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [phonenumber,setPhonenumber]=useState('')
    const [img,setImg]=useState('')
    const [uid,setUid]=useState('')
    const user = auth.currentUser.uid;
    useEffect(()=>{
        db.ref(`/users/`+ user).on('value',snap=>{
          
          setName(snap.val() && snap.val().name);
      setEmail(snap.val().email)
      setPhonenumber(snap.val().phonenumber)
    //   setImg(snap.val().img)
    setUid(snap.val().uid)
        })
      
        
      },[])

    const onSignout =()=>{
        
        auth.signOut()
        
    }
    return (
        <SafeAreaView style={styles.page}>
            <StatusBar
            backgroundColor="#0225A1"
            barStyle="light-content"
            />
        <View style={styles.header}>
        {/* <Ionicons name='chevron-back' size={20}/> */}
        <Text></Text>
                 <Text style={{fontSize:20}}></Text>
                
             <TouchableOpacity onPress={()=>navigation.navigate('EditProfile',{
                   email:email,name:name,phonenumber:phonenumber,uid:uid
             })}>
                 <View style={{borderColor:'grey',borderBottomWidth:1.5,}}>
                 <MaterialCommunityIcons name='pen' size={25}/>
                 </View>
            {/* <Image source={{url:img}}
                style={{height:80,width:80,borderRadius:40}}/> */}
                </TouchableOpacity>
        </View>
          <View style={styles.editBox}>
        <Image source={{ uri: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-600w-193292033.jpg'}}
                style={{height:120,width:120,borderRadius:60}}/>
                <View>
                <Text style={{fontSize:18,fontWeight:'bold',marginLeft:25,
            marginTop:5}}>{name}</Text>
             {/* <Text style={{fontSize:18,marginLeft:10,
            }}>{email}</Text> */}
             </View>
             </View>
       {/*
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',
        paddingRight:20}}>
            <Text></Text>
            <TouchableOpacity onPress={()=>navigation.navigate('EditProfile',{
                   email:email,name:name,phonenumber:phonenumber,uid:uid
             })}>
            
             <Ionicons name='pencil' size={20}/>
            </TouchableOpacity>
                
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
            <View>
        <Text style={{fontSize:17}}>Name</Text>
        <Text style={{fontSize:17}}>Contact</Text>
        <Text style={{fontSize:17}}>Email</Text>  
            </View>
        <View>
        <Text>{name}</Text>
        <Text>{phonenumber}</Text>
        <Text>{email}</Text>
        </View>
        </View>
        </View> */}
        <View style={{top:30}}>
        {/* <TouchableOpacity onPress={()=>navigation.navigate('Notification'
            )} style={styles.pagelist}>
        
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Ionicons name="notifications" size={24}/>
            <Text>     notifications</Text>
            </View>
            
            <Icon name="chevron-right" size={15}  />
            </TouchableOpacity> */}
       
       
        
        {/* <TouchableOpacity   style={styles.pagelist}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Icon name="credit-card-alt" size={15}  /> 
            <Text>     My Cards</Text>
            </View>
            
            <Icon name="chevron-right" size={15}  />
            </TouchableOpacity> */}
       
        
        <View style={styles.pagelist}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Entypo name="help" size={15}  /> 
            <Text>     Help</Text>
            </View>
            <Icon name="chevron-right" size={15}  />
        </View>
        
            <TouchableOpacity  onPress={()=>onSignout()} style={styles.pagelist}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Entypo name="log-out" size={15}  /> 
            <Text>     Log Out</Text>
            </View>
            
            <Icon name="chevron-right" size={15}  />
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    page:{
        padding:10
    },
    header:{
        // marginTop:1,
        flexDirection:'row',
        justifyContent:'space-between',
        // paddingHorizontal:10,
        
        
        
    },
    editBox:{
        // borderWidth:1,
        borderRadius:10,
        height:110,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
        
    },
    pagelist:{
        justifyContent:'space-between',
        padding:15,
        flexDirection:'row',
        
        
        top:70
    }
})
