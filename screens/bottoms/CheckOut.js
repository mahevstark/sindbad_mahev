import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native'
import { VISA, ArrowLeft, CloseCircle, AddCartPlus, AddCartMinus, Tick,Cash } from '../componets/SvgComponent'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CheckOut = () => {

    const navigation = useNavigation()

    const Items = () => (
        <View style={{ width: "100%", paddingVertical: 10, backgroundColor: '#F5F5F5', marginTop: 15, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
                        
                        <TouchableOpacity style={{position: 'absolute',right:0,top:-10}}>
                            <CloseCircle/>
                        </TouchableOpacity>

                        <Image
                            source={require("./../../assets/image/cartItem.png")}
                            style={{ marginLeft: -12, resizeMode: 'stretch' }}
                        />
                        <View>
                            <Text style={{ fontFamily: 'PMe', fontSize: 14, color: '#343434' }}>Product Name</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ borderRadius: 3, backgroundColor: '#86C5DE', justifyContent: 'center', alignItems: 'center', width: 38, height: 19 }}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 9, fontFamily: 'PMe' }}>2kg</Text>
                                </View>
                                <Text style={{ color: '#FF6F00', fontFamily: 'PSBo', fontSize: 14, marginLeft: 5 }}>KWD 600</Text>
                            </View>
                        </View>

                        <View style={{ position: 'absolute', right: 10, alignSelf: 'center', flexDirection: 'row', width: 85, justifyContent: 'space-between', }}>
                            <TouchableOpacity>
                                <AddCartPlus />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#313131', alignSelf: 'center' }}>1</Text>
                            <TouchableOpacity>
                                <AddCartMinus />
                            </TouchableOpacity>

                        </View>

                    </View>

    )
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
              
            />
            <ScrollView contentContainerStyle={{paddingBottom:100}} >
                <View style={{ width: "85%", alignSelf: 'center' }}>

                    <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', justifyContent: 'space-between', marginTop: Platform.OS == 'android' ? 40 : 5, alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>{
                        navigation.goBack()
                }}>
                            <ArrowLeft />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10, fontSize: 21, fontFamily: 'LRe', color: '#FA6443' }}>Checkout</Text>
                    </View>

                    <Text style={{ marginTop: 30, color: '#FF7801', fontFamily: 'PSBo', fontSize: 13, }}>Delivery Address</Text>

                    <View style={{ width: "100%", paddingVertical: 20, paddingHorizontal: 30, backgroundColor: '#F5F5F5', borderRadius: 8, marginTop: 5 }}>
                        <Text style={{ color: "#313131", fontFamily: 'PSBo', fontSize: 13 }}>Plot # 43 , Phase 5, DHA</Text>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#878787' }}>Lahore</Text>
                    </View>
                    <View style={{ width: "100%", paddingVertical: 20, paddingHorizontal: 30, backgroundColor: '#F5F5F5', borderRadius: 8, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: "#313131", fontFamily: 'PSBo', fontSize: 13 }}>Delivery Time</Text>
                        <Text style={{ color: "#313131", fontFamily: 'PSBo', fontSize: 13 }}>3 Days</Text>
                    </View>

                    <Text style={{ marginTop: 25, color: '#FF7801', fontFamily: 'PSBo', fontSize: 13, }}>Orders From Restaurant</Text>
                    <Items/>
                    <Items/>

                    <View style={{flexDirection:'row',marginTop: 25,justifyContent:'space-between',width:"100%",backgroundColor:''}}>
                        <Text style={{  color: '#FF7801', fontFamily: 'PSBo', fontSize: 13, }}>Payment Method</Text>
                        <TouchableOpacity>
                            <Text style={{color:'#313131',fontSize:14,fontFamily:'PSBo'}}>+ Add</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row', marginTop:20,width:"100%",borderRadius:8,backgroundColor:'#F9F9F9',paddingVertical:15,paddingHorizontal:10,justifyContent:'space-between'}}>
                        <VISA/>
                        <Text style={{marginLeft:-20,color:'#313131',fontFamily:'PSBo',fontSize:14}}>**** **** **** 4365</Text>
                        <Text></Text>
                        <Tick/>                        
                    </View>
                    <View style={{alignItems:"center",flexDirection:'row', marginTop:20,width:"100%",borderRadius:8,backgroundColor:'#F9F9F9',paddingVertical:15,paddingHorizontal:10,}}>
                        <Cash/>
                        <Text style={{marginLeft:20,color:'#313131',fontFamily:'PSBo',fontSize:14}}>Cash</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Wallet')
                    }} style={{alignItems:"center",flexDirection:'row', marginTop:20,width:"100%",borderRadius:8,backgroundColor:'#F9F9F9',paddingVertical:15,paddingHorizontal:10,}}>
                    <Ionicons name="wallet-outline" size={37} color="#000" />
                        <Text style={{marginLeft:20,color:'#313131',fontFamily:'PSBo',fontSize:14}}>Wallet</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row',width:"100%",marginTop:25,height:43}}>
                        <TextInput
                            style={{borderWidth:1,borderRadius:10,width:"65%",height:"100%",borderColor:'#FF6F00',backgroundColor:'#F9F9F9',color:'#B8BEC4',paddingLeft:20,fontFamily:'PRe',fontSize:12,}}
                            placeholderTextColor="#B8BEC4"
                            placeholder="Enter Promo Code"
                        />
                        <TouchableOpacity style={{width:"100%",marginLeft:"2%",borderRadius:10,height:"100%"}}>
                            <LinearGradient 
                                colors={['#DE3535', '#FF9500']}
                                style={{width:"33%",marginLeft:"1.5%",borderRadius:10,height:"100%",justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontFamily:'PMe',fontSize:15,color:'#FFFFFF'}}>Apply</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
                            <Text style={{fontSize:14,fontFamily:'PMe',color:'#313131'}}>Subtotal</Text>
                            <Text style={{fontSize:14,fontFamily:'PMe',color:'#313131'}}>Rs 2500</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:14,fontFamily:'PMe',color:'#313131'}}>Delivery Fee</Text>
                            <Text style={{fontSize:14,fontFamily:'PMe',color:'#313131'}}>Rs 400</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:18,fontFamily:'PSBo',color:'#313131'}}>Total Amount</Text>
                            <Text style={{fontSize:18,fontFamily:'PSBo',color:'#313131'}}>Rs 2900</Text>
                    </View>             

                    

                </View>
            </ScrollView>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('Thanks')
            }} style={{width:"100%",position: 'absolute', bottom:0,height:64,}}>
                        <LinearGradient 
                                style={{width:"100%",height:64,justifyContent:'center',alignItems:'center'}}
                                colors={['#DE3535', '#FF9500']}
                        >
                            <Text style={{color:'#FFFFFF',fontFamily:'PMe',fontSize:16}}>Confirm Order</Text>
                        </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CheckOut