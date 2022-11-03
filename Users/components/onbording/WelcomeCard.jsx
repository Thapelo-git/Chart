import React from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import { Display } from '../utils'

const WelcomeCard = ({_title,_description,_image}) => {
    return (
        // 
        <View style={styles.container}>
            
            <Image style={styles.image} source={_image} 
            resizeMode="contain"/>
           
           <Text style={styles.titleText}>{_title}</Text> 
          
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:Display.setWidth(90),
        height:Display.setHeight(70),
        // backgroundColor:'#4A1DD6'
    },
    image:{
        height:Display.setHeight(60),
        width:Display.setWidth(80),
        // borderRadius:10,
        borderTopRightRadius:60,
        borderBottomLeftRadius:60
    },
    titleText:{
        fontSize:22,
        fontWeight:'bold',
        color:'#4A1DD6',
    },
    contentText:{
        fontSize:18,
        
        textAlign:'center',
        marginHorizontal:20,
    }
})

export default WelcomeCard
