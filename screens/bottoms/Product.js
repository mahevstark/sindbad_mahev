import { LinearGradient } from 'expo-linear-gradient'

import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, SafeAreaView, View, Text, ScrollView, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ArrowLeft, HeartGradient, MinusRedBox, PlusGreenBox } from '../componets/SvgComponent'
import { useNavigation } from '@react-navigation/native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window")
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign } from '@expo/vector-icons';
import DropdownAlert from "react-native-dropdownalert";
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';

let dropDownAlertRef;
import { doPost } from "./../common/apiCalls";
import { retrieveItem, storeItem, doConsole } from './../common/functions';
let lang = "en";
const Product = (props) => {

    const navigation = useNavigation()
    const { product } = props?.route?.params
    const { width } = Dimensions.get('window')
    const [latestprods, setLatestprods] = React.useState([])
    const [prod, setProd] = useState(product)
    const [loading, setLoading] = useState(false)
    const [qty, setQty] = useState(1)
    const [webViewHeight, setWebviewHeight] = useState(viewportHeight)
    const [in_wish, setIn_wish] = useState([])
    const [lang, setLang] = useState('en')

    const onWebViewMessage = (event) => {
        setWebviewHeight(Number(event.nativeEvent.data))
    }
    useEffect(() => {
        loadData()
        refresh_items_in_wishlist_status()
    }, [])

    const loadData = async () => {
        const dbData = { lang: "en", id: prod?.id }

        console.log(dbData);

        const { isError, data } = await doPost(dbData, "get_product_details");

        if (isError) {
            setTimeout(() => {
                loadData()
            }, 2000)
        }
        else {
            if (data.action == "success") {
                console.log(data.data.product)
                setProd(data.data.product)
                setLatestprods(data.data.related)
                setLoading(false)
            }
        }
    }
    // const do_cart=(product)=>
    // {
    //     var action_type = 1;
    //     var k=0;
    //     retrieveItem("cart_items").then((items)=>{
    //         if(items)
    //         {
    //             for(var i=0; i<=items.length-1; i++)
    //             {
    //                 if(product.id==items[i].id)
    //                 {
    //                     action_type = 2;
    //                     k=i;
    //                     break;
    //                 }

    //             }
    //         }



    //         if(action_type==1)
    //         {
    //             if(items)
    //             {
    //                 items.push(product);
    //             }
    //             else{
    //                 var items = [product];
    //             }



    //         }
    //         else
    //         {
    //             var old_q = items[k].q+1;
    //             var prod = product;
    //             prod.q = old_q;
    //             items[k] = prod;

    //         }

    //         storeItem("cart_items",items).then(()=>{
    //             dropDownAlertRef.alertWithType('success', lang=="en"?'success':'نجاح',lang=="en"? "Added to cart":"تمت الإضافة إلى سلة التسوق");
    //         });
    //     })
    // }


    const do_wish = (ob) => {
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
                    // this.dropDownAlertRef.alertWithType('success', 'success', "Added to wishlist");
                    refresh_items_in_wishlist_status();
                });
            }
            else {



                items.splice(k, 1);


                storeItem("wish_items", items).then(() => {
                    // dropDownAlertRef.alertWithType('success', 'success', "Removed from wishlish");
                    refresh_items_in_wishlist_status();
                });
            }


        })
    }
    const is_in_wish = (id) => {
        var all = in_wish;
        if (!all) return false;
        for (var i = 0; i <= all.length - 1; i++) {
            if (all[i].id == id) return true;
        }
        return false;
    }
    const refresh_items_in_wishlist_status = () => {
        retrieveItem("wish_items").then((items) => {
            setIn_wish(items)
        });
    }
    const do_cart = () => {
        var action_type = 1;
        var k = 0;
        retrieveItem("cart_items").then((items) => {
            if (items) {
                for (var i = 0; i <= items.length - 1; i++) {
                    if (product.id == items[i].id) {
                        action_type = 2;
                        k = i;
                        break;
                    }

                }
            }

            var ff_prod = product;
            ff_prod.qty = qty;
            ff_prod.q = qty;



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
    // return (<Text>e</Text>)

    return (
        <View style={{ flex: 1, }}>
            <StatusBar

            />
            {loading && <Spinner visible={loading} />}
            <SafeAreaView forceInset={{ top: 'never' }}
                style={{ flex: 1 }}
            >
                <View style={{ zIndex: 1 }}>
                    <DropdownAlert ref={ref => dropDownAlertRef = ref} />
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <View

                    >

                        <Image
                            style={{ marginTop: 30, width: "100%", height: 350, resizeMode: "contain", alignSelf: "center" }}
                            source={{ uri: prod?.img }}
                        />
                        <View style={{ flexDirection: 'row', width: "80%", alignSelf: 'center', marginTop: 40, paddingTop: 5, justifyContent: 'space-between', position: 'absolute', top: 0 }}>
                            <TouchableOpacity style={{
                                backgroundColor: "#fff",
                                padding: 10,
                                borderRadius: 100
                            }} onPress={() => {
                                navigation.goBack()
                            }}>
                                <ArrowLeft />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#fff",
                                    padding: 10,
                                    borderRadius: 100
                                }}
                                onPress={() => {
                                    do_wish(prod)
                                }}>
                                {
                                    is_in_wish(prod?.id) ?
                                        <AntDesign name="heart" size={20} color="red" />
                                        :
                                        <HeartGradient />
                                }

                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ width: "80%", alignSelf: 'center', marginTop: 20, }} >
                        <Text style={{ fontFamily: "PMe", fontSize: 24 }}>{prod?.title}</Text>
                        <Text style={{ fontSize: 29, fontFamily: 'PSBo', color: '#FA6443' }}>{prod?.text_price}</Text>
                        {/* <Text style={{ textDecorationLine: "line-through", fontFamily: 'PSBo', fontSize: 14 }}>100.00
                <Text style={{ fontFamily: 'PRe' }}> USD</Text>
                    </Text> */}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'PRe', fontSize: 10, color: "#343434", alignSelf: 'flex-end' }}>2 Days Delivery Time</Text>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between', width: "30%" }}>
                                <TouchableOpacity onPress={() => {
                                    if (qty == 1) return;
                                    setQty(qty - 1)
                                }}>
                                    <MinusRedBox />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PBo', fontSize: 24 }}>{qty}</Text>
                                <TouchableOpacity onPress={() => {
                                    setQty(qty + 1)
                                }}>
                                    <PlusGreenBox />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => {
                            do_cart()
                        }} style={{ width: "100%", height: 54, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                            <LinearGradient

                                style={{ width: "100%", height: 54, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}
                                colors={['#DE3535', '#FF9500']}
                            >
                                <Text style={{ fontFamily: 'LB', fontSize: 24, color: '#FFFFFF' }}>Add to Cart</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <TouchableOpacity style={{ marginLeft: 5, paddingHorizontal: 20, borderRadius: 20, borderColor: '#76C945', borderWidth: 3, height: 44, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontFamily: 'LRe', fontSize: 15, color: '#76C945' }}>Buy Via Whatsapp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#76C945', justifyContent: 'center', alignItems: 'center', height: 44, borderRadius: 20, paddingHorizontal: 30 }}>
                                <Text style={{ color: '#FFFFFF', fontFamily: 'LRe', fontSize: 15 }}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 25 }}>
                            <Text style={{ fontFamily: 'PBo', fontSize: 15, color: '#070704' }}>Description</Text>
                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#606060', marginLeft: 25 }}>Reviews</Text>
                        </View>

                        {/* <RenderHtml
                            contentWidth={width}
                            source={prod?.description}
                            /> */}
                        <View
                            renderToHardwareTextureAndroid={true}>
                            <WebView
                                // androidHardwareAccelerationDisabled={true}
                                containerStyle={{ opacity: 0.99 }}
                                scrollEnabled={true}
                                onMessage={onWebViewMessage}
                                injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight /1 )'
                                style={{ height: webViewHeight, width: '100%', backgroundColor: "#f1f1f1" }} source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body dir="' + (lang == "arabic" ? "rtl" : "ltr") + '" style="background-color:#f1f1f1;">' + prod?.description + '</body></html>' }} />
                        </View>
                        {/* <Text style={{ fontFamily: 'PMe', fontSize: 10 }}>{prod?.description}</Text> */}

                    </View>
                    <View
                        style={{
                            width: viewportWidth * (90 / 100),
                            marginTop: viewportHeight * (2 / 100),
                            alignSelf: "center",

                        }}
                    >
                        <Text
                            style={{
                                color: "#313131",
                                fontFamily: 'pp-medium',
                                fontSize: 18,
                            }}
                        >
                            Related Products
            </Text>
                    </View>
                    <View
                        style={{

                            marginTop: viewportHeight * (0 / 100), paddingBottom: viewportHeight * (10 / 100)
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
                            {latestprods.map((item, i) => {
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
                                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                {/* <View>
                                                                <Text
                                                                    style={{
                                                                        color: "#EF545C",
                                                                        fontFamily: "pp-regular",
                                                                        fontSize: 10,
                                                                    }}
                                                                >
                                                                    Available in 1kg
                        </Text>
                                                            </View> */}
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                <View style={{ paddingHorizontal: "5%" }}>
                                                    <Text
                                                        style={{
                                                            color: "#343434",
                                                            fontFamily: "pp-semibold",
                                                            fontSize: 14,
                                                            textAlign: "center"
                                                        }

                                                        }
                                                        numberOfLines={2}
                                                    >
                                                        {item?.text_price}
                                                        {/* 90.00 <Text
                                                                        style={{
                                                                            color: "#343434",
                                                                            fontFamily: "pp-regular",
                                                                            fontSize: 14,
                                                                        }
                                                                        }
                                                                    >
                                                                        USD </Text><Text
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
                                                onPress={() => {
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
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Product
