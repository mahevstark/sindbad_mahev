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
  CheckBox,
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
import DropdownAlert from "react-native-dropdownalert";
import { LinearGradient } from 'expo-linear-gradient'
import { urls } from "../common/Api_urls";
import { changeLoggedIn } from "../../Common";

export default class Contactus extends Component {
  static navigationOptions = {
    header: null,
    headerLeft: null,
    gesturesEnabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,

      lang:'en',


      email: '',
      name: '',
      subject: '',
      password: '',
      msg: '',
      display_name: "",
      username: "",

      login_data: {
        name: '',
        email: '',
        phone: '',
        password: '',
        cpassword: '',



      },
      isSelected: false,
      check_box: 1,
      clang: {}
    }
    this.arr = [];
  }



  downButtonHandler(to) {
    var yy = to;
    setTimeout(() => {
      this.scrollview_ref.scrollTo({ x: 0, y: yy, animated: true });
    }, 500);
  };
  componentWillMount() {
    var that = this;
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      that.setState({ my_padding_bottom: e.endCoordinates.height });
    });

    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => {
      that.setState({ my_padding_bottom: 0 });
    });
  }

  componentDidMount(){
    this.retrieveItem("lang").then((lang)=>{
        // this.setState({lang},()=>{
        // })
    })
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


  validate_email = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {

      return false;
    }
    else {
      return true;
    }
  }
  validate_form() {
    var all = this.state;
    if (all.name == "") {
      // alert("Please enter your name");
      var err = this.state.lang == "en" ? 'Please enter your name.' : 'يرجى إدخال اسمك.'

      this.dropDownAlertRef.alertWithType('error', this.state.lang == "en" ? 'error' : "خطأ", err);
      return;
    }
    if (all.email == "") {
      // alert("Please enter your email");
      var err = this.state.lang == "en" ? 'Please enter your email.' : 'رجاءا أدخل بريدك الإلكتروني.'

      this.dropDownAlertRef.alertWithType('error', this.state.lang == "en" ? 'error' : "خطأ", err);
      return;
    }
    else if (!this.validate_email(all.email)) {
      var err = this.state.lang == "en" ? 'Please provide a valid email format.' : "يرجى تقديم تنسيق بريد إلكتروني صالح."


      // alert("Please enter your email");
      this.dropDownAlertRef.alertWithType('error', this.state.lang == "en" ? 'error' : "خطأ", err);
      return;
    }
    if (all.subject == "") {
      var err = this.state.lang == "en" ? 'Please enter username.' : 'الرجاء إدخال اسم المستخدم.'


      // alert("Please enter your phone");
      this.dropDownAlertRef.alertWithType('error', this.state.lang == "en" ? 'error' : "خطأ", err);
      return;
    }

    if (all.msg == "") {
        var err = this.state.lang == "en" ? 'Please enter your message.' : 'الرجاء إدخال اسم المستخدم.'
  
  
        // alert("Please enter your phone");
        this.dropDownAlertRef.alertWithType('error', this.state.lang == "en" ? 'error' : "خطأ", err);
        return;
      }

   


    this.setState({ loading: true });

    var body_data = {
      display_name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      msg: this.state.msg,
      lang: "en"
    };

    console.log("I send:");
    console.log(body_data);


    fetch(urls.API + 'contact_us', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body_data),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("I get:");
        console.log(responseJson);

        if (responseJson.action == "success") {
            this.setState({
                loading:false
            },()=>{
            this.dropDownAlertRef.alertWithType('success', 'Success', "Your message has been sent");

            this.setState({
                msg:"",
                email:"",
                subject:"",
                name:""
            })
         
        })
        }


        else {

          this.setState({ loading: false }, () => {
            setTimeout(() => {
              this.dropDownAlertRef.alertWithType('error', 'Error', responseJson.err);
              // alert(responseJson.error);
            }, 500);
          });
        }
      })
      .catch((error) => {
        this.setState({ loading: false }, () => {
          setTimeout(() => {
            this.dropDownAlertRef.alertWithType('error', 'Error', error);

            //   alert(error);
          }, 500);
        });
      });


  }


  render() {
    if (this.state.loading) {
      return <Spinner visible={this.state.loading} />;
    }
    return (
      <Container style={{ backgroundColor: "#EFF7FA" }}>
        <StatusBar />
        <View style={{ zIndex: 1 }}>
            <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
        </View>
        <ImageBackground
          style={{ flex: 1, width: null, height: null }}
          resizeMode={"cover"}
          source={require('./../../assets/image/signup.png')}
        >
          <SafeAreaView
            style={{ flex: 1, }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              ref={ref => {
                this.scrollview_ref = ref;
              }} >
              <View style={{ flex: 1 }}>
                <View style={{ alignSelf: "center", marginTop: 5 }}>
                  <Image
                    style={{ resizeMode: 'contain', width: viewportWidth * (40 / 100), height: viewportWidth * (40 / 100), }}
                    source={require("./../../assets/image/sindlogo.png")}
                  />
                </View>
                <View style={{ width: viewportWidth * (80 / 100), alignSelf: "center", marginTop: 10 }}>
                  <Text style={{ fontFamily: "p-bold", color: "#070704", fontSize: 22 }}>Contact Us</Text>
                </View>
                <View style={{
                  paddingBottom: this.state.my_padding_bottom
                }}>
                  <View style={{ marginTop: viewportHeight * (2 / 100) }}>
                    <View onLayout={event => {
                      const layout = event.nativeEvent.layout;
                      this.arr[0] = layout.y;
                    }} style={{
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,

                      marginTop: viewportHeight * (2 / 100), alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: viewportWidth * (80 / 100), backgroundColor: "#FFFFFF", borderRadius: 8,
                    }}>
                      <View style={{ width: viewportWidth * (15 / 100), alignItems: "center", }}>
                        <Image resizeMode={'contain'} style={{ width: viewportWidth * (5 / 100), height: viewportWidth * (5 / 100) }} source={require('./../../assets/image/uuser.png')} />
                      </View>
                      <View style={{ width: viewportWidth * (65 / 100), }}>
                        <TextInput
                          style={{
                            fontFamily: "pp-regular",
                            color: "#F64253",
                            width: viewportWidth * (63 / 100),
                            backgroundColor: "#FFFFFF",
                            paddingBottom: viewportHeight * (1.5 / 100),
                            paddingTop: viewportHeight * (1.5 / 100),
                          }}
                          placeholder={"Name"}
                          placeholderTextColor={"#878787"}
                          autoCapitalize={false}
                          value={this.state.name}
                          onChangeText={(v) => {

                            this.setState({ name: v });
                          }}
                          onFocus={() => {
                            this.downButtonHandler(this.arr[0]);
                          }}
                        />
                      </View>
                    </View>
                    <View onLayout={event => {
                      const layout = event.nativeEvent.layout;
                      this.arr[1] = layout.y;

                    }} style={{
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,

                      marginTop: viewportHeight * (2 / 100), alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: viewportWidth * (80 / 100), backgroundColor: "#FFFFFF", borderRadius: 8,
                    }}>
                      <View style={{ width: viewportWidth * (15 / 100), alignItems: "center", }}>
                        <Image resizeMode={'contain'} style={{ width: viewportWidth * (5 / 100), height: viewportWidth * (5 / 100) }} source={require('./../../assets/image/Mail.png')} />
                      </View>
                      <View style={{ width: viewportWidth * (65 / 100), }}>
                        <TextInput
                          style={{
                            fontFamily: "pp-regular",
                            color: "#F64253",
                            width: viewportWidth * (63 / 100),
                            backgroundColor: "#FFFFFF",
                            paddingBottom: viewportHeight * (1.5 / 100),
                            paddingTop: viewportHeight * (1.5 / 100),
                          }}
                          placeholder={"Email"}
                          placeholderTextColor={"#878787"}
                          autoCapitalize={false}
                          keyboardType={"email-address"}
                          value={this.state.email}
                          onChangeText={(v) => {
                            this.setState({ email: v });
                          }}
                          onFocus={() => {
                            this.downButtonHandler(this.arr[1]);
                          }}
                        />
                      </View>
                    </View>
                    <View onLayout={event => {
                      const layout = event.nativeEvent.layout;
                      this.arr[1] = layout.y;

                    }} style={{
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,

                      marginTop: viewportHeight * (2 / 100), alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: viewportWidth * (80 / 100), backgroundColor: "#FFFFFF", borderRadius: 8,
                    }}>
                      <View style={{ width: viewportWidth * (15 / 100), alignItems: "center", }}>
                        <Image resizeMode={'contain'} style={{ width: viewportWidth * (5 / 100), height: viewportWidth * (5 / 100) }} source={require('./../../assets/image/uuser.png')} />
                      </View>
                      <View style={{ width: viewportWidth * (65 / 100), }}>
                        <TextInput
                          style={{
                            fontFamily: "pp-regular",
                            color: "#F64253",
                            width: viewportWidth * (63 / 100),
                            backgroundColor: "#FFFFFF",
                            paddingBottom: viewportHeight * (1.5 / 100),
                            paddingTop: viewportHeight * (1.5 / 100),
                          }}
                          placeholder={"Subject"}
                          placeholderTextColor={"#878787"}
                          autoCapitalize={false}
                          value={this.state.subject}
                          onChangeText={(v) => {

                            this.setState({ subject: v });
                          }}
                          onFocus={() => {
                            this.downButtonHandler(this.arr[1]);
                          }}
                        />
                      </View>
                    </View>
                    <View onLayout={event => {
                      const layout = event.nativeEvent.layout;
                      this.arr[2] = layout.y;
                    }} style={{
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      overflow:"hidden",
                      paddingLeft:15,
                      elevation: 5, marginTop: viewportHeight * (2 / 100), alignSelf: "center", flexDirection: "row",  justifyContent: 'space-between', width: viewportWidth * (80 / 100), backgroundColor: "#FFFFFF", borderRadius: 8,
                    }}>
                      
                      <View style={{ width: viewportWidth * (65 / 100), }}>
                        <TextInput
                        multiline={true}
                          style={{
                            fontFamily: "pp-regular",
                            color: "#F64253",
                            width: viewportWidth * (63 / 100),

                            backgroundColor: "#FFFFFF",
                            paddingBottom: viewportHeight * (1.5 / 100),
                            paddingTop: viewportHeight * (1.5 / 100),
                            height:200,
                            textAlignVertical:"top"
                          }}
                          placeholder={"Message"}
                          placeholderTextColor={"#878787"}
                          autoCapitalize={false}
                          secureTextEntry
                          value={this.state.msg}
                          onChangeText={(v) => {

                            this.setState({ msg: v });
                          }}
                          onFocus={() => {
                            this.downButtonHandler(this.arr[2]);
                          }}
                        />
                      </View>
                    </View>
                    
                  </View>
                
                  <View style={{
                    width: viewportWidth * (80 / 100),
                    marginTop: viewportHeight * (3 / 100),
                    alignItems: "flex-end",
                    alignSelf: "center"
                  }}>

                    <TouchableOpacity onPress={() => {
                      // this.props.navigation.navigate("Root");
                      this.validate_form()
                    }} style={{ width: "100%", height: 54, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                      <LinearGradient

                        style={{ width: "100%", height: 54, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}
                        colors={['#DE3535', '#FF9500']}
                      >

                        <Text style={{ fontFamily: 'LB', fontSize: 16, color: '#FFFFFF' }}>Submit</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                  </View>
                 
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});