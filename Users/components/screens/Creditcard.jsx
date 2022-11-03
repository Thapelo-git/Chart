import React,{useState,useEffect} from 'react'
import { SafeAreaView, StyleSheet, Text, View,Dimensions,TextInput,Image,
   Button, TouchableOpacity,Alert, ScrollView ,FlatList} from 'react-native'
    import { Formik } from 'formik'
    import * as yup from 'yup'
import { db,auth } from './firebase'
import moment from 'moment'
import Flatbutton from '../styles/button'
const screenwidth=Dimensions.get('screen').width
const Creditcard = ({navigation,route}) => {
    const hotelinfor=route.params.hotelinfor
 
    const hotelname=hotelinfor.name
 const [price,setPrice]=useState(route.params.price)
 const [Classes,setClasses]=useState(route.params.Classes)
  const [hotelimg,setHotelimg]=useState(hotelinfor.url)
  const [Phonenumber,setPhonenumber]=useState(route.params.Phonenumber)
  const NoPlate=route.params.NoPlate
  const VehicleName=route.params.VehicleName
 const [Status,setStatus]=useState('Pending')
 const [description,setDescription]=useState('Successfully paid')
 
 const datetoday=moment(new Date()).format('YYYY/MM/DD')
    
   
    const user = auth.currentUser.uid;
    const ReviewSchem=yup.object({
        cardNumber:yup.string().required().min(16).max(16),
        cardName:yup.string().required().min(2),
        CVV:yup.string().required().min(3).max(3),
        Expiry:yup.string().required().min(5).max(5),
   
    })
    const addCard=(data)=>{
        const {cardName,cardNumber,CVV,Expiry} = data
        const userid= auth.currentUser.uid
        db.ref(`/UserCards`).push({
            cardName:cardName,cardNumber:cardNumber,CVV:CVV,Expiry:Expiry,
            userId:userid,
          })
    }
    const addBooking=()=>{
        
        const userid= auth.currentUser.uid
    
        
        db.ref('TollPayment').push({
            userid,Status,
            description,hotelname,
           hotelimg,price,Classes,
            datetoday,VehicleName,NoPlate
       
        })
        navigation.navigate('PaySucc')
    
    }
   
   // const [Phonenumber,setPhonenumber]=useState(route.params.Phonenumber)
    // const Phonenumber=route.params.Phonenumber
   
   const [cardName,setCardName]=useState('')
   const [cardNumber,setCardNumber]=useState('')
   const [CVV,setCVV]=useState('')
   const [Expiry,setExpiry]=useState('')
   const [Booking,setBooking]=useState([])
    
   const [filteredDataSource, setFilteredDataSource] = useState([]);
 const [masterDataSource, setMasterDataSource] = useState([]);
 
 
 useEffect(()=>{
   
   
   db.ref('/TollPayment/').on('value',snap=>{
         
     const Booking=[]
        snap.forEach(action=>{
            const key=action.key
            const data =action.val()
            Booking.push({
                key:key,
                hotelimg:data.hotelimg,
                totPrice:data.totPrice,
                price:data.price,
                Classes:data.Classes,
                description:data.description,
                hotelname:data.hotelname,
                Status:data.Status,
                userid:data.userid,
                NoPlate:data.NoPlate,
                
            })
           })
  
           console.log(user)
           
          
            if(user){
              const userinfor = Booking.filter(function(item){
               const itemData = item.userid?
      
 (  item.userid)
               :   ( '') 
               const textData = user;
               return itemData.indexOf( textData)>-1;

           })
           setBooking(userinfor)
             setFilteredDataSource(userinfor);
            setMasterDataSource(userinfor);
        
            
           }
         
            
       //  })
    })
    
 },[])
 const [newPrice ,setnewPrice ]=useState(0)
const [ selectedBtnIndex,setSelectedBtnIndex] = useState(0);
const markcategory=(key,vehicleType)=>{
    setSelectedBtnIndex(key)
   }
   const Vehicle =[
    {id:'1',image_:require('../images/PayPal.jpg')},
    {id:'1',image_:require('../images/Mastercard2.jpg')}
  ]
   const Aminities =({category,index})=>{
    return(
        <TouchableOpacity key={index} activeOpacity={0.8}
        onPress={()=> markcategory(index,category.vehicleType,)} 
        
        >
            <View style={{backgroundColor:'white',marginRight:25,width:110,
height:70,justifyContent:'center',alignItems:'center',
borderRadius:10,borderWidth:2,borderColor:selectedBtnIndex == index?('blue'):('#fff')}}>
    <Image source={category.image_} style={styles.classimage}/>
   
</View>

        </TouchableOpacity>
    )
}
    return (
        <SafeAreaView>
            
             <View style={styles.header}>
                <Text style={{color:'#fff'}}>My Cards</Text>
                </View>
        <View style={styles.container}>
        {/* <View style={styles.card}>
        <Image source={require('../images/MasterCard.png')}
                style={{height:40,width:80,position:'absolute',top:20,right:20}}/>
                <View style={{position:'absolute',bottom:10,left:0,right:0,paddingHorizontal:20}}>
                    <Text style={{fontSize:30}}>{cardName}</Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{cardNumber}</Text>
                    <Text>{Expiry}</Text>
                    </View>
                </View>
        </View>  */}
        <Formik
        initialValues={{cardNumber:'',cardName:'',CVV:'',Expiry:''}}
        validationSchema={ReviewSchem}
        onSubmit={(values,action)=>{
            action.resetForm()
            addCard(values)
        }}
        >
            {(props)=>(
                <ScrollView>
           <View style={{padding:10}}>
               <Text>Card Number</Text>
               <TextInput
               placeholder='number'
               style={styles.inputs}
                
               keyboardType='numeric'
               onChangeText={props.handleChange('cardNumber')}
             value={props.values.cardNumber}
             onBlur={props.handleBlur('cardNumber')}
               />
                <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.cardNumber && props.errors.cardNumber}</Text>
                <Text>Cardholder Name</Text>
               <TextInput
               placeholder='Name'
               onChangeText={props.handleChange('cardName')}
               value={props.values.cardName}
               onBlur={props.handleBlur('cardName')}
               style={styles.inputs}
               />
                <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.cardName && props.errors.cardName}</Text>
               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
               <Text>Expiry Date</Text>  
               <Text>CVV</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
             <View>
               <TextInput
               placeholder='Expiry'
               keyboardType='numeric'
               onChangeText={props.handleChange('Expiry')}
               value={props.values.Expiry}
               onBlur={props.handleBlur('Expiry')}
               style={styles.inputs}
               />
                 <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.Expiry && props.errors.Expiry}</Text>
                 </View>
                 <View>
               <TextInput
               placeholder='CVV'
               keyboardType='numeric'
               style={styles.inputs}
               onChangeText={props.handleChange('CVV')}
               value={props.values.CVV}
               onBlur={props.handleBlur('CVV')}
               />
               <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.CVV && props.errors.CVV}</Text>
               </View>
                   </View>
        
                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:50}}>
                       <Button 
                       title='Add Card'
                       onPress={props.handleSubmit}/>
                           

                       {/* <TouchableOpacity onPress={addBooking()}>
                       <Text>Add Card</Text>
                       </TouchableOpacity> */}
                   </View>
                   <Text>Save card details for future payment</Text>
                   <Text>Other Payments Method</Text>
        <View style={{flexDirection:'row',top:10}}>

