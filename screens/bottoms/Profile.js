import { NavigationContainer, useFocusEffect } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Platform, TouchableOpacity, Image } from 'react-native'
import { ArrowLeft, EditIcon, ProfileIcon, MailIcon, SmartPhone ,HeartIcon,LocationIcon,PasswordIcon,CreditCardIcon} from '../componets/SvgComponent'
import { useNavigation } from '@react-navigation/native';
import {retrieveItem, storeItem, doConsole} from './../common/functions';

const Profile = () => {
    const navigation = useNavigation()
    const [user,setUser] = useState({})

    useFocusEffect(React.useCallback(() => {
        getUser()
    }, []))
  

    const getUser=()=>{
        retrieveItem("login_data").then((v)=>{
            if(v && v?.token)
            {
                setUser(v)
                console.log(v)
            }
            else{
                navigation.navigate("Login_Screen")
            }
            
        })
    }

    const logout = ()=>{
        storeItem("login_data",null).then(()=>{
            navigation.navigate("Login_Screen")
        })
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
                hidden={true}
            />
            <View style={{ width: "85%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', justifyContent: 'space-between', marginTop: Platform.OS == 'android' ? 25 : 5, alignItems: 'center' }}>

                    <TouchableOpacity>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <ProfileIcon />
                        <Text style={{ marginLeft: 10, fontSize: 21, fontFamily: 'LRe', color: '#FA6443' }}>Profile</Text>
                    </View>
                </View>

                <View style={{ width: "100%", paddingHorizontal: 20, marginTop: 30, paddingVertical: 20, backgroundColor: '#F6F6F6' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingBottom: 15 }}>
                        <Image
                            source={{uri:user?.profile_pic}}
                            style={{
                                width:28,
                                height:28
                            }}
                        />
                        <Text style={{ color: '#505050', fontSize: 18, marginLeft: -80, fontFamily: 'PSBo' }}>{user?.displayname ?? "Name"}</Text>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('EditProfile')
                        }}>
                        <Image
                        source={require("./../../assets/image/editIcon.png")}
                    /> 
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#D9D9D9', paddingBottom: 15 }}>
                        <Image
                        source={require("./../../assets/image/mailIcon.png")}
                    /> 
                        <Text style={{ color: '#505050', fontSize: 12, marginLeft: 20, fontFamily: 'PSBo' }}>{user?.email ?? "email"}</Text>
                        <TouchableOpacity>
                            <EditIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingBottom: 15 }}>
                    <Image
                        source={require("./../../assets/image/phoneIcon.png")}
                    /> 
                        <Text style={{ color: '#505050', fontSize: 12, marginLeft: 20, fontFamily: 'PSBo' }}>{user?.phone ?? "phone"}</Text>
                    </View>
                </View>

                <View style={{ width: "100%", height: 100, marginTop: 20, borderRadius: 10 }}>
                    <LinearGradient style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 15,  borderRadius: 10 }}
                        colors={['#DE3535', '#FF9500']}>

                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Addresses')
                        }} style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: '#FFFFFF' }}>
                            <LocationIcon />
                            <Text style={{ color: '#FFFFFF', fontSize: 12, marginLeft: 15, fontFamily: 'PSBo', alignSelf: 'flex-end' }}>Addresses</Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: '#FFFFFF' }}>
                            <HeartIcon />
                            <Text style={{ color: '#FFFFFF', fontSize: 12, marginLeft: 15, fontFamily: 'PSBo', alignSelf: 'flex-end' }}>Favorite Items</Text>
                        </View>
                        
{/* 
                        <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: '#FFFFFF' }}>
                            <CreditCardIcon />
                            <Text style={{ color: '#FFFFFF', fontSize: 12, marginLeft: 15, fontFamily: 'PSBo', alignSelf: 'flex-end' }}>Payment Options</Text>
                        </View> */}

                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('ChangePassword')
                        }} style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: '#FFFFFF' }}>
                            <PasswordIcon />
                            <Text style={{ color: '#FFFFFF', fontSize: 12, marginLeft: 15, fontFamily: 'PSBo', alignSelf: 'flex-end' }}>Change Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            logout()
                        }} style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: '#FFFFFF' }}>
                            <PasswordIcon />
                            <Text style={{ color: '#FFFFFF', fontSize: 12, marginLeft: 15, fontFamily: 'PSBo', alignSelf: 'flex-end' }}>Logout</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Profile
