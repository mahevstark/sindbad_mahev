import React, { Component, useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../common/CommonHeader';
import { SliderBox } from "react-native-image-slider-box";
import DropdownAlert from "react-native-dropdownalert";
import Close from '../common/Svgs/Close';
import { AppColors } from '../common/AppColors';
import { ArrowLeft, HeartGradient } from '../componets/SvgComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doPost } from "./../common/apiCalls";
import {retrieveItem, storeItem, doConsole} from './../common/functions';
import Loader from '../common/Loader';
import { urls } from '../common/Api_urls';
let dropDownAlertRef;

const Products = (props) => {
    const navigation = useNavigation()
    const {cat} = props?.route?.params;
    const [loading,setLoading] = useState(true)

    const [lang, setRenderr] = React.useState("en")
    const [prods, setProds] = React.useState([])

    const [user,setUser] = useState({})

    useEffect(()=>{
        getUser()
    },[])

    const getUser=()=>{
        retrieveItem("login_data").then((v)=>{
            setUser(v)
        })
    }

    useEffect(()=>{
        if(user && user?.token)
        loadOrders()
    },[user])

  

    const loadOrders = async () =>{
        const dbData = { lang: "en" ,token:user?.token,per_page:99,id:cat?.id}

        const { isError, data } = await doPost(dbData, "get_products_data");
        console.log(dbData)
        console.log(urls.API + "get_products_data");
        if (isError) {
            dropDownAlertRef.alertWithType("error","Error","Network error")
            setLoading(false)
        }
        else {
            if (data.action == "success") {
                setLoading(false)
                setProds(data.data.products)
            }

            else{
                dropDownAlertRef.alertWithType("error","Error",data.error)
                setLoading(false)
            }
        }
    }
   
    

    return (
        <Container style={{ backgroundColor: "#fff" }}>
            <StatusBar />
            <View style={{ zIndex: 1 }}>
                <DropdownAlert ref={ref => dropDownAlertRef = ref} />
            </View>
            {loading && <Loader />}
            <SafeAreaView forceInset={{ top: 'never' }}
                style={{ flex: 1 }}
            >
                <Content contentContainerStyle={{ width: "100%" }}>
                    <View
                        style={{ flex: 1, }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', marginTop: Platform.OS == 'android' ? 25 : 5, alignItems: 'center' }}>

                                <TouchableOpacity onPress={()=>{
                                    navigation.goBack()
                                }}>
                                    <ArrowLeft />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                                    <Text style={{ marginLeft: 10, fontSize: 21, fontFamily: 'LRe', color: '#FA6443' }}>{cat?.title ?? "Products"}</Text>
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
                                    {( !prods?.length || prods?.length==0)&& <View style={{width:"100%",alignSelf:"center",marginVertical:20,alignItems:"center"}}><Text>No products in this category</Text></View>}
                                    
                                    {prods.map((item, index) => {
                                        return (
                                            <View style={{
                                                position: "relative",
                                                paddingBottom: viewportHeight * (1 / 100),
                                                paddingTop: viewportHeight * (1 / 100),

                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        navigation.navigate("Product", { product: item });
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
                                                        {/* <View>
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

                                                        </View> */}
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
                                                            source={{ uri: item.img }}
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
                                                                paddingHorizontal: "5%"
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    color: "#343434",
                                                                    fontFamily: "pp-semibold",
                                                                    fontSize: 16,
                                                                    textAlign: "center"
                                                                }}
                                                                numberOfLines={2}
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
                                                                {/* <Text
                                                                    style={{
                                                                        color: "#343434",
                                                                        fontFamily: "pp-semibold",
                                                                        fontSize: 10, textDecorationLine: 'line-through'
                                                                    }}
                                                                >

                                                                    90.00 USD
                                                                </Text> */}

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

export default Products