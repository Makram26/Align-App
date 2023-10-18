import React from "react";
import { View, Text } from "react-native";

import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";

import { TeamStackNavigator, TopPrioritiesStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import CustomDrawer from "../component/CustomDrawer";
import { NavigationContainer } from '@react-navigation/native'

import PersonIcon from 'react-native-vector-icons/Ionicons'
import GroupIcon from 'react-native-vector-icons/FontAwesome'
import LogoutIcon from 'react-native-vector-icons/Fontisto'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const Drawer = createDrawerNavigator();
const DrawerNavigator = (props) => {

  return (
    <NavigationContainer independent={true}>

      <Drawer.Navigator
        // useLegacyImplementation={true}
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: '#fff',
          drawerActiveTintColor: '#000',
          drawerInactiveTintColor: '#000',
          drawerLabelStyle: { marginLeft: -20, fontSize: RFValue(16) }
        }}>

        <Drawer.Screen
          name="Dashboard"
          component={TabNavigator}
          options={{
            // swipeEnabled: false,
            drawerIcon: (color) => (
              <PersonIcon name='ios-person' size={20} color={'#000'} />
            )
          }} />

        <Drawer.Screen
          name="Manage Team"
          component={TeamStackNavigator}
          options={{
            drawerIcon: (color) => (
              <GroupIcon name='group' size={20} color={'#000'} />
            )
          }} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;