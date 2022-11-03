import React,{useState,useEffect} from 'react'
import { FlatList, Image, ImageBackground, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

const GalleryScreen = ({route,navigation}) => {

    // console.log(route.params.galary)
     const galaryArr=route.params.galary
    const index=route.params.index
    const [myGalary,setMyGalary]=useState(0);
    const [backImg,setBackImg]=useState()
    const [myIndex,setMyIndex]=useState(index);
console.log(galaryArr)
   
   

    useEffect(()=>{
        var temp=[]
        
        const changeImg=()=>{
            temp=galaryArr.filter((img,index)=>index!==myIndex)
        }
        const getBackgroundImg=()=>{
            
            setBackImg(galaryArr[myIndex])
        }
        changeImg()
        getBackgroundImg()
        setMyGalary(temp)
        
    },[myIndex])

    const list = route.params
    const Gallery=({pic,_index})=>(
         <TouchableOpacity onPress={()=>setMyIndex(_index)} style={{marginLeft:10}}>
        <Image source={pic} style={{height:80,width:80,borderRadius:20}}/>
         </TouchableOpacity>
    )
    return (
        <ImageBackground source={backImg} style={{flex:1}}>
             <View style={styles.headerContainer} 
            >
               
               <Feather name="arrow-left" size={30} color='#fff'
             onPress={()=>navigation.goBack()} /> 
            {/* <Text style={styles.headerTitle}>{galaryArr.length}{myIndex+1}</Text> */}
            </View>
           <View style={styles.Gallerylist}>
               <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Review Gallery</Text>
            <FlatList
            horizontal
            keyExtractor={(_,key)=>key.toString()}
            showsHorizontalScrollIndicator={false}
            data={galaryArr}
            renderItem={({item,index})=><Gallery pic={item} _index={index} />}/>
            </View>
        </ImageBackground>
    )
}

export default GalleryScreen

const styles = StyleSheet.create({
    Gallerylist:{
        padding:10,
        justifyContent:'space-between',
        bottom:-490,
        
    }

})
