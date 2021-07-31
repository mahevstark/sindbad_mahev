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

const Orders = () => {
    const [loading,setLoading] = useState(true)

    const [lang, setRenderr] = React.useState("en")
    const [orders, setOrders] = React.useState([])

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
        const dbData = { lang: "en" ,token:user?.token}

        const { isError, data } = await doPost(dbData, "get_orders");
        console.log(dbData)
        console.log(urls.API + "get_orders");
        if (isError) {
            dropDownAlertRef.alertWithType("error","Error","Network error")
            setLoading(false)
        }
        else {
            if (data.action == "success") {
                setLoading(false)

                setOrders(data.orders)
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

                                <TouchableOpacity>
                                    <ArrowLeft />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                                    <Text style={{ marginLeft: 10, fontSize: 21, fontFamily: 'LRe', color: '#FA6443' }}>Orders</Text>
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
                                    }}
                                >
                                    {( !orders?.length || orders?.length==0)&& <View style={{width:"100%",alignSelf:"center",marginVertical:20,alignItems:"center"}}><Text>No orders</Text></View>}
                                    {orders.map((item, index) => {
                                        return (
                                            <TouchableOpacity onPress={()=>{
                                                // this.props.navigation.navigate('OrderStatus',{order:item,backto:"orders"})
                                              }} style={{width:viewportWidth*(90/100),marginTop:viewportHeight*(1/100),alignSelf:"center",backgroundColor:"#fff",borderRadius:12,paddingTop:viewportHeight*(1/100),paddingBottom:viewportHeight*(1/100)}}>  
                                                  <View style={{width:viewportWidth*(86/100),alignSelf:"center",flexDirection:'row',justifyContent:'space-between',flexWrap:"wrap"}}>
                                                     <View style={{width:viewportWidth*(18/100),borderWidth:1,borderColor:"#f1f1f1",justifyContent:"center",alignSelf:"center",borderRadius:14}}>
                                                     <Text style={{fontSize:40,textAlign:'center'}}>{index+1}</Text>
                                                      </View>
                                                      <View style={{width:viewportWidth*(66/100),flexDirection:"row",justifyContent:'space-between',}}>
                                                      <View style={{}}>
                                                        <View style={{alignItems:"flex-start"}}>
                                                        <Text
                                                        style={{
                                                            fontSize: 14,
                                                          color: "#FC9000",
                                                          fontFamily: "ProximaNova-Bold",
                                                          
                                                        }}
                                                      >
                                                    Order #{item.order_id}
                                                      </Text>
                                                        </View>
                                                        <View style={{alignItems:"flex-start"}}>
                                                        <Text
                                                      style={{
                                                        color: "#0f351b",
                                                        fontFamily: "ProximaNova-Regular",
                                                       
                                                        fontSize: 12,
                                                      }}
                                                    >
                                                     {item.items.length} Item(s)
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: "#0f351b",
                                                        fontFamily: "ProximaNova-Regular",
                                                       
                                                        fontSize: 12,
                                                      }}
                                                    >
                                                     {item.status}
                                                    </Text>
                                                        </View>
                                                     
                                                      </View>
                                                      <View style={{}}>
                                                      <View style={{}}>
                                                        <TouchableOpacity
                                                    style={{
                                                      width: viewportWidth * (30 / 100),
                                                  
                                                      alignItems: 'flex-end',
                                                    
                                                      
                                                    }}
                                                  >
                                                     <View style={{alignItems:"flex-end"}}>
                                                      <Text
                                                        style={{
                                                          fontSize: 11,
                                                          color: "#0f351b",
                                                          fontFamily: "ProximaNova-Regular",
                                
                                                        }}
                                                      >
                                                       {item.created_at}
                                                      </Text>
                                                    </View>
                                                  </TouchableOpacity>
                                                        </View>
                                                     
                                                        <View style={{alignItems:"flex-end",marginTop:viewportHeight*(1/100)}}>
                                                        <Text
                                                      style={{
                                                        color: "#0f351b",
                                                        fontFamily: "ProximaNova-Bold",
                                
                                                        fontSize: 16,
                                                      }}
                                                    >
                                                     {item.symbol} {item.total}
                                                    </Text>
                                                        </View>
                                                      
                                                     
                                                      </View>
                                                      </View>
                                                      
                                                     </View>
                                              </TouchableOpacity>
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

export default Orders