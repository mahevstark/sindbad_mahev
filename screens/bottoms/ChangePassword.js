import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import { ProfileIcon, ArrowLeft, MailSmallIcon, PhoneSmallIcon, LocationSmallIcon, UserIcon, Lock } from '../componets/SvgComponent'
import { useNavigation } from '@react-navigation/native';
import { doPost } from "./../common/apiCalls";
import {retrieveItem, storeItem, doConsole} from './../common/functions';
import DropdownAlert from "react-native-dropdownalert";
import Loader from '../common/Loader'
import { urls } from '../common/Api_urls'
let dropDownAlertRef;

const ChangePassword = () => {
    const navigation = useNavigation()

    const [loading,setLoading] = useState(false)
    const [user,setUser] = useState({})
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [new_password,setNewPassword] = useState("")
    const [new_passwordc,setNewPasswordc] = useState("")
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
        if(password.length<8)
        {
            dropDownAlertRef.alertWithType("error","Error","Please enter a valid password");
            return;
        }

        if(new_password.length<8)
        {
            dropDownAlertRef.alertWithType("error","Error","Please enter at least 8 characters as new password");
            return;
        }


        if(new_passwordc!=new_password)
        {
            dropDownAlertRef.alertWithType("error","Error","Confirm password doesn't match");
            return;
        }

        setLoading(true)
        var dbData = {
            token:user?.token,
            password:password,
            new_password:new_password
        }
        console.log(dbData);
        console.log(urls.API + "change_password");

       

        const { isError, data } = await doPost(dbData, "change_password");

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
                    dropDownAlertRef.alertWithType("success","Success","Password updated succesfully!");
                    newUser(data.data)
                    setPassword("")
                    setNewPasswordc("")
                    setNewPassword("")
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
                        <Text style={{ marginLeft: 10, fontSize: 21, fontFamily: 'LRe', color: '#FA6443' }}>Change Password</Text>
                </View>



               
                <View style={[styles.textInputContainer,{marginTop:80}]}>
                    <Lock />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Previous Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(t)=>setPassword(t)}
                    />
                </View>
                <View style={[styles.textInputContainer]}>
                    <Lock />
                    <TextInput
                        style={styles.textInput}
                        placeholder="New Password"
                        value={new_password}
                        secureTextEntry={true}
                        onChangeText={(t)=>setNewPassword(t)}
                    />
                </View>
                <View style={[styles.textInputContainer]}>
                    <Lock />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Re-Enter New Password"
                        value={new_passwordc}
                        secureTextEntry={true}
                        onChangeText={(t)=>setNewPasswordc(t)}
                    />
                </View>
               

                
                <TouchableOpacity 
                onPress={()=>{
                    doUpdate()
                }}
                style={{ width: "90%",alignSelf:'center', height: 54, marginTop: 100, }}>
                    <LinearGradient
                        colors={['#DE3535', '#FF9500']}
                        style={{ width: "100%", height: 54, borderRadius: 9, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: "#F5F5F5", fontFamily: 'PMe', fontSize: 16 }}>Update</Text>
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
        marginTop: 20


    },
    textInput: {
        marginLeft: 10, color: '#878787', fontFamily: 'PRe', fontSize: 12, width: '100%'
    }
})

export default ChangePassword
