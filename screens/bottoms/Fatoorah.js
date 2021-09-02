//Home.js
import React from 'react';
import {StyleSheet, Button, View } from 'react-native';
import {
  MFPaymentRequest,
  MFCustomerAddress,
  MFExecutePaymentRequest,
  Response,
  MFLanguage,
  MFMobileCountryCodeISO,
  MFCurrencyISO,
  MFPaymentype,
  MFKeyType
} from 'myfatoorah-reactnative';

export default function Fatoorah({ navigation })  {
    
  onExecuteButtonClickHandler = () => {
    executePayment()
  };
  onExecuteDirectPaymentButtonClickHandler = () => {
    executeDirectPayment();
  };
  onGetPaymentStatusButtonClickHandler = () => {
    getPaymentStatus();
  };

  return (
      <View style={styles.container}>
        <Button title="Pay"
          onPress = {this.onExecuteButtonClickHandler}
        />
        <Button title="Direct Payment"
          onPress = {this.onExecuteDirectPaymentButtonClickHandler}
        />
        <Button title="Get Payment Status"
          onPress = {this.getPaymentStatus}
        />
      </View>
    );
}
