import React,{useRef} from 'react';

// import  { Paystack,paystackProps }  from 'react-native-paystack-webview';

import { View ,TouchableOpacity,Text} from 'react-native';

const PaystackScreen=({navigation,route})=> {
    // const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
    const hotelinfor=route.params.hotelinfor
    const [price,setPrice]=useState(route.params.price)
 const [Classes,setClasses]=useState(route.params.Classes)
  const [hotelimg,setHotelimg]=useState(hotelinfor.url)
  const [Phonenumber,setPhonenumber]=useState(route.params.Phonenumber)
  const NoPlate=route.params.NoPlate
  const VehicleName=route.params.VehicleName
 const [Status,setStatus]=useState('Pending')
 const [description,setDescription]=useState('Successfully paid')
 
 const datetoday=moment(new Date()).format('YYYY/MM/DD') 
    const addBooking=()=>{
        
      const userid= auth.currentUser.uid
  
      
      db.ref('Booking').push({
          userid,Status,
          description,hotelname,
         hotelimg,price,Classes,
          datetoday,VehicleName,NoPlate
     
      })
      navigation.navigate('PaySucc')
  
  }
  return (
    <View style={{ flex: 1 }}>
      <Paystack  
      buttonText="pay now"
        paystackKey="pk_test_dafe3738f1b6411fd800b23e1ea0f156d5415954"
        amount={price}
        billingEmail="chabathapelo1@gmail.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
         alert('Payment Cancelled')
        }}
        onSuccess={addBooking}
        currency={'ZAR'}
        autoStart={true}
      />
      <TouchableOpacity onPress={()=> paystackWebViewRef.current.startTransaction()}>
          <Text>Pay Now</Text>
        </TouchableOpacity>
    </View>
  );
}
export default PaystackScreen