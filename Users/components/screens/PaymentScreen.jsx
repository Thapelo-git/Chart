import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,Alert
} from 'react-native';
import { db,auth } from './firebase'

//https://dribbble.com/shots/18944714-Online-Course-Mobile-App
// import { CreditCardInput } from 'react-native-credit-card-input';

import { Secret_key, STRIPE_PUBLISHABLE_KEY } from './keys';
import moment from 'moment';
// create a component
const CURRENCY = 'USD';
var CARD_TOKEN = null;

function getCreditCardToken(creditCardData){
  // alert()
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).
  then(response => response.json())
  .catch((error)=>console.log(error))
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
 function subscribeUser(creditCardToken){
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};

const PaymentScreen = ({navigation,route}) => {
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
  const [CardInput, setCardInput] = React.useState({})
  
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
  const onSubmit = async () => {
    
    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      alert('Invalid Credit Card');
      return false;
    }

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);
      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        Alert.alert(
          "creditCardToken error"
        )
        // alert("creditCardToken error");
        return;
      }
    } catch (e) {
      console.log("e",e);
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      alert(error)
    } else {
     
      let pament_data = await charges();
      console.log('pament_data', pament_data);
      if(pament_data.status == 'succeeded')
      {
     
       
        addBooking();
        // Alert.alert(
        //   "Payment Successfully"
        // )
        alert("Payment Successful");
        //onComposeSms()
        
      }
      else{
        Alert.alert(
          "Payment failed"
        )
        //alert('Payment failed');
      }
    }
  };


  const charges = async () => {

    const card = {
        'amount': 50, 
        'currency': CURRENCY,
        'source': CARD_TOKEN,
        'description': "Developers Sin Subscription"
      };

      return fetch('https://api.stripe.com/v1/charges', {
        headers: {
          // Use the correct MIME type for your server
          Accept: 'application/json',
          // Use the correct Content Type to send data to Stripe
          'Content-Type': 'application/x-www-form-urlencoded',
          // Use the Stripe publishable key as Bearer
          Authorization: `Bearer ${Secret_key}`
        },
        // Use a proper HTTP method
        method: 'post',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        body: Object.keys(card)
          .map(key => key + '=' + card[key])
          .join('&')
      }).then(response => response.json());
  };
  


  const _onChange =(data) => {
    setCardInput(data)
  }

  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
        <Image 
        source={require('../images/pay.png')}
        style={styles.ImgStyle}
        />
        <ScrollView>
        <CreditCardInput 
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        validColor="#fff"
        placeholderColor="#ccc"
        onChange={_onChange} />

      <TouchableOpacity 
  
    onPress={onSubmit}
      style={styles.button}>
        <Text
          style={styles.buttonText}>
          Pay Now
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  ImgStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button : {
    backgroundColor:'#2471A3',
    width:150,
    height:45,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:5
  },
  buttonText : {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight:'bold',
    textTransform:'uppercase'
  },
  inputContainerStyle : {
    backgroundColor:'#fff',
    borderRadius:5
  },
  inputStyle : {
    backgroundColor:'#222242',
    paddingLeft:15,
    borderRadius:5,
    color:'#fff'
  },
  labelStyle : {
    marginBottom:5,
    fontSize:12
  }
 
});

//make this component available to the app
export default PaymentScreen;