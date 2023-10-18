import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, Platform } from 'react-native'
import React, { useState, useContext } from 'react'
// Import vector icons
import EyesIcons from 'react-native-vector-icons/Ionicons';
import GoogleIcons from 'react-native-vector-icons/Ionicons';
import EmailIcons from 'react-native-vector-icons/MaterialIcons';

import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS } from '../util/Color';
import { login, storeCredential } from '../services';
import DrawerNavigator from "../navigation/DrawerNavigator";
import CustomStatusBar from "../component/CustomStatusBar";
import AuthContext from '../Routes/context';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Login = ({ navigation }) => {

    const { setUserID } = useContext(AuthContext)
    const [securePassword, setSecurePassword] = useState(true)
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [loading, setLoading] = useState(false)

    // create state variables
    const [state, setState] = useState({
        username: "",
        password: "",
        usernameError: "",
        passwordError: "",
    })

    const Login = async () => {
        if (state.username === "") {
            setState({ ...state, usernameError: "please enter your username" })
            return true
        }
        else if (state.password === "") {
            setState({ ...state, passwordError: "please enter your password!" })
            return true
        }
        else {
            setLoading(true)
            try {
                const res = await login(state.username.trim(), state.password.trim())

                if (res.result) {
                    storeCredential(state.username.trim(), state.password.trim(), res.result.uid, res.result.project_manager)
                    setUserID(res.result.uid)
                    setLoading(false)
                }
                else {
                    alert("username or password invalid!")
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                console.log(">>>>>>>", error)
            }
        }
    }

    
    return (
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1, }}>
            {
                loading ?
                    <Spinner visible={true} />
                    :
                    null
            }
            <CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content" />

            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {/* <Image
                    source={require("../assest/logo/screenLogo.png")}
                    style={styles.imageContainer}
                /> */}
                <View style={{ width: windowWidth - 40 }}>
                    <Text style={styles.heading}>Sign in</Text>
                    <Text style={styles.headingText}>Stay updated on your professional world</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your Username'
                            placeholderTextColor="#00000057"
                            onChangeText={(val) => { setState({ ...state, usernameError: "", username: val }) }}
                            style={styles.inputText}
                        />
                        <EmailIcons name="person" size={20} color={COLORS.orange} />
                    </View>
                    {
                        state.usernameError ?
                            <Text style={styles.errorSyles}>{state.usernameError}</Text>
                            : null
                    }
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your Password'
                            placeholderTextColor="#00000057"
                            secureTextEntry={securePassword ? true : false}
                            onChangeText={(val) => { setState({ ...state, passwordError: "", password: val }) }}
                            style={styles.inputText}

                        />
                        <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
                            {
                                securePassword ?
                                    <EyesIcons name="eye" size={20} color={COLORS.orange} />
                                    :
                                    <EyesIcons name="eye-off" size={20} color={COLORS.orange} />
                            }
                        </TouchableOpacity>
                    </View>
                    {
                        state.passwordError ?
                            <Text style={styles.errorSyles}>{state.passwordError}</Text>
                            : null
                    }
                    {/* <Text style={styles.textStyle}>
                        Forget Password?
                    </Text> */}
                    <TouchableOpacity style={styles.btnContainer} onPress={() => Login()}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View style={styles.drawLine} />
                        <View>
                            <Text style={{ width: 50, textAlign: 'center', fontSize: 15, fontWeight: "bold" }}>or</Text>
                        </View>
                        <View style={styles.drawLine} />
                    </View>
                    <TouchableOpacity style={{ ...styles.btnContainer, backgroundColor: "#e82309", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <GoogleIcons name="logo-google" size={20} color="#FFFFFF" />
                        <Text style={styles.btnText}>  Sign In With Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp") } style={styles.bottomContainer}>
                        <Text style={{ ...styles.textStyle, fontSize: 15, textAlign: "left", marginTop: 0 }}>Don't have an account ?
                            <Text style={{ color: "#282eed" }}> Register</Text>
                        </Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        borderColor: "#00000057",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // width: "90%",
        // padding: 5,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        // paddingLeft: 8
    },
    inputText: {
        width: "90%",
        fontSize: 13,
        color: "#000000",
        padding: Platform.OS === "ios" ? 12 : 7,
    },
    btnContainer: {
        marginTop: 15,
        backgroundColor: COLORS.orange,
        // width: "90%",
        alignItems: "center",
        borderRadius: 100
    },
    btnText: {
        padding: 10,
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold"
    },
    imageContainer: {
        height: windowWidth / 1.3,
        width: windowWidth / 1.3,
        //   backgroundColor:"red",
        marginTop: -40
        //   tintColor:"red"
    },
    textStyle: {
        // width: "90%",
        fontSize: 14,
        fontWeight: "600",
        color: "#000000",
        textAlign: "right",
        marginTop: 10
    },
    bottomContainer: {
        marginTop: 20,
        marginBottom: 15
    },
    heading: {
        fontSize: 20,
        fontWeight: "900",
        color: "#000000",
        marginTop: -10,
        marginBottom: 5
    },
    headingText: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "500",
        marginBottom: 5
    },
    drawLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'black'
    },
    errorSyles: {
        color: "red",
        fontSize: 12
    }
})
export default Login

