import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
  
  ImageBackground, ToastAndroid,
  Dimensions, ImageBackgroud, Animated, Pressable, TextInput
} from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign"
import Flatbutton from "../styles/button";
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import Entypo from 'react-native-vector-icons/Entypo'

import {Picker} from '@react-native-picker/picker';

import { auth, db } from './firebase'

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const { height } = Dimensions.get('window')
const imgContainerHeight = screenHeight * 0.1;
const imageC = screenHeight * 0.10;
const container = screenHeight - imageC
const aminitieSsize = screenHeight * .08
const itemRef = db.ref('/HotelBooking')
const HotelDetails = ({ navigation, route }) => {

  const [Phonenumber, setPhonenumber] = useState(route.params.phonenumber)


  let _panel = React.useRef(null)
  let bs = React.createRef();
  let fall = new Animated.Value(1)
  const list = route.params.data;



  const hotelinfor = list
  const location = list._location


  
  const [animationValue, setAnimationValue] = useState(-1000)
  const showAnimation = useRef(new Animated.Value(animationValue)).current
  const user = auth.currentUser.uid;
 
  const [Classes, setClasses] = useState("");
  const [ClassType, setClassType] = useState([]);
  const [TollClass, setTollClass] = useState([]);
  const [Vehicles, setVehicles] = useState([]);
  useEffect(() => {

    db.ref('/TollClasses/').on('value', snap => {
      let item = [];
      const a_ = snap.val();
      for (let x in a_) {
        item.push({ Price: a_[x].Price, key: x, TollClass: a_[x].TollClass })
      }

      setTollClass(item)

    })
    db.ref('/Vehicle/').on('value', snap => {
      let item = [];
      const a_ = snap.val();
      for (let x in a_) {
        item.push({user: a_[x].user,
          NoPlate: a_[x].NoPlate, key: x, RegisNumber: a_[x].RegisNumber,
          VehicleName: a_[x].VehicleName, vehicleType: a_[x].vehicleType
        })
      }
      if(user){
        const userinfor = item.filter(function(item){
         const itemData = item.user?

(  item.user)
         :   ( '') 
         const textData = user;
         return itemData.indexOf( textData)>-1;

     })
      setVehicles(userinfor)
    }
    })
  }, [])

  const FilterFunction = (text) => {
    if (text) {
      const newData = TollClass.filter(function (item) {
        const itemData = item.TollClass ? item.TollClass.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;

      })
      setClassType(newData)
      setClasses(text)
    }
  }
  var price = 0
  const [selectedBtnIndex, setSelectedBtnIndex] = useState(0);
  const [VehicleName, setVehicleName] = useState()
  const [NoPlate, setNoPlate] = useState()
  const markcategory = (key, VehicleName, NoPlate) => {
    setSelectedBtnIndex(key)
    setVehicleName(VehicleName)
    setNoPlate(NoPlate)

  }
  const Aminities = ({ category, index }) => {
    return (
      <TouchableOpacity key={index} activeOpacity={0.8}
        onPress={() => markcategory(index, category.VehicleName, category.NoPlate)}

      >
        <View style={{
          backgroundColor: 'white', marginRight: 25, width: aminitieSsize,
          height: aminitieSsize, justifyContent: 'center', alignItems: 'center',
          borderRadius: 10, borderWidth: 2, borderColor: selectedBtnIndex == index ? ('blue') : ('#fff')
        }}>
          {/* <Image source={category.image_} style={styles.classimage}/> */}
          <Text>{category.VehicleName}</Text>
        </View>

      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.imgContaner}>


        <View style={styles.headerContainer}
        >
          <View style={{
            backgroundColor: 'white',
            opacity: 0.7, width: 30,
            height: 30, justifyContent: 'center', alignItems: 'center',
            borderRadius: 10,
          }}>
            <Feather name="arrow-left" size={30} color='black'
              onPress={() => navigation.goBack()} />
          </View>
          <Text style={styles.headerTitle}></Text>
        </View>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: imgContainerHeight }}>
          <Image source={require('../images/classes.jpg')} style={styles.classimage} />
        </View>
      </View>

      <View style={styles.cardBox}>

        <View style={{ paddingVertical: -5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'gray', fontSize: 17 }}>Name     </Text>
              <Text
                style={{ color: '#032B7A', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}
              >{list.name}</Text>
            </View>
           
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'gray', fontSize: 17 }}>Road     </Text>
              <Text
                style={{ color: '#032B7A', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}
              >{list.Road}       </Text>
               <View style={{ flexDirection: 'row', justifyContent:'space-around', alignItems:'stretch' }}>
              <Text style={{ color: 'gray', fontSize: 17 }}>Route     </Text>
              <Text
                style={{ color: '#032B7A', fontWeight: 'bold', fontSize: 20, }}
              >{list.Route}</Text>
            </View>
            </View>
            {/* <TouchableOpacity onPress={() => navigation.navigate('MapScreen')} style={{ flexDirection: 'row' }}>
              <MaterialIcons name='location-pin' size={20} />
              <Text style={{ marginBottom: 5, color: 'gray' }}>{list.location}</Text>
            </TouchableOpacity> */}
            <Text>Your Transportation</Text>
            <TouchableOpacity  activeOpacity={0.8}
            onPress={()=>navigation.navigate('AddVehicle')}>
        <View style={{
          backgroundColor: '#eee', marginRight: 25, width: 100,
          height: 50, justifyContent: 'center', alignItems: 'center',
          borderRadius: 10, borderWidth: 2, borderColor: 'blue'
        }}>

          <Text>New Vehicles </Text>
        </View>

      </TouchableOpacity>
     
      
            <View style={{ flexDirection: 'row', top: 10 }}>
           
              <FlatList
                keyExtractor={(_, key) => key.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 20 }}
                data={Vehicles}
                renderItem={({ item, index }) => <Aminities category={item} index={index} />}
              />


            </View>
          </View>

        </View>
        <View style={{ paddingVertical: 20 }}>

          <Text style={styles.titles}>Select Vehicle Class</Text>

          <Picker
            selectedValue={Classes}
            style={{width:300,height:50,backgroundColor:'#eee'}}
            onValueChange={(value, id) => { FilterFunction(value) }}
          >
            <Picker.Item label="select" value="" />
            <Picker.Item label="Class 1" value="ClassOne" />
            <Picker.Item label="Class 2" value="ClassTwo" />
            <Picker.Item label="Class 3" value="ClassThree" />
            <Picker.Item label="Class 4" value="ClassFour" />
          </Picker>

          <Text style={styles.titles}>Fees </Text>
          {
            ClassType.map((element, index) => (

              <>

                {/* <Text>{element.selector}</Text> */}
                <Text style={{ color: '#000', fontWeight: 'bold' }}>Price for {element.TollClass} = R {price = element.Price}</Text>

                <TextInput
                  placeholder="R00.00"
                  keyboardType="numeric"
                  value={element.Price}
                  // onChangeText={ setFee(element.Price)}
                  style={{
                    padding: 10,
                    backgroundColor: "gainsboro",
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                />
              </>

            ))

          }





        </View>
        {
        VehicleName==null ?(
          <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Flatbutton text='Pay' style={{ top: 10, }} disable={true}
            onPress={() => navigation.navigate('Creditcard', {
              hotelinfor: hotelinfor,
              price: price, Classes: Classes,
              Phonenumber: Phonenumber,
              NoPlate: NoPlate, VehicleName: VehicleName,
            })} />
            <Text style={{color:'red',paddingTop:20}}>select VehicleName</Text>
        </View>
        ):(<>
          {
            Classes == ""?(
              <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <Flatbutton text='Pay' style={{ top: 10, }} disable={true}
                onPress={() => navigation.navigate('Creditcard', {
                  hotelinfor: hotelinfor,
                  price: price, Classes: Classes,
                  Phonenumber: Phonenumber,
                  NoPlate: NoPlate, VehicleName: VehicleName,
                })} />
                <Text style={{color:'red',paddingTop:20}}>select Vehicle Class</Text>
            </View>
            ):(
              <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Flatbutton text='Pay' style={{ top: 10, }}
            onPress={() => navigation.navigate('Creditcard', {
              hotelinfor: hotelinfor,
              price: price, Classes: Classes,
              Phonenumber: Phonenumber,
              NoPlate: NoPlate, VehicleName: VehicleName,
            })} />
        </View>
            )
          }
          
        </>)
      }
      


        {/* <BottomSheet
          onCancel={() => { toggleAnimation() }}
          animation={showAnimation} /> */}
      </View>
    </SafeAreaView>
  );
};

