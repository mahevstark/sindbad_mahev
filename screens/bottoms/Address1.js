import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView,View,Text ,TouchableOpacity, TextInput, StyleSheet} from 'react-native'

import { useNavigation } from '@react-navigation/native';

const Address1 = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white',}}>
            <StatusBar
               
            />
            <View style={{marginTop:30}}>
            <Text style={{marginTop:10,alignSelf:'center',color:'#070704',fontSize:22,fontFamily:'PMe'}}>Select Delivery Address</Text>
            <TextInput style={styles.textInput}
                placeholder="Delivery Addess..."
                placeholderTextColor="#6D6D6D"
            />
                </View>
            <TouchableOpacity style={{width:"80%",height:54,alignSelf:'center',position: 'absolute',bottom:20}}>
                <LinearGradient  
                    style={{width:"100%",height:54,alignSelf:'center',borderRadius:8,justifyContent:'center',alignItems:'center'}}
                    colors={['#DE3535', '#FF9500']} >
                    <Text style={{fontFamily:'PMe',fontSize:18,color:'#FFFFFF'}}>Choose Address</Text>
                </LinearGradient>
            </TouchableOpacity>

            
        </SafeAreaView>
    )
}

const styles =  StyleSheet.create({
    textInput:{
        marginTop:20,
        width:"80%",
        alignSelf:'center',
        flexDirection:'row',
        height:48,
        paddingHorizontal:15,
        color:'#6D6D6D',
        fontFamily:'PRe',
        fontSize:13,
        shadowOffset:{
            width:0.1,height:1
        },
        shadowOpacity:0.2,
        shadowRadius:1,
        backgroundColor:'white',
        borderRadius:8,
        elevation:5
    }

})

export default Address1
