
// Use for User-Profile in Drawer
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, InputAccessoryView } from "react-native"
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import styles from "../constant/DrawerStyle";
import MenuIcon from 'react-native-vector-icons/Feather'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from '../util/Color'
import LogoutIcon from 'react-native-vector-icons/Fontisto'
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from '../Routes/context';
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';
import CustomStatusBar from "../component/CustomStatusBar";
const windowHeight = Dimensions.get('window').height;

const CustomDrawer = (props) => {
    const { setUserID } = useContext(AuthContext)
    const navigation = useNavigation()
    const { userID } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null);
    // console.log("ID : ", userID)

    useEffect(() => {
        fetchUserInfo()
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserInfo()
        });
        return () => {
            unsubscribe;
        };
    }, [])

    const fetchUserInfo = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://growapp.ifrs16.app/api/res.users?query={id, name, work_email}&filter=[["id", "=", ${userID}]]`);
            // const response = await fetch(`http://192.168.70.184:8069/api/res.users?query={id, name, work_email}&filter=[["id", "=", ${userID}]]`);
            const data = await response.json();
            setUserInfo(data.result);
            setLoading(false)
            console.log("User Data  : ", data.result[0])
        } catch (error) {
            console.error('Error fetching user information:', error);
            setLoading(false)
        }
    };

    const Logout = () => {
        AsyncStorage.removeItem('uid');
        AsyncStorage.removeItem('admin');
        setUserID("")
        // navigation.goBack()
    }

    // if (loading) {
    //     return (
    //         <View>
    //             <Text>Loading...</Text>
    //         </View>
    //     );
    // }

    // if (error) {
    //     return (
    //         <View>
    //             <Text>Error fetching user information</Text>
    //         </View>
    //     );
    // }

    if (!userInfo || userInfo.length === 0) {
        return (
            <View>
                <Text>No user information available</Text>
            </View>
        );
    }
    const { name, work_email } = userInfo[0];

    return (
        <View style={styles.container}>
            <CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content" />
            {
                loading ?
                    <Spinner visible={true} />
                    :
                    null
            }
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#ffffff', paddingTop: 0 }}>
                <View style={{ ...styles.header, height: windowHeight / 8 }}>
                    <View style={styles.infoContainer}>
                        <Image source={require("../assest/image/ProfileImage.png")} style={styles.image} />
                        <View style={{ width: "70%", marginBottom: 7, marginLeft: 7 }}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.designation}>{work_email}</Text>
                        </View>
                    </View>
                    {/* <MenuIcon name='menu' size={25} color={COLORS.white} /> */}
                </View>
                <DrawerItemList {...props} />

                <DrawerItem
                    style={{}} labelStyle={{ color: '#000000', fontSize: 16, fontWeight: "bold", }}

                    label="Log Out"
                    onPress={() => Logout()}
                    icon={() =>
                        <LogoutIcon name='toggle-off' size={20} color={'#000'} style={{ marginRight: -17 }} />
                    }

                />
                {/* activeTintColor='#2196f3' activeBackgroundColor='rgba(0, 0, 0, .04)' inactiveTintColor='rgba(0, 0, 0, .87)' inactiveBackgroundColor='transparent' */}
            </DrawerContentScrollView>
            <View style={{ flex: 0.07, backgroundColor: COLORS.orange, justifyContent: 'center', alignItems: "center" }}>
                <Text style={{ fontSize: RFValue(20), fontWeight: '400', color: '#ffffff' }}>Logo</Text>
            </View>

        </View>
    )
}

export default CustomDrawer;



// Custome Drawer Profile for Default User instead of Specific User

// import React,{useContext} from "react";
// import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native"
// import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
// import styles from "../constant/DrawerStyle";
// import MenuIcon from 'react-native-vector-icons/Feather'
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import { COLORS } from '../util/Color'
// import LogoutIcon from 'react-native-vector-icons/Fontisto'
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import AuthContext from '../Routes/context';
// import { useNavigation } from "@react-navigation/native";
// import CustomStatusBar from "../component/CustomStatusBar";
// const windowHeight = Dimensions.get('window').height;

// const CustomDrawer = (props) => {
//     const { setUserID } = useContext(AuthContext)
//     const navigation=useNavigation()

//    const Logout=()=>{
//     AsyncStorage.removeItem('uid');
//     AsyncStorage.removeItem('admin');
//     setUserID("")
//     // navigation.goBack()
//    }
//     return (
//         <View style={styles.container}>
//             <CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content" />

//             <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#ffffff', paddingTop: 0 }}>
//                 <View style={{ ...styles.header, height: windowHeight / 8 }}>
//                     <View style={styles.infoContainer}>
//                         <Image source={require("../assest/image/ProfileImage.png")} style={styles.image} />
//                         <View style={{ width: "70%", marginBottom: 7, marginLeft: 7 }}>
//                             <Text style={styles.name}>Al-Jalil Developer</Text>
//                             <Text style={styles.designation}>Developing Better Lifestyle</Text>
//                         </View>
//                     </View>
//                     {/* <MenuIcon name='menu' size={25} color={COLORS.white} /> */}
//                 </View>
//                 <DrawerItemList {...props} />
//                 <DrawerItem
//                  style={{}} labelStyle={{color: '#000000',fontSize:16,fontWeight:"bold",}}
//                  label="Log Out"
//                  onPress={() => Logout()}
//                  icon ={()=>
//                     <LogoutIcon name='toggle-off' size={20} color={'#000'} style={{marginRight:-17}} />
//                 }
//                 />
//                 {/* activeTintColor='#2196f3' activeBackgroundColor='rgba(0, 0, 0, .04)' inactiveTintColor='rgba(0, 0, 0, .87)' inactiveBackgroundColor='transparent' */}
//             </DrawerContentScrollView>
//             <View style={{ flex: 0.07, backgroundColor: COLORS.orange, justifyContent: 'center', alignItems: "center" }}>
//                 <Text style={{ fontSize: RFValue(20), fontWeight: '400', color: '#ffffff' }}>Logo</Text>
//             </View>

//         </View>
//     )
// export default CustomDrawer;