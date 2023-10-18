import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

import Star from 'react-native-vector-icons/Ionicons'
import CheckBox from 'react-native-vector-icons/AntDesign'
import Edit from 'react-native-vector-icons/Feather'
import * as Progress from 'react-native-progress';
import { COLORS } from '../util/Color'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import StarRating from "react-native-star-rating";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const shadow =Platform.OS === 'ios' ? {
    shadowColor: '#00000042',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
} : {elevation: 9};

export default function Priority({ navigation, name, rating,owner,task,progress }) {

    // const [progress,setProgress]=useState(0)
    


    console.log("<><><><><><>",progress)


    // useEffect(()=>{
    //     if(...task.length > 0){
    //         getProgress()

    //     }
    // },[])

    // const getProgress=()=>{
    //     let tempCompleteTask=[]
    //     for(let i=0; i< task.length;i++){
    //        if(task[i].kanban_state === "done"){
    //         //   console.log("<><>")
    //           tempCompleteTask.push(task[i])
    //        }
    //     }
    //     setTimeout(() => {
    //         let calculate= (tempCompleteTask.length/task.length) * 100
    //         // console.log("calculate",Math.round(calculate))
    //         setProgress(Math.round(calculate))
    //     }, 500);
    // }


    
    return (
        <TouchableOpacity style={styles.container} onPress={navigation}>
            <View style={styles.upperContainer}>
                <Star name="star" size={20} color={COLORS.silver} style={{ marginHorizontal: 5 }} />
                <CheckBox name="checksquare" size={20} color={COLORS.orange} style={{ marginHorizontal: 5 }} />
                <View style={styles.nameContainer}>
                    <View style={{ width: '80%', }}>
                        <Text style={styles.nameHeading}>Prioritiy Name: {name}</Text>
                        <Text style={styles.nameText}>Owner: {owner}</Text>
                    </View>
                    <Edit name="edit-3" size={20} color={COLORS.darkGreen} style={{ justifyContent: 'flex-end' }} />
                </View>
            </View>
           

            <View style={styles.starsContainer}>
                    <View style={{ height: windowHeight / 25, marginBottom: 15, }}>
                        <Progress.Bar progress={progress/100} width={windowWidth / 1.7} color={progress/100 < 0.5 ? "#EC0000" : progress/100 <= 0.7 ? "#F7941D" : "#00C94E"} height={25} />
                    </View>
                    <Text style={styles.textPercentage}>{progress}%</Text>

                <StarRating
                    disabled={false}
                    maxStars={2}
                    rating={rating}
                    containerStyle={{ width: '15%', }}
                    starSize={20}
                    activeOpacity={0.5}
                    iconSet={'FontAwesome'}
                    emptyStar={"star"}
                    emptyStarColor={COLORS.silver}
                    // halfStarEnabled={true}
                    halfStar={'star-half-empty'}
                    halfStarColor={COLORS.yellow}
                    fullStar={'star'}
                    fullStarColor={COLORS.yellow}
                    reversed={false}
                />
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "96%",
        alignSelf: 'center',
        borderRadius: 5,
        
        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    
    // shadow,
        elevation: 9,
        backgroundColor: COLORS.white,
        padding: 10,
        marginVertical: 10,
    },
    upperContainer: {
        flex: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    nameContainer: {
        width: '77%',
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: 15,
    },
    nameHeading: {
        fontSize: RFValue(11),
        fontWeight: '500',
        // backgroundColor:"red",
        lineHeight: 18,
        color: COLORS.lightestBlack
    },
    nameText: {
        fontSize: RFValue(10),
        fontWeight: '500',
        lineHeight: 15,
        color: COLORS.lightestBlack
    },
    textPercentage: {
        fontSize: RFValue(15),
        fontWeight: '500',
        lineHeight: 26,
        color: COLORS.darkGreen,
        // marginLeft: 10,
        // backgroundColor:"red",
        // textAlign:"right",
        // width:"70%"
    },
    starsContainer: { 
        // flex: 1, 
        width:"100%",
        alignSelf: 'flex-end', 
        flexDirection:"row",
        justifyContent:"space-between"
    }
})