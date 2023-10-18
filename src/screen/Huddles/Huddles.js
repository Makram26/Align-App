import React, { useState, useRef, useEffect } from "react";
import { View, Button, Text, StyleSheet, Keyboard, Platform, TouchableOpacity, ScrollView, Image, FlatList, Dimensions, TextInput } from "react-native";

import Dot from 'react-native-vector-icons/Entypo'
import Edit from 'react-native-vector-icons/Feather'
import Check from 'react-native-vector-icons/AntDesign'
import Add from 'react-native-vector-icons/Ionicons'
import Forward from 'react-native-vector-icons/Ionicons'
import Calender from 'react-native-vector-icons/Feather'
import { COLORS } from "../../util/Color";
import Header from "../../component/Header";
import CalendarStrip from 'react-native-calendar-strip';
import Accounts from "../../component/Accounts";
import TodayTasks from "../../component/TodayTasks";
import { ActivityData, CompleteTaskData } from "../../data/PriorityData";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styles from "../../constant/Huddles/HuddleStyle";
import Spinner from 'react-native-loading-spinner-overlay';
// import RNCheckBox from 'react-native-check-box'
import CheckBox from 'react-native-check-box'

import CustomStatusBar from "../../component/CustomStatusBar";
import { getAllBlockTask, getAllHuddles, getAllTask, getAllPriority, updateYesterdayStatus } from "../../services";
import moment from 'moment';

import Priority from "../../component/Priority";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DescriptionView = ({ question, viewfor }) => {
  return (
    <View style={styles.textAgendaContainer}>
      {
        viewfor == "description" ?
          <Dot name="dot-single" size={20} color="#000000" style={{ marginTop: -2 }} />
          :
          <Check name="checksquare" size={20} color="#444444" style={{ marginRight: 5 }} />
      }
      <Text style={styles.textContainerText}>{question}</Text>
    </View>
  )
}

function BlockTask({ name, user, date }) {
  // console.log("user>>>>>>>>>>>", user);
  return (
    <>
      <View style={styles.textAgendaContainer}>
        <Image source={require("../../assest/icon/Ticket.png")} style={{ marginRight: 10 }} />
        <View style={{ width: "70%" }}>
          <Text style={[styles.textContainerText, { marginBottom: 2, fontWeight: '500' }]}>Task Name : {name}</Text>
          <Text style={[styles.textContainerText, { marginBottom: 2 }]}>Need help from: {user}</Text>
          <Text style={[styles.textContainerText, { marginBottom: 2 }]}>Stuck since: {date}</Text>
        </View>
      </View>
      <View style={{ borderColor: COLORS.orange, borderWidth: 0.5, marginVertical: 10, }} />
    </>

  )
}


