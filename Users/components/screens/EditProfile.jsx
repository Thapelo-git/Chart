import React,{useState} from 'react'
import { StyleSheet, Text, View ,StatusBar,SafeAreaView,TextInput,Image,
    TouchableOpacity} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import Flatbutton from '../styles/button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { Formik } from 'formik'
import * as yup from 'yup'

// import * as ImagePicker from 'expo-image-picker';
import { auth,db } from './firebase'
import { storage } from './firebase'


const EditProfile = ({navigation,route}) => {
  const [name,setName]=useState(route.params.name)
  const [email,setEmail]=useState(route.params.email)
  const [phonenumber,setphonenumber]=useState(route.params.phonenumber)
  const [uid,setUid]=useState(route.params.uid)

    const user = auth.currentUser.uid;
    const itemRef= db.ref(`/users/`)
    const [selectedImage, setSelectedImage] = useState(null);
    const [isPasswordShow,setPasswordShow]=useState(false)
    const ReviewSchem=yup.object({
        name:yup.string().required().min(2),
        phonenumber:yup.string().required().min(10).max(10),
        email:yup.string().required().min(6),
        password:yup.string().required().min(6),
        confirmpassword:yup.string().required().min(6).oneOf([yup.ref('password'),null],'password does not match')
    })
    // let openImagePickerAsync = async () => {
    //     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    //     if (permissionResult.granted === false) {
    //       alert("Permission to access camera roll is required!");
    //       return;
    //     }
    
    //     let pickerResult = await ImagePicker.launchImageLibraryAsync();
    //     if (pickerResult.cancelled === true) {
    //         return;
    //       }
      
    //       setSelectedImage({ localUri: pickerResult.uri });
    //   }
      const [url,setUrl]=useState()
      const [progress, setProgress] = useState(0);
      // const handleUpload = () => {
      //   const uploadTask = storage.ref(`images/${selectedImage.name}`).put(selectedImage)
      //     ;
      //   uploadTask.on(
      //     "state_changed",
      //     snapshot => {
      //       const progress = Math.round(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       setProgress(progress);
      //     },
      //     error => {
      //       console.log(error);
      //     },
      //     () => {
      //       storage
      //         .ref("images")
      //         .child(selectedImage.name)
      //         .getDownloadURL()
      //         .then(url => {
      //           setUrl(url);
      //         });
      //     }
      //   );
      // };
      // const uploadImage = async () => {
      //   const { uri } = selectedImage;
      //   const filename = uri.substring(uri.lastIndexOf('/') + 1);
      //   const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        
      //   const task = storage
      //     .ref(filename)
      //     .putFile(uploadUri);
      //   // set progress state
      //   // task.on('state_changed', snapshot => {
      //   //   setTransferred(
      //   //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      //   //   );
      //   // });
      //   try {
      //     await task;
      //   } catch (e) {
      //     console.error(e);
      //   }
        
      //   Alert.alert(
      //     'Photo uploaded!',
      //     'Your photo has been uploaded to Firebase Cloud Storage!'
      //   );
      //   setImage(null);
      // };
      const editprofile=()=>{
        // itemRef.child(uid).update({name,email,phonenumber})
      
    //   if (selectedImage !== null) {
    //     return (
    //       <View style={styles.container}>
    //         <Image
    //           source={{ uri: selectedImage.localUri }}
    //           style={{height:120,width:120,borderRadius:60,}}
    //         />
 
    //       </View>
    //     );
    //   }
    db.ref('users').child(uid).update({name,email,phonenumber})
        .then(()=>db.ref('users').once('value'))
        .then(snapshot=>snapshot.val())
        .catch(error => ({
          errorCode: error.code,
          errorMessage: error.message
        }));
      }
    return (
        <SafeAreaView>
             <StatusBar
            backgroundColor="#0225A1"
            barStyle="light-content"
            />
            <View style={styles.headerContainer} 
            >
               
               <Feather name="arrow-left" size={30} 
             onPress={()=>navigation.goBack()} /> 
            
            <Text style={styles.headerTitle}></Text>
            </View>
            <View style={{marginLeft:120}}>
                {/* {
                   selectedImage?(<Image
              source={{ uri: selectedImage.localUri }}
              style={{height:120,width:120,borderRadius:60,}}
            />
                   ):(
                    <Image source={{ uri: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-600w-193292033.jpg'}}
                    style={{height:120,width:120,borderRadius:60,}}/>
                   ) 
                } */}
            <Image source={{ uri: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-600w-193292033.jpg'}}
                style={{height:120,width:120,borderRadius:60,}}/>
               {/*  https://aboutreact.com/react-native-firebase-in-app-messaging/ */}
                {/* <TouchableOpacity style={{marginLeft:90,marginTop:-20}}
               mode="contained" onPress={openImagePickerAsync}>
                <FontAwesome name='camera' size={29} color='grey'/>
                </TouchableOpacity> */}
            </View>
           
            <View style={{padding:20}}>
            <Formik
        initialValues={{name:name,phonenumber:phonenumber,email:email,password:'',confirmpassword:''}}
        validationSchema={ReviewSchem}
        >

        {(props)=>(
         <View
           >
                           <View style={styles.inputContainer}>
        <View style={styles.inputIconView}>
            <FontAwesome name='user'
            style={{color:'#fff',textAlign:'center',
        fontSize:18}}
            />
        </View>
            <TextInput
             style={styles.inputs}
             placeholder='Enter Last Name'
             value={name}
             onChangeText={(text)=>setName(text)}
            
             onBlur={props.handleBlur('name')}
             />
        
        </View>
        <Text style={{color:'red',marginTop:-10}}>{props.touched.name && props.errors.name}</Text>
                 <View style={styles.inputContainer}>
        <View style={styles.inputIconView}>
            <Icon name='phone'
            style={{color:'#fff',textAlign:'center',
        fontSize:18}}
            />
        </View>
            <TextInput
             style={styles.inputs}
             placeholder='Enter Phone Number'
             keyboardType='numeric'
             value={phonenumber}
             onChangeText={(text)=>setphonenumber(text)}
             
             onBlur={props.handleBlur('phonenumber')}
             />
        
        </View>
        <Text style={{color:'red',marginTop:-15}}>{props.touched.phonenumber && props.errors.phonenumber}</Text>
        <View style={styles.inputContainer}>
        <View style={styles.inputIconView}>
            <Icon name='email'
            style={{color:'#fff',textAlign:'center',
        fontSize:18}}
            />
        </View>
            <TextInput
             style={styles.inputs}
             placeholder='Enter Email'
             keyboardType='email-address'
             value={email}
             onChangeText={(text)=>setEmail(text)}
            
             onBlur={props.handleBlur('email')}
             />
        
        </View>
        <Text style={{color:'red',marginTop:-15}}>{props.touched.email && props.errors.email}</Text>
        {/* <View style={styles.inputContainer}>
        <View style={styles.inputIconView}>
            <Icon name='lock'
            style={{color:'#fff',textAlign:'center',
        fontSize:18}}
            />
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <TextInput
            secureTextEntry={isPasswordShow? false :true}
             style={styles.inputs}
             placeholder='Enter Password'
             onChangeText={props.handleChange('password')}
             value={props.values.password}
             onBlur={props.handleBlur('password')}
             />
         <Icon name={isPasswordShow?'eye-off':"eye"}
            style={{color:'black',textAlign:'center',
        fontSize:18,}}
           onPress={()=>setPasswordShow(!isPasswordShow)} />
            </View>
        </View>
        <Text style={{color:'red',marginTop:-15}}>{props.touched.password && props.errors.password}</Text>
        <View style={styles.inputContainer}>
        <View style={styles.inputIconView}>
            <Icon name='lock'
            style={{color:'#fff',textAlign:'center',
        fontSize:18}}
            />
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <TextInput
            secureTextEntry={isPasswordShow? false :true}
             style={styles.inputs}
             placeholder='Confirm Password'
             onChangeText={props.handleChange('confirmpassword')}
             value={props.values.confirmpassword}
             onBlur={props.handleBlur('confirmpassword')}
             />
         <Icon name={isPasswordShow?'eye-off':"eye"}
            style={{color:'black',textAlign:'center',
        fontSize:18,}}
           onPress={()=>setPasswordShow(!isPasswordShow)} />
            </View>
        </View>
        <Text style={{color:'red',marginTop:-15}}>{props.touched.confirmpassword && props.errors.confirmpassword}</Text> */}
        
        <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
            {/* onPress={()=>{uploadImage()}} */}
            <Flatbutton text='UPDATE' onPress={editprofile()}  />
      
            </View>
            </View>
            )}</Formik>
        </View>
        </SafeAreaView>
        
    )
}

export default EditProfile

const styles = StyleSheet.create({
    innerContainer:{
        marginTop:20
    },
    inputs:{
        borderBottomColor:'black',
        
         flex:0.8,
        paddingLeft:10,
        
    },
    inputContainer:{
        borderRadius:30,
        height:48,
        marginVertical:10,
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
    signupContainer:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    accountText:{
        // marginLeft:-30,
    },
    
})
