import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, SafeAreaView, View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Thanks = (props) => {
    const {order_id} = props?.route?.params ?? {order_id:9393}
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Image
                style={{ alignSelf: 'center', marginTop: 28 }}
                source={require("./../../assets/image/Thanks.png")}
            />
            <Text style={{ fontFamily: 'PMe', fontSize: 23, color: '#272727', alignSelf: 'center', marginTop: -70 }}>Thanks for your order!</Text>
            <View style={{ alignSelf: 'center', flexDirection: 'row', width: "65%", marginTop: 20, justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'PMe', fontSize: 14, color: '#272727' }}>Your order number</Text>
                <Text style={{ fontFamily: 'PMe', color: '#FF6F00', fontSize: 14 }}>#{order_id}</Text>
            </View>
            <View style={{ position: 'absolute', bottom: 50, width: "80%", alignSelf: 'center' }}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('Home')
                }} style={{}}>
                    <LinearGradient
                        colors={['#DE3535', '#FF9500']}
                        style={{ width: "100%", height: 54, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}
                    >
                        <Text style={{ fontFamily: 'PMe', fontSize: 18, color: '#FFFFFF' }}>Continue Shopping</Text>

                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('Home')
                }}
                    style={{ width: "100%", height: 54, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FF6F00', borderRadius: 13, marginTop: 10 }}
                >
                    <Text style={{ fontFamily: 'PMe', fontSize: 18, color: '#FF6F00' }}>Go to Home</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Thanks
