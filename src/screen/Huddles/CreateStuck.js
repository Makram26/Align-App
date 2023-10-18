import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import Check from 'react-native-vector-icons/AntDesign'
import Calender from 'react-native-vector-icons/Feather'
import { COLORS } from '../../util/Color'
import SubHeader from '../../component/SubHeader'
import styles from '../../constant/Huddles/CreateStuckStyle'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Picker } from '@react-native-picker/picker';
import { BlockTaskCreateForSingleUser, getAllTeam, getNewTeam, getTeamUserSelection, getBlockTaskTeam, TaskCreate, TaskCreateForSingleUser } from '../../services'
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomStatusBar from "../../component/CustomStatusBar";


export default function CreateStuck({ navigation }) {

    const [account, setAccount] = useState("")
    const [help, setHelp] = useState("")
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const [value, setValue] = useState("")
    const [state, setState] = useState({
        allTeam: [],
        // properDate: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
        // allIds: [],
        // taskName: "",
        // status: "normal",
        AssignedId: 0,
        // description: ""
    })

    useEffect(() => {
        getTeamMember()
    }, [])

    // const getTeamMember = async () => {
    //     setLoading(true)
    //     let tempRecord = []

    //     try {
    //         const res = await getAllTeam()
    //         // console.log("response >>>>",res.result[0].team_members_ids)
    //         for (let i = 0; i < res.result.length; i++) {
    //             tempRecord.push({
    //                 id: res.result[i].user_id.id,
    //                 name: res.result[i].user_id.name
    //             })
    //             // console.log("res.result[i].team_members_ids.id",res.result[i])
    //             for (let j = 0; j < res.result[i].team_members_ids.length; j++) {
    //                 tempRecord.push({
    //                     id: res.result[i].team_members_ids[j].id,
    //                     name: res.result[i].team_members_ids[j].name
    //                 })
    //             }
    //         }
    //         // tempRecord = res.result
    //         setLoading(false)
    //     } catch (error) {
    //         console.log("error", error)
    //         setLoading(false)
    //     }

    //     const newArrayList = [];
    //     tempRecord.forEach(obj => {
    //         if (!newArrayList.some(o => o.id === obj.id)) {
    //             newArrayList.push({ ...obj });
    //         }
    //     });
    //     // console.log("unique list",newArrayList)
    //     setState({ ...state, allTeam: newArrayList })
    // }


    const getTeamMember = async () => {
        setLoading(true)
        let tempRecord = []
        try {
            // const res = await getAllTeam()
            const res = await getTeamUserSelection()
            console.log("response >>>>", res.result[0].user_id)
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

    const OnchangePickerSeletedHandler = (value, index) => {
        setValue(value)
        if (index === 0) {
            setState({ ...state, AssignedId: 0 })
        }
        else {
            setState({ ...state, AssignedId: [value] })
        }
        console.log("sldkfjaskfjs", value, "<><>", index)
        // setSizeType(AreaData[index].name)
    }


    const CreateNewBlockTask = async (value) => {
        console.log(value)
        if (account === "") {
            alert("please enter task name")
            return true
        }
        const uid = await AsyncStorage.getItem("uid")
        console.log("uid", uid)
        try {
            setLoading(true)
            const res = await BlockTaskCreateForSingleUser(account, state.AssignedId == 0 ? [uid] : state.AssignedId, description,)
            console.log("response", res)
            if (res.result) {
                setLoading(false)
                navigation.goBack()
            }
            else {
                alert("Task not creating! Try again")
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
            setLoading(false)

        }
        //   console.log("response",res)
    }


    return (
        <View style={styles.container}>

            <CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content" />
            {
                loading ?
                    <Spinner visible={true} />
                    :
                    null
            }
            {/* Header */}
            <SubHeader
                goBack={() => navigation.goBack()}
                title={"Create Block Task"}
                save={() => CreateNewBlockTask()}
            />

            {/* Body */}
            <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="always">

                {/* Task Name */}
                <Text style={styles.textHeading}>Short Task Name</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Create the Account...'
                    placeholderTextColor={COLORS.placeholder}
                    keyboardType="default"
                    value={account}
                    onChangeText={(value) => setAccount(value)}
                />

                {/* Need Help */}
                <Text style={styles.textHeading}>I Need Help From</Text>
                {/* <TextInput
                    style={styles.inputText}
                    placeholder='Search User'
                    placeholderTextColor={COLORS.placeholder}
                    keyboardType="default"
                    value={help}
                    onChangeText={(value) => setHelp(value)}
                /> */}
                <View style={styles.pickerStyle}>
                    {/* <Picker
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
                    </Picker> */}

                    <Picker
                        selectedValue={value}
                        // style={{ height: 100, width: 200 }}
                        onValueChange={(itemValue, itemIndex) => OnchangePickerSeletedHandler(itemValue, itemIndex)}
                        itemStyle={{ color: "#000000" }} >
                        <Picker.Item label='please select any user' value='0' style={{ color: COLORS.black }} />
                        {
                            state.allTeam && state.allTeam.map((item, index) => {
                                return (
                                    <Picker.Item label={item.name} value={item.id} style={{ color: COLORS.black }} />
                                )
                            })
                        }
                    </Picker>
                </View>

                {/* Date */}
                {/* <Text style={styles.textHeading}>Date</Text>
                <View style={styles.dateContainer}>
                    <TextInput
                        style={{ width: '90%' }}
                        placeholder='5/12/2022'
                        placeholderTextColor={COLORS.placeholder}
                        keyboardType='numbers-and-punctuation'
                        value={date}
                        onChangeText={(value) => setDate(value)}
                    />
                    <Calender name="calendar" size={16} color={"#58565B"} />
                </View> */}

                {/* Description */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.textDescription}>Description</Text>
                    <TextInput
                        style={{ marginHorizontal: 10, }}
                        placeholder='Add your description here'
                        placeholderTextColor={COLORS.placeholder}
                        keyboardType="default"
                        multiline
                        numberOfLines={Platform.OS === 'ios' ? null : 5}
                        minHeight={(Platform.OS === 'ios' && 5) ? (20 * 5) : null}
                        textAlignVertical="top"
                        value={description}
                        onChangeText={(value) => setDescription(value)}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

