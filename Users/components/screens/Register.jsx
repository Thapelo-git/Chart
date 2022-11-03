import React,{useState}from 'react'
import { View,SafeAreaView, Text ,StatusBar,Image,StyleSheet,
    TextInput,TouchableOpacity,CheckBox, ScrollView,Alert, ActivityIndicator,ToastAndroid} from 'react-native';
import Separator from '../onbording/Separator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as yup from 'yup' 
import { Formik } from 'formik'
import Flatbutton from '../styles/button';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { auth,db } from './firebase';
const Register = ({navigation}) => {
    const [isPasswordShow,setPasswordShow]=useState(false)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const ReviewSchem=yup.object({
        name:yup.string().required().min(2),
        phonenumber:yup.string().matches(phoneRegExp,'Phone number is not valid'),
        email:yup.string().required().min(6),
        password:yup.string().required().min(6),
        confirmpassword:yup.string().required().min(6).oneOf([yup.ref('password'),null],'password does not match')
    })
    const addUser= async (data)=>{
        try{
          const {uid,email,password,name,phonenumber} =data
  await auth.createUserWithEmailAndPassword(
      email.trim().toLowerCase(),password
    ).then(res =>{
       
          db.ref(`/users`).child(res.user.uid).set({
            name:name,
            email:email.trim().toLowerCase(),
            phonenumber:phonenumber,
            uid:res.user.uid
          })
          res.user.sendEmailVerification()
          })
        }
        catch(error){
          if(error.code === 'auth/email-already-in-use'){
            Alert.alert(
              'That email address is already inuse'
            )
          }
          if(error.code === 'auth/invalid-email'){
            Alert.alert(
              'That email address is invalid'
            )
          }
          else{
            Alert.alert(error.code)
          }
          
        }
        
      }
  
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar
    backgroundColor="#0225A1"
    barStyle="light-content"
    />
     <View style={styles.headerContainer} 
                >
                   <Separator
                height={StatusBar.currentHeight}
                />
                <Text style={styles.headerTitle}></Text>
                </View>
                <ScrollView>
                <View style={{alignItems:'center',marginTop:5}}>
                    <Image source={require('../images/toll_gate3.jpg')} style={{width:250,height:80,
                   borderRadius:30 }}/>
                </View>
                <Formik
        initialValues={{name:'',phonenumber:'',email:'',password:'',confirmpassword:''}}
        validationSchema={ReviewSchem}
        onSubmit={(values,action)=>{
            action.resetForm()
            addUser(values)
        }}
        >

        {(props)=>(
         <View
         style={{padding:20}}>
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
             onChangeText={props.handleChange('name')}
             value={props.values.name}
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
             onChangeText={props.handleChange('phonenumber')}
             value={props.values.phonenumber}
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
             onChangeText={props.handleChange('email')}
             value={props.values.email}
             onBlur={props.handleBlur('email')}
             />
        
        </View>
        <Text style={{color:'red',marginTop:-15}}>{props.touched.email && props.errors.email}</Text>
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
        <Text style={{color:'red',marginTop:-15}}>{props.touched.confirmpassword && props.errors.confirmpassword}</Text>
        
        <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
            <Flatbutton text='REGISTER' onPress={props.handleSubmit}/>
            <View style={styles.signupContainer}>
               <Text style={styles.accountText}>Already have account?</Text>
               <Text style={styles.signupText}
               onPress={()=>navigation.navigate('Login')}>Sign In</Text>
            </View>
            </View>
            </View>
            )}</Formik>
                </ScrollView>
</SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
 
    },
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
    signupText:{
        color:'#4A1DD6',
        marginRight:40,
    }
})