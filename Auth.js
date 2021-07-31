import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import  Forgot_Screen  from './screens/auth/Forgot_Screen';
import Login_Screen from './screens/auth/Login_Screen';
import Signup_Screen from './screens/auth/Signup_Screen';
import Intro from './screens/auth/Intro';
import Intro_2 from './screens/auth/Intro_2';

const AuthStack = createStackNavigator()

export function Auth() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen options={{tabBarVisible:false}}  name={'auth'} component={AuthStackNavigator} />
        </Tab.Navigator>

    );
}
const AuthStackNavigator = ({navigation,routes})=> {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
           {/* <AuthStack.Screen
          name="Intro"
          component={Intro}
          options={{
            headerShown: false,
          }}
        />
         <AuthStack.Screen
          name="Intro_2"
          component={Intro_2}
          options={{
            headerShown: false,
          }}
        /> */}
        <AuthStack.Screen
          name="Login_Screen"
          component={Login_Screen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Signup_Screen"
          component={Signup_Screen}
          options={{
            headerShown: false,
          }}
        />
         <AuthStack.Screen
          name="Forgot_Screen"
          component={Forgot_Screen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    )
  }
  
