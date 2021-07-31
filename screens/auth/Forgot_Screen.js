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
  Alert,
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
import { AntDesign } from '@expo/vector-icons';
import { urls } from "../common/Api_urls";
export default class Forgot_Screen extends Component {
  static navigationOptions = {
    header: null,
    headerLeft: null,
    gesturesEnabled: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading:false,

        login_data: {
            name: '',
            email: '',
            password: '',
            cpassword: '',
        },
        check_box: 1,
        clang:{slug:"english"}
    }
    this.arr = [];
}

componentDidMount() {
        

  this.retrieveItem("login_data").then((v)=>{
      if(v)
      {
          this.setState({
              logged_in:true,
              token:v.token
          },()=>{
              this.other_mount();
          });
      }
      else{
        this.other_mount();
      }
  })
}
other_mount()
{
  this.retrieveItem("clang").then((v)=>{
      // this.setState({clang:v},()=>{
      //     // this.get_data();
      // })
     });
}
downButtonHandler(to){
    var yy = to ;
    setTimeout(()=>{
        this.scrollview_ref.scrollTo({ x: 0, y: yy, animated: true });
    },500);
  };
  componentWillMount()
  {
      var that = this;
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e)=>{
          that.setState({my_padding_bottom:e.endCoordinates.height});
      });
      
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',(e)=>{
          that.setState({my_padding_bottom:0});
      });
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
        var err = this.state.clang.slug=="english"? 'Please enter your email.':'رجاءا أدخل بريدك الإلكتروني.'

        this.dropDownAlertRef.alertWithType('error', this.state.clang.slug=="english"?'error':"خطأ", err);
        return;
    }
    else if (!this.validate_email(all.email)) {
        var err = this.state.clang.slug=="english"?  'Please provide a valid email format.':"يرجى تقديم تنسيق بريد إلكتروني صالح."


        // alert("Please enter your email");
        this.dropDownAlertRef.alertWithType('error',this.state.clang.slug=="english"?'error':"خطأ", err);
        return;
    }
    




    this.setState({ loading: true });

    var body_data = { 
        email: this.state.login_data.email, 
        lang:"en"
       
     };

    console.log("I send:");
    console.log(body_data);


