import { View, Text ,Dimensions, SafeAreaView,Image,StyleSheet,TouchableOpacity,TextInput,
    FlatList} from 'react-native'
import React ,{useState} from 'react'
import Feather from 'react-native-vector-icons/Feather'
import {Avatar ,Button, Divider} from 'react-native-elements';
import { Formik } from 'formik'
import * as yup from 'yup'
import {auth, db } from './firebase';
import Flatbutton from '../styles/button';
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const {height} = Dimensions.get('window')
const imgContainerHeight = screenHeight * 0.4;
const sub = imgContainerHeight * 0.2;

const aminitieSsize=screenHeight*.08
const AddVehicle = ({navigation}) => {
    const ReviewSchem=yup.object({
        NoPlate:yup.string().required().min(5).max(7),
        VehicleName:yup.string().required().min(3),
        RegisNumber:yup.number().required().min(5),

    })
    const Vehicle =[
        {id:'1',vehicleType:'car',image_:require('../images/car.png')},
        {id:'2',vehicleType:'truck',image_:require('../images/truck.jpg')},
        {id:'3',vehicleType:'bike',image_:require('../images/motorcycle.jpg')},
        {id:'4',vehicleType:'bicycle',image_:require('../images/bike.png')},
        {id:'5',vehicleType:'bus',image_:require('../images/bus1.jpg')},
        {id:'6',vehicleType:'van',image_:require('../images/van.jpg')},
      ]
      const [ selectedBtnIndex,setSelectedBtnIndex] = useState(0);
const  [vehicleType,setvehicleType]=useState('car')

const markcategory=(key,vehicleType)=>{
  setSelectedBtnIndex(key)
  setvehicleType(vehicleType)
  
 }
 //onPress={() => navigation.goBack()} />
 const user = auth.currentUser.uid;
  const addVehicle = (data) => {
    const {NoPlate,RegisNumber,VehicleName,} =data
      db.ref('Vehicle').push({
        NoPlate,
        RegisNumber,
       VehicleName,
       vehicleType,user
      })
      navigation.goBack()
  
  };
  const Aminities =({category,index})=>{
    return(
        <TouchableOpacity key={index} activeOpacity={0.8}
        onPress={()=> markcategory(index,category.vehicleType,)} 
        
        >
            <View style={{backgroundColor:'white',marginRight:25,width:aminitieSsize,
height:aminitieSsize,justifyContent:'center',alignItems:'center',
borderRadius:10,borderWidth:2,borderColor:selectedBtnIndex == index?('blue'):('#fff')}}>
    <Image source={category.image_} style={styles.classimage}/>
    <Text>{category.vehicleType}</Text>
</View>

        </TouchableOpacity>
    )
}
  return (
    <SafeAreaView style={{padding:10}}>
        <Text>Choose your Transportation</Text>
          <View style={{flexDirection:'row',top:10}}>

          <FlatList
            keyExtractor={(_,key)=>key.toString()}
            horizontal
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{ paddingLeft:20}}
            data={Vehicle}
            renderItem={({item,index})=><Aminities category={item} index={index}/>}
            />
 
   
    </View>
    <Divider style={{alignItems:'flex-start',alignSelf:'flex-start',marginVertical:20,
      justifyContent:'flex-start',width:100}}/>
      <Formik
        initialValues={{NoPlate:'',VehicleName:'',RegisNumber:'',}}
        validationSchema={ReviewSchem}
        onSubmit={(values,action)=>{
            action.resetForm()
            addVehicle(values)
        }}
        >
            {(props)=>(<>
        <Text>Enter your Vehicle Name </Text>
    <View style={styles.inputContainer}><View style={styles.iconContainer} >
                        <Feather name="user" size={22} style={{marginRight:10}}/></View>
                       <TextInput
                        style={styles.input}
                      
                        placeholder="Enter Vehicle Name"
                        onChangeText={props.handleChange('VehicleName')}
             value={props.values.VehicleName}
             onBlur={props.handleBlur('VehicleName')}
                         />
                    </View>
                    <Text style={{color:'red',marginTop:-10}}>{props.touched.VehicleName && props.errors.VehicleName}</Text>
    <Text>Enter  Number Plate</Text>
    <View style={styles.inputContainer}><View style={styles.iconContainer} >
                        <Feather name="user" size={22} style={{marginRight:10}}/></View>
                       <TextInput
                        style={styles.input}
                    
                        placeholder="Enter Number Plate"
                        onChangeText={props.handleChange('NoPlate')}
                        value={props.values.NoPlate}
                        onBlur={props.handleBlur('NoPlate')}/>
                    </View>
                    <Text style={{color:'red',marginTop:-10}}>{props.touched.NoPlate && props.errors.NoPlate}</Text>
                    <Text>Enter  Registration Number</Text>
    <View style={styles.inputContainer}><View style={styles.iconContainer} >
                        <Feather name="user" size={22} style={{marginRight:10}}/></View>
                       <TextInput
                        style={styles.input}
                     
                        placeholder="Enter Registration Number"
                        onChangeText={props.handleChange('RegisNumber')}
                        value={props.values.RegisNumber}
                        onBlur={props.handleBlur('RegisNumber')} />
                    </View>
                    <Text style={{color:'red',marginTop:-10}}>{props.touched.RegisNumber && props.errors.RegisNumber}</Text>
                                    <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
                                        
                                    <Flatbutton  text='Save'style={{top:10,}} 
                                  onPress={props.handleSubmit}/>
                            </View></>)}
                    </Formik>
    
    </SafeAreaView>
  )
}

export default AddVehicle
const styles = StyleSheet.create({
    classimage:{
        height:30,
        width:40
    },
    iconContainer:{
        justifyContent: "center",
        alignItems: "center",
        justifyContent:'center',
        backgroundColor: "#DEEDF0",
        width: 40,
        height: 40,
        borderRadius: 10
    },
    inputContainer:{
        flexDirection: "row",
        alignItems: "center",
        borderColor: "rgba(0,0,0,.2)",
        borderWidth: 1,
        height: 60,
        borderRadius: 15,
        paddingHorizontal: 5,
        marginVertical: 10
    }
})