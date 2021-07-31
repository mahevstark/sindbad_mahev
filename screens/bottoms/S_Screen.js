import React, { Component } from "react";
// import { Headers } from "../screens/Header";
import { Dimensions, Slider, Image, AsyncStorage, StyleSheet, TouchableOpacity, PixelRatio, ScrollView, SafeAreaView, Platform, StatusBar, Alert, ImageBackground } from "react-native";
let { height } = Dimensions.get("window");
// import {Font} from 'expo';
// import RF from "react-native-responsive-fontsize"
// import {Font} from 'expo';
import {
  Container,
  Accordion,
  View,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Right,
  Button,
  Form,
  Input,
  Item,
  Label,
  Content,
  Textarea
} from "native-base";
// import { urls } from "../Api_urls";
import DropdownAlert from 'react-native-dropdownalert';
// import { ImagePicker, Camera, Permissions } from "expo";
// import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
// import { localize } from "src/internationalization";
// import {urls} from './../../Api_url';
// import { Ionicons,FontAwesome,SimpleLineIcons,Feather,EvilIcons,MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const dataArray = [
  {
    title: "First Address",
    content: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
  },
  { title: "Second Address", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Address", content: "No Input" }
];

import Spinner from "react-native-loading-spinner-overlay";
import { TextInput } from "react-native-gesture-handler";
// import DevSpinner from "../DevSpinner";
// import Slider from '@react-native-community/slider';

export default class S_Screen extends Component {
  static navigationOptions = {
    header: null,
    headerLeft: null,
    gesturesEnabled: true

  }
  constructor(props) {
    super(props);

    // this.props.testapi();
    this.state = {
      image: null,
      name: "",
      email: "",
      search: "",
      mobile: "",
      cart_items: [

      ],
      clang: {},
      profile: {},
      total_price: 0.00,
      logged_in: false,
      token: "",
      selected_index: 0,
      current_value: (2000 / 2),
      sess_email: "",
      currency_symbol: "$",
      currency: "$",
      lang_id: 2,
      pre_total: 0,
      shipping: 0,
      tax: 0,
      loading: false,
      my_searches: [],
      s_cats_ready: false,
      s_cats: [
        { title: "Choose Category", id: -1, selected: 1 }
      ],
      grand_total: 0,

      total: 0,
      cart_item: [


      ]
    };

  }




  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    if (this.state.loading) {
      return <Spinner visible={this.state.loading} />;
    }
    return (
      <Container style={{ backgroundColor: '#FF4257', }}>
        <StatusBar />
         <ImageBackground
                style={{ flex: 1, width: null, height: null }}
                resizeMode={"cover"}
                source={require('./../../assets/image/ssbg.png')}
            >
        <SafeAreaView  style={{}}>
          <View style={{marginTop:40}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: viewportHeight * (1 / 100), paddingBottom: viewportHeight * (1 / 100), width: viewportWidth * (90 / 100), alignSelf: "center" }}>
             
                <TouchableOpacity onPress={() => {

                  this.props.navigation.goBack();

                }} style={{
                  justifyContent: "center", alignItems: "center"
                }}>
                  <Image resizeMode={'contain'} style={{ transform: [{ rotate: this.state.clang.slug == "arabic" ? '180deg' : '0deg' }], width: viewportWidth * (5 / 100), height: viewportWidth * (5 / 100) }} source={require("./../../assets/image/ssback.png")} />
                </TouchableOpacity>
              <TouchableOpacity  style={{ flexDirection: "row", width: viewportWidth * (80 / 100), alignItems: 'center', alignSelf: "center", backgroundColor: "#F5F5F5", borderRadius: 8, paddingVertical: 12 }}>
                                    <View style={{ flex: 0.15, alignItems: 'center' }}>
                                        <Image style={{ width: 22, height: 22, resizeMode: 'contain' }} source={require('./../../assets/image/sss.png')} />
                                    </View>
                                    <View style={{ flex: 0.70, alignItems: "flex-start" }}>
                                        <Text style={{
                                            color: "#B7B7B7",
                                            fontFamily: 'p-regular',
                                            fontSize: 12,
                                        }}>Search Your Favorite Product Here </Text>
                                    </View>
                                   
                                </TouchableOpacity>


            </View>
            {/* {this._render_new_address_modal_search()} */}
          </View>
        </SafeAreaView>
        <SafeAreaView forceInset={{ top: 'never' }} style={{ flex: 1, }}>
          <Content contentContainerStyle={{ width: "100%" }}>
            <View style={{
              marginTop: viewportHeight * (0 / 100),
            }}>
              <TouchableOpacity
               
