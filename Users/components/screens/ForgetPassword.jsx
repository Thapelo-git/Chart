import React,{useState} from 'react'
import { SafeAreaView, StyleSheet, Text, View 
    ,ImageBackground,TextInput,Alert,ScrollView,StatusBar,Image} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { auth,db } from './firebase';
import Flatbutton from '../styles/button'
import Separator from '../onbording/Separator';
const ForgetPassword = ({navigation}) => {
    const [email,setEmail]=useState();
    const reset =async()=>{
        try{
            await auth
            .sendPasswordResetEmail(email)
            setEmail('')
        }catch(error){
            Alert.alert(error.message)
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
                    <View style={{alignItems:'center',}}>
                        <Image source={require('../images/communityIcon.png')} style={{width:250,height:250,
                       borderRadius:30 }}/>
                    </View>
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
             onChangeText={(e)=>(setEmail(e))}
             />
        
        </View>
       
        <View style={{marginTop:40,alignItems:'center',justifyContent:'center'}}>
            <Flatbutton text='CONTINUE' onPress={()=>reset()} />
           </View>
           <View style={styles.signupContainer}>
               <Text style={styles.accountText}>go back?</Text>
               <Text style={styles.signupText}
               onPress={()=>navigation.navigate('Login')}>Sign In</Text>
            </View>
           </ScrollView>
        </SafeAreaView>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    imageBackground:{
        width:'100%',
        height:'100%'
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
 
    },
    innerContainer:{
        // marginTop:20
    },
    innerContainer:{
        // marginTop:40,
    },
    inputs:{
        borderBottomColor:'black',
        
         flex:0.8,
        paddingLeft:10,
        
    },
    inputContainer:{
        borderRadius:30,
        height:48,
        width:300,
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
    signupContainer:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    signupText:{
        color:'#006400',
        marginRight:40,
    }

})
