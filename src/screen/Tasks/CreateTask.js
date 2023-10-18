import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, Keyboard, TouchableOpacity, KeyboardAvoidingView, TextInput, Image, Dimensions, Modal, Platform, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Check from 'react-native-vector-icons/AntDesign'
import Calender from 'react-native-vector-icons/Feather'
import Add from 'react-native-vector-icons/Ionicons'
import CheckCircle from 'react-native-vector-icons/FontAwesome5'
import Edit from 'react-native-vector-icons/Feather'
import Exclamation from 'react-native-vector-icons/FontAwesome5'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RadioButton } from "react-native-paper";
import StarRating from 'react-native-star-rating'
import { COLORS } from '../../util/Color'
import SubHeader from '../../component/SubHeader'
import SuccessModal from '../../component/SuccessModal'
import styles from '../../constant/Tasks/CreateTaskStyle'
import DateTimePicker from '@react-native-community/datetimepicker';

import CheckBox from '@react-native-community/checkbox'
import RNCheckBox from 'react-native-check-box'

import { getAllTeam, getNewTeam, getTeamUserSelection, TaskCreate, TaskCreateForSingleUser, getAllPriority } from '../../services'
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import CustomStatusBar from "../../component/CustomStatusBar";
import AsyncStorage from '@react-native-async-storage/async-storage'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CreateTask({ navigation, route }) {

    // props
    const projectId = route.params.project_id
    let today = new Date()

    // date states
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // State
    const [allUser, setAllUser] = useState([])

    const [completed, setCompleted] = useState(false)
    const [assignUser, setAssignUser] = useState(false)
    const [rating, setRating] = useState(0)
    const [saveModal, setSaveModal] = useState(false)
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)

    const [state, setState] = useState({
        allTeam: [],
        properDate: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
        allIds: [],
        taskName: "",
        status: "normal",
        description: "",
        priorityID: 0,
    })

    const [allPriorities, setAllPriority] = useState([])
    // Multiple user selection by search
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemNames, setSelectedItemNames] = useState([]);

    useEffect(() => {
        getTeamMember()
        getPriority()
        const unsubscribe = navigation.addListener('focus', () => {
            getTeamMember()
            getPriority()
        });
        return () => {
            unsubscribe;
        };
    }, [])

    const getTeamMember = async () => {
        setLoading(true)
        let tempRecord = []
        try {
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
                //         user_id: res.result[i].child_ids[j].user_id
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
        // console.log("Kuch to masla h", newArrayList.slice(1,))
        setAllUser(newArrayList)
        setState({ ...state, allTeam: newArrayList })
    }

    // Get Priority Names
    const getPriority = async () => {
        setLoading(true)
        try {
            const res = await getAllPriority()
            console.log("response", res.result)
            // setState({ ...state, AllPriority: res.result })
            setAllPriority(res.result)
            setLoading(false)
        } catch (error) {
            console.log("error", error)
            setLoading(false)
        }
    }

    // Single Priority Selection Picker
    const OnchangePickerSeletedHandler = (value, index) => {
        setValue(value)
        if (index === 0) {
            setState({ ...state, priorityID: 0 })
        }
        else {
            setState({ ...state, priorityID: value })
        }
        console.log("sldkfjaskfjs", value, "<><>", index)
    }

    // Filter Data of user
    const filteredData = allUser.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        console.log("date>>>>>", date)
        let tempDate = new Date(currentDate)
        console.log("temp date", tempDate.toLocaleDateString())
        let fDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate()
        console.log("date format", fDate)
        setState({ ...state, properDate: fDate })
    };
    console.log("rating ", state.properDate)

    // Create Task Function
    const CreateNewTask = async (value) => {
        console.log(value)
        if (state.taskName === "") {
            alert("please enter task name")
            return true
        }
        const uid = await AsyncStorage.getItem("uid")
        if (state.allTeam.length === 1) {
            try {
                setLoading(true)
                const res = await TaskCreateForSingleUser(state.taskName, [+uid], state.description, state.properDate, state.status, rating.toString(), state.priorityID !== 0 ? state.priorityID : projectId)
                console.log("response", res)
                if (res.result) {
                    if (value === "goBack") {
                        setSaveModal(true)
                        setTimeout(() => {
                            CloseModal()
                            // navigation.goBack()
                        }, 2000);
                        setLoading(false)
                    }
                    else {
                        setSaveModal(true)
                        setTimeout(() => {
                            CloseModalStay()
                        }, 2000);

                        setState({
                            ...state,
                            // allTeam: [],
                            properDate: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
                            taskName: "",
                            status: "normal",
                            description: "",
                            // priorityID: 0,
                        })

                        setLoading(false)
                    }
                }
                else {
                    alert("Task not creating! Try again")
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)

            }
        }
        else {
            if (!assignUser && selectedItems.length === 0) {
                alert("please select any user")
                return
            }
            try {
                setLoading(true)
                const res = await TaskCreate(state.taskName, state.allTeam.length === 0 ? [uid] : assignUser ? state.allIds : selectedItems, state.description, state.properDate, state.status, rating.toString(), state.priorityID !== 0 ? state.priorityID : projectId)
                console.log("response", res)
                if (res.result) {
                    if (value === "goBack") {
                        setSaveModal(true)
                        setTimeout(() => {
                            CloseModal()
                            // navigation.goBack()
                        }, 2000);
                        setLoading(false)
                    }
                    else {
                        setSaveModal(true)
                        setTimeout(() => {
                            CloseModalStay()
                            // navigation.goBack()
                        }, 2000);

                        setState({
                            ...state,
                            // allTeam: [],
                            properDate: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
                            taskName: "",
                            status: "normal",
                            description: "",
                            // priorityID: 0,
                        })

                        setLoading(false)
                    }
                }
                else {
                    alert("Task not creating! Try again")
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)

            }
        }
    }

    const selectAllTeam = () => {
        let tempId = [];
        for (let i = 0; i < state.allTeam.length; i++) {
            tempId.push(state.allTeam[i].id);
        }
        const filteredIds = tempId.filter(item => item !== undefined);
        setState({ ...state, allIds: filteredIds });
        setAssignUser(!assignUser);
    }

    // Task Status
    const TaskStatus = () => {
        setCompleted(!completed)
        if (completed === false) {
            setState({ ...state, status: "done" })
        }
        else {
            setState({ ...state, status: "normal" })
        }
    }

    // Modal Close function
    const CloseModal = () => {
        setSaveModal(false);
        setTimeout(() => {
            if (projectId === false) {
                navigation.goBack()
            }
            else {
                navigation.pop(2)
            }
        }, 500);
    }

    // Modal Close function
    const CloseModalStay = () => {
        setSaveModal(false);
        setTimeout(() => {
        }, 500);
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
                title={"Create Task"}
                save={() => navigation.goBack()}
            />

            {/* body */}
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body} keyboardShouldPersistTaps='always'>

                {/* Image */}
                <Image source={require("../../assest/image/Imagebg.png")} style={styles.image} />
                <Add name="ios-add-circle" size={25} color={COLORS.orange} style={styles.addIcon} />

                {/* Task Name */}
                <Text style={styles.textHeading}>Short Task Name</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Create the Account...'
                    placeholderTextColor={COLORS.placeholder}
                    keyboardType="default"
                    value={state.taskName}
                    onChangeText={(value) => setState({ ...state, taskName: value })}
                />

                {/* Check Complete  */}
                <View style={styles.completeContainer}>
                    <RNCheckBox
                        style={{}}
                        onClick={() => TaskStatus()}
                        isChecked={completed}
                        checkedCheckBoxColor={COLORS.orange}
                        uncheckedCheckBoxColor="#807d7d"
                    />
                    <Text style={[styles.textHeading, { marginTop: 0, marginBottom: 0, marginLeft: 5 }]}>{completed ? "Completed" : "Complete"}</Text>
                </View>

                {/* Due Date */}
                <Text style={[styles.textHeading, { marginTop: 0 }]}>Due Date</Text>
                <View style={{ ...styles.dateContainer, marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => showMode('date')}>
                        <View style={styles.datePickerContainer}>
                            <Text style={{ marginLeft: 4 }}>{state.properDate}</Text>
                            <Image style={styles.calendarIcon} resizeMode='contain' source={require('../../assest/image/calendar.png')} />
                        </View>
                    </TouchableOpacity>
                </View>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        display="inline"
                        dateFormat="day dayofweek month"
                        // is24Hour={true}
                        onChange={onChange}
                    />
                )}

                {
                    state.allTeam.length === 1 ?
                        null
                        :
                        <>
                            {/* Multi User Selection  */}
                            < Text style={styles.textHeading}>{projectId === false ? "Assigned To Specific Users" : "Align to a Priority"}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.black }}>{selectedItemNames.join(', ')}</Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder='Enter Search Name'
                                placeholderTextColor={COLORS.placeholder}
                                keyboardType="default"
                                value={searchQuery}
                                onChangeText={text => setSearchQuery(text)}
                            />
                            {
                                filteredData.length > 0 ?
                                    <View style={{ height: 100, backgroundColor: COLORS.silver }}>
                                        <FlatList
                                            data={filteredData}
                                            scrollEnabled={false}
                                            renderItem={({ item }) => (
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                                    <CheckBox
                                                        value={selectedItems.includes(item.id)}
                                                        boxType="square"
                                                        style={Platform.OS === 'ios' && styles.checkbox}
                                                        onValueChange={value => {
                                                            setSelectedItems(newSelectedItems => {
                                                                const newSelectedIds = value
                                                                    ? [...newSelectedItems, item.id]
                                                                    : newSelectedItems.filter(id => id !== item.id);
                                                                setSelectedItemNames(
                                                                    newSelectedIds.map(selectedId =>
                                                                        allUser.find(dataItem => dataItem.id === selectedId).name
                                                                    )
                                                                );
                                                                return newSelectedIds;
                                                            });
                                                        }}
                                                    />

                                                    <Text style={{marginLeft:Platform.OS === 'ios' ?5:0,fontSize:13,marginBottom:Platform.OS === 'ios' ?5:0}}>{item.name}</Text>
                                                </View>
                                            )}
                                            keyExtractor={item => item.id.toString()}
                                        />
                                    </View>
                                    :
                                    <Text style={{ color: 'red', marginLeft: 12 }}>No User Found</Text>
                            }


                            {/* Check Assigned To all users */}
                            <View style={styles.completeContainer}>
                                <RNCheckBox
                                    style={{}}
                                    isChecked={assignUser}
                                    onClick={() => selectAllTeam()}
                                    checkedCheckBoxColor={COLORS.orange}
                                    uncheckedCheckBoxColor="#807d7d"
                                />
                                <Text style={[styles.textHeading, { marginTop: 0, marginBottom: 0, marginLeft: 5 }]}>Assign To all Users</Text>
                            </View>
                        </>
                }

                {/* Select Priority Type */}
                <Text style={[styles.textHeading, { marginTop: 0 }]}>Select Priority Type</Text>
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
                    halfStarEnabled={false}
                    halfStar={'star-half-empty'}
                    halfStarColor={COLORS.yellow}
                    fullStar={'star'}
                    fullStarColor={COLORS.yellow}
                    reversed={false}
                />


                {/* Priority Picker */}

                {
                    projectId !== false ?
                        null
                        :
                        <>
                            <Text style={styles.textHeading}>Select Priority</Text>
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue, itemIndex) => OnchangePickerSeletedHandler(itemValue, itemIndex)}
                                style={styles.pickerStyle}
                                itemStyle={{ color: "#000000" }} >
                                <Picker.Item label='Please Select any Priority' value='0' style={{color: COLORS.black}}/>
                                {
                                    allPriorities && allPriorities.map((item, index) => {
                                        return (
                                            <Picker.Item label={item.name} value={item.id} style={{color: COLORS.black}}/>
                                        )
                                    })
                                }
                            </Picker>
                        </>
                }

                {/* Comments/Notes Conatiner */}
                <View style={styles.commentsContainer}>
                    <Text style={styles.textComments}>{projectId === false ? "Comments" : "Notes"}</Text>
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
                        value={state.description}
                        onChangeText={(value) => setState({ ...state, description: value })}
                    />

                    {/* {
                        item === "Priorities" ?
                            <>
                                <TouchableOpacity style={styles.editDescriptionContainer}>
                                    <Edit name="edit-3" size={16} color={COLORS.green} />
                                    <Text style={[styles.textHeading, { color: COLORS.green, marginTop: 0, textTransform: 'uppercase' }]}>Edit Notes</Text>
                                </TouchableOpacity>
                            </>
                            :
                            <TouchableOpacity style={styles.btnSend}>
                                <Image source={require("../../assest/icon/send.png")} />
                            </TouchableOpacity>
                    } */}
                </View>
            </KeyboardAwareScrollView>

            {/* Buttons */}
            <View style={styles.bottomBtnContainer}>
                <TouchableOpacity style={styles.btnSave} onPress={() => CreateNewTask("goBack")}>
                    <Check name="checkcircle" size={15} color={COLORS.white} />
                    <Text style={styles.textBottomBtn}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnSave, { width: '75%', backgroundColor: '#ffffff' }]} onPress={() => CreateNewTask("Stop")}>
                    <Add name="ios-add-circle" size={15} color={COLORS.green} />
                    <Text style={[styles.textBottomBtn, { color: COLORS.green }]}>Save and add another</Text>
                </TouchableOpacity>
            </View>

            {/* Save Modal */}
            <Modal visible={saveModal} animationType='slide' transparent={true} >
                <View style={styles.modalContainer}>
                    <SuccessModal
                        statement={"Your Task is created successfully"}
                    />
                </View>
            </Modal>

            {/* <Modal visible={pickerModal} animationType='slide' transparent={true} >
                <View style={{
                    flex: 1,
                    // backgroundColor: '#FFFFFF',
                    justifyContent: 'center',

                    // alignItems:"center"
                }} >
                    <View style={{
                        backgroundColor: "#FFFFFF", height: windowHeight / 3, justifyContent: "center", width: windowWidth - 20, alignSelf: "center", elevation: 20, shadowColor: '#00000042',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                    }}>
                        <Picker
                            selectedValue={value}
                            // style={{ height: 100, width: 200 }}
                            onValueChange={(itemValue, itemIndex) => OnchangePickerSeletedHandler(itemValue, itemIndex)}
                            itemStyle={{ color: "#000000" }} >
                            {
                                state.allTeam && state.allTeam.map((item, index) => {
                                    return (
                                        <Picker.Item label={item.name} value={item.id} />
                                    )
                                })
                            }
                        </Picker>
                    </View>

                </View>
            </Modal> */}
        </View >
    )
}

