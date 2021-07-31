import React from 'react';
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './screens/bottoms/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import S_Screen from './screens/bottoms/S_Screen';
import Profile from './screens/bottoms/Profile';
import Product from './screens/bottoms/Product';
import Cart from './screens/bottoms/Cart';
import CheckOut from './screens/bottoms/CheckOut';
import Thanks from './screens/bottoms/Thanks';
import Address1 from './screens/bottoms/Address1';
import EditProfile from './screens/bottoms/EditProfile';
import ChangePassword  from './screens/bottoms/ChangePassword';
import Wallet  from './screens/bottoms/Wallet';
import Favorite from './screens/bottoms/Favorite';
import Orders from './screens/bottoms/Orders';
import Privacy from './screens/bottoms/Privacy';
import Categories from './screens/bottoms/Categories';
import Products from './screens/bottoms/Products';
import SearchResult from './screens/bottoms/SearchResult';
import Login_Screen from './screens/auth/Login_Screen';
import Signup_Screen from './screens/auth/Signup_Screen';
import Forgot_Screen from './screens/auth/Forgot_Screen';
import Contactus from './screens/bottoms/Contactus';
import Addresses from './screens/bottoms/Addresses';
import AddAddress from './screens/bottoms/AddAddress';
const HomeStack = createStackNavigator()
const FavoriteStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const CartStack = createStackNavigator()
const CatStack = createStackNavigator()
export function MainScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#F19292',
        backgroundColor: '#DE3535',
        labelStyle:{
          fontFamily:"p-bold",
          fontSize:10,
       },
        style: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        backgroundColor: '#DE3535',
          
          elevation: 5,

        height:65,
        borderTopRightRadius:14,borderTopLeftRadius:14,
        paddingBottom:10,
        paddingTop:10,
        }
      }}
      screenOptions={({ route }) => ({

        tabBarIcon: ({ color, size }) => {

          if (route.name === 'Home') {
            return color=="#fff" ? <Image source={require("./assets/image/hom1.png")} style={{
              width:25,
              height:25,
              resizeMode:"contain",

            }} /> : <Image source={require("./assets/image/hom2.png")} style={{
              width:25,
              resizeMode:"contain",

              height:25
            }} />;
          }
          if (route.name === 'Favorite') {
            return color=="#fff" ? <Image source={require("./assets/image/fav1.png")} style={{
              width:25,
              height:25,
              resizeMode:"contain",
            }} /> : <Image source={require("./assets/image/fav2.png")} style={{
              width:25,
              resizeMode:"contain",
              height:25
            }} />;
          }
          if (route.name === 'Catergories') {
            return color=="#fff" ? <Image source={require("./assets/image/cat1.png")} style={{
              width:25,
              height:25,
              resizeMode:"contain",
            }} /> : <Image source={require("./assets/image/cat2.png")} style={{
              width:25,
              resizeMode:"contain",
              height:25
            }} />;
          }
          if (route.name === 'Profile') {
            return color=="#fff" ? <Image source={require("./assets/image/profile1.png")} style={{
              width:25,
              height:25,
              resizeMode:"contain",
            }} /> : <Image source={require("./assets/image/profile2.png")} style={{
              width:25,
              resizeMode:"contain",
              height:25
            }} />;
          }
          if (route.name === 'Cart') {
            return color=="#fff" ? <Image source={require("./assets/image/cart1.png")} style={{
              width:25,
              height:25,
              resizeMode:"contain",
            }} /> : <Image source={require("./assets/image/cart2.png")} style={{
              width:25,
              resizeMode:"contain",
              height:25
            }} />;
          }
        },
      })}>
      <Tab.Screen name="Home"  component={HomeStackNavigator} />
      <Tab.Screen name="Favorite"  component={FavoriteStackNavigator} />
      <Tab.Screen name="Catergories"  component={CatStackNavigator} />
      <Tab.Screen name="Profile"  component={ProfileStackNavigator} />
      <Tab.Screen name="Cart"  component={CartStackNavigator} />
      
    </Tab.Navigator>

  );
}
const HomeStackNavigator = ({ navigation, routes }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
       <HomeStack.Screen
        name="Product"
        component={Product}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
        }}
      />
       <HomeStack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
        <HomeStack.Screen
        name="CheckOut"
        component={CheckOut}
        options={{
          headerShown: false,
        }}
      />
       <HomeStack.Screen
        name="Thanks"
        component={Thanks}
        options={{
          headerShown: false,
        }}
      />
        <HomeStack.Screen
        name="S_Screen"
        component={S_Screen}
        options={{
          headerShown: false,
        }}
      />
       <HomeStack.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Contactus"
        component={Contactus}
        options={{
          headerShown: false,
        }}
      />
      
    </HomeStack.Navigator>
  )
}
const FavoriteStackNavigator = ({ navigation, routes }) => {
  return (
    <FavoriteStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      
      }}
    >
     
      <FavoriteStack.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
        }}
      />
       <FavoriteStack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
        }}
      />
      <FavoriteStack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerShown: false,
        }}
      />
      <FavoriteStack.Screen
        name="Contactus"
        component={Contactus}
        options={{
          headerShown: false,
        }}
      />
    </FavoriteStack.Navigator>
  )
}
const CatStackNavigator = ({ navigation, routes }) => {
  return (
    <CatStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      
      }}
    >
      <CatStack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
        }}
      />
      <CatStack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
        }}
      />
      <CatStack.Screen
        name="Products"
        component={Products}
        options={{
          headerShown: false,
        }}
      />
      <CatStack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerShown: false,
        }}
      />
       <CatStack.Screen
        name="Contactus"
        component={Contactus}
        options={{
          headerShown: false,
        }}
      />
    </CatStack.Navigator>
  )
}
const ProfileStackNavigator = ({ navigation, routes }) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
       <ProfileStack.Screen
        name="Address1"
        component={Address1}
        options={{
          headerShown: false,
        }}
      />
       <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
       <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
          name="Login_Screen"
          component={Login_Screen}
          options={{
            headerShown: false,
          }}
        />
        <ProfileStack.Screen
          name="Signup_Screen"
          component={Signup_Screen}
          options={{
            headerShown: false,
          }}
        />
         <ProfileStack.Screen
          name="Forgot_Screen"
          component={Forgot_Screen}
          options={{
            headerShown: false,
          }}
        />
        <ProfileStack.Screen
        name="Contactus"
        component={Contactus}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Addresses"
        component={Addresses}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  )
}
const CartStackNavigator = ({ navigation, routes }) => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      
      }}
    >
      <CartStack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
        <CartStack.Screen
        name="CheckOut"
        component={CheckOut}
        options={{
          headerShown: false,
        }}
      />
       <CartStack.Screen
        name="Thanks"
        component={Thanks}
        options={{
          headerShown: false,
        }}
      />
       <CartStack.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerShown: false,
        }}
      />
      <CartStack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
        }}
      />
      <CartStack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerShown: false,
        }}
      />
      <CartStack.Screen
          name="Login_Screen"
          component={Login_Screen}
          options={{
            headerShown: false,
          }}
        />
        <CartStack.Screen
          name="Signup_Screen"
          component={Signup_Screen}
          options={{
            headerShown: false,
          }}
        />
         <CartStack.Screen
          name="Forgot_Screen"
          component={Forgot_Screen}
          options={{
            headerShown: false,
          }}
        />
        <CartStack.Screen
        name="Contactus"
        component={Contactus}
        options={{
          headerShown: false,
        }}
      />
      
    </CartStack.Navigator>
  )
}
