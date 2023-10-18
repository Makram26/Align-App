import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Keyboard, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'

import Check from 'react-native-vector-icons/AntDesign'
import Add from 'react-native-vector-icons/Ionicons'
import Edit from 'react-native-vector-icons/Feather'
import { COLORS } from '../../util/Color'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from "../../component/Header";
import styles from '../../constant/Priorities/CreatePriorityStyle'
import StarRating from 'react-native-star-rating'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Cross from "react-native-vector-icons/Entypo"
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';
import CustomStatusBar from "../../component/CustomStatusBar";
import { CreateDailySubHuddles, CreateWeeklySubHuddles, getAllTeam, getNewTeam, getTeamUserSelection } from '../../services'
import RNCheckBox from 'react-native-check-box'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function CreateHuddlesDetails({ navigation, route }) {

    const id = route.params.id
    const type = route.params.type
    // console.log("id", id)
    // console.log("type", type)

    const focusdescription = useRef(null);
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState("")
    let today = new Date()

    const [state, setState] = useState({

        // Weekly Sub Huddle
        information: "",
        businessHighLow: "",
        needHelp: "",
        properDate: today.getFullYear() + "-" + (('0' + (today.getMonth() + 1)).slice(-2)) + "-" + ('0' + today.getDate()).slice(-2),

        // Daily Sub Huddle
        description: "",
        todayTasks: "",
        yesterdayTasks: "",
        statusToday: false,
        statusYesterday: false,

        allTeam: [],
        AssignedId: 0,
    })
    console.log("Today Date : ", state.properDate)

    const [todayCompleted, setTodayCompleted] = useState(false)
    const [yesterdayCompleted, setYesterdayCompleted] = useState(false)

    //Today Task Status
    const TaskStatusTodayCompleted = () => {
        setTodayCompleted(!todayCompleted)
        if (todayCompleted === false) {
            setState({ ...state, statusToday: false })
        }
        else {
            setState({ ...state, statusToday: true })
        }
    }
    //Yesterday Task Status
    const TaskStatusYesterdayCompleted = () => {
        setYesterdayCompleted(!yesterdayCompleted)
        if (yesterdayCompleted === false) {
            setState({ ...state, statusYesterday: false })
        }
        else {
            setState({ ...state, statusYesterday: true })
        }
    }

    const addWeeklySubHuddle = async (value) => {
        const uid = await AsyncStorage.getItem('uid')
        if (state.information === "") {
            alert("please enter information")
            return true
        }
        if (state.businessHighLow === "") {
            alert("please enter detail")
            return true
        }
        if (state.needHelp === "") {
            alert("please enter details")
            return true
        }
        // console.log("User ID:", uid)
        setLoading(true)
        try {
            const res = await CreateWeeklySubHuddles(state.AssignedId == 0 ? uid : +state.AssignedId, state.information, state.businessHighLow, state.needHelp, state.properDate, id)
            console.log("response : ", res)
            if (res.result) {
                navigation.pop(2)
                // navigation.navigate("HuddlesDetails")
                setLoading(false)
            }
            else {
                alert(""+res.error.data.message)
                setLoading(false)
            }
        } catch (error) {
            console.log("error", error)
            setLoading(false)
        }
    }

    const addDailySubHuddle = async (value) => {
        const uid = await AsyncStorage.getItem('uid')
        if (state.description === "") {
            alert("What's up for Today description is Required")
            return true
        }
        if (state.todayTasks === "") {
            alert("Top Priority for Today description is Required")
            return true
        }
        // if (state.yesterdayTasks === "") {
        //     alert("please enter details")
        //     return true
        // }
        setLoading(true)
        try {
            const res = await CreateDailySubHuddles(state.AssignedId == 0 ? uid : +state.AssignedId, state.properDate, state.description, state.todayTasks, state.todayCompleted, id)
            console.log("response : ", res)
            if (res.result) {
                navigation.pop(2)
                setLoading(false)
            }
            else {
                // alert("Not created! A user cannot have multiple huddles on the same date")
                alert(""+res.error.data.message)
                setLoading(false)
            }
        } catch (error) {
            console.log("error", error)
            setLoading(false)
        }
    }

    const OnchangePickerSeletedHandler = (value, index) => {
        setValue(value)
        if (index === 0) {
            setState({ ...state, AssignedId: 0 })
        }
        else {
            setState({ ...state, AssignedId: [value] })
        }
        console.log("sldkfjaskfjs", value, "<><>", index)
    }

    useEffect(() => {
        getTeamMember()
    }, [])

    const getTeamMember = async () => {
        setLoading(true)
        let tempRecord = []
        try {
            // const res = await getAllTeam()
            const res = await getTeamUserSelection()
            console.log("response >>>>",res.result[0].user_id)
            for (let i = 0; i < res.result.length; i++) {
                tempRecord.push({
                    id: res.result[i].user_id.id,
                    name: res.result[i].user_id.name,
                    // user_id: res.result[i].user_id.user_id
                })
                // for (let j = 0; j < res.result[i].child_ids.length; j++) {
                //     tempRecord.push({
                //         id: res.result[i].child_ids[j].id,
                //         name: res.result[i].child_ids[j].name,
                //         user_id: res.result[i].child_ids[j].user_id,
                //     })
                // }
            }
            // tempRecord = res.result
            setLoading(false)
        } catch (error) {
            console.log("error", error)
            setLoading(false)
        }

        const newArrayList = [];
        tempRecord.forEach(obj => {
            if (!newArrayList.some(o => o.id === obj.id)) {
                newArrayList.push({ ...obj });
            }
        });
        setState({ ...state, allTeam: newArrayList })
    }

    return (
        <View style={styles.container}>

            {
                loading ?
                    <Spinner visible={true} />
                    :
                    null
            }
            <CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content" />

            {/* header */}
            <Header
                goBack={() => navigation.pop(2)}
                title={"Create Huddles Details"}
            />

            {/* body */}
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body} keyboardShouldPersistTaps='always'>

                {/* Information */}
                <Text style={styles.textHeading}>{type === "Daily" ? "What's up for Today" : "Information the Leadership Team Needs to Know "}</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Enter detail...'
                    placeholderTextColor={COLORS.placeholder}
                    multiline
                    keyboardType="default"
                    value={type == "Daily" ? state.description : state.information}
                    onChangeText={type == "Daily" ? (value) => setState({ ...state, description: value }) : (value) => setState({ ...state, information: value })}
                />

                {/* Business High and Low */}
                <Text style={styles.textHeading}>{type === "Daily" ? "Top Priority for Today" : "Personal High & Low and Business High & Low "}</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Enter detail...'
                    placeholderTextColor={COLORS.placeholder}
                    multiline
                    keyboardType="default"
                    value={type == "Daily" ? state.todayTasks : state.businessHighLow}
                    onChangeText={type == "Daily" ? (value) => setState({ ...state, todayTasks: value }) : (value) => setState({ ...state, businessHighLow: value })}
                />
                
                {/* Today Check Complete */}
                {
                    type === "Daily" ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: -30 }}>
                            <RNCheckBox
                                style={{}}
                                onClick={() => TaskStatusTodayCompleted()}
                                isChecked={todayCompleted}
                                checkedCheckBoxColor={COLORS.orange}
                                uncheckedCheckBoxColor="#807d7d"
                            />
                            <Text style={[styles.textHeading, { marginTop: 0, marginBottom: 0, marginLeft: 5 }]}>{todayCompleted ? "Completed" : "Complete"}</Text>
                        </View>
                        :
                        null
                }

                {/* Need Name */}
                <Text style={styles.textHeading}>{type === "Daily" ? null : "Need Help"}</Text>
                {
                    type === "Daily" ?
                        null
                        :
                        <TextInput
                            style={styles.inputText}
                            placeholder='Enter detail...'
                            placeholderTextColor={COLORS.placeholder}
                            multiline
                            keyboardType="default"
                            value={type == "Daily" ? state.yesterdayTasks : state.needHelp}
                            onChangeText={type == "Daily" ? (value) => setState({ ...state, yesterdayTasks: value }) : (value) => setState({ ...state, needHelp: value })}
                        />
                }


                {/* Yesterday Check Complete */}
                {/* {
                    type === "Daily" ?
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: -10 }}>
                            <RNCheckBox
                                style={{}}
                                onClick={() => TaskStatusYesterdayCompleted()}
                                isChecked={yesterdayCompleted}
                                checkedCheckBoxColor={COLORS.orange}
                                uncheckedCheckBoxColor="#807d7d"
                            />
                            <Text style={[styles.textHeading, { marginTop: 0, marginBottom: 0, marginLeft: 5 }]}>{yesterdayCompleted ? "Completed" : "Complete"}</Text>
                        </View>
                        :
                        null
                } */}

                {
                    state.allTeam.length === 1 ?
                        null
                        :
                        <>
                            <Text style={styles.textHeading}>Assigned To</Text>
                            <View style={styles.pickerStyle}>
                                <Picker
                                    selectedValue={value}
                                    // style={{ height: 100, width: 200 }}
                                    onValueChange={(itemValue, itemIndex) => OnchangePickerSeletedHandler(itemValue, itemIndex)}
                                    itemStyle={{ color: "#000000" }} >
                                    <Picker.Item label='please select any user' value='0' />
                                    {
                                        state.allTeam && state.allTeam.map((item, index) => {
                                            return (
                                                <Picker.Item label={item.name} value={item.id} />
                                            )
                                        })
                                    }
                                </Picker>
                            </View>
                        </>
                }

            </KeyboardAwareScrollView>

            {/* Bottom Buttons */}
            <TouchableOpacity onPress={() => { type === "Daily" ? addDailySubHuddle() : addWeeklySubHuddle() }} style={{ backgroundColor: COLORS.green, width: "70%", marginBottom: 30, justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 100, alignSelf: "center" }}>
                <Text>Create Huddles</Text>
            </TouchableOpacity>
        </View>
    )
}

