import React, { useState, useEffect ,useRef} from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, ImageBackground, StatusBar,  ActivityIndicator
} from 'react-native'
import { ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import Hotels from '../onbording/Hotels'10205409
//https://dribbble.com/shots/18568156-ECHO-PARK-Parking-Space-Finder-App
//https://github.com/react-native-voice/voice/blob/master/example/src/VoiceTest.tsx
//https://dribbble.com/shots/15942307-Fashion-Store-Mobile-Version

import { auth,db } from './firebase';
import SearchScreen from './SearchScreen';
import {Picker} from '@react-native-picker/picker';
const { width } = Dimensions.get("screen")
const cardWidth = width / 1.8
const HomeScreen = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [location, setLocation] = useState(false)
    
    const [Tollgate, setTollgate] = useState([])
    const [isLoading, setLoading] = useState(false);
   
    const user = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/Tollgate').on('value', snap => {

            const Tollgate = []
            snap.forEach(action => {
                const key = action.key
                const data = action.val()
                Tollgate.push({
                    key: key,
                    location: data.location,
                    name: data.name,
                    url: data.url,
                    Route: data.Route,
                    Road: data.Road,
                    Class1: data.Class1,
                    Class2: data.Class2,
                    Class3: data.Class3,
                    Class4: data.Class4,
                })
                setTollgate(Tollgate)
                setFilteredDataSource(Tollgate);
                setMasterDataSource(Tollgate);

            })
        })
        db.ref('/users/' + user).on('value', snap => {

            setName(snap.val() && snap.val().name);
            setPhonenumber(snap.val().phonenumber)
            setEmail(snap.val().email)
        })



    }, [])
   
    const [searchtext, setSearchtext] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);


  

    const [Route, setRoute] = useState([]);
    const [RouteContainer, setRouteContainer] = useState('')
 
    const FilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.Route ? item.Route.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;

            })
            setRoute(newData)
            setRouteContainer(text)
        }
    }
    const bottomopen = useRef()
    const [modalopen,setModalopen]=useState(false)
    const [ selectedBtnIndex,setSelectedBtnIndex] = useState(0);
    
    const Card = ({ Tollgate, index }) => {
        return (
            <TouchableOpacity 
            onPress={() => navigation.navigate('HotelDetails', {
                data: Tollgate, index: index,
                phonenumber: phonenumber
            })}
            >
                <View style={styles.cardContainer}>
                    <Image style={styles.cardImage} source={{ uri: Tollgate.url }} />
                    <View style={{ height: 100, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'gray', }}>Name: </Text>
                            <Text style={{ fontSize: 20, color: 'blue', }}>{Tollgate.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'gray', }}>Route: </Text>
                            <Text style={{ fontSize: 20, color: 'gray', }}>{Tollgate.Route}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'gray', }}>Road: </Text>
                            <Text style={{ fontSize: 18, color: 'gray', }}>{Tollgate.Road}</Text>
                        </View>
  
                    </View>
  
                </View>
            </TouchableOpacity>)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff',padding:10}}>
            <StatusBar
                backgroundColor="#0225A1"
                barStyle="light-content"
            />
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile', {
                        email: email, name: name, phonenumber: phonenumber
                    })}>
                        <Image source={{ uri: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-600w-193292033.jpg' }}
                            style={{ height: 50, width: 50, borderRadius: 25 }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 18, fontWeight: 'bold', marginLeft: 10,
                        marginTop: 18
                    }}>Welcome </Text>
                    <Text style={{
                        fontSize: 18, marginLeft: 10,
                        marginTop: 18
                    }}>{name}</Text>
                </View>
               
            </View>
            
            <View style={{
                marginTop: 20,
                flexDirection: 'row',
                paddingHorizontal: 20,
            }}>
                <TouchableOpacity style={styles.inputContainer}
                onPress={()=>bottomopen.current.show()}>

                    <Ionicons name="search" size={24} />

                    <View
                        style={{ fontSize: 18, flex: 1, marginLeft: 10 }}
                        ><Text>Search by Name</Text></View>
                       
                  
                </TouchableOpacity>
            </View>
        
            <View>
            <View style={{ paddingVertical: 20 }}>

<Text style={styles.titles}>Select Your Destination</Text>

<Picker
  selectedValue={RouteContainer}
  style={{width:300,height:50,backgroundColor:'#eee'}}
  onValueChange={(value, id) => { FilterFunction(value) }}
>
  <Picker.Item label="select" value="" />
  <Picker.Item label="PLK To JHB" value="N1" />
  <Picker.Item label="JHB To Dur" value="N3" />
  {/* <Picker.Item label="JHB To CP" value="N2" /> */}
  
</Picker>
<FlatList
                keyExtractor={(_, key) => key.toString()}
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 20 }}
                data={Route}
                renderItem={({ item, index }) => <Card Tollgate={item} index={index} />}
            />


</View>

            
        </View>
          <SearchScreen bottomopen={bottomopen} navigation={navigation}/>

     


        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#eee',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    btnListContainer: {
        marginLeft: -10,
        
        paddingHorizontal: 10,
        paddingVertical: 30,
        // alignItems:'center'
    },
    categoryBtn: {
        height: 45,
        width: 80,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',

    },
    card: {
        height: 220,
    },
    cardContainer: {
        height: 100,
        width: cardWidth * 1.5,
        marginRight: 20,
        // marginBottom:20,
        marginVertical: 10,
        // marginTop:5,
        borderRadius: 15,
        elevation: 15,
        backgroundColor: '#fff',
        flexDirection: 'row', alignItems: 'center'

    },
    discountcard: {
        flexDirection: 'row', justifyContent: 'center',
        width: '100%',
        height: 110,
        // width:cardWidth*1.5,
        // marginRight:20,

        // marginHorizontal:10,

        // borderRadius:15,
        // elevation:15,
        // backgroundColor:COLORS.white,
        alignItems: 'center',
    },

    cardImage: {
        height: 100,
        width: width / 3,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
    }
})
