import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashBoard from 'react-native-vector-icons/MaterialCommunityIcons'
import Huddles from "react-native-vector-icons/Fontisto";
import Priorities from "react-native-vector-icons/Octicons";
import Tasks from "react-native-vector-icons/Feather";
import Toppriorities from "react-native-vector-icons/Feather";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { DashBoardStackNavigator, HuddlesStackNavigator, PrioritiesStackNavigator, TasksStackNavigator, TopPrioritiesStackNavigator } from './StackNavigator'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

console.log(windowWidth)

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {

  // console.log("<><><><><><><><><><>",props.route)
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#F7941D',
        
        // headerPressColor:"#F7941D",
        tabBarInactiveTintColor:"#58565B",
       
        tabBarStyle :{
          // paddingTop:10
          // backgroundColor:"red", 
          // paddingTop:Platform.OS === 'ios'? 10:5

          height:Platform.OS === 'ios'? windowHeight/10 :windowHeight/12,
        },
        // tabBarStyle: {alignItems:"center",height:windowHeight/14, marginBottom:
        // Platform.OS === 'ios' &&
        // (D_HEIGHT === IPHONE12_H ||
        // D_HEIGHT === IPHONE12_Max ||
        // D_HEIGHT === IPHONE12_Mini)
        // ? 20 : 0 },
        tabBarLabelStyle: {
          fontSize: RFValue(10),
          paddingBottom:Platform.OS === 'ios'? 0: RFValue(8),
        },

      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashBoardStackNavigator}
        options={{
          headerShown: false,
          tabBarLebal: 'Dashboard',
          tabBarIcon: ({ color }) => (
            // <DashBoard name="view-dashboard" color={color} size={26} />
            <Image source={require('../assest/icon/Dashboardb.png')} style={{tintColor:color,...styles.product_container_logo}}/>
          ),
        }} />

      <Tab.Screen
        name="MainHuddles"
        component={HuddlesStackNavigator}
        options={{
          title:"Huddles",
          headerShown: false,
          tabBarLebal: 'Huddles',
          tabBarIcon: ({ color }) => (
            // <Huddles name="persons" color={color} size={26} />
            <Image source={require('../assest/icon/Huddles.png')} style={{tintColor:color,...styles.product_container_logo}} />
          ),
        }} />

      <Tab.Screen
        name="Priorities"
        component={PrioritiesStackNavigator}
        options={{
          headerShown: false,
          tabBarLebal: 'Priorities',

          tabBarIcon: ({ color }) => (
            // <Priorities name="graph" color={color} size={26} />
            <Image source={require('../assest/icon/Priorities.png')} style={{tintColor:color,...styles.product_container_logo}} />
          ),
        }} />

      <Tab.Screen
        name="Tasks"
        component={TasksStackNavigator}
        options={{
          headerShown: false,
          tabBarLebal: 'Tasks',
          tabBarIcon: ({ color }) => (
            <Tasks name="check-square" color={color} size={22} />
          ),
        }} />

      <Tab.Screen
        name="Top Priorities"
        component={TopPrioritiesStackNavigator}

       
      
        options={{
          headerShown: false,
          tabBarLebal: 'Top Priorities',
          // tabBarLabelStyle :{
          //   marginRight:5
          // },
          tabBarIcon: ({ color }) => (
            // <Toppriorities name="calendar" color={color} size={26} />
            <Image source={require('../assest/icon/TopPriorities.png')} style={{tintColor:color,...styles.product_container_logo}} />
          ),
        }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;


const styles = StyleSheet.create({
  product_container_logo: {
    width: windowWidth/16,
    height: windowHeight/30,
    alignSelf: 'center',
    
  },
})