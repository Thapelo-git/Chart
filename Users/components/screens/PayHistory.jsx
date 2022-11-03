
import React,{useState} from 'react'
import { StyleSheet, Text, View ,StatusBar,SafeAreaView,
    TextInput,TouchableOpacity,Image,Modal,Dimensions} from 'react-native'
import Bookings from './Bookings'
import HistoryScreen from './HistoryScreen'
const PayHistory = () => {
    const [page,setPage]=useState(0)
  return (
    <SafeAreaView>
        <View style={styles.header}>
                <Text style={{color:'#fff'}}>My payment</Text>
                </View>
    <View style={{justifyContent:'center',alignItems:'center'}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
    width:250,height:60,backgroundColor:'gainsboro',borderRadius:30}}>
          <TouchableOpacity style={{width:130,height:58,backgroundColor:page === 0?'#0225A1':'gainsboro',justifyContent:'center',
        alignItems:'center',borderRadius:30}} 
        onPress={()=>setPage(0)}>
              <Text style={{color:page===0?'#fff':'#000',fontWeight:'bold'}}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:130,height:58,backgroundColor:page === 1?'#0225A1':'gainsboro',justifyContent:'center',
        alignItems:'center',borderRadius:30}}
        onPress={()=>setPage(1)}>
              <Text style={{color:page===1?'#fff':'#000',fontWeight:'bold'}}>History</Text>
          </TouchableOpacity>
      </View>
      <View style={{
    width:'100%',}}>
        {
            page === 0?(<Bookings/>):(null)
        }
        {
            page === 1?(<HistoryScreen/>):(null)
        }
        
        </View>
      
        </View>
</SafeAreaView>
  )
}

export default PayHistory
const styles = StyleSheet.create({
  header: {
    width:'100%',
    height:50,
    paddingVertical: 10,
    // borderRadius:10,
    alignItems:'center',
    backgroundColor: '#0225A1',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom:12,
    justifyContent:'center',
   
    },
  })
  