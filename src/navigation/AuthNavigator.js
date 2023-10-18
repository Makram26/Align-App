import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import Login from '../screen/Login';

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#F7941D",
    },
    headerTintColor: "#FFFFFF",
    headerBackTitle: "#F7941D",
};

const AuthNavigator = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={[screenOptionStyle, { cardStyleInterpolator: CardStyleInterpolators.for }]}>
                <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default AuthNavigator

const styles = StyleSheet.create({})