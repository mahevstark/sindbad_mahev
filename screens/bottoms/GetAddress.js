import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native'
import { ProfileIcon, ArrowLeft, MailSmallIcon, PhoneSmallIcon, LocationSmallIcon, UserIcon } from '../componets/SvgComponent'
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar
            />
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
                            placeholder="John Snowri"
                            placeholderTextColor="#FF7801"
                        />
                    </View>
                </View>

                <View style={[styles.textInputContainer]}>
                    <MailSmallIcon />
                    <TextInput
                        style={styles.textInput}
                        placeholder="johnsnowri@gmail.com"
                    />
                </View>
                <View style={[styles.textInputContainer]}>
                    <PhoneSmallIcon />
                    <TextInput
                        style={styles.textInput}
                        placeholder="+92 435 65 65 476"
                    />
                </View>
               
                <View style={[styles.textInputContainer]}>
                <Image
                        source={require("./../../assets/image/locationIcon.png")}
                    />        
                                <TextInput
                        style={styles.textInput}
                        placeholder="Address"
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
                </View>

                <TouchableOpacity style={{ width: "100%", height: 54, backgroundColor: '#B1B1B1', marginTop: 30, borderRadius: 9, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ color: "#F5F5F5", fontFamily: 'PMe', fontSize: 16 }}>Set Address on Map</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "100%", height: 54, marginTop: 10, }}>
                    <LinearGradient
                        colors={['#DE3535', '#FF9500']}
                        style={{ width: "100%", height: 54, borderRadius: 9, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: "#F5F5F5", fontFamily: 'PMe', fontSize: 16 }}>Set Address on Map</Text>
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
