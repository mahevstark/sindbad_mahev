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
import { WebView } from 'react-native-webview';
const Privacy = (props) => {
    const { type } = props?.route?.params ?? {type:"privacy"}
    const [loading,setLoading] = useState(true)

    const [lang, setRenderr] = React.useState("en")
    const [orders, setOrders] = React.useState([])

    const [webViewHeight, setWebviewHeight] = useState(viewportHeight)


    const [user,setUser] = useState({})

    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const onWebViewMessage = (event) => {
        setWebviewHeight(Number(event.nativeEvent.data))
      }
    useEffect(()=>{
        getUser()
        loadOrders()
    },[])

    const getUser=()=>{
        retrieveItem("login_data").then((v)=>{
            setUser(v)
        })
    }

    useEffect(()=>{
        // if(user && user?.token)
        // loadOrders()
    },[user])

  

    const loadOrders = async () =>{
        const dbData = { lang: "en" ,token:user?.token,type}

        const { isError, data } = await doPost(dbData, "get_page_api");
        console.log(dbData)
        console.log(data)
        console.log(urls.API + "get_page_api");
        if (isError) {
            dropDownAlertRef.alertWithType("error","Error","Network error")
            setLoading(false)
        }
        else {
            if (data.action == "success") {
                
                setTitle(data.title)
                setContent(data.content)

                setLoading(false)
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
                                    {/* <ArrowLeft /> */}
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                                    <Text style={{ marginLeft: 10, fontSize: 21, fontFamily: 'LRe', color: '#FA6443' }}>{title ?? "Title"}</Text>
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
                                    <WebView
                                    scrollEnabled={true}
                                    onMessage={onWebViewMessage}
                                    injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight /1 )'
                                    style={{height:webViewHeight,width:'100%',backgroundColor:"#f1f1f1"}} source={{html:'<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body dir="'+(lang=="arabic"?"rtl":"ltr")+'" style="background-color:#f1f1f1;">'+content+'</body></html>'}} />
                                {/* <Text style={{}}>
                                {content}
                                </Text> */}
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

export default Privacy