               style={{
                 width: viewportWidth * (90 / 100),
                 borderRadius: 22,
                 marginTop: 10,
                 flexDirection:"row",
                 alignSelf: "center",
                 alignItems: "center",
                 justifyContent:"space-between",
                 backgroundColor: "#2996E8",
                 paddingTop: viewportHeight * (1 / 100),
                 paddingBottom: viewportHeight * (1 / 100),
               }}
             >
               <View style={{flex:0.2,}}>
</View>
               <View style={{flex:0.6,alignItems:'center'}}>
                 <Text
                   style={{
                     fontSize: 18,
                     color: "#fff",
                     fontFamily: "pp-medium",

                   }}
                 >
                  Choose Category
                     </Text>
               </View>
               <View style={{alignItems:"center",flex:0.2}}>
               <Image source={require('./../../assets/image/dd.png')} style={{resizeMode:"contain",width:16,height:16}} />

               </View>
             </TouchableOpacity>
             <TouchableOpacity
               
               style={{
                 width: viewportWidth * (90 / 100),
                 borderRadius: 22,
                 marginTop: 10,
                 flexDirection:"row",
                 alignSelf: "center",
                 alignItems: "center",
                 justifyContent:"space-between",
                 backgroundColor: "#62D148",
                 paddingTop: viewportHeight * (1 / 100),
                 paddingBottom: viewportHeight * (1 / 100),
               }}
             >
               <View style={{flex:0.2,}}>
</View>
               <View style={{flex:0.6,alignItems:'center'}}>
                 <Text
                   style={{
                     fontSize: 18,
                     color: "#fff",
                     fontFamily: "pp-medium",

                   }}
                 >
                   Choose Brand
                     </Text>
               </View>
               <View style={{alignItems:"center",flex:0.2}}>
               <Image source={require('./../../assets/image/dd.png')} style={{resizeMode:"contain",width:16,height:16}} />

               </View>
             </TouchableOpacity>
              <View style={{ marginTop: viewportHeight * (2 / 100), alignItems: "center", backgroundColor: "#FFFFFF", width: viewportWidth * (30 / 100), paddingBottom: viewportHeight * (0.5 / 100), paddingTop: viewportHeight * (0.5 / 100), borderTopEndRadius: 22, borderBottomEndRadius:22 }}>
                <Text style={{
                  color: "#EF545C",
                  fontFamily: "pp-medium",

                  fontSize: 16,
                }}>Price</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: viewportWidth * (80 / 100), alignItems: 'center', marginTop: viewportHeight * (2 / 100) }}>
                <View>
                  <Text style={{
                    color: "#FFFFFF",
                    fontFamily: "pp-medium",

                    fontSize: 18,
                  }}>0{this.state.currency}</Text>
                </View>
                <View>
                  <Text style={{
                    color: "#FFFFFF",
                    fontFamily: "pp-medium",

                    fontSize: 18,
                  }}>{this.state.currency} 2K+</Text>
                </View>
              </View>
              <View>
                <Slider
                  thumbTintColor='#FFFFFF'
                  style={{ width: viewportWidth * (80 / 100), height: 20, alignSelf: "center" }}
                  minimumValue={0}
                  maximumValue={2000}
                  step={10}
                  value={(2000 / 2)}
                  onValueChange={(v) => {
                    this.setState({ current_value: v })
                  }}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#FFFFFF"
                />

              </View>
              <View style={{ alignSelf: 'center', marginTop: 10 }}>
                <Text style={{
                  color: '#FFFFFF',
                  fontFamily: "pp-medium",

                  fontSize: 18,
                }}>{this.state.current_value}$</Text>
              </View>

              <View style={{ marginTop: viewportHeight * (2 / 100), alignItems: "center", backgroundColor: "#FFFFFF", width: viewportWidth * (30 / 100), paddingBottom: viewportHeight * (0.5 / 100), paddingTop: viewportHeight * (0.5 / 100), borderTopEndRadius: 22, borderBottomEndRadius:22 }}>
                <Text style={{
                  color: "#EF545C",
                  fontFamily: "pp-medium",

                  fontSize: 16,
                }}>Bar Code</Text>
              </View>

<View style={{alignSelf:'center',marginVertical:10}}>
  <Image source={require('./../../assets/image/bar.png')} style={{resizeMode:"contain",width:120,height:120}} />
</View>
<View style={{ marginTop: viewportHeight * (2 / 100), alignItems: "center", backgroundColor: "#FFFFFF", width: viewportWidth * (30 / 100), paddingBottom: viewportHeight * (0.5 / 100), paddingTop: viewportHeight * (0.5 / 100), borderTopEndRadius: 22, borderBottomEndRadius:22 }}>
                <Text style={{
                  color: "#EF545C",
                  fontFamily: "pp-medium",

                  fontSize: 16,
                }}>Photo</Text>
              </View>

<View style={{alignSelf:'center',marginVertical:10}}>
  <Image source={require('./../../assets/image/bcam.png')} style={{resizeMode:"contain",width:100,height:100}} />
</View>
            


            </View>
          </Content>
        </SafeAreaView>
        </ImageBackground>
      </Container>
    );
  }

}

