import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
  SafeAreaView,
  PixelRatio,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
} from "native-base";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign ,MaterialIcons} from '@expo/vector-icons';
export default class Intro extends Component {
  static navigationOptions = {
    header: null,
    headerLeft: null,
    gesturesEnabled: true

}
  constructor(props) {
    super(props);
    this.state = {
      login_data: {
        email: "",
        password: "",
      },
      check_box: 1,
      loading: false,
    };
  }



  login_now() {
    var all = this.state.login_data;

    if (all.email == "") {
      // alert("Please enter your email");
      this.dropDownAlertRef.alertWithType(
        "error",
        "error",
        "Please enter your email."
      );
      return;
    }

    if (all.password.length < 6) {
      // alert("Please enter a valid password");
      // return;
      this.dropDownAlertRef.alertWithType(
        "error",
        "error",
        "Please enter a valid password."
      );
      return;
    }
    this.props.navigation.navigate('onbord')

  }



  render() {
    if (this.state.loading) {
      return <Spinner visible={this.state.loading} />;
    }
    return (
      <Container style={{ backgroundColor: "#ffffff" }}>
          <ImageBackground
          style={{ flex: 1, width: null, height: null }}
          resizeMode={"cover"}
          source={require('./../../assets/image/onbg1.png')}
        >
         <SafeAreaView forceInset={{top:'never'}}
            style={{ flex: 1, paddingTop: Platform.OS === "android" ? 25 : 0 }}
          >
        
          
         
          <View style={{position:"relative",alignSelf:"center",flex:1,flexDirection:"column",justifyContent:"flex-end",width:viewportWidth*(80/100),marginBottom:viewportHeight*(10/100)}}>
          <View>
           <Text style={{color:'#fff',fontSize:26,fontFamily:"p-bold",}}>HEADLINE HERE</Text>

           </View>
           <View style={{marginTop:viewportHeight*(1/100)}}>
           <Text style={{color:'#fff',fontSize:14,fontFamily:"p-regular",}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining</Text>

           </View>
          </View>
          <View style={{position:'absolute',bottom:20,right:40}}>
                                <TouchableOpacity onPress={()=>{

                                    this.props.navigation.navigate('Intro_2')
                                }}
                                style={{
                                  
                               
                                 alignItems:"center",flexDirection:"row"
                                }}
                                >
                                  <Text style={{fontSize:22,color:'#fff',fontFamily:"p-bold"}}>Next </Text>
                                  <MaterialIcons name="arrow-forward-ios" size={18} color="#fff" />
                                </TouchableOpacity>
                            </View>
              </SafeAreaView>
              </ImageBackground>
            </Container>
    );
  }
}

const styles = StyleSheet.create({});
