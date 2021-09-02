import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Root from './Roots';
import { useFonts } from 'expo-font';
import { Auth } from './Auth';
import { urls } from './screens/common/Api_urls';
import { loggedInObservable } from './Common';
import { Image, View } from 'react-native';
import {retrieveItem, storeItem, doConsole} from './screens/common/functions';
const Stack = createStackNavigator();


export default function App() {
	const [loaded] = useFonts({
		SR: require('./assets/fonts/Somatic-Rounded.otf'),
		'p-light':require('./assets/fonts/Lato-Light.ttf'),
		"pp-medium":require('./assets/fonts/Poppins-Medium.ttf'),
		"p-regular":require('./assets/fonts/Lato-Regular.ttf'),
		"pp-regular":require('./assets/fonts/Poppins-Regular.ttf'),
		"pp-semibold":require('./assets/fonts/Poppins-SemiBold.ttf'),
		"p-bold":require('./assets/fonts/Lato-Bold.ttf'),
		LB: require('./assets/fonts/Lato/Lato-Black.ttf'),
		LRe: require('./assets/fonts/Lato/Lato-Regular.ttf'),
	
		PBo: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
		PRe: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
		PMe: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
		PSBo: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),	
	});

	// if (!loaded) {
	// 	return null;
	// }


	
	const [loggedIn, setLoggedIn] = useState(0)
    
    useEffect(()=>{

      console.log("ever came here")
        checkLoggedIn()
        loggedInObservable.subscribe((v)=>{
            console.log("Yessss won the warrrrr");
            setLoggedIn(v)
        })
    },[]);

    const checkLoggedIn = () =>{
      retrieveItem("login_data").then((data)=>{
          if(data)
          {
            checkWithServer(data)
          }
          else{
              doConsole("token doesn't exist");
                
              setLoggedIn(2)
              
          }
      })
    }

    const checkWithServer = (data) =>
    {
      
        
        if(data)
            var token = data.token;
        else
            var token = "khali";
        var body_data = {token:token};
        doConsole(" I request @ "+urls.API+"check_login");
        doConsole(body_data);
        fetch(urls.API + 'check_login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body_data),
        }).then((response) => response.json())
        .then((responseJson) => {
            doConsole(" I receive ");
            doConsole(responseJson);
            if (responseJson.action == "success") {
                storeItem("login_data", responseJson.data).then(() => {
                    setLoggedIn(1)
                });
            }
            else {
                setLoggedIn(2)
            }
        }).catch((error) => {
            setLoggedIn(2)
        });
    }


	if(loggedIn==0 || !loaded)
	{
		return (
			<View style={{
				flex: 1,
				alignItems: 'center',
				backgroundColor: '#f7f7f7'
			}}>
				<Image source={require("./assets/splash.png")} style={{width:'100%', height:'100%'}} />
			</View>
		);
	}

	return (
		<NavigationContainer style={{}}>
			<Stack.Navigator initialRouteName="Root">
				
				{/* {
					loggedIn == 2 &&
				    <Stack.Screen options={{ headerShown: false }} name="Auth" component={Auth} />
				}
				{
					loggedIn == 1 &&
				    <Stack.Screen options={{ headerShown: false }} name="Root" component={Root} />
				} */}
                <Stack.Screen options={{ headerShown: false }} name="Root" component={Root} />
			</Stack.Navigator>
            
		</NavigationContainer>


	);
}


