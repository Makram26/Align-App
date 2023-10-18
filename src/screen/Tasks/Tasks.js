import React, { useState, useEffect, useContext } from "react";
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";

import Add from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../util/Color";
import Header from "../../component/Header";
import { TodayTaskData, CompletedTaskData, OverdueTaskData } from "../../data/TasksData";
import TodayTasks from "../../component/TodayTasks";
import styles from "../../constant/Tasks/TaskStyle";

import CustomStatusBar from "../../component/CustomStatusBar";
import { getAllTask } from "../../services";

import Spinner from 'react-native-loading-spinner-overlay';




export default function Tasks({ navigation }) {

  let today = new Date()
  // States
  const [openTasks, setOpenTasks] = useState(true)
  const [completedTask, setCompletedTasks] = useState(false)
  const [overdueTask, setOverdueTasks] = useState(false)
  const [loading, setLoading] = useState(false)

  const [state, setState] = useState({
    properDate: today.getFullYear() + "-" + (('0' + (today.getMonth() + 1)).slice(-2)) + "-" + ('0' + today.getDate()).slice(-2),
    TaskComplete: [],
    TaskOpen: [],
    TaskOverdue: []
  })

  const [openTasksSearchQuery, setOpenTaskSearchQuery] = useState('');
  const [completedTasksSearchQuery, setCompletedTaskSearchQuery] = useState('');
  const [overdueTasksSearchQuery, setOverdueTaskSearchQuery] = useState('');

  // Open Task Search Bar
  const handleSearch = (query) => {
    setOpenTaskSearchQuery(query);
  }
  const openTaskFilteredData = state.TaskOpen.filter(d =>
    d.name.toLowerCase().includes(openTasksSearchQuery.toLowerCase()) ||
    d.user_ids.some(attendee =>
        attendee.name.toLowerCase().includes(openTasksSearchQuery.toLowerCase()) 
        // ||
        // attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )
  console.log("Open Task Check : ", openTaskFilteredData)

  // completed Task Search Bar
  const handleSearchCompleted = (query) => {
    setCompletedTaskSearchQuery(query);
  }
  const completeTaskFilteredData = state.TaskComplete.filter(d =>
    d.name.toLowerCase().includes(completedTasksSearchQuery.toLowerCase()) ||
    d.user_ids.some(attendee =>
        attendee.name.toLowerCase().includes(completedTasksSearchQuery.toLowerCase()) 
        // ||
        // attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )
  console.log("Open Task Check : ", completeTaskFilteredData)

  // overdue Task Search Bar
  const handleSearchOverdue = (query) => {
    setOverdueTaskSearchQuery(query);
  }
  const overdueTaskFilteredData = state.TaskOverdue.filter(d =>
    d.name.toLowerCase().includes(overdueTasksSearchQuery.toLowerCase()) ||
    d.user_ids.some(attendee =>
        attendee.name.toLowerCase().includes(overdueTasksSearchQuery.toLowerCase()) 
        // ||
        // attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )
  console.log("Open Task Check : ", overdueTaskFilteredData)


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
        console.log("><><<<><><<", res.result.length)
        if (res.result[i].project_id === false) {
          if (res.result[i].kanban_state === "done") {
            tempDoneTask.push(res.result[i])
          }
          else if (res.result[i].date_deadline < state.properDate) {
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

    console.log("done task 123", tempDoneTask)
    console.log("done task", tempOverDue.length)
    // console.log("done task",tempOpenTask[0].user_ids)
    setState({ ...state, TaskComplete: tempDoneTask, TaskOverdue: tempOverDue, TaskOpen: tempOpenTask })
    setLoading(false)
  }

  console.log("<><><>", state.properDate)
  const onStateChangeHandler = (id) => {
    switch (id) {
      case 1:
        setOpenTasks(true);
        setCompletedTasks(false);
        setOverdueTasks(false);
        break;
      case 2:
        setOpenTasks(false);
        setCompletedTasks(true);
        setOverdueTasks(false);
        break;
      default:
        setOpenTasks(false);
        setCompletedTasks(false);
        setOverdueTasks(true);
    }
  }
  console.log("sadfjklasdhfsaasdfsadf", loading)

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
      <Header
        goBack={() => navigation.goBack()}
        title={"Tasks"}
      />

      {/* body */}
      <ScrollView contentContainerStyle={styles.body}>

        {/* Heading */}
        <Text style={styles.textHeading}>{overdueTask ? "Over Due Tasks" : "Open Tasks"}</Text>

        {/* Menu */}
        <View style={styles.menuContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.type, { backgroundColor: openTasks ? COLORS.orange : '#D9D9D9', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]}
              onPress={() => onStateChangeHandler(1)}>
              <Text style={[styles.typeText, { color: openTasks ? COLORS.white : COLORS.lightestBlack }]}>Open Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.type, { backgroundColor: completedTask ? COLORS.orange : '#D9D9D9', }]}
              onPress={() => onStateChangeHandler(2)}>
              <Text style={[styles.typeText, { color: completedTask ? COLORS.white : COLORS.lightestBlack }]}>Completed Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.type, { backgroundColor: overdueTask ? COLORS.orange : '#D9D9D9', borderTopRightRadius: 8, borderBottomRightRadius: 8 }]}
              onPress={() => onStateChangeHandler(3)}>
              <Text style={[styles.typeText, { color: overdueTask ? COLORS.white : COLORS.lightestBlack }]}>Overdue Tasks</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity style={[styles.type, { width: "22%", backgroundColor: '#F6931C', justifyContent: 'space-between', borderRadius: 8 }]}>
            <Text style={[styles.typeText, { color: "#ffffff", textTransform: 'none' }]}>Sort by</Text>
            <Image source={require("../../assest/icon/filter.png")} />
          </TouchableOpacity> */}
        </View>

        {/* Create Tasks Button */}
        {
          openTasks ?
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("CreateTask", { "project_id": false })}
                style={[styles.createBtn, { marginBottom: 0 }]}>
                <Add name="ios-add-circle" size={15} color="#ffffff" />
                <Text style={[styles.typeText, { color: '#ffffff', marginLeft: 5 }]}>Create Tasks</Text>
              </TouchableOpacity>
            </>
            :
            null
        }

        <TextInput
          style={styles.inputText}
          placeholder='Search here...'
          placeholderTextColor={COLORS.white}
          keyboardType="default"
          value={openTasks ? openTasksSearchQuery : completedTask ? completedTasksSearchQuery :  overdueTasksSearchQuery }
          onChangeText={ openTasks ? handleSearch : completedTask ? handleSearchCompleted : handleSearchOverdue}
        />

        <Text style={styles.tasks}>{openTasks ? `Open Tasks ${state.TaskOpen.length}` : completedTask ? `Tasks ${state.TaskComplete.length}` : `Tasks ${state.TaskOverdue.length}`}</Text>

        <FlatList
          data={openTasks ? openTaskFilteredData : completedTask ? completeTaskFilteredData : overdueTaskFilteredData}
          keyExtractor={(stoke) => stoke.key}
          renderItem={({ item }) => {
            return (
              <TodayTasks
                dueDate={item.date_deadline}
                name={item.name}
                image={require('../../assest/image/ProfileImage.png')}
                assigned={item.user_ids.length > 1 ? "Multiple Users" : item.user_ids[0].name}
                task={openTasks ? "Today" : "others"}
                status={item.kanban_state}
                // priority={item.priority_kanban === "0"? "Low":item.priority_kanban ==="1" ? "Medium":"High"}
                priority={item.date_deadline === state.properDate ? true : false}
                navigation={() => navigation.navigate('TaskDetail', item)}
              />
            )
          }}
        />

      </ScrollView>
    </View>
  );
};