fetch(urls.API + 'forgot_password', {
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

            this.setState({loading:false},()=>{
                setTimeout(() => {
                    
                
                Alert.alert(
                    'Success',
                    'We have sent you an email, please check',
                    [
                      
                      {text: 'OK', onPress: () => this.props.navigation.goBack()},
                    ],
                    { cancelable: false }
                  )
                }, 500);
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




do_fb = async () => {
    // alert("touched");
    try{
    await Facebook.initializeAsync('3217834861601859');
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync( {
            permissions: ['public_profile',"email"],
          });
        
        
        
          if (type === 'success') {
            this.callGraph(token);
            // console.log("calling token: "+token);
            // this.callWpFb(token,1);


        
            // this.firebaseLogin(token);
          }
          else{
            console.log(type);
          }
        }
        catch({message})
        {
            console.log("Facebook error: "+message);
        }

    
  };

  
  signup_me_up(id,email,name,type)
  {
      this.setState({loading:true});

    var url_plus = "social_connect";
      var body_data = {
        email:email,
        name:name,
        token:id,
        type:type,
      };
    fetch(urls.API + url_plus, {
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
                  this.setState({loading:false},()=>{
                    this.props.navigation.navigate("Home");

                  })
                });
            }


            else {

                this.setState({ loading: false }, () => {
                    setTimeout(() => {
                        this.dropDownAlertRef.alertWithType('Error', 'error', responseJson.err);
                        // alert(responseJson.error);
                    }, 500);
                });
            }
        })
        .catch((error) => {
        this.dropDownAlertRef.alertWithType('Error', 'error', "Network error, Please try again");

            this.setState({ loading: false }, () => {
                setTimeout(() => {
                    // this.dropDownAlertRef.alertWithType('Error', 'error', error);

                    //   alert(error);
                }, 500);
            });
        });
  }

  
  callGraph = async token => {
  
    /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`
    );
    const responseJSON = JSON.stringify(await response.json());
    // console.log(responseJSON);
    var data = JSON.parse(responseJSON);
      console.log(data);
      console.log(data.email);
    this.signup_me_up(data.id,data.email,data.name,"FACEBOOK");
  
  
  };
  
  
  do_gl = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "948419095873-4a8v3gipn8krjhbc1k1lt9k21afmju8i.apps.googleusercontent.com",
        iosClientId: "948419095873-i0pn3q8hnu03ldhlbrk6iijq2e54ot6m.apps.googleusercontent.com",
        androidStandaloneAppClientId:"948419095873-ctirofrrtl35rhkis0pjhsq411kdsb4f.apps.googleusercontent.com",
        iosStandaloneAppClientId:"948419095873-9glicora59pjl7ke2us5q7qarl715p7f.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        console.log(result.accessToken);
        this.getUserInfo(result.accessToken);
      } else {
        console.log("cancleed");
      }
    } catch (e) {
      console.log("error");
      console.log(e);
      // return { error: true };
    }
  }
  
  getUserInfo = async (accessToken) => {
    let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  
    // console.log(userInfoResponse);
    userInfoResponse.json().then((data)=>{
      console.log(data);
      this.signup_me_up(data.id,data.email,data.name,"GOOGLE");
    })
  }
  render() {
    if (this.state.loading) {
      return <Spinner visible={this.state.loading} />;
    }
    return (
      <Container style={{ backgroundColor: "#fff" }}>
       
      <View style={{ zIndex: 1 }}>
        <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
      </View>
      <SafeAreaView forceInset={{top:'never'}}
        style={{ flex: 1, paddingTop: Platform.OS === "android" ? 25 : 0 }}
      >
        <Content contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={()=>{

                        this.props.navigation.goBack()
                        }}
                        style={{
                          marginTop: viewportHeight * (4 / 100),

                          marginLeft:viewportWidth*(6/100),
                        shadowColor: "#000",
                        shadowOffset: {
                        width: 0,
                        height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        width: 50,
                        height: 50,
                        borderRadius: 100/2,
                        backgroundColor: '#FF4257',justifyContent:"center",alignItems:"center"
                        }}
          >
          <AntDesign name="arrowleft" size={20} color="#fff" />
          </TouchableOpacity>
            <View
              style={{
                alignSelf: "center",
                marginTop: viewportHeight * (8 / 100),
                width: viewportWidth * (84 / 100),
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "#FF4257",
                  fontSize: 26,alignSelf:"center",
                }}
              >
             
                FORGOT PASSWORD
               
                
              </Text>
            </View>
            <View style={{ marginTop: viewportHeight * (8 / 100) }}>
            <View   onLayout={event => {
                                    const layout = event.nativeEvent.layout;
                                    this.arr[0] = layout.y;
                  
                }} style={{shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                
                elevation: 5,
                
                marginTop: viewportHeight * (2 / 100),alignSelf:"center",flexDirection:"row",alignItems:"center",justifyContent:'space-between',width:viewportWidth*(80/100),backgroundColor: "#FFFFFF", borderRadius: 8,}}>
                        <View style={{width:viewportWidth*(15/100),alignItems:"center",}}>
                        <Image resizeMode={'contain'} style={{ width: viewportWidth * (5 / 100), height: viewportWidth * (5 / 100) }} source={require('./../../assets/image/Mail.png')} />
                        </View>
                        <View style={{width:viewportWidth*(65/100),}}>
                        <TextInput
                  style={{
                    
                    color: "#FFA61F",
                    width: viewportWidth * (63 / 100),
                    backgroundColor: "#FFFFFF",
                    paddingBottom: viewportHeight * (1.5 / 100),
                    paddingTop: viewportHeight * (1.5 / 100),
                  }}
                  placeholder={"Email"}
                  placeholderTextColor={"#888888"}
                  autoCapitalize={false}
                  keyboardType={"email-address"}
                  value={this.state.login_data.email}
                  onChangeText={(v) => {
                    var old = this.state.login_data;
                    old.email = v;
                    this.setState({ login_data: old });
                  }}
                  onFocus={()=>{
                    // this.downButtonHandler(this.arr[0]);
                }}
                />
                        </View>
                    </View>
              
     
              
              
            </View>
            <View   style={{
               width:viewportWidth*(80/100),
               marginTop: viewportHeight * (12 / 100),
                  alignItems: "flex-end",
                  alignSelf:"center"
                }}>
             
             <TouchableOpacity
             onPress={()=>{
               this.login_now()
             }}
      style={{  width:viewportWidth*(80/100),
        paddingBottom: viewportHeight * (2 / 100),
        paddingTop: viewportHeight * (2 / 100),
                  alignSelf:"center",
                  alignItems: 'center', borderRadius: 8,backgroundColor:'#FF4257', }}>
      <Text
        style={{
          backgroundColor: 'transparent',
          fontSize: 16,
          
          color: '#fff',
        }}>
       RESET
      </Text>
    </TouchableOpacity>
             
              </View>
          </View>
        </Content>
      </SafeAreaView>
  </Container>
    );
  }
}

const styles = StyleSheet.create({});
