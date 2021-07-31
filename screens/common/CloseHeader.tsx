
import React from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal, ImageBackground, StyleSheet, StatusBar
} from "react-native";

import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

import Draw from "./Svgs/Draw";
import { AppColors } from "./AppColors";
import Close from "./Svgs/Close";


interface Props {
  img1: any,
  img2: any,
  img3: any,


}

const CloseHeader = (props: Props) => {
  const navigation = useNavigation()
  return (

    <View style={{ alignSelf: 'center', width: "90%", marginTop: 20 }}>
      <StatusBar barStyle={'light-content'} translucent={true} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 0.2, alignItems: "flex-start" }}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
            <Close />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.6, alignItems: "center" }}>
          <View style={{ alignSelf: "center", flexDirection: "row", }}>
            <Text style={{ color: AppColors.black, fontFamily: "SR", fontSize: 20 }}>Courts </Text>
            <Text style={{ color: AppColors.appColor, fontFamily: "SR", fontSize: 20 }}>Republic</Text>
          </View>
        </View>

        <View style={{ flex: 0.2, alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
            {props.img1}
          </TouchableOpacity>
        </View>

      </View>




    </View>

  );

};
const styles = StyleSheet.create({

})
export default CloseHeader;
