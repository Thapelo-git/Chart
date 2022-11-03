import React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-elements';

const ComfirmPay = () => {
  return (
    <SafeAreaView>

            <View style={{paddingHorizontal: 15, 
                paddingVertical:10, display:'flex',
                flexDirection: 'row',alignItems:'center', elevation:1, backgroundColor:'#0225A1', height:80}}>

                    <View style={{justifyContent: 'center', width: '100%', flex:1,}}>
                        <Text style={{fontSize:16, fontWeight: 'bold',textAlign: 'center',color:'#fff',marginTop:10, paddingTop:15}}>Payment Methods</Text>
                    </View>
            </View>

            <View style={{backgroundColor: '#ffffff', justifyContent: 'center', 
                alignItems: 'center', alignContent: 'center', width: '100%'}}>

                <View style={{flexDirection:'column',justifyContent:'flex-start', 
                    width: '100%', height: '100%', alignItems:'flex-start', paddingBottom: 5, paddingLeft: 20}}>

                    {/* Make Payments Tabs    */}
                    <View style={{paddingTop: 50, width: '100%', height: 1000}}>

                    <Text style={{paddingBottom: 10}}>
                        Use Existing Card
                    </Text>
                  <TouchableOpacity 
                //   onPress={() =>navigation.navigate('CardScreen',{eventtype:eventtype,
                //   name:name,email:email,fee:fee,date:date,
                //   Description:Description,})}
                  >

                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Icon
                                name='ios-card'
                                type='Ionicon'
                                color='#000000'
                                size={25}/>
                                <Text style={{padding: 5, fontSize: 11, color: '#808080', textAlign:'left'}}>
                                    **** **** **** *528
                                </Text>
                        </View>
                    
                        <View style={styles.moreContainer}>
                            <Icon name="ios-chevron-forward" size={15} style={styles.moreIcon} color='#0225A1'/>
                        </View>
                    </View>

                  </TouchableOpacity>
                    
                    
                    <Card.Divider/>

                    {/* Add New Card     */}
                    <TouchableOpacity 
                    //  onPress={()=>navigation.navigate('paymentScreen')}
                     >
                    
                    <Text style={{paddingBottom: 10, paddingTop: 15}}>
                        Add New Card
                    </Text>
                    <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                    <Icon
                        name='ios-card-outline'
                        type='Ionicon'
                        color='#000000'
                        size={25}/>
                        <Text style={{padding: 5, fontSize: 11, color: '#808080'}}>
                            authorize new card
                        </Text>
                    </View>
                    
                        <View style={styles.moreContainer}>
                            <Icon name="ios-chevron-forward" size={15} style={styles.moreIcon} color='#0225A1'/>
                        </View>
                    </View>
                    </TouchableOpacity>
                    <Card.Divider/>

                    {/* Pay Using ATM     */}
                    <Text style={{paddingBottom: 10, paddingTop: 15}}>
                        Paid Using ATM
                    </Text>
                    <TouchableOpacity >
                        <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Icon
                            name='ios-barcode-outline'
                            type='Ionicon'
                            color='#000000'
                            size={25}/>
                            <Text style={{padding: 5, fontSize: 11, color: '#808080'}}>
                                scan receipt / enter receipt number
                            </Text>
                        </View>
                        
                            <View style={styles.moreContainer}>
                                <Icon name="ios-chevron-forward" size={15} style={styles.moreIcon} color='#0225A1'/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                    <Card.Divider/>
                    </View>
                    
                </View>
        </View>
        </SafeAreaView>
  )
}

export default ComfirmPay

const styles = StyleSheet.create({
    header: {
        paddingLeft: 20,
        paddingBottom: 5,
        fontWeight: 'bold',
        fontSize: 15,
        color:  '#000000'
    },
    box: {
        backgroundColor: '#add8e6',
        marginLeft: 10,
        marginRight:10,
        // height: 480,
        borderRadius:10
    },
    moreContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        
    },
    moreIcon: {
        color:'#0225A1'
    }
})