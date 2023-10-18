import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'

import CustomStatusBar from "../../component/CustomStatusBar";
import { COLORS } from "../../util/Color";
import Header from "../../component/Header";
import Add from 'react-native-vector-icons/Ionicons'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Spinner from 'react-native-loading-spinner-overlay';
import { getAllDailyMainHuddles, getAllWeeklyMainHuddles } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainHuddles = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [allDailyHuddles, setAllDailyHuddles] = useState([])
    const [allWeeklyHuddles, setAllWeeklyHuddles] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryWeekly, setSearchQueryWeekly] = useState('');

    // Daily and Weekly Buttons
    const [dailyHuddles, setDailyHuddles] = useState(true)
    const [weeklkyHuddles, setWeeklyHuddles] = useState(false)

    const onStateChangeHandler = (id) => {
        if (id == 1) {
            setDailyHuddles(true)
            setWeeklyHuddles(false)
        }
        else {
            setDailyHuddles(false)
            setWeeklyHuddles(true)
        }
    }

    const [state, setState] = useState({
        ownerName: "",
        admin: ""
    })
    const [adminRights, setAdminRights] = useState(Boolean(false))

    useEffect(() => {
        getMainHudlles()
        getWeeklyMainHudlles()
        const unsubscribe = navigation.addListener('focus', () => {
            getMainHudlles()
            getWeeklyMainHudlles()
        });
        return () => {
            unsubscribe;
        };
    }, [])


    // Get Daily Main Huddles
    const getMainHudlles = async () => {
        setLoading(true)
        let tempHuddles = []
        const Admin = await AsyncStorage.getItem('admin')
        setState({ ...state, ownerName: await AsyncStorage.getItem('username') })
        setAdminRights(Admin)
        try {
            const res = await getAllDailyMainHuddles()
            console.log("res", res)
            tempHuddles = res.result
            setLoading(false)
        } catch (error) {
            console.log("error", error)
            setLoading(false)
        }
        setAllDailyHuddles(tempHuddles)
    }

    // Search Bar
    const handleSearch = (query) => {
        setSearchQuery(query);
    }

    const filteredData = allDailyHuddles.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.huddle_attendees.some(attendee =>
            attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )

    // Get Weekly Main Huddles
    const getWeeklyMainHudlles = async () => {
        setLoading(true)
        let tempHuddles = []
        try {
            const res = await getAllWeeklyMainHuddles()
            console.log("res", res)
            tempHuddles = res.result
            setLoading(false)

        } catch (error) {
            console.log("error", error)
            setLoading(false)
        }
        setAllWeeklyHuddles(tempHuddles)
    }

    // Search Bar
    const handleSearchWeely = (query) => {
        setSearchQueryWeekly(query);
    }

    const filteredWeeklyData = allWeeklyHuddles.filter(d =>
        d.name.toLowerCase().includes(searchQueryWeekly.toLowerCase()) ||
        d.huddle_attendees.some(attendee =>
            attendee.name.toLowerCase().includes(searchQueryWeekly.toLowerCase()) ||
            attendee.email.toLowerCase().includes(searchQueryWeekly.toLowerCase())
        )
    )


    // console.log("Admin Rights:", adminRights)
    // console.log("all HUddles", allHuddles)
    return (
        <View style={styles.container}>
            {/* Header */}
            <CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content" />

            {
                loading ?
                    <Spinner visible={true} />
                    :
                    null
            }

            <Header
                goBack={() => navigation.goBack()}
                title={"Huddles"}
            />

            {/* Daily and Weekly Buttons */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.type, { backgroundColor: dailyHuddles ? '#F6931C' : '#D9D9D9' }]}
                    onPress={() => onStateChangeHandler(1)}>
                    <Text style={[styles.typeText, { color: dailyHuddles ? '#ffffff' : '#444444' }]}>Daily Huddles</Text>
                    {/* <View style={[styles.smallbox, { backgroundColor: dailyHuddles ? '#E07A00' : '#444444' }]}>
                  <Text style={[styles.typeText, { color: '#ffffff' }]}>3</Text>
                </View> */}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.type, { backgroundColor: weeklkyHuddles ? '#F6931C' : '#D9D9D9' }]}
                    onPress={() => onStateChangeHandler(2)}>
                    <Text style={[styles.typeText, { color: weeklkyHuddles ? '#ffffff' : '#444444' }]}>Weekly Huddles</Text>
                    {/* <View style={[styles.smallbox, { backgroundColor: weeklkyHuddles ? '#E07A00' : '#444444' }]}>
                  <Text style={[styles.typeText, { color: '#ffffff' }]}>3</Text>
                </View> */}
                </TouchableOpacity>
            </View>


            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>

                {/* Create Huddle Button */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("CreateHuddles", { state: dailyHuddles ? "Daily" : "Weekly" })}
                    style={styles.btnCreatePriority}>
                    <Add name="ios-add-circle" size={12} color={COLORS.white} />
                    <Text style={styles.textCreatePriority}>Create Huddles</Text>
                </TouchableOpacity>

                {/* Search Bar */}
                <TextInput
                    style={styles.inputText}
                    placeholder='Search here...'
                    placeholderTextColor={COLORS.white}
                    keyboardType="default"
                    value={dailyHuddles ? searchQuery : searchQueryWeekly}
                    onChangeText={dailyHuddles ? handleSearch : handleSearchWeely}
                // value={searchQuery}
                // onChangeText={handleSearch}
                />

                {/* Priority Data */}
                <FlatList
                    data={weeklkyHuddles ? filteredWeeklyData : filteredData}
                    keyExtractor={(stoke) => { stoke.id }}
                    renderItem={({ item }) => {
                        // console.log("item",item)
                        return (
                            <>
                                <TouchableOpacity onPress={() => navigation.navigate("HuddlesDetails", { item, adminRights, state: dailyHuddles ? "Daily" : "Weekly" })}>
                                    <View style={styles.card}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ fontSize: 16, color: "#000000", marginRight: 5 }}>Huddles Name:</Text>
                                            <Text style={{ fontSize: 12, color: "#000000" }}>{item.name}</Text>
                                        </View>

                                        <FlatList
                                            data={item.huddle_attendees}
                                            keyExtractor={(stoke) => { stoke.id }}
                                            renderItem={({ item }) => {
                                                // console.log("item",item)
                                                return (
                                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                                        <Text style={{ fontSize: 12, color: "#000000", }}>{item.name}</Text>
                                                        <Text style={{ fontSize: 12, color: "#000000", }}>{item.email}</Text>
                                                    </View>
                                                )
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}

export default MainHuddles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    body: {
        flexGrow: 1,
        width: "98%",
        alignSelf: 'center'
    },
    btnCreatePriority: {
        backgroundColor: COLORS.green,
        width: "95%",
        borderRadius: 2,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        marginTop: 20,
        marginBottom: 10
    },
    textCreatePriority: {
        fontSize: RFValue(12),
        fontWeight: "500",
        lineHeight: 18,
        color: COLORS.white,
        textTransform: 'uppercase',
        marginLeft: 5
    },
    card: {
        flex: 1,
        width: "96%",
        alignSelf: 'center',
        borderRadius: 5,
        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 9,
        backgroundColor: COLORS.white,
        padding: 15,
        marginVertical: 10,
    },
    inputText: {
        backgroundColor: COLORS.silver,
        width: '96%',
        alignSelf: 'center',
        paddingHorizontal: 10,
        elevation: 20,
        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        paddingVertical: Platform.OS === "ios" ? 18 : 13,
        borderRadius: 10
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    type: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        padding: 5,
        flexDirection: 'row'
    },
    typeText: {
        fontSize: RFValue(14),
        fontWeight: '500',
        lineHeight: 18,
        textTransform: 'uppercase'
    },
})