export default HotelDetails;

const styles = StyleSheet.create({
  cardBox: {
    // paddingTop: 30,
    height: '100%',
    padding: 20,
    marginTop: screenHeight * 0.2,
    backgroundColor: "white",
    // flex:1,

  },
  classimage: {
    width: 300,
    height: 90,
    marginTop: imgContainerHeight,


    position: 'absolute'
  },
  titles: {
    fontWeight: "bold",
    fontSize: 16,
    color: '#333'
  },
  imgContaner: {
    width: screenWidth,
    height: imgContainerHeight,
    position: "absolute",
    top: 0,
    backgroundColor: 'black',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    top: 10,
    flexDirection: 'row', justifyContent: 'space-between',
    alignContent: 'center'


  },
  header: {
    backgroundColor: '#fff',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -2 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20

  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,

    backgroundColor: 'white',
    marginBottom: 10,
  },
  panelHeader: {

    alignItems: 'center',

  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  },
  buttonAdding: {
    // borderWidth:1,
    width: 30,
    height: 30,
    borderRadius: 1,
    // borderColor:'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    borderRadius: 10,
    height: 48,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    elevation: 2,
    width: 150,

  },
  inputIconViewi: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A1DD6',
    height: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  cvv: {
    paddingLeft: 12,
    width: '40%'

  },
  dataContainer: {
    flexDirection: "row",

    paddingBottom: 5,
    width: '100%',
    // justifyContent: 'space-between'
  },
  input: {
    width: '70%',
    borderColor: "black",
    borderStyle: "solid"
  },
  inputBox: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    // paddingRight: 15,
    padding: 5,
    width: '60%',
    backgroundColor: '#EDEDED'
  },

  map: { ...StyleSheet.absoluteFillObject },
  buttonstyle: {
    borderRadius: 10,
    paddingVertical: 10,
    width: 200,
    backgroundColor: '#4A1DD6',


  },
  buttonText: {
    color: '#fff',
    fontWeight: 'normal',
    // textTransform:'uppercase',
    fontSize: 20,
    fontStyle: 'normal',
    textAlign: 'center'
  },
});