<FlatList
  keyExtractor={(_,key)=>key.toString()}
  horizontal
   showsHorizontalScrollIndicator={false}
   contentContainerStyle={{ paddingLeft:20}}
  data={Vehicle}
  renderItem={({item,index})=><Aminities category={item} index={index}/>}
  />

{/* {
    Booking.map((element)=>(
        <Text>{newPrice=newPrice + element.Price}</Text>
    ))
} */}
</View>
<View style={{width:'100%',justifyContent:'center',alignItems:'center',padding:10}}>
<Flatbutton text='Pay' style={{ top: 10, }}
            onPress={() => addBooking()} />
            </View>
           </View>
           </ScrollView> )}</Formik>
 
        </View>
      
        </SafeAreaView>
    )
}

export default Creditcard

const styles = StyleSheet.create({
       container:{
        height:'100%',
        marginTop:5,
        backgroundColor:'white',
        width:screenwidth,
        padding:10,
    },
    card:{
        borderWidth:1,
        borderColor:'black',
        width:"100%",
        height:180,
        borderRadius:10,
    }
    ,header: {
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
        input: {
            height: 40,
            width: '100%',
            margin: 12,
            borderWidth: 1,
            paddingHorizontal: 10
          },
          inputs:{
            borderBottomColor:'black',
            height:40,
             flex:0.8,
            paddingLeft:10,
            backgroundColor:'#eee'
        },
        classimage:{
            height:60,
            width:100
        },
})