export default function Huddles({ navigation, route }) {
  const huddleId =  route.params.item.id
  console.log("props", route.params.type)
  console.log("props item", route.params.item.id)

  console.log("Main Huddle Name", route.params.mainHuddleName)

  const focusdescription = useRef(null);
  const [blockTask, setBlockTask] = useState('')
  const [loading, setLoading] = useState(false)
  const [todayTask, setTodayTask] = useState("")
  const [yesterdayTask, setYesterdayTask] = useState("")
  const [haddleblockTask, setHaddleBlockTask] = useState("")
  const [haddleId, setHaddleId] = useState("")
  const [allResult, setAllResult] = useState("")
  const [allPriority, setAllPriority] = useState("")
  const [currentSelectedDate, setCurrentSelectedDate] = useState("")

  const [yesterdayCompleted, setYesterdayCompleted] = useState(route.params.item.yesterday_completed)

  let today = new Date()
  const [state, setState] = useState({
    projectDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    editDescription: false,
    properDate: today.getFullYear() + "-" + (('0' + (today.getMonth() + 1)).slice(-2)) + "-" + ('0' + today.getDate()).slice(-2),
    ToDoTask: "",
    completeTask: "",
    statusYesterday: false,
    // AllPriority: [],
  })
  console.log("proper date", state.properDate)


  var now = moment()
  const showDescriptioninput = () => {
    setState({ ...state, editDescription: !state.editDescription })
    setTimeout(() => {
      if (focusdescription.current) {
        focusdescription.current.focus();
      }
    }, 0);
    // focusdescription.current.focus()
  }

  // let currentDate= now.getFullYear(), now.getMonth() + 1, getDate()
  // console.log("asdkfh",currentDate)

  useEffect(() => {
    getHuddles()
    getBlockTask()
    const unsubscribe = navigation.addListener('focus', () => {
      getHuddles()
      getBlockTask()
    });
    return () => {
      unsubscribe;
    };
  }, [])

  const getHuddles = async (date) => {
    setLoading(true)
    setCurrentSelectedDate(date == undefined ? state.properDate : date)
    console.log("date", date)
    try {
      const response = await getAllHuddles(date == undefined ? state.properDate : date)
      console.log("<><><><><><><>", response.result)
      if (response.result.length > 0) {
        console.log("response>>>>>>>>>>>>>>>>.", response.result[0].today_task_ids)
        setAllResult(response.result)
        setTodayTask(response.result[0].today_task_ids)
        setYesterdayTask(response.result[0].yesterday_task_ids)
        setHaddleBlockTask(response.result[0].block_tasks_ids)
        setHaddleId(response.result[0].id)
        console.log("dkfaksdfjaskdf", response.result)
        // getBlockTask()
      }
      else {
        setAllResult(response.result)
        setTodayTask(response.result)
        // getBlockTask()
      }
      setLoading(false)
    } catch (error) {
      console.log("Problem is here :", error)
      setLoading(false)
    }
  }

  const getBlockTask = async () => {
    let tempDoneTask = []
    let tempOverDue = []
    let tempOpenTask = []
    setLoading(true)
    try {
      const res = await getAllBlockTask()
      console.log("Block Tasks", res.result)
      setBlockTask(res.result)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    getPriority()
  }

  const getTask = async () => {
    let tempDoneTask = []
    let tempToDoTask = []
    setLoading(true)
    try {
      const res = await getAllTask()
      // console.log("response",res.result)
      for (let i = 0; i < res.result.length; i++) {
        // console.log("><><<<><><<",res.result.length)
        if (res.result[i].project_id === false) {
          if (res.result[i].kanban_state === "done") {
            tempDoneTask.push(res.result[i])
          }
          else if (res.result[i].date_deadline > state.properDate) {
            console.log("overdue", res.result[i].date_deadline)
            tempToDoTask.push(res.result[i])
          }
          // else{
          //   tempOpenTask.push(res.result[i])
          // }
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setState({ ...state, completeTask: tempDoneTask, ToDoTask: tempToDoTask })
    setLoading(false)
  }

  const getPriority = async () => {
    setLoading(true)
    try {
      const res = await getAllPriority()
      console.log("response", res.result)
      setAllPriority(res.result)
      // setState({ ...state, AllPriority: res.result })
      getTask()
      setLoading(false)
    } catch (error) {
      console.log("error", error)
      setLoading(false)
    }
  }

  // Yesterday Task Status Updated
  const statusUpdate = async () => {
    setLoading(true)
    try {
      const res = await updateYesterdayStatus(huddleId, yesterdayCompleted)
      console.log('response of update', res)
      if (res.result) {
        setLoading(false)
        navigation.pop(2)

      }
      else {
        alert("Status Not Updated")
        setLoading(false)
      }
    } catch (error) {
      console.log("error", error)
      setLoading(false)
    }
  }
  console.log("Status is that", yesterdayCompleted)


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

      {/* Body */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body} keyboardShouldPersistTaps='always'>

        {/* Agenda Text Container */}
        <View style={styles.textContainer}>
          <Text style={styles.textContainerHeading}>{route.params.mainHuddleName}</Text>

          {
            route.params.type === "Weekly" ?
              <>
                <Text style={styles.textContainerTextHeading}> 1. Information the Leadership Team Needs to Know</Text>
                <Text style={styles.textContainerText}> {route.params.item.info_for_team}</Text>

                <Text style={styles.textContainerTextHeading}> 2. Personal High & Low and Business High & Low "</Text>
                <Text style={styles.textContainerText}> {route.params.item.high_low}</Text>

                <Text style={styles.textContainerTextHeading}> 3. Need Help</Text>
                <Text style={styles.textContainerText}> {route.params.item.help_required}</Text>
              </>
              :
              <>
                <Text style={styles.textContainerTextHeading}> 1. What's up for Today</Text>
                <Text style={styles.textContainerText}> {route.params.item.description}</Text>

                <Text style={styles.textContainerTextHeading}> 2. Top Priority for Today </Text>
                <Text style={styles.textContainerText}> {route.params.item.today_tasks}</Text>

                <Text style={styles.textContainerTextHeading}> 3. Yesterday I was supposed to </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.textContainerText}>
                    {route.params.item.yesterday_tasks === false
                      ? "There was no Top Priority form the previous day"
                      : route.params.item.yesterday_completed === true ? (
                        <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                          {route.params.item.yesterday_tasks}
                        </Text>
                      ) : (
                        route.params.item.yesterday_tasks
                      )}
                    {/* {route.params.item.yesterday_tasks === false ? "There was no Top Priority form the previous day" :  route.params.item.yesterday_completed === "true" ? <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}> {route.params.item.yesterday_tasks} </Text> : route.params.item.yesterday_tasks } */}
                  </Text>

                  {/* Today Check Complete */}
                  <CheckBox
                    style={{ marginTop: -10 }}
                    onClick={() => setYesterdayCompleted(!yesterdayCompleted)}
                    isChecked={yesterdayCompleted}
                    checkedCheckBoxColor={COLORS.orange}
                    uncheckedCheckBoxColor="#807d7d"
                  />
                </View>
                <TouchableOpacity onPress={()=>statusUpdate()}>
                  <Text style={{color: COLORS.green, textAlign:'center'}}>Update</Text>
                </TouchableOpacity>
              </>
          }
        </View>

        {/* Stuck Items Text Continer */}
        <View style={styles.textContainer}>
          <Text style={styles.textContainerHeading}>Block Tasks</Text>
          <FlatList
            data={blockTask}
            keyExtractor={(stoke) => stoke.id}
            renderItem={({ item }) => {
              const date_only = item.create_date.substring(0, 10);
              return (
                <BlockTask
                  name={item.name}
                  user={item.user_ids[0].name}
                  date={date_only}

                />
              )
            }}
          />

          {/* <View style={{ borderColor: COLORS.orange, borderWidth: 0.5, marginVertical: 10, }} />
          <BlockTask /> */}
          <TouchableOpacity style={styles.editbtn} onPress={() => navigation.navigate("CreateStuck")}>
            <Add name="ios-add-circle" size={20} color={COLORS.darkGreen} />
            <Text style={styles.editText}>Add Stuck</Text>
          </TouchableOpacity>
        </View>

        {/* Activities */}
        <View style={styles.activityContainer}>
          <Text style={styles.textMainHeading}>Activities</Text>
          <TouchableOpacity style={styles.viewallContainer} onPress={() => navigation.navigate("Priorities")}>
            <Text style={styles.viewallText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Activities Data*/}
        <FlatList
          data={allPriority.slice(0, 2)}
          keyExtractor={(stoke) => stoke.id}
          renderItem={({ item }) => {
            return (
              // <Accounts
              //   dueDate={item.date}
              //   name={item.name}
              //   image={item.image}
              //   priority={item.priority}
              //   // navigation={() => navigation.navigate("TaskDetail")}
              // />
              <Priority
                name={item.name}
                // progress={item.progress}
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

        {/* Today Updates */}
        <View style={styles.updateContiner}>
          <Text style={styles.textMainHeading}>Today Updates</Text>
          <View style={styles.completeTaskContainer}>
            <Text style={styles.textCompleteTask}>Completed Tasks ({state.completeTask.length})</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Tasks")} style={[styles.viewallContainer, { paddingVertical: 5, marginTop: 0 }]}>
              <Text style={styles.viewallText}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Completed Task Data */}
        <FlatList
          data={state.completeTask.slice(0, 3)}
          keyExtractor={(stoke) => stoke.id}
          renderItem={({ item }) => {
            return (
              // <TodayTasks
              //   dueDate={item.date}
              //   name={item.name}
              //   image={item.image}
              //   priority={item.priority}
              //   task={item.task}
              //   // navigation={() => navigation.navigate("TaskDetail")}
              // />
              <TodayTasks
                dueDate={item.date_deadline}
                name={item.name}
                image={require('../../assest/image/ProfileImage.png')}
                assigned={item.user_ids.length > 1 ? "Multiple Users" : item.user_ids[0].name}
                task={"Others"}
                status={item.kanban_state}
                priority={item.priority_kanban === "0" ? "Low" : item.priority_kanban === "1" ? "Medium" : "High"}
                navigation={() => navigation.navigate('TaskDetail', item)}
              />
            )
          }}
        />

      </ScrollView>
    </View>
  );
};



