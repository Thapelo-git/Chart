import React ,{useState} from 'react'
import { SafeAreaView, StyleSheet, Text, View,ImageBackground,TextInput,
    Alert,ToastAndroid } from 'react-native'
import Flatbutton from '../../../Tollplaz/components/styles/button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FONTS } from '../styles/Font'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Checkbox } from 'react-native-paper'
import { COLORS } from '../styles/Colors'
import * as yup from 'yup' 
import { Formik } from 'formik'
import { auth } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'
const SignIn = ({navigation}) => {
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
                await AsyncStorage.setItem("user", res.user.uid)
                navigation.navigate('HomeTap')
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
        <SafeAreaView>
            <ImageBackground style={styles.imageBackground} source={require('../images/toll_gate2.jpg')}>
        <View style={styles.container}>
            <Text style={{fontFamily:FONTS.extraBold,fontWeight:'bold',fontSize:30,
        color:COLORS.theme}}>Login</Text>
        <Formik 
        initialValues={{email:'',password:''}}
        validationSchema={ReviewSchem}
        onSubmit={(values,action)=>{
            action.resetForm()
            Submit(values)
        }}
        >
            {(props)=>(
        
            <KeyboardAwareScrollView
             >
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
        <Checkbox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}/>
         <Text style={styles.rememberMeText}>remember me</Text>
        
        </View>
        <Text style={styles.forgetPasswordText}
        onPress={()=>navigation.navigate('ForgetPassword')}>Forget Password</Text>
        </View>
        <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
            <Flatbutton text='LOGIN'  onPress={props.handleSubmit} />
            <View style={styles.signupContainer}>
               <Text style={styles.accountText}>Don't have account?</Text>
               <Text style={styles.signupText}
               onPress={()=>navigation.navigate('SignUp')}>Sign Up</Text>
            </View>
            </View>
            </KeyboardAwareScrollView>
            )}</Formik>
        </View>
        </ImageBackground>
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        padding:20,
        width:'100%',
        height:'90%',
        marginTop:210,
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        justifyContent:'center',
        alignItems:'center'
    },
    imageBackground:{
        width:'100%',
        height:'100%',backgroundColor:'#fff'
    },
    inputs:{
        borderBottomColor:'black',
        
         flex:0.8,
        paddingLeft:10,
        fontFamily:FONTS.Regular,
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
        color:COLORS.theme,

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
        color:COLORS.theme,
        // marginRight:40,
    }
})
