import React,{useEffect, useState,Component} from 'react'
import { StyleSheet, Text, View ,StatusBar,Alert,
    TextInput,TouchableOpacity,Image,Modal,Dimensions, SafeAreaView} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import Separator from './comp/Separator'
import { Images,Colors  } from '../contants'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Display } from '../utils'
import forgetPassword from './forgetPassword'

import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { db,auth } from '../../../firebase' 
const deviceHeight=Dimensions.get("window").height
const deviceWidth=Dimensions.get("window").width
const SignIn = ({props}) => {
    const navigation =useNavigation()
    const [Idnumber,setIdnumber]=useState([])
    const [isPasswordShow,setPasswordShow]=useState(false)
    
    useEffect(()=>{
        db.ref('Puser').on('value',snap=>{
            let item =[];
            const a_=snap.val();
            for(let x in a_){
                item.push({IDnumber:a_[x].IDnumber,key:x
                })
            }
            setIdnumber(item)
        })
    },[])
    console.log(Idnumber,"no data ");
    
    const signIn = async(data)=>{
        const { email, password ,idnumber} = data;
        try {
           
                    const user = await auth
                    .signInWithEmailAndPassword(email.trim().toLowerCase(), password)
                    .then( async res => {
                        try {
                            const jsonValue = JSON.stringify(res.user)
                            await AsyncStorageLib.setItem("Pfamily", res.user.uid)
                          
        
                            navigation.navigate('homeScreen')
                        } catch (e) {
                            console.log("no data ");
                        }
                    });

                // ToastAndroid.show("Succussfully loged in ", ToastAndroid.SHORT)
    
             
       
         
        } catch (error) {
            Alert.alert(error.name, error.message);
        }
    }

    const ReviewSchem=yup.object({
        
        email:yup.string().email().required().min(6),
        password:yup.string().required().min(6),
    })
  return (
<SafeAreaView>

            <View style={{width:deviceWidth *0.9,top:20}}>
            
              <ScrollView>
                  <Formik
                  initialValues={{email:'',password:''}}
                 validationSchema={ReviewSchem}
                 onSubmit={(values,action)=>{
                     action.resetForm()
                     signIn(values)
                 }}
                 >
                     {(props)=>(
                         <>
        
       <View style={{height:15}}></View>
               <Text style={{fontWeight:'bold'}}>Email Address</Text>
       
        
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="mail" size={22}
      
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="Email"
                     onChangeText={props.handleChange('email')}
                     value={props.values.email}
                     onBlur={props.handleBlur('email')}
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    />
                </View>
            </View>
            {props.errors.email? <Text style={{color:"red"}}>{props.errors.email}</Text>:null}
            <View style={{height:15}}></View>
            <View >
            <Text style={{fontWeight:'bold'}}>Password</Text>
        </View>
            
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                <Feather name="lock" size={22} color="#000"
                    style={{marginRight:10}}/>
                 <TextInput
                 secureTextEntry={isPasswordShow? false :true}
                 placeholder="Password"
                 onChangeText={props.handleChange('password')}
                 value={props.values.password}
                 onBlur={props.handleBlur('password')}
                 selectionColor='gainsboro'
                 style={styles.inputText}/>
                 <Feather
                 name="eye" size={22}
                 style={{marginRight:10}}
                 onPress={()=>setPasswordShow(!isPasswordShow)}
                 />
                </View>
            </View>
            {props.errors.password? <Text style={{color:"red"}}>{props.errors.password}</Text>:null}
            
            <Text></Text>
            <View style={styles.forgotPasswordContainer}>
                <View>
                    <Text style={styles.rememberMeText}></Text>
                </View>
                {/* <Text style={styles.forgotPasswordText}
                onPress={()=>navigation.navigate('forgetPassword')}
                >Forget Password</Text> */}
            </View>
    
            <TouchableOpacity style={styles.signinButton}
              onPress={props.handleSubmit}>
                <Text style={styles.signinButtonText}
                
                >Sign in</Text>
            </TouchableOpacity>
            </>
            )}
            </Formik>
            </ScrollView>
            </View>
            
 
    
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'#fff'
        
    },
    headerContainer:{
       flexDirection:'row' ,
       alignItems:'center',
       justifyContent:'center',
       paddingVertical:10,
       paddingHorizontal:20
    },
    headerTitle:{
      fontSize:20,
      lineHeight:20 * 1.4,
      width:Display.setWidth(80),
      textAlign:'center'  

    },
    title:{
fontSize:20,
lineHeight:20 * 1.4,
marginTop:20,
marginBottom:50,
marginHorizontal:20
    },
    content:{
        fontSize:20,
        marginTop:10,
        marginBottom:20,
        marginHorizontal:20,
    },
    inputContainer:{
        backgroundColor:'#fff',
        // paddingHorizontal:20,
        // marginHorizontal:20,
        borderRadius:8,
        borderWidth:0.5,
        borderColor:'#000',
        justifyContent:'center',
    },
    inputSubContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    inputText:{
        fontSize:18,
        textAlignVertical:'center',
        padding:0,
        height:Display.setHeight(6),
        color:Colors.DEFAULT_BLACK,
        flex:1

    },
    forgotPasswordContainer:{
        marginHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'

    },
    rememberMeText:{
        marginLeft:10,
        fontSize:12,
        lineHeight:12 * 1.4,
        color:'grey'
    },
    forgotPasswordText:{
        fontSize:12,
        lineHeight:12 * 1.4,
        color:'#EC8F05',
        fontWeight:'bold'
    },
    signinButton:{
        backgroundColor:'#000',
        borderRadius:8,
        marginHorizontal:20,
        height:Display.setHeight(6),
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#fff',
        
    },
    signupContainer:{
        marginHorizontal:20,
        justifyContent:'center',
        paddingVertical:20,
        flexDirection:'row',
        alignItems:'center'
    },
    accountText:{
        fontSize:13,
        lineHeight:13 * 1.4,
        color:Colors.DEFAULT_BLACK
    },
    signupText:{
        fontSize:13,
        lineHeight:13 * 1.4,
        color:'#EC8F05',
        marginLeft:5,

    },
    orText:{
        fontSize:15,
        lineHeight:15 * 1.4,
        color:Colors.DEFAULT_BLACK,
        marginLeft:5,
        alignSelf:'center'
    },
    facebookButton:{
        backgroundColor:'blue',
        paddingVertical:15,
        marginHorizontal:20,
        borderRadius:8,
        marginVertical:20,
        justifyContent:'center',
        alignItems:'center'
    },
    googleButton:{
        backgroundColor:'#fff',
        paddingVertical:15,
        marginHorizontal:20,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    }
})