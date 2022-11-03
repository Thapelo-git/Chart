import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';
const SplashScreen = ({navigation}) => {
  setTimeout(()=>{
    navigation.replace('WelcomeScreen');
  }, 4000);
    return (
        <SafeAreaView>
             <StatusBar
            backgroundColor="#0225A1"
            barStyle="light-content"
            />
<View style={styles.container}>
            
            <LottieView style={styles.hotel}
       source={require('../onbording/animation1.json')} autoPlay loop/>
          </View>
        </SafeAreaView>
        
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:90,
        marginTop:110,
        
      },
      hotel: {
        width:150,
        height:150,
        
      },
})



   {/* <View style={{
            marginTop:20,
            flexDirection:'row',
            paddingHorizontal:20,
        }}>
        <View style={styles.inputContainer}>
           
        <Ionicons name="search" size={24}/>
       
        <TextInput 
        style={{fontSize:18,flex:1,marginLeft:10}}
        placeholder="Where to go ?"/>
        </View>
        </View> */}
        {/* <FlatList
            keyExtractor={(_,key)=>key.toString()}
          
             showsVeticalScrollIndicator={false}
             
            data={NearHotels}
            renderItem={({item,index})=><Card Hotels={item} index={index}/>}
            /> */}
                {/* <View style={styles.container}> */}
            {/* <View style={styles.headerContainer} 
            >
               
               <Feather name="arrow-left" size={30} color='black'
             onPress={()=>navigation.goBack()} /> 
           
            <Text style={styles.headerTitle}></Text>
            </View> */}
            
            {/* <GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails={true}
    
      onPress={(data, details = null) => {
       
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyD1oU6YlQOAAv9e8NsErGZLIizIDnbWmxw',
        language: 'en',
        
      }}
      
    
    styles={{ container: {
        marginTop: 95,
        zIndex: 9999,
        width: '100%',
        borderWidth: 1,
        margin: 0,
        padding: 0,
        position: 'absolute',
        backgroundColor: 'white',
        
        },
        textInput: {
            color: 'balck',
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            borderWidth: 0,
            height: 44,
            },
           
           textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0
            },
            listView: {
            position: 'absolute',
            b4ckgroundColor: "white",
            borderWidth: 1,
            borderColor:'red',
            width: '100%',
            zIndex: 9999,
            height:120
            },
            }}
    /> */}
    // <GooglePlacesAutocomplete
    //   placeholder='Search'
    //   onPress={(data, details = null) => {
    //     // 'details' is provided when fetchDetails = true
    //     console.log(data, details);
    //   }}
    //   query={{
    //     key: 'AIzaSyAfevgpvPNjRALaz3jPJhNgE040p9GnH5o',
    //     language: 'en',
    //   }}
    // />