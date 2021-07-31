import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainScreen } from './MainScreen';


import { DrawerContent } from './DrawerContent';
import { AppColors } from './screens/common/AppColors';
const Drawer = createDrawerNavigator();



export default function Root() {
	return (
		<Drawer.Navigator 
		 initialRouteName="MainScreen"
		 drawerContent={props => <DrawerContent {...props} />}
		 drawerStyle={{
			backgroundColor: 'rgba(0,0,0,0.6)',
			width: '70%',
		  }}
		 >
			<Drawer.Screen name="MainScreen" component={MainScreen} />
				 
		</Drawer.Navigator>

	);
}