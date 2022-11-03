import * as React from 'react';
import { View, StyleSheet, Button, TextInput, Text } from 'react-native';
import * as SMS from 'expo-sms';

const SmsScreen=()=> {
  const [smsServiceAvailable, setSmsServiceAvailable] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [message, setMessage] = React.useState('');

  // trigger the handler method as soon as the function component
  // SmsScreen is mounted
  React.useEffect(() => {
    checkIfServiceAvailable();
  }, []);

  // define a handler method to check if SMS service is available or not

  const checkIfServiceAvailable = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      setSmsServiceAvailable(true);
    }
  };
  const onComposeSms = async () => {
    if (smsServiceAvailable && phoneNumber && message) {
      await SMS.sendSMSAsync(phoneNumber.toString(), message);
    }
  };
  return (
    <View style={{ flex: 1, paddingVertical: 50 }}>
      {smsServiceAvailable ? (
        <Text>SMS service available.</Text>
      ) : (
        <Text>No SMS service available.</Text>
      )}
      <View style={styles.formController}>
  <TextInput
    style={styles.input}
    value={phoneNumber}
    onChangeText={text => setPhoneNumber(text)}
    keyboardType='number-pad'
    placeholder='Enter phone number here'
  />
  <TextInput
    style={styles.input}
    value={message}
    onChangeText={text => setMessage(text)}
    keyboardType='default'
    placeholder='Enter message here'
  />
  <Button
    title='Send SMS'
    onPress={onComposeSms}
    disabled={!smsServiceAvailable}
  />
</View>
    </View>
  );
}
export default SmsScreen
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingVertical: 50
  },
  formController: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 10
  }
});