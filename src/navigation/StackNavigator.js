import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import Dashboard from "../screen/Dashboard/Dashboard";

import Huddles from "../screen/Huddles/Huddles";
import WhatsUp from "../screen/Huddles/WhatsUp";
import EditTopPriority from "../screen/Huddles/EditTopPriority";
import CreateStuck from "../screen/Huddles/CreateStuck";
import ParkingLotNote from "../screen/Huddles/ParkingLotNote";

import Priorities from "../screen/Priorities/Priorities";
import CreatePriority from "../screen/Priorities/CreatePriority";
import PriorityProgress from "../screen/Priorities/PriorityProgress";

import Tasks from "../screen/Tasks/Tasks";
import CreateTask from "../screen/Tasks/CreateTask";
import TaskDetail from "../screen/Tasks/TaskDetail";

import TopPriorities from "../screen/TopPriorities/TopPriorities";
import CalenderEdit from "../screen/TopPriorities/CalenderEdit";
import Test from "../screen/Test";
import Login from "../screen/Login";
import Team from "../screen/TeamMember/Team";
import CreateMember from "../screen/TeamMember/CreateMember";
import MemberDetail from "../screen/TeamMember/MemberDetail";
import MainHuddles from "../screen/Huddles/MainHuddles";
import CreateHuddles from "../screen/Huddles/CreateHuddles";
import HuddlesDetails from "../screen/Huddles/HuddlesDetails";
import CreateHuddlesDetails from "../screen/Huddles/CreateHuddlesDetails";
import AddYesterdayTask from "../screen/Huddles/AddYesterdayTask";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#F7941D",
    },
    headerTintColor: "#FFFFFF",
    headerBackTitle: "#F7941D",
};

const DashBoardStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={[screenOptionStyle, {cardStyleInterpolator: CardStyleInterpolators.for}]}>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="CreateTask" component={CreateTask} options={{ headerShown: false }} />

            <Stack.Screen name="PriorityProgress" component={PriorityProgress} options={{ headerShown: false }} />
            <Stack.Screen name="TaskDetail" component={TaskDetail} options={{ headerShown: false }} />
            <Stack.Screen name="CreatePriority" component={CreatePriority} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const HuddlesStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptionStyle}>

            <Stack.Screen name="MainHuddles" component={MainHuddles} options={{ headerShown: false }} />
            <Stack.Screen name="Huddles" component={Huddles} options={{ headerShown: false }} />

            <Stack.Screen name="CreateHuddles" component={CreateHuddles} options={{ headerShown: false }} />

            <Stack.Screen name="WhatsUp" component={WhatsUp} options={{ headerShown: false }} />
            <Stack.Screen name="EditTopPriority" component={EditTopPriority} options={{ headerShown: false }} />
            <Stack.Screen name="CreateStuck" component={CreateStuck} options={{ headerShown: false }} />
            <Stack.Screen name="ParkingLotNote" component={ParkingLotNote} options={{ headerShown: false }} />

            <Stack.Screen name="TaskDetail" component={TaskDetail} options={{ headerShown: false }} />
            <Stack.Screen name="HuddlesDetails" component={HuddlesDetails} options={{ headerShown: false }} />
            <Stack.Screen name="CreateHuddlesDetails" component={CreateHuddlesDetails} options={{ headerShown: false }} />
            <Stack.Screen name="AddYesterdayTask" component={AddYesterdayTask} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

const PrioritiesStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptionStyle}>
            <Stack.Screen name="Priorities" component={Priorities} options={{ headerShown: false }} />
            <Stack.Screen name="CreatePriority" component={CreatePriority} options={{ headerShown: false }} />
            <Stack.Screen name="PriorityProgress" component={PriorityProgress} options={{ headerShown: false }} />

            <Stack.Screen name="CreateTask" component={CreateTask} options={{ headerShown: false }} />
            <Stack.Screen name="TaskDetail" component={TaskDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const TasksStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptionStyle}>
            <Stack.Screen name="Tasks" component={Tasks} options={{ headerShown: false }} />
            <Stack.Screen name="CreateTask" component={CreateTask} options={{ headerShown: false }} />
            <Stack.Screen name="TaskDetail" component={TaskDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const TopPrioritiesStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptionStyle}>
            {/* <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} /> */}
            <Stack.Screen name="TopPriorities" component={TopPriorities} options={{ headerShown: false }} />
            <Stack.Screen name="CalenderEdit" component={CalenderEdit} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const TeamStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptionStyle}>
            <Stack.Screen name="Team" component={Team} options={{ headerShown: false }} />
            <Stack.Screen name="CreateMember" component={CreateMember} options={{ headerShown: false }} />
            <Stack.Screen name="MemberDetail" component={MemberDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


export { DashBoardStackNavigator, HuddlesStackNavigator, PrioritiesStackNavigator, TasksStackNavigator, TopPrioritiesStackNavigator,TeamStackNavigator };