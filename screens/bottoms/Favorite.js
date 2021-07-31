import React, { Component, useEffect } from 'react';
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
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window")
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CommonHeader from '../common/CommonHeader';
import { SliderBox } from "react-native-image-slider-box";
import DropdownAlert from "react-native-dropdownalert";
import Close from '../common/Svgs/Close';
import { AppColors } from '../common/AppColors';
import { ArrowLeft, HeartGradient } from '../componets/SvgComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {retrieveItem, storeItem, doConsole} from './../common/functions';
let dropDownAlertRef;
const Favorite = () => {

    const navigation = useNavigation()

    const [lang, setRenderr] = React.useState("en")
    const [wish_items, setWishItems] = React.useState([])

    
    

    useFocusEffect(React.useCallback(() => {
        refresh_items_in_wishlist_status();
    }, []))
   
    const refresh_items_in_wishlist_status=()=> {
        retrieveItem("wish_items").then((items) => {
           setWishItems(items)
        });
    }
    const do_wish=(ob, oi)=> {
        var action_type = 1;
        var k = 0;
       retrieveItem("wish_items").then((items) => {
            if (items) {



                for (var i = 0; i <= items.length - 1; i++) {
                    if (ob.id == items[i].id) {

                        action_type = 2;
                        k = i;
                        break;
                    }

                }
            }







            if (action_type == 1) {
                if (items) {
                    items.push(ob);
                }
                else {
                    var items = [ob];
                }

               storeItem("wish_items", items).then(() => {
                    var in_items = wish_items;
                    in_items.splice(oi, 1);
                    setWishItems(items)
                    // this.dropDownAlertRef.alertWithType('success', 'success', "Added to wishlist");
                    // this.refresh_items_in_wishlist_status();
                });
            }
            else {



                items.splice(k, 1);


                storeItem("wish_items", items).then(() => {
                    // dropDownAlertRef.alertWithType('success', 'success', "Removed from wishlish");
                    // refresh_items_in_wishlist_status();
                    var in_items = wish_items;
                    in_items.splice(oi, 1);
                    setWishItems(wish_items)
                });
            }


        })
    }
    const do_cart=(product_self)=> {
        product_self.qty = 1;
        product_self.q = 1;
        var action_type = 1;
        var k = 0;
        retrieveItem("cart_items").then((items) => {
            if (items) {
                for (var i = 0; i <= items.length - 1; i++) {
                    if (product_self.id == items[i].id) {
                        action_type = 2;
                        k = i;
                        break;
                    }
                }
            }

           

            var ff_prod = product_self;
            ff_prod.qty = 1;
            ff_prod.q = 1;



            if (action_type == 1) {
                if (items) {
                    items.push(ff_prod);
                }
                else {
                    var items = [ff_prod];
                }



            }
            else {
                var old_q = items[k].q + 1;
                var productt = ff_prod;
                productt.q = old_q;
                productt.qty = old_q;
                items[k] = productt;

            }

            storeItem("cart_items", items).then(() => {
                dropDownAlertRef.alertWithType('success', lang == "en" ? 'success' : 'نجاح', lang == "en" ? "Added to cart" : "تمت الإضافة إلى سلة التسوق");
            });
        })
    }
   

    const sub_string_title=(t)=> {
        if (t.length > 15)
            return t.substring(0, 15) + "...";
        return t;
    }

   
 

        return (
            <Container style={{ backgroundColor: "#fff" }}>
                <StatusBar />
                <View style={{ zIndex: 1 }}>
                    <DropdownAlert ref={ref => dropDownAlertRef = ref} />
                </View>
                <SafeAreaView forceInset={{ top: 'never' }}
                    style={{ flex: 1 }}
                >
                    <Content contentContainerStyle={{ width: "100%" }}>
                        <View
                            style={{ flex: 1, }}
                        >
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', marginTop: Platform.OS == 'android' ? 25 : 5, alignItems: 'center' }}>

                                    <TouchableOpacity>
                                        <ArrowLeft />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <HeartGradient />

                                        <Text style={{ marginLeft: 10, fontSize: 21, fontFamily: 'LRe', color: '#FA6443' }}>Favourites</Text>
                                    </View>
                                </View>
                                <View
                                    style={{

                                        marginTop: viewportHeight * (2 / 100), paddingBottom: viewportHeight * (10 / 100)
                                    }}
                                >
                                    <View
                                        style={{
                                            flexWrap: "wrap",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            width: viewportWidth * (90 / 100),
                                            alignSelf: "center",
                                            marginTop:20
                                        }}
                                    >
                                        {( !wish_items?.length || wish_items?.length==0)&& <View style={{width:"100%",alignSelf:"center",marginVertical:20,alignItems:"center"}}><Text>No Items</Text></View>}
                                        {wish_items?.map((item, i) => {
                                            return (
                                                <View style={{
                                                    position: "relative",
                                                    paddingBottom: viewportHeight * (1 / 100),
                                                    paddingTop: viewportHeight * (1 / 100),

                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            navigation.navigate("Product",{product:item});
                                                        }}
                                                        style={{
                                                            borderRadius: 18,
                                                            backgroundColor: "#F6F6F6",
                                                            width: viewportWidth * (44 / 100),
                                                            shadowColor: "#000",
                                                            shadowOffset: {
                                                                width: 0,
                                                                height: 3,
                                                            },
                                                            shadowOpacity: 0.29,
                                                            shadowRadius: 4.65,

                                                            elevation: 7,
                                                            borderRadius: 12,


                                                            alignItems: "center",
                                                            paddingBottom: viewportHeight * (3 / 100),
                                                            // paddingTop: viewportHeight * (2 / 100),
                                                            overflow: "hidden",
                                                            marginTop: viewportHeight * (2 / 100),
                                                        }}
                                                    >
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', width: viewportWidth * (38 / 100), marginTop: viewportHeight * (1 / 100), }}>
                                                            <View>
                                                                <View style={{
                                                                    backgroundColor: '#FF4760',
                                                                    paddingHorizontal: 10,
                                                                    alignItems: 'center',
                                                                    height: viewportWidth * (5 / 100),
                                                                    borderRadius: 6,
                                                                    justifyContent: "center"
                                                                }}>
                                                                    <Text style={{
                                                                        color: "#fff",
                                                                        fontFamily: "pp-medium",
                                                                        fontSize: 10,
                                                                    }}>10% OFF</Text>
                                                                </View>

                                                            </View>
                                                            <View >
                                                                <Image
                                                                    style={{
                                                                        width: viewportWidth * (6 / 100),

                                                                        height: viewportWidth * (6 / 100),
                                                                        resizeMode: "cover",
                                                                    }}
                                                                    source={require('./../../assets/image/gr.png')}

                                                                />
                                                            </View>
                                                        </View>
                                                        <View style={{ marginTop: viewportHeight * (0.5 / 100) }}>
                                                            <Image
                                                                style={{
                                                                    width: viewportWidth * (32 / 100),

                                                                    height: viewportWidth * (32 / 100),
                                                                    resizeMode: "cover",
                                                                }}

                                                                source={{uri:item.img}
                                                            }

                                                            />
                                                        </View>
                                                        <View
                                                            style={{
                                                                marginTop: viewportHeight * (0 / 100),
                                                                flexDirection: "row",
                                                                justifyContent: "center",
                                                            }}
                                                        >

                                                            <View
                                                                style={{

                                                                    paddingBottom: 0.5,
                                                                    paddingHorizontal:10
                                                                }}
                                                            >
                                                                <Text
                                                                    style={{
                                                                        color: "#343434",
                                                                        fontFamily: "pp-semibold",
                                                                        fontSize: 16,
                                                                        textAlign:"center"
                                                                    }}

                                                                >

                                                                    {item.title}
                                                                </Text>
                                                            </View>


                                                        </View>
                                                        {/* <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                            <View>
                                                                <Text
                                                                    style={{
                                                                        color: "#EF545C",
                                                                        fontFamily: "pp-regular",
                                                                        fontSize: 10,
                                                                    }}
                                                                >
                                                                    Available in 1kg
                        </Text>
                                                            </View>
                                                        </View> */}
                                                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                            <View>
                                                                <Text
                                                                    style={{
                                                                        color: "#343434",
                                                                        fontFamily: "pp-semibold",
                                                                        fontSize: 14,
                                                                    }

                                                                    }
                                                                >
                                                                    {item.text_price} 

                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={{ position: 'absolute', bottom: -4, alignSelf: "center", elevation: 7, }}>
                                                        <TouchableOpacity
                                                        onPress={()=>{
                                                            do_cart(item)
                                                        }}
                                                            style={{
                                                                width: viewportWidth * (28 / 100),
                                                                paddingBottom: viewportHeight * (0.7 / 100),
                                                                paddingTop: viewportHeight * (0.7 / 100),
                                                                alignSelf: "center",
                                                                alignItems: 'center', borderRadius: 22, backgroundColor: '#FF4257',
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    backgroundColor: 'transparent',
                                                                    fontSize: 12,
                                                                    fontFamily: 'pp-semibold',
                                                                    color: '#fff',
                                                                }}>
                                                                Add to Cart
                                                        </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Content>
                </SafeAreaView>
            </Container >
        )
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signview: {
        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 114, backgroundColor: AppColors.appColor, paddingVertical: 10
    },
    bookview: {
        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 56, backgroundColor: AppColors.appColor, paddingVertical: 6
    },
    loginview: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 114, backgroundColor: AppColors.white, paddingVertical: 10
    },
    signtext: {
        fontSize: 20, color: AppColors.white, fontFamily: 'SR', lineHeight: 24
    },
    logintext: {
        fontSize: 20, color: AppColors.appColor, fontFamily: 'SR', lineHeight: 24
    }
});

export default Favorite