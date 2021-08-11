import React, { useEffect } from 'react';
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
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window")
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../common/CommonHeader';
import { SliderBox } from "react-native-image-slider-box";
import DropdownAlert from "react-native-dropdownalert";
import Close from '../common/Svgs/Close';
import { EvilIcons } from '@expo/vector-icons';
import { AppColors } from '../common/AppColors';
import { doPost } from "./../common/apiCalls";
import {retrieveItem, storeItem, doConsole} from './../common/functions';
import Loader from '../common/Loader';


let dropDownAlertRef;
export function HomeScreen() {
    const navigation = useNavigation()
    const [search_modal, setSearch_modal] = React.useState(false)
    const [renderr, setRenderr] = React.useState(false)
    const [search_text, setSearchText] = React.useState("")
    
    const [lang, setLang] = React.useState("en")
    const [loading, setLoading] = React.useState(true)
    const [feed, setFeed] = React.useState([
        {},
        {},
        {},
    ])
    const [cats, setCats] = React.useState([])
    const [tabs, setTabs] = React.useState([])

    const [latestprods, setLatestprods] = React.useState([])

    const images = [
        require('./../../assets/image/cli.png'),          // Local image
        require('./../../assets/image/bp.jpeg'),          // Local image
        require('./../../assets/image/cli.png'),          // Local image
        require('./../../assets/image/bp.jpeg'),          // Local image
    ]



    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const dbData = { lang: "en" }

        const { isError, data } = await doPost(dbData, "get_home_data");
        setLoading(false)
        if (isError) {
            setTimeout(() => {
                loadData()
            }, 2000)
        }
        else {
            if (data.action == "success") {
                setCats(data.data.categories)
                setLatestprods(data.data.prods)
            }
        }
    }
    useEffect(() => {
        getTabs()
    }, [cats])

    const doActive = (i) => {

        var all = tabs
        for (var q = 0; q <= all.length - 1; q++) {
            all[q].active = false
        }

        all[i].active = true

        setTabs(all)
        setRenderr(!renderr)
    }

    const doActiveAll = () => {

        var all = tabs
        for (var q = 0; q <= all.length - 1; q++) {
            all[q].active = false
        }

        // all[i].active = true

        setTabs(all)
        setRenderr(!renderr)
    }

    do_search = () => {
        if (this.state.search_string.length < 1) {
            var err = this.state.clang.slug == "arabic" ? "يرجى إدخال نص صالح للبحث" : "Please enter a valid text to search";
            dropDownAlertRef.alertWithType('error', this.state.clang.slug == "arabic" ? "خطأ" : 'error', err);
            return;
        }

        this.setState({ search_modal: false }, () => {

            this.props.navigation.navigate('GProducts', { type: "search", ob: {}, search_string: this.state.search_string })
            // this.props.routes.navigate("SearchScreen",{search:this.state.search_string});
        })
    }

    const getTabs = () => {
        var t_tabs = []

        for (var i = 0; i <= cats.length - 1; i++) {
            var finalTab = {
                title: cats[i].title,
                id: cats[i].id,
                active: false,
                prods:cats[i]?.prods
            }

            t_tabs.push(finalTab)
        }

        setTabs(t_tabs)

        // return tabs
    }


    const do_cart=(product)=>
    {
        var action_type = 1;
        var k=0;
        retrieveItem("cart_items").then((items)=>{
            if(items)
            {
                for(var i=0; i<=items.length-1; i++)
                {
                    if(product.id==items[i].id)
                    {
                        action_type = 2;
                        k=i;
                        break;
                    }

                }
            }



            var ff_prod = product;
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

    const isCat = ()=>{
        var yes = false;

        for(var i = 0; i<=tabs.length-1; i++)
        {
            if(tabs[i].active)
            {
                yes = true;
                break;
            }
        }

        return yes;
    }

    const activeTabTitle = ()=>{
        var index = 0;

        for(var i = 0; i<=tabs.length-1; i++)
        {
            if(tabs[i].active)
            {
                return tabs[i].title;
            }
        }

    }

    const getProds = ()=>{
        if(tabs.length==0) return []
        var index = 0;

        for(var i = 0; i<=tabs.length-1; i++)
        {
            if(tabs[i].active)
            {
                index = i;
                break;
            }
        }
        console.log("before error");
        console.log(tabs[index]?.prods);
        return tabs[index].prods;
    }


    _render_new_address_modal_search = () => {
        return (
            <Modal
                animationType="slide"

                transparent={true}
                visible={this.state.search_modal}
                onRequestClose={() => {
                    this.setState({ search_modal: false })
                }}>
                <View style={{
                    width: viewportWidth * (100 / 100),
                    backgroundColor: '#fff',
                    marginTop: viewportHeight * (5 / 100),
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    height: viewportHeight * (92 / 100),
                }}>

                    {/* popup header */}

                    <View style={{ flex: 0.9, width: viewportWidth * (90 / 100), alignSelf: "center" }}>

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
                                    color: '#76C945', fontFamily: 'ProximaNova-Bold',
                                }}>
                                    {this.state.clang.slug == "arabic" ? "بحث" : "Search"}
                                </Text>

                            </View>
                            <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ search_modal: false })}
                                >
                                    <Text style={{

                                        color: '#76C945', fontFamily: 'ProximaNova-Regular',
                                    }}>{this.state.clang.slug == "arabic" ? "إلغاء" : "Cancel"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* header close */}
                        <View>
                            <View style={{ paddingVertical: 20 }}>
                                <Text style={{ fontSize: 16, color: '#76C945', fontFamily: 'ProximaNova-Bold', }}>{this.state.clang.slug == "arabic" ? "بحث" : "Search"}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <TextInput
                                    style={{
                                        fontFamily: 'ProximaNova-Regular',
                                        color: '#76C945', borderRadius: 6, width: viewportWidth * (88 / 100),
                                        paddingLeft: viewportWidth * (4 / 100), backgroundColor: '#F5F3F3',
                                        paddingBottom: viewportHeight * (1 / 100),
                                        paddingTop: viewportHeight * (1 / 100), alignSelf: 'center',
                                        width: '100%',
                                        textAlign: this.state.clang.slug == "arabic" ? "right" : "auto"
                                    }}
                                    placeholder={this.state.clang.slug == "arabic" ? "...بحث" : 'Search...'}
                                    autoCapitalize={"none"}
                                    placeholderTextColor={'#76C945'}
                                    value={this.state.search_string}
                                    onChangeText={(v) => {

                                        this.setState({ search_string: v })
                                    }}

                                />

                            </View>


                            <View>
                                <TouchableOpacity onPress={() => {
                                    if (this.state.search_string == "") return;
                                    this.do_search()
                                }} style={[{ alignSelf: 'center', marginTop: viewportHeight * (2 / 100), backgroundColor: '#76C945', borderRadius: 8, width: viewportWidth * (90 / 100), paddingBottom: viewportHeight * (1.5 / 100), paddingTop: viewportHeight * (1.5 / 100), alignItems: 'center' }
                                    ,
                                this.state.search_string == "" ? {
                                    backgroundColor: "#ccc"
                                } : null
                                ]}>
                                    <Text style={{ color: '#fff', fontFamily: 'ProximaNova-Regular', fontSize: 16 }}>{this.state.clang.slug == "arabic" ? "بحث" : 'Search'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        )
    }
    return (
        <Container style={{ backgroundColor: "#EFF7FA" }}>
            <StatusBar />
            <View style={{ zIndex: 1 }}>
                <DropdownAlert ref={ref => dropDownAlertRef = ref} />
            </View>
            {loading && <Loader />}
            <ImageBackground
                style={{ flex: 1, width: null, height: null }}
                resizeMode={"cover"}
                source={require('./../../assets/image/hbg.png')}
            >
                <SafeAreaView forceInset={{ top: 'never' }}
                    style={{ flex: 1 }}
                >
                    <Content contentContainerStyle={{ width: "100%" }}>
                        <View
                            style={{ flex: 1, }}
                        >
                            <View style={{ flex: 1 }}>
                                <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: viewportWidth * (96 / 100) }}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.openDrawer()
                                    }} style={{ flex: 0.2, alignItems: "center" }}>
                                        <EvilIcons name="navicon" size={50} color="#FFF" />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: "row", flex: 0.8, alignItems: 'center', alignSelf: 'flex-start', backgroundColor: "#F5F5F5", borderRadius: 8, paddingVertical: 12 }}>
                                        
                                        <View style={{ flex: 0.85, alignItems: "flex-start" }}>
                                            <TextInput 
                                            placeholder={"Search "}
                                            style={{
                                                color: "#B7B7B7",
                                                fontFamily: 'p-regular',
                                                fontSize: 12,
                                                paddingLeft:15
                                            }} 
                                            value={search_text}
                                            onChangeText={(t)=>setSearchText(t)}
                                            onEndEditing={()=>{
                                                navigation.navigate("SearchResult",{search_text})
                                            }}
                                            />
                                        </View>
                                        <View style={{ flex: 0.15, alignItems: 'center' }}>
                                            <Image style={{ width: 22, height: 22, resizeMode: 'contain' }} source={require('./../../assets/image/sss.png')} />
                                        </View>
                                    </View>
                                </View>

                                <View style={{
                                    marginTop: 20,
                                    marginLeft: 20,
                                }}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <TouchableOpacity
                                            onPress={() => {
                                                doActiveAll()
                                            }}
                                            style={[{

                                                marginRight: 10, paddingBottom: 5,

                                            }, !isCat() ? {
                                                borderBottomColor: '#FFFFFF',
                                                borderBottomWidth: 2,
                                            } : null]}>
                                            <Text style={{ color: '#fff', fontFamily: "p-bold", fontSize: 14 }}>Home</Text>
                                        </TouchableOpacity>
                                        {
                                            tabs.map((v, i) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            doActive(i)
                                                        }}
                                                        style={[{

                                                            marginRight: 10, paddingBottom: 5,

                                                        }, v.active ? {
                                                            borderBottomColor: '#FFFFFF',
                                                            borderBottomWidth: 2,
                                                        } : null]}>
                                                        <Text style={{ color: '#fff', fontFamily: "p-bold", fontSize: 14 }}>{v.title}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                                {

                                    !isCat() &&
                                    <>
                                <View style={{ width: viewportWidth, alignSelf: "center" }}>
                                    <SliderBox
                                        images={images}
                                        sliderBoxHeight={130}
                                        onCurrentImagePressed={(index) =>
                                            console.warn(`image ${index} pressed`)
                                        }

                                        dotColor="#FF4760"
                                        inactiveDotColor="#8D8D8D"
                                        paginationBoxVerticalPadding={0}
                                        autoplay
                                        circleLoop
                                        resizeMethod={"resize"}
                                        resizeMode={'cover'}
                                        paginationBoxStyle={{
                                            position: "absolute",
                                            bottom: 0,
                                            padding: 0,
                                            alignItems: "center",
                                            alignSelf: "center",
                                            justifyContent: "center",
                                            paddingVertical: 12,
                                        }}
                                        dotStyle={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            marginHorizontal: 0,
                                            padding: 0,
                                            margin: 0,
                                            backgroundColor: "rgba(128, 128, 128, 0.92)",
                                        }}
                                        ImageComponentStyle={{ borderRadius: 15, width: "90%", marginBottom: viewportHeight * (0 / 100), marginTop: viewportHeight * (2 / 100) }}
                                        imageLoadingColor="#2196F3"
                                    />
                                </View>
                                
                                {/* <View
                                    style={{
                                        width: viewportWidth * (90 / 100),
                                        marginTop: viewportHeight * (2 / 100),
                                        alignSelf: "center",
                                        alignItems: "flex-start"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#313131",
                                            fontFamily: 'pp-medium',
                                            fontSize: 14,
                                        }}
                                    >
                                        Our Stores
            </Text>
                                </View> */}
                                {/* <View
                                    style={{
                                        width: viewportWidth,
                                        alignSelf: 'flex-end',
                                        marginTop: viewportHeight * (0 / 100),
                                        width: "95%", alignItems: "flex-end"
                                    }}
                                >
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        style={{
                                            flexDirection: "row",
                                            backgroundColor: "#F6F6FC", width: "100%", paddingVertical: 5, borderRadius: 8

                                        }}
                                    >
                                        {cats.map((item) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.props.navigation.navigate('GProducts', { type: "categories", ob: item })
                                                    }}
                                                    style={{ marginLeft: viewportHeight * (2 / 100), alignItems: "center" }}
                                                >
                                                    <View
                                                        style={{
                                                            marginLeft: viewportWidth * (0 / 100),
                                                            marginRight: viewportWidth * (0.5 / 100),
                                                            backgroundColor: "#FFFFFF",
                                                            width: viewportWidth * (12 / 100), height: viewportWidth * (12 / 100),
                                                            borderRadius: viewportWidth * (8 / 100),
                                                            overflow: "hidden", alignItems: "center", justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Image
                                                            source={item.img}
                                                            style={{ width: viewportWidth * (10 / 100), height: viewportWidth * (10 / 100) }} resizeMode="contain" />
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </ScrollView>
                                </View> */}
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
                                        Best Selling
                                    </Text>
                                </View>
                                <View
                                    style={{

                                        marginTop: viewportHeight * (0 / 100), paddingBottom: viewportHeight * (4 / 100)
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

                                </>
                                }
                                {
                                    isCat() && 
                                    <>
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
                                        {activeTabTitle()}
                                    </Text>
                                </View>
                                <View
                                    style={{

                                        marginTop: viewportHeight * (0 / 100), paddingBottom: viewportHeight * (4 / 100)
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
                                        <>
                                            {getProds().length==0 && <View style={{width:"100%",alignItems:"center",justifyContent:"center",marginTop:20}}>
                                                    <Text style={{fontSize:20}}>No products in this category</Text>
                                                </View>}
                                        </>
                                        {getProds().map((item, i) => {
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
                                    </>
                                }

                            </View>
                        </View>
                    </Content>
                </SafeAreaView>
            </ImageBackground>
        </Container>
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

