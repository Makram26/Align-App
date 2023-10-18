import React, { useEffect, useState, useContext } from "react";
import { View, SafeAreaView, Button, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, Dimensions, ScrollView } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import Home from 'react-native-vector-icons/FontAwesome'
import Add from 'react-native-vector-icons/Ionicons'
import Forward from 'react-native-vector-icons/Ionicons'
import CustomStatusBar from "../../component/CustomStatusBar";
import HeaderHome from "../../component/HeaderHome";
import Priority from "../../component/Priority";
import styles from "../../constant/Dashboard/DashboardStyle";
import { Persons } from "../../data/PriorityData";
import { COLORS } from "../../util/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllPriority, getAllTask, getAllBlockTask, getAllDailyMainHuddles } from "../../services";

import Spinner from 'react-native-loading-spinner-overlay';
import { useDrawerStatus } from '@react-navigation/drawer';
import AuthContext from "../../Routes/context";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StatusBox = ({ quantity, type, navigation }) => {
  return (
    <TouchableOpacity onPress={navigation}>
      <View style={styles.statusBox}>
        <View style={{ marginTop: 5, marginLeft: 15 }}>
          <Text style={styles.statusType}>{type}</Text>
        </View>
        <Text style={[styles.statusquantity, { color: type === "Tasks" ? COLORS.orange : type === "Stucks" ? COLORS.red : type === "Priorities" ? COLORS.darkGreen : COLORS.black }]}>{quantity}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function Dashboard({ navigation }) {

  const { userID,setUserID } = useContext(AuthContext)
  const isDrawerOpen = useDrawerStatus()
  let today = new Date()
  const [state, setState] = useState({
    ownerName: "",
    admin: "",
    properDate: today.getFullYear() + "-" + (('0' + (today.getMonth() + 1)).slice(-2)) + "-" + ('0' + today.getDate()).slice(-2),
    TaskComplete: [],
    TaskOpen: [],
    TaskOverdue: [],
    TaskToday: []
  })

  const [AllPriority, setAllPriority] = useState([])
  const [blockTaskCount, setBlockTaskCount] = useState(0)
  const [dailyMainHuddleCount, setDailyMainHUddleCount] = useState(0)
  const [adminRights, setAdminRights] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => { 
    getPriority()
    const unsubscribe = navigation.addListener('focus', () => {
      getPriority()
    });
    return () => {
      unsubscribe;
    };
  }, [])

  const getPriority = async () => {
    setLoading(true)
    try {
      const res = await getAllPriority()
      setAllPriority(res.result)
      getTask()
      getBlockedTask()
      getDailyMainHuddles()
      // getB
    } catch (error) {
      console.log("error", error)
      setLoading(false)
    }
  }

  const Logout = () => {
    AsyncStorage.removeItem('uid');
    AsyncStorage.removeItem('admin');
    setUserID("")
    // navigation.goBack()
}

  const getTask = async () => {
    let tempDoneTask = []
    let tempOverDue = []
    let tempOpenTask = []
    let tempTodayTask = []
    let tempallCompleteTask = []
    setLoading(true)
    try {
      const res = await getAllTask()
      console.log("response", res.result)
      for (let i = 0; i < res.result.length; i++) {
        // console.log("><><<<><><<",res.result.length)
        if (res.result[i].project_id === false) {
          if (res.result[i].kanban_state === "done") {
            console.log("done task")
            tempallCompleteTask.push(res.result[i])
          }
          else if (res.result[i].date_deadline < state.properDate) {
            console.log("overdue", res.result[i])
            tempOverDue.push(res.result[i])
          }
          // That code if you want to get repareate tasks for open task and today 
          // else if (res.result[i].date_deadline > state.properDate){
          //   tempOpenTask.push(res.result[i])
          // }
          else {
            // console.log("today task",res.result[i])
            tempOpenTask.push(res.result[i])
          }
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    console.log("done task", tempOverDue.length)
    setState({ ...state, TaskComplete: tempDoneTask, TaskOverdue: tempOverDue, TaskOpen: tempOpenTask })
    setLoading(false)
  }

  const getBlockedTask = async () => {
    const res = await getAllBlockTask()
    setBlockTaskCount(res.count)
  }

  const getDailyMainHuddles = async () => {
    const res = await getAllDailyMainHuddles()
    setDailyMainHUddleCount(res.count)
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
      <HeaderHome
        drawerOpen={() => navigation.openDrawer()}
        onPress={()=> Logout()}
      />
      {/* body */}
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" contentContainerStyle={styles.body}>
        <Text style={styles.title}>DashBoard</Text>

        {/* Status Boxes */}
        <View style={styles.statusBoxContainer}>
          <StatusBox
            quantity={AllPriority.length}
            type="Priorities"
            navigation={() => navigation.navigate("Priorities")}
          />
          <StatusBox
            quantity={dailyMainHuddleCount}
            type="Daily Huddles"
            navigation={() => navigation.navigate("MainHuddles")}
          />
          <StatusBox
            quantity={state.TaskOpen.length}
            type="Tasks"
            navigation={() => navigation.navigate("Tasks")}
          />
          <StatusBox
            quantity={blockTaskCount}
            type="Stucks"
            navigation={() => navigation.navigate("MainHuddles")}
          />
        </View>

        {/* Priority Overview */}
        <View style={styles.headingConatiner}>
          <Text style={styles.textHeading}>Priorities Overview</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CreatePriority')}>
            <Add name="ios-add-circle" size={windowWidth / 15} color={COLORS.orange} />
          </TouchableOpacity>
        </View>

        {/* Priority Overview Data */}
        <FlatList
          data={AllPriority.slice(0, 3)}
          keyExtractor={(stoke) => { stoke.id }}
          renderItem={({ item }) => {
            return (
              <Priority
                name={item.name}
                owner={item.create_uid.name}
                task={item.task_ids}
                progress={item.done_task_count != 0 ? Math.round((item.done_task_count / item.task_count) * 100) : 0}
                // status={item.status}
                rating={item.priority_kanban}
                navigation={() => navigation.navigate("PriorityProgress", item)}
              />
            )
          }}
        />

        {/* All priorities button */}
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Priorities")}>
          <Text style={styles.btnText}>All Priorities</Text>
          <Forward name="chevron-forward-sharp" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
};




