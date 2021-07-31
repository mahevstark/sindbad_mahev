import { NavigationContainer } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, View, Text, Platform, TouchableOpacity, Image } from 'react-native'
import { ArrowLeft, EditIcon, ProfileIcon, MailIcon, SmartPhone ,HeartIcon,LocationIcon,PasswordIcon,CreditCardIcon} from '../componets/SvgComponent'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Wallet = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
               
            />
            <View style={{ width: "85%", alignSelf: 'center',marginTop:10 }}>
                <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', justifyContent: 'space-between', marginTop: Platform.OS == 'android' ? 25 : 5, alignItems: 'center' }}>

                    <TouchableOpacity onPress={()=>{
                        navigation.goBack()
                    }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Ionicons name="wallet-outline" size={22} color="#FA6443" />
                        <Text style={{ marginLeft: 10, fontSize: 21, fontFamily: 'LRe', color: '#FA6443' }}>Wallet</Text>
                    </View>
                </View>


                <View style={{marginTop:60}}>
                    <View style={{alignSelf:"center",alignItems:"center"}}>
                    <Text style={{ marginLeft: 10, fontSize: 21, fontFamily: 'LRe', color: '#000' }}>You Have</Text>
                    </View>
                    <TouchableOpacity style={{marginTop:20,width:"50%",alignItems:"center",alignSelf:"center",backgroundColor:"#FF4257",paddingVertical:20,borderRadius:12,}}>
                        <Text style={{ marginLeft: 10, fontSize: 21, fontFamily: 'LRe', color: '#FFF' }}>100 USD</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ width: "90%",alignSelf:'center', height: 54, marginTop: 120, }}>
                    <LinearGradient
                        colors={['#DE3535', '#FF9500']}
                        style={{ width: "100%", height: 54, borderRadius: 9, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: "#F5F5F5", fontFamily: 'PMe', fontSize: 18}}>Add More</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems:"center",justifyContent:"center",width: "90%",alignSelf:'center',borderRadius: 9, height: 50, marginTop: 20,borderWidth:1,borderColor:"#FF4257" }}>
                        <Text style={{ color: "#FF4257", fontFamily: 'PMe', fontSize: 18}}>Withdraw</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Wallet
