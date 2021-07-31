import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native'
import { ProfileIcon, ArrowLeft, MailSmallIcon, PhoneSmallIcon, LocationSmallIcon, UserIcon } from '../componets/SvgComponent'
import { useNavigation } from '@react-navigation/native';
import { doPost } from "./../common/apiCalls";
import {retrieveItem, storeItem, doConsole} from './../common/functions';
import DropdownAlert from "react-native-dropdownalert";
import Loader from '../common/Loader'
import { urls } from '../common/Api_urls'
let dropDownAlertRef;

const EditProfile = () => {
    const navigation = useNavigation()

    const [loading,setLoading] = useState(false)
    const [user,setUser] = useState({})
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [email,setEmail] = useState("")

    useEffect(()=>{
        getUser()
    },[])

    const getUser=()=>{
        retrieveItem("login_data").then((v)=>{
            newUser(v)
        })
    }
    const newUser=(v)=>{
        setUser(v)
        setName(v?.displayname)
        setPhone(v?.phone)
        setEmail(v?.email)
        // console.log(v)
    }

    const doUpdate =async ()=>{
        if(name=="")
        {
            dropDownAlertRef.alertWithType("error","Error","Please enter a display Name");
            return;
        }

        if(email=="")
        {
            dropDownAlertRef.alertWithType("error","Error","Please enter an email");
            return;
        }


        if(phone=="")
        {
            dropDownAlertRef.alertWithType("error","Error","Please enter a phone");
            return;
        }

        setLoading(true)
        var dbData = {
            token:user?.token,
            displayname:name,
            email:email,
            phone:phone
        }
        console.log(dbData);
        console.log(urls.API + "update_profile");

       

        const { isError, data } = await doPost(dbData, "update_profile");

        if (isError) {
            // setTimeout(() => {
            //     loadData()
            // }, 2000)
            setLoading(false)
            dropDownAlertRef.alertWithType("error","Error","Network error")
            
        }
        else {
            if (data.action == "success") {
               setLoading(false)
                storeItem("login_data", data.data).then(() => {
                    dropDownAlertRef.alertWithType("success","Success","Profile updated succesfully!");
                    newUser(data.data)
                });
            }
        }


    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
              
            />
            {loading && <Loader />}
            <View style={{ zIndex: 1 }}>
                <DropdownAlert ref={ref => dropDownAlertRef = ref} />
            </View>
            <ScrollView>
            <View style={{ width: "85%", alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', justifyContent: 'space-between', marginTop: Platform.OS == 'android' ? 40 : 5, alignItems: 'center' }}>

                    <TouchableOpacity onPress={()=>{
                        navigation.goBack()
                    }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <ProfileIcon />
                        <Text style={{ marginLeft: 10, fontSize: 21, fontFamily: 'LRe', color: '#FA6443' }}>Edit Profile</Text>
                    </View>
                </View>



                <View style={[styles.textInputContainer, { marginTop: 40, backgroundColor: '#FFFFFF', elevation: 3,shadowOffset:{width:0.1,height:0.6},shadowOpacity:0.6,shadowRadius:1 }]}>
                    <UserIcon />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: "#444444", fontSize: 9, fontFamily: 'PRe', position: 'absolute', top: -3 }}>Name</Text>
                        <TextInput
                            style={[styles.textInput, { marginLeft: 0, width: "100%", marginTop: 5 }]}
                            placeholder="Display Name"
                            placeholderTextColor="#FF7801"
                            value={name}
                            onChangeText={(t)=>{
                                setName(t)
                            }}
                        />
                    </View>
                </View>

                <View style={[styles.textInputContainer]}>
                    <MailSmallIcon />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        value={email}
                            onChangeText={(t)=>{
                                setEmail(t)
                            }}
                    />
                </View>
                <View style={[styles.textInputContainer]}>
                    <PhoneSmallIcon />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Phone"
                        value={phone}
                            onChangeText={(t)=>{
                               setPhone(t)
                            }}
                    />
                </View>
               
                {/* <View style={[styles.textInputContainer]}>
                <Image
                        source={require("./../../assets/image/locationIcon.png")}
                    />        
                                <TextInput
                        style={styles.textInput}
                        placeholder="Address"
                        value={user?.address}
                            onChangeText={(t)=>{
                                var v = user;
                                v.address = t;
                                setUser(v)
                            }}
                    />
                </View>
                <View style={[styles.textInputContainer]}>
                <Image
                        source={require("./../../assets/image/locationIcon.png")}
                    />        
                                 <TextInput
                        style={styles.textInput}
                        placeholder="Postal Code"
                    />
                </View>
                <View style={[styles.textInputContainer]}>
                <Image
                        source={require("./../../assets/image/locationIcon.png")}
                    /> 
                                        <TextInput
                        style={styles.textInput}
                        placeholder="Town"
                    />
                </View> */}

                {/* <TouchableOpacity style={{ width: "100%", height: 54, backgroundColor: '#B1B1B1', marginTop: 30, borderRadius: 9, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ color: "#F5F5F5", fontFamily: 'PMe', fontSize: 16 }}>Set Address on Map</Text>
                </TouchableOpacity> */}
                <TouchableOpacity 
                onPress={()=>{
                    doUpdate()
                }}
                style={{ width: "100%", height: 54, marginTop: 10, }}>
                    <LinearGradient
                        colors={['#DE3535', '#FF9500']}
                        style={{ width: "100%", height: 54, borderRadius: 9, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: "#F5F5F5", fontFamily: 'PMe', fontSize: 16 }}>Save</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection: 'row',
        width: "95%",
        alignSelf:'center',
        height: 48,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 30


    },
    textInput: {
        marginLeft: 10, color: '#878787', fontFamily: 'PRe', fontSize: 12, width: '100%'
    }
})

export default EditProfile
