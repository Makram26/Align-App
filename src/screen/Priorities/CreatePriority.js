import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, Keyboard, TouchableOpacity, TextInput, Image, Dimensions, Alert } from 'react-native'

import Check from 'react-native-vector-icons/AntDesign'
import Calender from 'react-native-vector-icons/Feather'
import Add from 'react-native-vector-icons/Ionicons'
import Edit from 'react-native-vector-icons/Feather'
import { COLORS } from '../../util/Color'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SubHeader from '../../component/SubHeader'
import styles from '../../constant/Priorities/CreatePriorityStyle'
import StarRating from 'react-native-star-rating'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// import { getAllTeam, TaskCreate, TaskCreateForSingleUser } from '../../services'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Cross from "react-native-vector-icons/Entypo"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import CustomStatusBar from "../../component/CustomStatusBar";
import { Create_Priority, getAllTeam, getNewTeam, getTeamUserSelection } from '../../services'

import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';


export default function CreatePriority({ navigation }) {


    const focusdescription = useRef(null);
    const [account, setAccount] = useState("")
    const [description, setDescription] = useState("")
    const [priorityOwner, setPriorityOwner] = useState("")
    const [parentPriority, setParentPriorit] = useState("")
    // const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)

    const [rating, setRating] = useState(0)

    const [value, setValue] = useState("")

    const [editDescriptionshow, setEditDescriptionShow] = useState(false)



    const [state, setState] = useState({
        prorityName: "",
        status: "normal",
        description: "",
        comment: "",
        allTeam: [],
        AssignedId: 0,
    })



    const showDescriptioninput = () => {
        setEditDescriptionShow(true)
        setTimeout(() => {
            if (focusdescription.current) {
                focusdescription.current.focus();
            }
        }, 0);
        // focusdescription.current.focus()
    }
    console.log(typeof rating)


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
            // console.log("response >>>>",res.result[0].user_id)
            for (let i = 0; i < res.result.length; i++) {
                tempRecord.push({
                    id: res.result[i].user_id.id,
                    name: res.result[i].user_id.name,
                    // user_id: res.result[i].user_id.user_id
                })
                // console.log("res.result[i].team_members_ids.id",res.result[i])
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

        var newArrayList = [];
        tempRecord.forEach(obj => {
            if (!newArrayList.some(o => o.id === obj.id)) {
                newArrayList.push({ ...obj });
            }
        });
        console.log("unique list",newArrayList)
        setState({ ...state, allTeam: newArrayList })
    }

    // Create Priority
    const addPrority = async (value) => {
        const uid = await AsyncStorage.getItem('uid')
        if (state.prorityName === "") {
            alert("please enter priority name")
            return true
        }
        console.log(rating)
        setLoading(true)
        try {
            const res = await Create_Priority(state.prorityName, state.AssignedId == 0 ? uid : +state.AssignedId, state.description, rating, state.comment)
            console.log("response >>>>>>>>>>>>>>>>>>>>>>>>>>", res)
            if (res.result) {
                if (value === "back") {
                    navigation.goBack()
                    setLoading(false)
                }
                else{
                    alert("Successfully", "Priority Created")
                    setState({
                        ...state,
                        prorityName: "",
                        status: "normal",
                        description: "",
                        comment: "",
                        // allTeam: newArrayList.slice(1,),
                        // AssignedId: 0,
                    })
                    setLoading(false)
                }  
            }
            else {
                alert("priority not created!Try again")
                setLoading(false)
            }
        } catch (error) {
            console.log("error", error)
            setLoading(false)
        }
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
            <SubHeader
                goBack={() => navigation.goBack()}
                title={"Create Priority"}
                save={() => navigation.goBack()}
            />

            {/* body */}
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body} keyboardShouldPersistTaps='always'>

                {/* Task Name */}
                <Text style={styles.textHeading}>Short priority Name</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Create the Priority...'
                    placeholderTextColor={COLORS.placeholder}
                    keyboardType="default"
                    value={state.prorityName}
                    onChangeText={(value) => setState({ ...state, prorityName: value })}
                />

                {/* Description */}
                <View style={styles.commentsContainer}>
                    <Text style={styles.textComments}>Description</Text>
                    {
                        editDescriptionshow ?
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <TextInput
                                    style={{ padding: 10, width: "90%" }}
                                    ref={focusdescription}
                                    placeholder='Add description'
                                    placeholderTextColor={COLORS.placeholder}
                                    keyboardType="default"
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { Keyboard.dismiss() }}
                                    multiline
                                    numberOfLines={Platform.OS === 'ios' ? null : 5}
                                    minHeight={(Platform.OS === 'ios' && 5) ? (20 * 5) : null}
                                    textAlignVertical="top"
                                    value={state.description}
                                    onChangeText={(value) => setState({ ...state, description: value })}
                                />
                                <TouchableOpacity onPress={() => setEditDescriptionShow(false)}>
                                    <Cross name="cross" size={20} color="#000000" style={{ marginRight: 5 }} />
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity style={styles.editDescriptionContainer} onPress={() => showDescriptioninput()}>
                                <Edit name="edit-3" size={16} color={COLORS.darkGreen} />
                                <Text style={[styles.textHeading, { color: COLORS.green, marginTop: 0, textTransform: 'uppercase' }]}>Edit Description</Text>
                            </TouchableOpacity>
                    }
                </View>

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
                                    <Picker.Item label='please select any user' value='0' style={{color: COLORS.black}} />
                                    {
                                        state.allTeam && state.allTeam.map((item, index) => {
                                            return (
                                                <Picker.Item label={item.name} value={item.id} style={{color: COLORS.black}}/>
                                            )
                                        })
                                    }
                                </Picker>
                            </View>
                        </>
                }


                {/* Priority Owner */}
                {/* <Text style={{ ...styles.textHeading, marginTop: 5 }}>Priority Owner</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Jahanzaib'
                    placeholderTextColor={COLORS.placeholder}
                    keyboardType="default"
                    value={priorityOwner}
                    onChangeText={(value) => setPriorityOwner(value)}
                /> */}

                {/* Parent Priority */}
                {/* <Text style={styles.textHeading}>Parent Priority</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Jahanzaib'
                    placeholderTextColor={COLORS.placeholder}
                    keyboardType="default"
                    value={parentPriority}
                    onChangeText={(value) => setParentPriorit(value)}
                /> */}

                {/* Select Priority */}
                <Text style={styles.textHeading}>Select Priority</Text>
                <StarRating
                    disabled={false}
                    maxStars={2}
                    rating={rating}
                    selectedStar={(rating) => setRating(rating)}
                    containerStyle={{ width: '15%', marginLeft: 2 }}
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

                {/* Comments Conatiner */}
                <View style={styles.commentsContainer}>
                    <Text style={styles.textComments}>Comments</Text>
                    <TextInput
                        style={{ marginHorizontal: 10, }}
                        placeholder='Please add your Comments.'
                        placeholderTextColor={COLORS.lightestBlack}
                        keyboardType="default"
                        returnKeyType="done"
                        blurOnSubmit={true}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        multiline
                        numberOfLines={Platform.OS === 'ios' ? null : 5}
                        minHeight={(Platform.OS === 'ios' && 5) ? (20 * 5) : null}
                        textAlignVertical="top"
                        value={state.comment}
                        onChangeText={(value) => setState({ ...state, comment: value })}
                    />
                    <TouchableOpacity style={styles.btnSend}>
                        {/* <Image source={require("../../assest/icon/send.png")} /> */}
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>

            {/* Bottom Buttons */}
            <View style={styles.bottomBtnContainer}>
                <TouchableOpacity style={styles.btnSave} onPress={() => addPrority("back")}>
                    <Check name="checkcircle" size={15} color={COLORS.white} />
                    <Text style={styles.textBottomBtn}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnSave, { width: '75%', backgroundColor: COLORS.white }]} onPress={() => addPrority("Stop")}>
                    <Add name="ios-add-circle" size={15} color={COLORS.green} />
                    <Text style={[styles.textBottomBtn, { color: COLORS.green }]}>Save and add another</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

