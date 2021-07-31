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
import DropdownAlert from "react-native-dropdownalert";
import { LinearGradient } from 'expo-linear-gradient'
import { changeLoggedIn } from "../../Common";
import { urls } from "../common/Api_urls";



export default class Login_Screen extends Component {
  static navigationOptions = {
    header: null,
    headerLeft: null,
    gesturesEnabled: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      lang: 'en',

      login_data: {
        name: '',
        email: '',
        password: '',
        cpassword: '',
      },
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


  login_now() {
    var all = this.state.login_data;

    if (all.email == "") {
      // alert("Please enter your email");
      var err = this.state.lang == "en" ? 'Please enter your email.' : 'رجاءا أدخل بريدك الإلكتروني.'

      this.dropDownAlertRef.alertWithType('error', this.state.lang == "en" ? 'error' : "خطأ", err);
      return;
    }



    if (all.password.length < 6) {
      // alert("Please enter a valid password");
      // return;
      var err = this.state.lang == "en" ? 'Please enter a valid password.' : 'الرجاء إدخال كلمة السر الصحيحة.'


      this.dropDownAlertRef.alertWithType('error', this.state.lang == "en" ? 'error' : "خطأ", err);
      return;
    }


    this.setState({ loading: true });

    var body_data = {
      email: this.state.login_data.email,
      password: this.state.login_data.password,
      lang: "en"
    };

    console.log("I send:");
    console.log(body_data);


    fetch(urls.API + 'login', {
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


          this.storeItem("login_data", responseJson.data).then(() => {
            this.storeItem("shipping_address", "").then(() => {
              this.retrieveItem("back_to_checkout").then((backto) => {




                if (backto == 55) {
                  this.setState({ loading: false }, () => {

                    this.props.navigation.navigate("Cart");

                  });
                }
                else {
                  this.setState({ loading: false }, () => {
                    this.props.navigation.navigate("Profile");

                    // changeLoggedIn.changeNow(1)

                  });
                }
              });
            });
          });
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
        <ImageBackground
          style={{ flex: 1, width: null, height: null }}
          resizeMode={"cover"}
          source={require('./../../assets/image/loginbg.png')}
        >

          <SafeAreaView forceInset={{ top: 'never' }}
            style={{ flex: 1, paddingTop: Platform.OS === "android" ? 0 : 0 }}
          >
            <View style={{ zIndex: 1 }}>
              <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
            </View>
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
                <View style={{ width: viewportWidth * (80 / 100), alignSelf: "center" }}>
                  <Text style={{ fontFamily: "p-bold", color: "#525252", fontSize: 26 }}>Welcome{'\n'}
                     Back!</Text>
                </View>
                <View style={{ width: viewportWidth * (80 / 100), alignSelf: "center", marginTop: 20 }}>
                  <Text style={{ fontFamily: "p-regular", color: "#070704", fontSize: 14 }}>Sign In to continue</Text>
                </View>
                <View style={{
                  paddingBottom: this.state.my_padding_bottom
                }}>
                  <View style={{ marginTop: viewportHeight * (4 / 100) }}>
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
                        <Image resizeMode={'contain'} style={{ width: viewportWidth * (5 / 100), height: viewportWidth * (5 / 100) }} source={require('./../../assets/image/Mail.png')} />
                      </View>
                      <View style={{ width: viewportWidth * (65 / 100), }}>
                        <TextInput
                          style={{
                            fontFamily: "pp-regular",
                            color: "#F64253",
                            width: viewportWidth * (63 / 100),
                            backgroundColor: "#FFFFFF",
                            paddingBottom: viewportHeight * (2 / 100),
                            paddingTop: viewportHeight * (2 / 100),
                          }}
                          placeholder={"Email"}
                          placeholderTextColor={"#878787"}
                          autoCapitalize={false}
                          keyboardType={"email-address"}
                          value={this.state.login_data.email}
                          onChangeText={(v) => {
                            var old = this.state.login_data;
                            old.email = v;
                            this.setState({ login_data: old });
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

                      elevation: 5, marginTop: viewportHeight * (3 / 100), alignSelf: "center", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: viewportWidth * (80 / 100), backgroundColor: "#FFFFFF", borderRadius: 8,
                    }}>
                      <View style={{ width: viewportWidth * (15 / 100), alignItems: "center", }}>
                        <Image resizeMode={'contain'} style={{ width: viewportWidth * (5 / 100), height: viewportWidth * (5 / 100) }} source={require('./../../assets/image/Lock.png')} />
                      </View>
                      <View style={{ width: viewportWidth * (65 / 100), }}>
                        <TextInput
                          style={{
                            fontFamily: "pp-regular",
                            color: "#F64253",
                            width: viewportWidth * (63 / 100),

                            backgroundColor: "#FFFFFF",
                            paddingBottom: viewportHeight * (2 / 100),
                            paddingTop: viewportHeight * (2 / 100),
                          }}
                          placeholder={"Password"}
                          placeholderTextColor={"#878787"}
                          autoCapitalize={false}
                          secureTextEntry
                          value={this.state.login_data.password}
                          onChangeText={(v) => {
                            var old = this.state.login_data;
                            old.password = v;
                            this.setState({ login_data: old });
                          }}
                          onFocus={() => {
                            this.downButtonHandler(this.arr[1]);
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
                      this.login_now();
                    }} style={{ width: "100%", height: 54, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                      <LinearGradient

                        style={{ width: "100%", height: 54, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}
                        colors={['#DE3535', '#FF9500']}
                      >

                        <Text style={{ fontFamily: 'LB', fontSize: 16, color: '#FFFFFF' }}>Sign In</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                  </View>
                  <View style={{ width: viewportWidth * (80 / 100), alignItems: "flex-end", alignSelf: "center", marginTop: viewportHeight * (2 / 100), }}>
                    <TouchableOpacity onPress={() => {
                      this.props.navigation.navigate('Forgot_Screen')
                    }}>
                      <Text style={{ color: "#070704", fontSize: 14, fontFamily: "pp-semibold" }}>
                        Forgot Password?
                   </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ alignSelf: "center", marginTop: viewportHeight * (4 / 100) }}>
                    <Text style={{ color: "#070704", fontSize: 14 }}>Sign In With</Text>
                  </View>
                  <View style={{ marginTop: viewportHeight * (2 / 100), alignSelf: "center", justifyContent: 'space-around', flexDirection: 'row', width: viewportWidth * (46 / 100) }}>
                    <TouchableOpacity onPress={() => {
                    }}>
                      <Image
                        source={require("./../../assets/image/ff.png")}
                        style={{ height: 60, width: 60, resizeMode: "contain" }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                    }}>
                      <Image
                        source={require("./../../assets/image/gg.png")}
                        style={{ height: 60, width: 60, resizeMode: "contain" }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ alignSelf: "center", alignItems: "center", justifyContent: "center", marginTop: viewportHeight * (4 / 100), flexDirection: 'row', width: viewportWidth * (80 / 100) }}>
                    <View>
                      <Text style={{ color: "#070704", fontSize: 14, fontFamily: 'pp-semibold', }}>Don't have an account?</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                      this.props.navigation.navigate('Signup_Screen')
                    }} style={{ marginLeft: viewportWidth * (2 / 100) }}>
                      <Text style={{ color: "#F44352", fontSize: 14, fontFamily: 'pp-semibold', }}>Sign Up</Text>
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
