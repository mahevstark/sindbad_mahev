import { NavigationContainer, useFocusEffect } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image, Modal, ScrollView, Dimensions ,TextInput, Keyboard, Alert} from 'react-native'
import { ArrowLeft, CartIcon, HeartGradient, MinusRedBox, PlusGreenBox } from '../componets/SvgComponent'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { urls } from '../common/Api_urls'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import DropdownAlert from "react-native-dropdownalert";

const CheckCart = ()=>{
  useFocusEffect(React.useCallback(() => {
    alert("hi")
 }, []))
}
export default class Cart extends Component {
    

    constructor(props) {
        super(props);
    
        // this.props.testapi();
        this.state = {
          image: null,
          edit_address: false,
          name: "",
          email: "",
          mobile: "",
          logged:{},
          token: "",
          cart_items: [
          
          ],
          total_price: 0.00,
          logged_in: 0,
          token: "",
          sess_email: "",
          currency_symbol: "$",
          pre_total: 0,
          shipping: 0,
          tax: 0,
          loading:false,
          grand_total: 0,
          loading_tax:true,
          loading_tax_error:false,
          login_data: {
            first_name: "",
            last_name: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            postcode: "",
            country: "",
            email: "",
            phone: ""

        },
          total:{
            subtotal:0.00,
            total:0.00,
            shipping:0.00,
            tax:0.00,
            symbol:'KWD'
          },
          lang:'en',
          my_padding_bottom:0
        };
        this.arr = [];
        const {navigation} = this.props;
        
      }
      downButtonHandler(to) {
        var yy = to;
        setTimeout(() => {
            this.scrollview_ref.scrollTo({ x: 0, y: yy, animated: true });
        }, 500);
    };
    UNSAFE_componentWillMount() {
        var that = this;
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            that.setState({ my_padding_bottom: e.endCoordinates.height });
        });

        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => {
            that.setState({ my_padding_bottom: 0 });
        });
    }
    
    
    
      get_cart_items() {
        this.retrieveItem("cart_items").then((v) => {
          if (v == null) {
            // alert("Empty");
    
          }
          else {
              console.log(v);
            var final = [];
            for (var i = 0; i <= v.length - 1; i++) {
                // v.qty = v.q;
              final.push(v[i]);
            }
    
            console.log("final cart is : ");
            console.log(final);
    
            this.setState({ cart_items: final }, () => {
              this.update_total();
              // this.calculate_shipping_n_tax();
    
            });
          }
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


      doDidMount(){
        console.log("yess");
        this.retrieveItem("login_data").then((v) => {
            
          if(v) this.setState({logged_in:1,logged: v ,token:v.token});
          else this.setState({logged_in:0});
            this.get_cart_items();


            this.retrieveItem("login_data").then((v) => {
              if (v) {
                  this.setState({ logged: v });




                  this.retrieveItem('shipping_address').then((sv) => {
                      if (sv)
                          this.setState({ login_data: sv, loading: false });
                      else {
                          
                          var old = this.state.login_data;
                          var fullname = v.displayname;
                          var first_name = fullname.split(" ");
                          old.first_name = first_name[0];
                          old.last_name = first_name[1];
                          old.email = v.email;
                          this.setState({ login_data: old }, () => {
                              // this.serve_guest()
                              // setInterval(()=>{
                              //   this.doDidMount();
                              // },3000)
                          });
                      }
                  })
              }
              else {
                  // this.serve_guest()
              
              }
          })
        // })
      })
      }
      componentDidMount() {


    
        this.props.navigation.addListener('focus', async () => {
          
          console.log("Alerrt");
          this.doDidMount();
        });
          
          
      }

      
      get_user_details() {
        this.setState({ loading: true });
        this.retrieveItem("logged_in").then((v) => {
          if (v) {
    
            if (v == 1) {
    
              // this.retrieveItem("")
              this.retrieveItem("sess_data").then((sess_data) => {
    
                if (sess_data) {
    
                  this.setState({ logged_in: 1 }, () => {
                    this.setState({ token: sess_data.token });
                    this.setState({ sess_email: sess_data.email }, () => {
                      this.take_me_to_checkout();
                    });
                  });
                }
                else {
    
                  this.show_login_alert();
                }
              })
            }
            else {
    
            }
          }
          else {
    
            this.show_login_alert();
          }
        });
      }
    
      //   loadAssetsAsync = async () => {
      //     await Font.loadAsync({
      //       'roboto-light': require('./../../../assets/Fonts/roboto/Roboto-Light.ttf'),
      //       'roboto-black': require('./../../../assets/Fonts/roboto/Roboto-Black.ttf'),
      //     })
      //     // this.setState({ fontLoaded: true })
      //   }
    
      minus_minus_selected(i) {
        if (!this.state.cart_items[i].qty || this.state.cart_items[i].qty == 1) {
            this.remove_cart_item(i);
            return;
        }
    
        var items = this.state.cart_items;
        items[i].qty = items[i].qty - 1;
    
    
        items[i].total_price = items[i].qty * items[i].price;
    
    
    
        this.setState({ cart_items: items }, () => {
          this.storeItem("cart_items", this.state.cart_items).then(() => {
              console.log("i was here");
            this.update_total();
            // this.calculate_shipping_n_tax();
          });
        });
    
    
      }
      take_me_to_checkout() {
    
    
        if (this.state.logged_in == 1) {
    
          this.setState({loading:true});
    
          console.log("Authenticating...");
          console.log({token:this.state.logged.token});
          fetch(urls.API + 'check_login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // username: this.state.email,
              token: this.state.logged.token,
             
              // password:this.state.password,
              // display_name:this.state.name
            }),
          }).then((response) => response.json())
            .then((responseJson) => {
    
              if (responseJson.action == "success") {
    
                this.setState({ loading: false }, () => {
                  this.storeItem("cart_total",this.state.total).then(()=>{
                    
                      this.props.navigation.navigate("Checkout_Screen");
                    
                  })
                });
              }
              else {
                this.show_login_alert();
              }
    
            })
            .catch((error) => {
              console.log(error);
              this.show_login_alert();
            });
        }
        else {
    
          this.show_login_alert();
        }
    
        // this.props.navigation.navigate("Checkout");
      }
      show_login_alert() {
        this.setState({ loading: false }, () => {
          setTimeout(() => {
            Alert.alert(
              this.state.lang=="en"?'Authentication Error':"خطأ مصادقة",
              this.state.lang=="en"?"Please login to complete this order":"يرجى تسجيل الدخول لإكمال هذا الطلب",
              [
                
                {
                  text: this.state.lang=="en"?'Cancel':"إلغاء",
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: this.state.lang=="en"?'OK':"حسنا", onPress: () =>
                
                {
                  this.storeItem("back_to_checkout",55).then(()=>{  
                    this.props.navigation.navigate('Login_Screen')
                  });
                }},
              ],
              {cancelable: false},
            );
          }, 500);
        });
      }
    
      plus_plus_selected(i) {
        if (this.state.cart_items[i].qty == 99) return;
    
        var items = this.state.cart_items;
        items[i].qty = items[i].qty + 1;
        items[i].total_price = items[i].qty * items[i].price;
    
        this.setState({ cart_items: items }, () => {
          this.storeItem("cart_items", this.state.cart_items).then(() => {
            // this.calculate_shipping_n_tax();
            this.update_total();
          });
        });
      }
    
      update_total() {
    
        var items = this.state.cart_items;
        var finals = [];
    
    
        for (var x_i = 0; x_i <= items.length - 1; x_i++) {
          finals.push({id:items[x_i].id,q:items[x_i].qty});
        }
    
    
        var body_data = {
          products: finals,
        };
    
        console.log("I ask for:");
        console.log(body_data);
    
        this.setState({loading_tax:true});
    
        fetch(urls.API + 'get_tax_n_shipping', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body_data),
        }).then((response) => response.json())
          .then((responseJson) => {
    
            console.log("I get this:");
            console.log(responseJson);
    
            if (responseJson.action == "success") {
    
            
              this.setState({total:responseJson.data},()=>{
    
              
                this.setState({ loading_tax: false }, () => {
                  
                });
              })
            }
            else {
              this.dropDownAlertRef.alertWithType('Error', 'error', responseJson.err);
            }
          })
          .catch((error) => {
            this.dropDownAlertRef.alertWithType('Error', 'error', error);
          });
    
        
      }
    
    
      remove_cart_item(i) {
        var iTems = this.state.cart_items;
        iTems.splice(i, 1);
        this.setState({
          cart_items: iTems
        }, () => {
    
    
    
          this.retrieveItem("cart_items").then((v) => {
    
            v.splice(i, 1);
    
            this.storeItem("cart_items", v).then(() => {
              // this.calculate_shipping_n_tax();
              this.update_total();
            });
          });
    
          this.update_total();
          // this.calculate_shipping_n_tax();
        })
      }

      calculate_shipping_n_tax() {
        this.retrieveItem("cart_items").then((items) => {
          this.setState({ cart_items: items }, () => {
    
            var cart_items = items;
    
            this.retrieveItem("important_data").then((v) => {
              this.setState({ imp_data: v });
              var shipping = parseFloat(0.00);
              var tax = parseFloat(0.00);
              var pre_total = parseFloat(0.00);
              if (v.shipping_type == "product_wise") {
                console.log("product wise");
    
                for (var i = 0; i <= cart_items.length - 1; i++) {
                  if (parseFloat(cart_items[i].shipping_cost) > 0) {
                    shipping += parseFloat(cart_items[i].shipping_cost) * cart_items[i].qty;
                  }
                  if (parseFloat(cart_items[i].tax) > 0) {
                    if (cart_items[i].tax_type == "percent") {
                      var total_tax_p = parseFloat((cart_items[i].tax * cart_items[i].total_price) / 100);
                    }
                    else {
                      var total_tax_p = parseFloat(cart_items[i].tax) * cart_items[i].qty;
                    }
                    if (total_tax_p > 0)
                      tax += total_tax_p;
                  }
    
                  if (parseFloat(cart_items[i].total_price) > 0) {
                    pre_total += parseFloat(cart_items[i].total_price);
                  }
                }
    
    
    
                var grand_total = pre_total + shipping + tax;
    
    
                this.setState({ pre_total });
                this.setState({ shipping });
                this.setState({ tax });
    
                this.setState({ grand_total }, () => {
                  this.setState({ loading: false });
                });
              }
              else {
                for (var i = 0; i <= cart_items.length - 1; i++) {
                  shipping = parseFloat(v.shipping_fixed);
    
                  if (parseFloat(cart_items[i].tax) > 0) {
                    if (cart_items[i].tax_type == "percent") {
                      var total_tax_p = parseFloat((cart_items[i].tax * cart_items[i].total_price) / 100);
                    }
                    else {
                      var total_tax_p = parseFloat(cart_items[i].tax) * cart_items[i].qty;
                    }
                    if (total_tax_p > 0)
                      tax += total_tax_p;
                  }
    
                  if (parseFloat(cart_items[i].total_price) > 0) {
                    pre_total += parseFloat(cart_items[i].total_price);
                  }
                }
    
                var grand_total = pre_total + shipping + tax;
    
                this.setState({ pre_total });
                this.setState({ shipping });
                this.setState({ tax });
    
                this.setState({ grand_total }, () => {
                  this.setState({ loading: false });
                });
              }
            });
          });
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
    validate() {


      if (this.state.logged_in == 0) {
        this.show_login_alert();
        return;
      }



        var all = this.state.login_data;

        if(all.first_name=="")
        {
            this.setState({edit_address:true});
            return;
        }

        if (all.first_name == "") {
            var err = this.state.lang=="en"?"Please enter first name.":"يرجى إدخال الاسم الأول."
            // alert("Please enter your email");
            this.dropDownAlertRef.alertWithType('error', this.state.lang=="en"?'error':"خطأ", err);
            this.setState({edit_address:true});
            return;
        }
        if (all.first_name == "") {
            // alert("Please enter your email");
            var err = this.state.lang=="en"?"Please enter last name.":"يرجى إدخال الاسم الأخير."
            this.dropDownAlertRef.alertWithType('error', this.state.lang=="en"?'error':"خطأ", err);
            this.setState({edit_address:true});
            return;
        }

        if (all.address_1 == "") {
            var err = this.state.lang=="en"?"Please enter address.":"يرجى إدخال العنوان."

            // alert("Please enter your email");
            this.dropDownAlertRef.alertWithType('error', this.state.lang=="en"?'error':"خطأ", err);
            this.setState({edit_address:true});
            return;
        }

        // if (all.city == "") {
        //     var err = this.state.lang=="en"?"Please enter city.":"الرجاء إدخال المدينة."

        //     // alert("Please enter your email");
        //     this.dropDownAlertRef.alertWithType('error', this.state.lang=="en"?'error':"خطأ", err);
        //     this.setState({edit_address:true});
        //     return;
        // }
        // if (all.state == "") {
        //     var err = this.state.lang=="en"?"Please enter state.":"الرجاء إدخال الولاية."

        //     // alert("Please enter your email");
        //     this.dropDownAlertRef.alertWithType('error', this.state.lang=="en"?'error':"خطأ", err);
        //     this.setState({edit_address:true});
        //     return;
        // }
        if (all.postcode == "") {

            // alert("Please enter your email");
            // this.dropDownAlertRef.alertWithType('error', 'error', 'Please enter postcode.');
            // return;
        }

        // if (all.country == "") {
        //     // alert("Please enter your email");
        //     var err = this.state.lang=="en"?"Please enter country.":"يرجى إدخال البلد."

        //     this.dropDownAlertRef.alertWithType('error', this.state.lang=="en"?'error':"خطأ", err);
        //     this.setState({edit_address:true});
        //     return;
        // }
        if (all.email == "" && !this.state.is_guest) {
            // alert("Please enter your email");
            var err = this.state.lang=="en"?"Please enter your email.":"رجاءا أدخل بريدك الإلكتروني."

            this.dropDownAlertRef.alertWithType('error', this.state.lang=="en"?'error':"خطأ", err);
            this.setState({edit_address:true});
            return;
        }
        else if (!this.validate_email(all.email) && !this.state.is_guest) {
            // alert("Please enter your email");
            var err = this.state.lang=="en"?"Please provide a valid email format.":"يرجى تقديم تنسيق بريد إلكتروني صالح."

            this.dropDownAlertRef.alertWithType('error', this.state.lang=="en"?'error':"خطأ", err);
            this.setState({edit_address:true});
            return;
        }
        if (all.phone == "") {
            // alert("Please enter your email");
            var err = this.state.lang=="en"?"Please enter phone.":"يرجى إدخال الهاتف."

            this.dropDownAlertRef.alertWithType('error', this.state.lang=="en"?'error':"خطأ", err);
            this.setState({edit_address:true});
            return;
        }

        this.storeItem("shipping_address", this.state.login_data);


        //  this.props.navigation.navigate('Payment_Screen')
        this.create_order();
    }

    async empty_cart() {
        await this.storeItem("cart_items", []);
        return true;
    }

    create_order() {
       

        



        this.retrieveItem("cart_items").then((cart_items) => {


            var items = cart_items;
            var finals = [];


            for (var x_i = 0; x_i <= items.length - 1; x_i++) {
                finals.push({ product_id: items[x_i].id, quantity: items[x_i].q });
            }




            var body_data = {
                token: this.state.logged.token,
                line_items: finals,
                data: {
                    payment_method: "cod",
                    payment_method_title: "Direct Bank Transfer",


                    set_paid: false,
                    billing: {
                        first_name: this.state.login_data.first_name,
                        last_name: this.state.login_data.last_name,
                        address_1: this.state.login_data.address_1,
                        address_2: this.state.login_data.address_2,
                        city: this.state.login_data.city,
                        state: this.state.login_data.state,
                        postcode: this.state.login_data.postcode,
                        country: this.state.login_data.country,
                        email: this.state.login_data.email,
                        phone: "+"+this.state.callingCode+this.state.login_data.phone
                    },
                    shipping: {
                        first_name: this.state.login_data.first_name,
                        last_name: this.state.login_data.last_name,
                        address_1: this.state.login_data.address_1,
                        address_2: this.state.login_data.address_2,
                        city: this.state.login_data.city,
                        state: this.state.login_data.state,
                        postcode: this.state.login_data.postcode,
                        country: this.state.login_data.country,

                    },

                }
            };

            console.log("I send:");
            console.log(body_data);

            // this.props.navigation.navigate('Thanks', { body_data: body_data })
            // return;
            this.setState({ loading: true });



            fetch(urls.API + 'create_order', {
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
                        this.setState({ loading: false }, () => {
                            this.empty_cart().then(() => {


                                setTimeout(() => {
                                    this.props.navigation.navigate('Thanks', { order_id: responseJson.order_id })

                                }, 0);
                            });

                        })
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
                    this.setState({ loading: false }, () => {
                        setTimeout(() => {
                            this.dropDownAlertRef.alertWithType('Error', 'error', error);

                            //   alert(error);
                        }, 500);
                    });
                });

        })
    }



     CartItemContaienr (v,i){
         return (
        <View style={{ marginTop: 20, flexDirection: 'row', width: "90%", alignSelf: 'center', borderBottomWidth: 1, borderColor: '#707070', paddingBottom: 20,justifyContent:"space-between" }}>
            <View style={{ flex:0.27,  elevation: 5, backgroundColor: 'white', width: 88, height: 57, borderRadius: 15 }}>
                <Image
                    style={{ resizeMode: 'stretch', width: 88, height: 57, shadowOffset: { width: 0.2, height: 1 }, shadowOpacity: 0.3, shadowRadius: 1 }}
                    source={{uri:v?.img}}
                />
            </View>
            <View style={{flex:0.48,  }}>
                <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#343434' }}>{v.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 90, alignItems: 'center', marginTop: 3 }}>
                    <TouchableOpacity onPress={()=>{
                        this.minus_minus_selected(i)
                    }}>
                        <MinusRedBox height={19.654} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'PBo', fontSize: 13, color: '#6D6D6D' }}>{v.qty}</Text>
                    <TouchableOpacity onPress={()=>{
                        this.plus_plus_selected(i)
                    }}>
                        <PlusGreenBox height={19.654} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:0.2, marginLeft: 20, }}>
                {/* <View style={{ backgroundColor: '#86C5DE', borderRadius: 3, width: 45, height: 22, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#FFFFFF', fontFamily: 'PMe' }}>2kg</Text>
                </View> */}
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ fontFamily: 'PBo', color: '#343434', fontSize: 12 }}>{v.text_price}</Text>
                    {/* <Text style={{ color: '#343434', fontSize: 19, fontFamily: "PRe" }}> KWD</Text> */}
                </View>
            </View>

        </View>
    )}
    render(){
      if(this.state.cart_items.length==0)
      {
        return (
          <View style={{
            marginTop:100,justifyContent:"center",alignSelf:"center",
            alignItems:"center",
            width:"80%"
          }}>
            <Text>Your cart is empty</Text>
          </View>
        )
      }
        return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar

            />
            <View style={{ zIndex: 1 }}>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
            </View>
            <View style={{ flexDirection: 'row', width: "90%", alignSelf: 'center', marginTop: 40, justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.goBack()
                }}>
                    <ArrowLeft />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CartIcon />
                    <Text style={{ color: '#FA6443', fontFamily: 'PMe', fontSize: 24, marginLeft: 10 }}>Cart</Text>
                </View>
            </View>
            <ScrollView>
              <View style={{marginBottom:300}}>
            <View style={{ marginTop: 30 }}>
            {this.state.cart_items.map((v, i) => {
                return this.CartItemContaienr(v,i)
                })}
            </View>
            <TouchableOpacity style={{ alignSelf: "center", marginTop: 60, borderWidth: 2, borderRadius: 12, borderColor: '#404040', borderStyle: 'dotted', alignItems: 'center', width: "90%", paddingBottom: 12, paddingTop: 12 }}>
                <Text style={{ color: '#8B8B8B', fontSize: 17 }}>Use Coupon</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 10, width: "90%", alignSelf: 'center', backgroundColor:"white" }}>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                    <Text style={{ fontFamily: 'PRe', color: "#4A4A4A" }}>Tax:</Text>
                    <Text style={{ fontFamily: 'PBo', fontSize: 14, color: '#4A4A4A' }}>   {this.state.total.symbol} {this.state.total.tax}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 5, }}>
                    <Text style={{ fontFamily: 'PRe', color: "#4A4A4A" }}>Shipping Fee:</Text>
                    <Text style={{ fontFamily: 'PBo', fontSize: 14, color: '#4A4A4A' }}>   {this.state.total.symbol} {this.state.total.shipping}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginTop: 5, }}>
                    <Text style={{ fontFamily: 'PBo', fontSize: 14, color: '#4A4A4A', marginTop: 25 }}>TOTAL</Text>
                    <Text style={{ fontFamily: 'PBo', fontSize: 57, color: "#4A4A4A", marginLeft: 5 }}>{this.state.total.symbol} {this.state.total.total}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    // this.props.navigation.navigate('CheckOut')
                    // this.setState({
                    //     edit_address:true
                    // })
                    this.validate();
                }} style={{ width: "100%", height: 54 }}>
                    <LinearGradient
                        colors={['#DE3535', '#FF9500']}
                        style={{ width: "100%", height: 54, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    >
                        <Text style={{ fontFamily: 'LB', fontSize: 18, color: '#FFFFFF' }}>Checkout</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
            {
                this._render_new_address_modal()
            }
        </SafeAreaView>
    )
    }

    _render_new_address_modal() {
        return (
            <Modal
                animationType="slide"

                transparent={true}
                visible={this.state.edit_address}
                onRequestClose={() => {
                    this.setState({ edit_address: false })
                }}>
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    ref={ref => {
                        this.scrollview_ref = ref;
                    }} >
                    <View style={{
                        width: viewportWidth * (100 / 100),
                        backgroundColor: '#fff',
                        marginTop: viewportHeight * (5 / 100),
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        height: viewportHeight * (92 / 100),
                    }}>

                        {/* popup header */}

                        <View style={{ flex: 0.9 }}>

                            <View style={{
                                flexDirection: 'row',
                                padding: 12,
                            }}>
                                <View style={{ flex: 0.2 }}>

                                </View>
                                <View style={{
                                    flex: 0.6,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                    }}>
                                        {this.state.lang=="en"?"Add Address":"تعديل العنوان"}
                                        
                          </Text>

                                </View>
                                <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ edit_address: false })}
                                    >
                                        <Text >{this.state.lang=="en"?"Cancel":"إلغاء"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* header close */}
                            <View>
                                <View style={{ paddingBottom: this.state.my_padding_bottom }}>
                                    <View
                                        onLayout={event => {
                                            const layout = event.nativeEvent.layout;
                                            this.arr[0] = layout.y;
                                        }}
                                    >

                                        <TextInput
                                            style={{ 
                                                textAlign:this.state.lang=="en"?"auto":"right",
                                                fontFamily: 'ProximaNova-Regular', color: '#000000', borderRadius: 6, width: viewportWidth * (88 / 100), paddingLeft: viewportWidth * (4 / 100), backgroundColor: '#F5F3F3', paddingBottom: viewportHeight * (1 / 100), paddingTop: viewportHeight * (1 / 100), alignSelf: 'center' }}
                                            placeholder={this.state.lang=="en"?"First Name":"الاسم الاول"}
                                            placeholderTextColor={'#000000'}
                                            keyboardType={'default'}
                                            value={this.state.login_data.first_name}
                                            onChangeText={(v) => {
                                                var old = this.state.login_data;
                                                old.first_name = v;
                                                this.setState({ login_data: old })
                                            }}
                                            onFocus={() => {
                                                this.downButtonHandler(this.arr[0]);
                                            }}


                                        />
                                    </View>
                                    <View
                                        onLayout={event => {
                                            const layout = event.nativeEvent.layout;
                                            this.arr[1] = layout.y;
                                        }}
                                        style={{ marginTop: viewportHeight * (1 / 100) }}>
                                        <TextInput
                                            style={{ 
                                                textAlign:this.state.lang=="en"?"auto":"right",
                                                fontFamily: 'ProximaNova-Regular', color: '#000000', borderRadius: 6, width: viewportWidth * (88 / 100), paddingLeft: viewportWidth * (4 / 100), backgroundColor: '#F5F3F3', paddingBottom: viewportHeight * (1 / 100), paddingTop: viewportHeight * (1 / 100), alignSelf: 'center' }}
                                            placeholder={this.state.lang=="en"?"Last Name":"الكنية"}
                                            placeholderTextColor={'#000000'}
                                            keyboardType={'default'}
                                            value={this.state.login_data.last_name}
                                            onChangeText={(v) => {
                                                var old = this.state.login_data;
                                                old.last_name = v;
                                                this.setState({ login_data: old })
                                            }}
                                            onFocus={() => {
                                                this.downButtonHandler(this.arr[1]);
                                            }}

                                        />
                                    </View>
                                    <View
                                        onLayout={event => {
                                            const layout = event.nativeEvent.layout;
                                            this.arr[2] = layout.y;
                                        }}
                                        style={{ marginTop: viewportHeight * (1 / 100) }}>
                                        <TextInput
                                            style={{ 
                                                textAlign:this.state.lang=="en"?"auto":"right",
                                                fontFamily: 'ProximaNova-Regular', color: '#000000', borderRadius: 6, width: viewportWidth * (88 / 100), paddingLeft: viewportWidth * (4 / 100), backgroundColor: '#F5F3F3', paddingBottom: viewportHeight * (1 / 100), paddingTop: viewportHeight * (1 / 100), alignSelf: 'center' }}
                                            placeholder={this.state.lang=="en"?"Address":"عنوان"}
                                            placeholderTextColor={'#000000'}
                                            keyboardType={'default'}
                                            value={this.state.login_data.address_1}
                                            onChangeText={(v) => {
                                                var old = this.state.login_data;
                                                old.address_1 = v;
                                                this.setState({ login_data: old })
                                            }}
                                            onFocus={() => {
                                                this.downButtonHandler(this.arr[2]);
                                            }}

                                        />
                                    </View>
                                    {/* <View
                                        onLayout={event => {
                                            const layout = event.nativeEvent.layout;
                                            this.arr[3] = layout.y;
                                        }}
                                        style={{ marginTop: viewportHeight * (1 / 100) }}>
                                        <TextInput
                                            style={{ 
                                                textAlign:this.state.lang=="en"?"auto":"right",
                                                fontFamily: 'ProximaNova-Regular', color: '#000000', borderRadius: 6, width: viewportWidth * (88 / 100), paddingLeft: viewportWidth * (4 / 100), backgroundColor: '#F5F3F3', paddingBottom: viewportHeight * (1 / 100), paddingTop: viewportHeight * (1 / 100), alignSelf: 'center' }}
                                            placeholder={this.state.lang=="en"?"Address 2":"العنوان 2"}
                                            placeholderTextColor={'#000000'}
                                            keyboardType={'default'}
                                            value={this.state.login_data.address_2}
                                            onChangeText={(v) => {
                                                var old = this.state.login_data;
                                                old.address_2 = v;
                                                this.setState({ login_data: old })
                                            }}
                                            onFocus={() => {
                                                this.downButtonHandler(this.arr[3]);
                                            }}

                                        />
                                    </View> */}
                                    {/* <View
                                        onLayout={event => {
                                            const layout = event.nativeEvent.layout;
                                            this.arr[4] = layout.y;
                                        }}
                                        style={{ marginTop: viewportHeight * (1 / 100) }}>
                                        <TextInput
                                            style={{ 
                                                textAlign:this.state.lang=="en"?"auto":"right",
                                                fontFamily: 'ProximaNova-Regular', color: '#000000', borderRadius: 6, width: viewportWidth * (88 / 100), paddingLeft: viewportWidth * (4 / 100), backgroundColor: '#F5F3F3', paddingBottom: viewportHeight * (1 / 100), paddingTop: viewportHeight * (1 / 100), alignSelf: 'center' }}
                                            placeholder={this.state.lang=="en"?"City":"مدينة"}
                                            placeholderTextColor={'#000000'}
                                            value={this.state.login_data.city}
                                            onChangeText={(v) => {
                                                var old = this.state.login_data;
                                                old.city = v;
                                                this.setState({ login_data: old })
                                            }}
                                            onFocus={() => {
                                                this.downButtonHandler(this.arr[4]);
                                            }}

                                        />
                                    </View> */}
                                    {/* <View
                                        onLayout={event => {
                                            const layout = event.nativeEvent.layout;
                                            this.arr[5] = layout.y;
                                        }}
                                        style={{ marginTop: viewportHeight * (1 / 100) }}>
                                        <TextInput
                                            style={{ 
                                                textAlign:this.state.lang=="en"?"auto":"right",
                                                fontFamily: 'ProximaNova-Regular', color: '#000000', borderRadius: 6, width: viewportWidth * (88 / 100), paddingLeft: viewportWidth * (4 / 100), backgroundColor: '#F5F3F3', paddingBottom: viewportHeight * (1 / 100), paddingTop: viewportHeight * (1 / 100), alignSelf: 'center' }}
                                            placeholder={this.state.lang=="en"?"State":"حالة"}
                                            placeholderTextColor={'#000000'}
                                            value={this.state.login_data.state}
                                            onChangeText={(v) => {
                                                var old = this.state.login_data;
                                                old.state = v;
                                                this.setState({ login_data: old })
                                            }}
                                            onFocus={() => {
                                                this.downButtonHandler(this.arr[5]);
                                            }}

                                        />
                                    </View> */}
                                    {/* <View
                                        onLayout={event => {
                                            const layout = event.nativeEvent.layout;
                                            this.arr[6] = layout.y;
                                        }}
                                        style={{ marginTop: viewportHeight * (1 / 100) }}>
                                        <TextInput
                                            style={{ 
                                                textAlign:this.state.lang=="en"?"auto":"right",
                                                fontFamily: 'ProximaNova-Regular', color: '#000000', borderRadius: 6, width: viewportWidth * (88 / 100), paddingLeft: viewportWidth * (4 / 100), backgroundColor: '#F5F3F3', paddingBottom: viewportHeight * (1 / 100), paddingTop: viewportHeight * (1 / 100), alignSelf: 'center' }}
                                            placeholder={this.state.lang=="en"?"Postcode":"الرمز البريدي"}
                                            placeholderTextColor={'#000000'}
                                            value={this.state.login_data.postcode}
                                            onChangeText={(v) => {
                                                var old = this.state.login_data;
                                                old.postcode = v;
                                                this.setState({ login_data: old })
                                            }}
                                            onFocus={() => {
                                                this.downButtonHandler(this.arr[6]);
                                            }}

                                        />
                                    </View> */}

                                    {/* <View
                                        onLayout={event => {
                                            const layout = event.nativeEvent.layout;
                                            this.arr[7] = layout.y;
                                        }}
                                        style={{ marginTop: viewportHeight * (1 / 100) }}>
                                        <TextInput
                                            style={{ 
                                                textAlign:this.state.lang=="en"?"auto":"right",
                                                fontFamily: 'ProximaNova-Regular', color: '#000000', borderRadius: 6, width: viewportWidth * (88 / 100), paddingLeft: viewportWidth * (4 / 100), backgroundColor: '#F5F3F3', paddingBottom: viewportHeight * (1 / 100), paddingTop: viewportHeight * (1 / 100), alignSelf: 'center' }}
                                            placeholder={this.state.lang=="en"?"Country":"الرمز البريدي"}
                                            placeholderTextColor={'#000000'}
                                            value={this.state.login_data.country}
                                            onChangeText={(v) => {
                                                var old = this.state.login_data;
                                                old.country = v;
                                                this.setState({ login_data: old })
                                            }}
                                            onFocus={() => {
                                                this.downButtonHandler(this.arr[7]);
                                            }}

                                        />
                                    </View> */}
                                    

                                
                                    <View
                                        onLayout={event => {
                                            const layout = event.nativeEvent.layout;
                                            this.arr[8] = layout.y;
                                        }}
                                        style={{ marginTop: viewportHeight * (1 / 100) }}>
                                        <TextInput
                                            style={{ 
                                                textAlign:this.state.lang=="en"?"auto":"right",
                                                fontFamily: 'ProximaNova-Regular', color: '#000000', borderRadius: 6, width: viewportWidth * (88 / 100), paddingLeft: viewportWidth * (4 / 100), backgroundColor: '#F5F3F3', paddingBottom: viewportHeight * (1 / 100), paddingTop: viewportHeight * (1 / 100), alignSelf: 'center' }}
                                            placeholder={this.state.lang=="en"?"Email Address":"عنوان البريد الإلكتروني"}
                                            placeholderTextColor={'#000000'}
                                            keyboardType={'email-address'}
                                            value={this.state.login_data.email}
                                            onChangeText={(v) => {
                                                var old = this.state.login_data;
                                                old.email = v;
                                                this.setState({ login_data: old })
                                            }}
                                            onFocus={() => {
                                                this.downButtonHandler(this.arr[8]);
                                            }}

                                        />
                                    </View>
                                    {/* <View
                                        onLayout={event => {
                                            const layout = event.nativeEvent.layout;
                                            this.arr[9] = layout.y;
                                        }}
                                        style={{ marginTop: viewportHeight * (1 / 100) }}>
                                        <TextInput
                                            style={{ fontFamily: 'ProximaNova-Regular', color: '#000000', borderRadius: 6, width: viewportWidth * (88 / 100), paddingLeft: viewportWidth * (4 / 100), backgroundColor: '#F5F3F3', paddingBottom: viewportHeight * (1 / 100), paddingTop: viewportHeight * (1 / 100), alignSelf: 'center' }}
                                            placeholder={'Phone'}
                                            placeholderTextColor={'#000000'}
                                            keyboardType={'phone-pad'}
                                            value={this.state.login_data.phone}
                                            onChangeText={(v) => {
                                                var old = this.state.login_data;
                                                old.phone = v;
                                                this.setState({ login_data: old })
                                            }}
                                            onFocus={() => {
                                                this.downButtonHandler(this.arr[9]);
                                            }}

                                        />
                                    </View> */}



                                  
                                       
                                        <View
                                        
                                         onLayout={event => {
                                            const layout = event.nativeEvent.layout;
                                            this.arr[9] = layout.y;
                                        }}
                                        style={{  marginTop: viewportHeight * (1 / 100), alignItems: 'center', justifyContent: 'center',position:'relative',width: viewportWidth * (88 / 100),alignSelf:'center' }}>

                                       
                                            <TextInput
                                                style={{ 
                                                    textAlign:this.state.lang=="en"?"auto":"right",
                                                    fontFamily: 'ProximaNova-Regular', color: '#000000', borderRadius: 6, 
                                                
                                                width:'100%', paddingLeft: 10,
                                                 backgroundColor: '#F5F3F3', paddingBottom: viewportHeight * (1 / 100),
                                                  paddingTop: viewportHeight * (1 / 100), alignSelf: 'center' }}
                                                placeholder={this.state.lang=="en"?"Phone":"هاتف"}
                                                placeholderTextColor={'#000000'}
                                                keyboardType={'phone-pad'}
                                                value={this.state.login_data.phone}
                                                onChangeText={(v) => {
                                                    var old = this.state.login_data;
                                                    old.phone = v;
                                                    this.setState({ login_data: old })
                                                }}
                                                onFocus={() => {
                                                    this.downButtonHandler(this.arr[9]);
                                                }}

                                            />
                                        </View>
                                  

                                </View>

                                <View>
                                    <TouchableOpacity onPress={() => {
                                        this.storeItem("shipping_address", this.state.login_data).then(()=>{});

                                        this.setState({ edit_address: false })
                                    }} style={{ alignSelf: 'center', marginTop: viewportHeight * (2 / 100), backgroundColor: '#000000', borderRadius: 8, width: viewportWidth * (88 / 100), paddingBottom: viewportHeight * (1.5 / 100), paddingTop: viewportHeight * (1.5 / 100), alignItems: 'center' }}>
                                        <Text style={{ color: '#fff', fontFamily: 'ProximaNova-Regular', fontSize: 16 }}>{this.state.lang=="en"?"PROCEED":"تقدم"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>

        )
    }
}
