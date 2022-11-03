import React,{useState,useRef}  from 'react';
import { View,SafeAreaView, Text ,StyleSheet,Image,StatusBar,FlatList,
    TouchableOpacity} from 'react-native';
import WelcomeCard from '../onbording/WelcomeCard.jsx';
import Separator from '../onbording/Separator.jsx';
import data from '../onbording/Data.jsx';
import {Display} from '../utils'
import Flatbutton from '../../../Tollplaz/components/styles/button.jsx';
import { FONTS } from '../styles/Font.jsx';
import COLORS from '../styles/Colors.jsx'
const pageStyle=isActive=>
isActive
?styles.page
:{...styles.page,backgroundColor:"gainsboro"}
const Pagination=({index})=>{
    return(
        <View style={styles.pageContainer}>
        {[...Array(data.length).keys()].map((_,i)=>i=== index ?(
          <View style={pageStyle(true)} key={i}/>
        ):(
          <View style={pageStyle(false)} key={i}/>
        ))}
        
      </View>
    )
}

 const WelcomeScreen=({navigation})=>{
    const [welcomeListIndex,setwelcomeListIndex]=useState(0)
    const welcomeList = useRef()
    const onViewRef = useRef(({changed})=>{
      setwelcomeListIndex(changed[0].index);
    })
    const viewConfigRef =useRef({viewAreaCoveragePercentThreshold:50})
   

    return(
        
            <View style={styles.container}>
            <StatusBar
            backgroundColor="#0225A1"
            barStyle="light-content"
            />
            {/* <Text style={{fontFamily:FONTS.SemiBold,}}>WELCOME</Text> */}
            <Separator height={StatusBar.currentHeight}/>
            <Separator height={Display.setHeight(8)}/>
            <View style={styles.WelcomeListContainer}> 
            <FlatList 
            ref={welcomeList}
            data={data}
            keyExtractor={item => item._title}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            overScrollMode="never"
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewRef.current}

            renderItem={({item})=> <WelcomeCard {...item}/>}
            />
            </View> 
          
            
            <Pagination index={welcomeListIndex}/>
            <View style={{height:30}}></View>
            
            <View>
            <Flatbutton text='Get Started' onPress={()=>navigation.navigate('SignIn')}/>
              {/* <View style={{height:30}}></View>
              <TouchableOpacity activeOpacity={8.0}
              style={[styles.gettingsStartedButton,{backgroundColor:"gainsboro"}]}
              onPress={()=>navigation.navigate('SignIn')}
              >
                <Text style={[styles.gettingsStartedButtonText,{color:'#0225A1'}]}>SIGN IN</Text>
              </TouchableOpacity> */}
            </View>
            
           
                
                
                     
                    
            </View>
        
    )
}

export default WelcomeScreen
const styles = StyleSheet.create({
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
      }, 
      container: {
        flex: 1,
     
        alignItems: 'center',
        justifyContent: 'center',
        padding:20,
        // backgroundColor:'#4A1DD6'
      },
      WelcomeListContainer:{
        height:Display.setHeight(75),
        // width:Display.setWidth(95)
      },
     pageContainer:{
      flexDirection:'row',
      
     },
     page:{
      height:15,
      width:15,
      backgroundColor:"blue",
      borderRadius:32,
      marginHorizontal:5
     },
     buttonContainer:{
       flexDirection:'row',
       justifyContent:'space-between',
       width:90,
       alignItems:'center'
     },
     buttonText:{
       fontSize:16,
       fontWeight:'bold',
       lineHeight:16 * 1.4
     },
     button:{
       backgroundColor:"blue",
       paddingVertical:20,
       paddingHorizontal:11,
       borderRadius:32,
     },
     gettingsStartedButton:{
      backgroundColor:"blue",
      paddingVertical:15,
      paddingHorizontal:60,
      borderRadius:8,
      justifyContent:'center',
      alignItems:'center',
      elevation:2,
    marginHorizontal:10,   
     },
     gettingsStartedButtonText:{
      fontSize:20,
      
      lineHeight:20 *1.4,
     }
   
})