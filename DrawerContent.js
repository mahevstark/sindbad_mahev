import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Drawer, Image } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Close from './screens/common/Svgs/Close';
import { useNavigation } from '@react-navigation/native';
import Closew from './screens/common/Svgs/Closew';
import { AppColors } from './screens/common/AppColors';
import Chat from './screens/common/Svgs/Chat';
import Sett from './screens/common/Svgs/Sett';
import Noti from './screens/common/Svgs/Noti';
import Booki from './screens/common/Svgs/Booki';
import Team from './screens/common/Svgs/Team';
import Logout from './screens/common/Svgs/Logout';
import { Ionicons } from '@expo/vector-icons';

import {retrieveItem, storeItem, doConsole} from './screens/common/functions';
import { changeLoggedIn } from './Common';

export function DrawerContent(props) {
    const navigation = useNavigation()
    const [langg, setLangg] = React.useState(false)
    const [langtext, setLangtext] = React.useState(false)
   


    const doLogout = ()=>{
        storeItem("login_data",null).then(()=>{
            changeLoggedIn.changeNow(0)
        })
    }
    return (

        <View style={{ flex: 1, width: '100%' }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <TouchableOpacity style={{ width: '90%', alignSelf: "center", alignItems: 'flex-end',marginTop:20,marginRight:20  }} onPress={() => {
                        props.navigation.closeDrawer();
                    }}>
                        <Closew />
                    </TouchableOpacity>

                    <View style={{ width: "60%", alignSelf: "center", marginTop: 15, }}>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Home')
                    }} style={styles.touch}>
                            <View style={{flex:3,alignItems:"center"}}>

                            <Image source={require("./assets/image/i_home.png")}  style={{
                                width:18,
                                height:18
                            }}/>
                            </View>
                            <View style={{ flex:7,alignItems:"flex-start" }}>
                                <Text style={styles.textt}>Home</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                        navigation.navigate('Profile')
                    }} style={styles.touch}>
                            <View style={{flex:3,alignItems:"center"}}>

                            <Image source={require("./assets/image/i_account.png")}  style={{
                                width:18,
                                height:18
                            }}/>
                            </View>
                            <View style={{ flex:7,alignItems:"flex-start" }}>
                                <Text style={styles.textt}>My Account</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                        navigation.navigate('Contactus')
                    }} style={styles.touch}>
                            <View style={{flex:3,alignItems:"center"}}>

                            <Image source={require("./assets/image/i_account.png")}  style={{
                                width:18,
                                height:18
                            }}/>
                            </View>
                            <View style={{ flex:7,alignItems:"flex-start" }}>
                                <Text style={styles.textt}>Contact Us</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate('Orders')
                        }}
                        style={styles.touch}>
                            <View style={{flex:3,alignItems:"center"}}>

                            <Image source={require("./assets/image/i_orders.png")}  style={{
                                width:18,
                                height:18
                            }}/>
                            </View>
                            <View style={{ flex:7,alignItems:"flex-start" }}>
                                <Text style={styles.textt}>Orders List</Text>
                            </View>
                        </TouchableOpacity>
                    
                     
                        <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate('Privacy',{type:"privacy"})
                        }}
                        style={styles.touch}>
                            <View style={{flex:25,alignItems:"flex-end",}}>
                            <Image source={require("./assets/image/i_privacy.png")}  style={{
                                width:18,
                                height:24
                            }}/>
                            </View>
                            <View style={{ flex:75 ,marginLeft:10,}}>
                                <Text style={styles.textt}>Privacy Policy</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate('Privacy',{type:"terms"})
                        }}
                        style={styles.touch}>
                            <View style={{flex:25,alignItems:"flex-end",}}>
                            <Image source={require("./assets/image/i_terms.png")}  style={{
                                width:20,
                                height:20
                            }}/>
                            </View>
                            <View style={{ flex:75 ,marginLeft:10,}}>
                                <Text style={styles.textt}>Terms</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        
                        onPress={()=>{
                            navigation.navigate('Favorite')
                        }}
                        style={styles.touch}>
                            <View style={{flex:25,alignItems:"flex-end",}}>
                            <Image source={require("./assets/image/i_favs.png")}  style={{
                                width:18,
                                height:18
                            }}/>
                            </View>
                            <View style={{ flex:75 ,marginLeft:10,}}>
                                <Text style={styles.textt}>Favorites</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>



            </DrawerContentScrollView>
            <View style={{ width: "45%", alignSelf: "center",marginBottom:50, }}>
            <TouchableOpacity  onPress={()=>{
                doLogout()
            }} style={{flexDirection:"row",}}>
                <View>
                    <Logout />
                </View>
                <View style={{marginLeft:15}}>
                <Text style={styles.textt}>Log Out</Text>

                </View>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    touch: {
        flexDirection: "row", marginVertical: 15, alignItems: "center"
    },
    textt: {
        color: AppColors.white, fontFamily: "SR", fontSize: 16, lineHeight: 19
    },

});