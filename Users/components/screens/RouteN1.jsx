import React ,{useState,useEffect}from 'react'
import { StyleSheet, Text, View ,Animated,TouchableOpacity,Dimensions, SafeAreaView,FlatList,
Image} from 'react-native'
import { COLORS } from '../styles/Colors'
import Feather from 'react-native-vector-icons/Feather'
import Flatbutton from "../../../Tollplaz/components/styles/button"
const { width } = Dimensions.get("screen")
const cardWidth = width / 1.8

import { auth, db } from './firebase'
const screenWidth = Dimensions.get("screen").width;
const RouteN1 = ({navigation}) => {
  const user = auth.currentUser.uid;
  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [searchtext,setSearchtext] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [Tollgate, setTollgate] = useState([])

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
              })})
              let text ='N1'
              if(text){
                const Tollinfor = Tollgate.filter(function(item){
                 const itemData = item.Route?
        
   (  item.Route)
                 :   ( '') 
                 const textData = text;
                 return itemData.indexOf( textData)>-1;
 
             })
             
              setTollgate(Tollinfor)
              setFilteredDataSource(Tollinfor);
              setMasterDataSource(Tollinfor);

          }
      })
     

      db.ref('/users/' + user).on('value', snap => {

        setName(snap.val() && snap.val().name);
        setPhonenumber(snap.val().phonenumber)
        setEmail(snap.val().email)
    })

  }, [])

   

    const Card = ({ Tollgate, index }) => {
      return (
          <TouchableOpacity onPress={() => navigation.navigate('HotelDetails', {
              data: Tollgate, index: index,
              phonenumber: phonenumber
          })}>
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
      return(
 <SafeAreaView>
        <FlatList
                keyExtractor={(_, key) => key.toString()}
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 20 }}
                data={filteredDataSource}
                renderItem={({ item, index }) => <Card Tollgate={item} index={index} />}
            />
 </SafeAreaView>
        )
      
}

export default RouteN1

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.white,
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
