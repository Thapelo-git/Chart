
import React,{useState}from 'react'
import { View,SafeAreaView, Text ,StatusBar,Image,StyleSheet,
    TextInput,TouchableOpacity,CheckBox, ScrollView,Alert, ActivityIndicator,ToastAndroid} from 'react-native';
import Separator from '../onbording/Separator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as yup from 'yup' 
import { Formik } from 'formik'
import Flatbutton from '../styles/button';
import { auth,db } from './firebase';
const Login = ({navigation}) => {
    const [isSelected,setSelection]=useState(false)
    const [isPasswordShow,setPasswordShow]=useState(false)
    const ReviewSchem =yup.object({
        email:yup.string().required().min(6),
        password:yup.string().required().min(6),
    })
    const Submit = async (data) => {
        console.log('run <<<<<<')
        try {
          const { email, password } = data
          const user = await auth
            .signInWithEmailAndPassword(
              email.trim().toLowerCase(), password
            )
            
            .then(async res => {
                
              try {
                  
                const jsonValue = JSON.stringify(res.user)
                await AsyncStorage.setItem("users", res.user.uid)
                navigation.navigate('TabScreen')
              } catch (e) {
                // saving error
                console.log('no data')
              }
            })
       
        }
        catch (error) {
    
          Alert.alert(
            error.name,
            error.message
          )
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
                    <Image source={require('../images/communityIcon.png')} style={{width:250,height:180,
                   borderRadius:30 }}/>
                   <Text>Together we can do more</Text>
                </View>
              
                <Formik 
        initialValues={{email:'',password:''}}
        validationSchema={ReviewSchem}
        onSubmit={(values,action)=>{
            action.resetForm()
            Submit(values)
        }}
        >
            {(props)=>(
        
            <View style={{padding:20}}>
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
        <Text style={{color:'red'}}>{props.touched.email && props.errors.email}</Text>
        <View style={styles.inputContainer}>
        <View style={styles.inputIconView}>
            <Icon name='lock'
            style={{color:'#fff',textAlign:'center',
        fontSize:18}}
            />
        </View>
        <View style={{flexDirection:'row',alignItems:'center',}}>
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
        <Text style={{color:'red'}}>{props.touched.password && props.errors.password}</Text>
        <View style={styles.forgetPasswordContainer}>
        <View style={styles.toggleContainer}>
     
        
        </View>
        <Text style={styles.forgetPasswordText}
        onPress={()=>navigation.navigate('ForgetPassword')}>Forget Password</Text>
        </View>
        <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
        <Flatbutton text='LOGIN' 
         onPress={props.handleSubmit}
        // onPress={()=>navigation.navigate('TabScreen')}
          />
            <View style={styles.signupContainer}>
               <Text style={styles.accountText}>Don't have account?</Text>
               <Text style={styles.signupText}
               onPress={()=>navigation.navigate('Register')}>Sign Up</Text>
            </View>
            </View>
            </View>
            )}</Formik>
                </ScrollView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        
        
    },
    headerContainer:{
       flexDirection:'row' ,
       alignItems:'center',
       justifyContent:'center',
       paddingVertical:20,
       paddingHorizontal:20
    },
    headerTitle:{
      fontSize:20,
      lineHeight:20 * 1.4,
      width:80,
      textAlign:'center'  

    },
    signinButton:{
        backgroundColor:'#0225A1',
        borderRadius:8,
        height: 40,
        marginHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
      elevation:2,
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#fff',
        
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
        backgroundColor:'#006400',
        height:'100%',
        borderRadius:30,
        alignSelf:'center',
        borderTopRightRadius:0,
        borderBottomRightRadius:0,
        elevation:2,
    },
    inputs:{
        borderBottomColor:'black',
        
         flex:0.8,
        paddingLeft:10,
        
    },
    forgetPasswordContainer:{
        padding:10,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',

    },
    toggleContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:-10
    },
    forgetPasswordText:{
        fontWeight:'bold',
        color:'#006400',

    },
    innerContainer:{
        marginTop:20
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
        // marginRight:40,
    }
})