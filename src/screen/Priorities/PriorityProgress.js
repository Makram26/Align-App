import React, { useState, useEffect, useContext } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Dimensions } from "react-native";

import Add from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AssociatedTaskData } from "../../data/TasksData";
import Header from "../../component/Header";
import * as Progress from 'react-native-progress';
import TodayTasks from "../../component/TodayTasks";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styles from "../../constant/Priorities/PriorityProgressStyle";
import StarRating from "react-native-star-rating";
import { COLORS } from "../../util/Color";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import CustomStatusBar from "../../component/CustomStatusBar";


export default function PriorityProgress({ navigation, route }) {

    const {priority_kanban,task_ids,id } = route.params

    // console.log("task_ids",task_ids)

    const [progress,setProgress]=useState(0)
    

    useEffect(()=>{
        if(task_ids.length > 0){
            getProgress()

        }
    },[])

    const getProgress=()=>{
        let tempCompleteTask=[]
        for(let i=0; i< task_ids.length;i++){
           if(task_ids[i].kanban_state === "done"){
            //   console.log("<><>")
              tempCompleteTask.push(task_ids[i])
           }
        }
        setTimeout(() => {
            let calculate= (tempCompleteTask.length/task_ids.length) * 100
            // console.log("calculate",Math.round(calculate))
            setProgress(Math.round(calculate))
        }, 500);
    }
     
    // const {task_ids} =
    // const [progressPercentage, setProgressPercentage] = useState(progress === 0 ? "0" : progress === 0.1 ? "10%" : progress === 0.2 ? "20%" : progress === 0.3 ? "30%" : progress === 0.4 ? "40%" : progress === 0.5 ? "50%" : progress === 0.6 ? "60%" : progress === 0.7 ? "70%" : progress === 0.8 ? "80%" : progress === 0.9 ? "90%" : "100%")

    return (
        <View style={styles.container}>


      <CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content"/>


            {/* Header */}
            <Header
                goBack={() => navigation.goBack()}
                title={"Priority Progress"}
            />

            {/* body */}
            <ScrollView contentContainerStyle={styles.body}>
                <Text style={styles.heading}>Create the Account</Text>

                {/* Create Task Button */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("CreateTask", { 'project_id': id })}
                    style={styles.btnCreateTask}>
                    <Add name="ios-add-circle" size={12} color={COLORS.white} />
                    <Text style={styles.textCreateTask}>Create Tasks</Text>
                </TouchableOpacity>

                {/* Priority Container */}
                <TouchableOpacity style={styles.progressContainer}>
                    <Text style={styles.textProgress}>Priority Progress</Text>
                    <Text style={styles.textPercentage}>{progress}%</Text>
                    <View style={{ height: windowHeight / 25, marginBottom: 15 }}>
                        <Progress.Bar progress={progress/100} width={windowWidth / 1.15} color={progress/100 < 0.5 ? "#EC0000" : progress/100 <= 0.7 ? "#F7941D" : "#00C94E"} height={30} />
                    </View>
                    <Text style={styles.textProgress}>Priority</Text>
                    <StarRating
                        disabled={false}
                        maxStars={2}
                        rating={priority_kanban}
                        containerStyle={{ width: '15%', marginTop: 5 }}
                        starSize={20}
                        activeOpacity={0.5}
                        iconSet={'FontAwesome'}
                        emptyStar={"star"}
                        emptyStarColor={COLORS.silver}
                        halfStarEnabled={true}
                        halfStar={'star-half-empty'}
                        halfStarColor={COLORS.yellow}
                        fullStar={'star'}
                        fullStarColor={COLORS.yellow}
                        reversed={false}
                    />
                </TouchableOpacity>

                {/* Associated Tasks */}
                <View style={styles.progressContainer}>
                    <Text style={styles.textProgress}>Associated Tasks</Text>
                </View>

                {/* Associated Task Data */}
                <FlatList
                    data={task_ids}
                    keyExtractor={(stoke) => { stoke.id }}


                    

                    renderItem={({ item }) => {
                        //  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",item.user_ids.length)
                        return (
                            <TodayTasks
                                name={item.name}
                                dueDate={item.date_deadline}
                                task={item.task}
                                image={item.image}
                                assigned={item.user_ids.length > 1 ? "Multiple Users":item.user_ids[0].name}
                                priority={item.priority}
                                status={item.kanban_state}
                                navigation={() => navigation.navigate("TaskDetail",item,{project:true})}
                            />
                        )
                    }}
                />

            </ScrollView>
        </View>
    );
};

