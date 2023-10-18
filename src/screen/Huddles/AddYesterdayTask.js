import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Platform } from 'react-native'
import Check from 'react-native-vector-icons/AntDesign'
import Calender from 'react-native-vector-icons/Feather'
import { COLORS } from '../../util/Color'
import SubHeader from '../../component/SubHeader'
import styles from '../../constant/Huddles/EditTopPriorityStyle'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import CheckBox from "@react-native-community/checkbox";
import CheckBox from 'react-native-check-box'
import Spinner from 'react-native-loading-spinner-overlay';
import HuddleTodayTask from "../../component/HuddleTodayTask";




import CustomStatusBar from "../../component/CustomStatusBar";
import { getAllTask, UpdateHuddlesTask, UpdateYesterdayTask } from "../../services";
import Add from 'react-native-vector-icons/Ionicons'

import AsyncStorage from '@react-native-async-storage/async-storage';




export default function AddYesterdayTask({ navigation, route }) {

    console.log("reoute", route.params)
    let today = new Date()

    const [account, setAccount] = useState("")
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const [completed, setCompleted] = useState(false)
    const [allTask, setAllTask] = useState("")
    const [loading, setLoading] = useState(false)

    const [state, setState] = useState({

        properDate: today.getFullYear() + "-" + (('0' + (today.getMonth() + 1)).slice(-2)) + "-" + ('0' + today.getDate()).slice(-2),
        // TaskComplete:[],
        // TaskOpen:[],
        // TaskOverdue:[]


    })


    useEffect(() => {
        getTask()
        const unsubscribe = navigation.addListener('focus', () => {
            getTask()
        });
        return () => {
            unsubscribe;
        };

    }, [])

    const getTask = async () => {
        let tempDoneTask = []
        let tempOverDue = []
        let tempOpenTask = []
        setLoading(true)
        try {
            const res = await getAllTask()
            console.log("response", res.result)

            for (let i = 0; i < res.result.length; i++) {
                // console.log("><><<<><><<",res.result.length)
                if (res.result[i].project_id === false) {

                    if (res.result[i].date_deadline < state.properDate) {
                        // console.log("overdue",res.result[i].date_deadline)
                        tempOverDue.push(res.result[i])
                    }
                    else if (res.result[i].date_deadline > state.properDate) {
                        // console.log("overdue",res.result[i].date_deadline)
                        tempOverDue.push(res.result[i])
                    }
                    else {
                        tempOpenTask.push(res.result[i])
                    }
                }

            }
        } catch (error) {
            console.log(error)
            setLoading(false)

        }

        // console.log("done task",tempDoneTask.length)
        // console.log("done task",tempOverDue.length)
        console.log("done task", tempOverDue.length)
        // setTimeout(() => {
        //   setState({...state,loading:false})
        // },1000);

        // setState({...state,TaskComplete:tempDoneTask,TaskOverdue:tempOverDue,TaskOpen:tempOpenTask})

        setAllTask(tempOverDue)
        setLoading(false)


    }

    const UpdateHuddlesTask1 = async (value) => {
        const uid = await AsyncStorage.getItem("uid");

        const res = await UpdateYesterdayTask(route.params, value,state.properDate,uid)
        if (res.result) {
            navigation.goBack()
        }
        else {
            alert("Task not added! something wrong")
        }
        console.log("response", res)
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
                title={"Task Name"}
                save={() => navigation.goBack()}
            />

            {/* <TouchableOpacity
                onPress={() => navigation.navigate("CreateTask", { "project_id": false })}
                style={{
                    backgroundColor: COLORS.green,
                    width: '60%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 5,
                    borderRadius: 8,
                    marginTop: 15,
                }}>
                <Add name="ios-add-circle" size={15} color="#ffffff" />
                <Text style={{
                    fontSize: RFValue(10),
                    fontWeight: '500',
                    lineHeight: 15,
                    textTransform: 'uppercase', color: '#ffffff', marginLeft: 5
                }}>Create Tasks</Text>
            </TouchableOpacity> */}

            {/* body */}
            <FlatList
                data={allTask}
                keyExtractor={(stoke) => stoke.key}
                renderItem={({ item }) => {
                    return (
                        <HuddleTodayTask
                            dueDate={item.date_deadline}
                            name={item.name}
                            image={require('../../assest/image/ProfileImage.png')}
                            assigned={item.user_ids.length > 1 ? "All Users" : item.user_ids[0].name}
                            task="Today"
                            status={item.kanban_state}
                            priority={item.priority_kanban === "0" ? "Low" : item.priority_kanban === "1" ? "Medium" : "High"}
                            onpress={() => UpdateHuddlesTask1(item.id)}
                        />
                    )
                }}
            />
        </View>
    )
}

