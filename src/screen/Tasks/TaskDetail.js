import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, TextInput, Image, Modal, Dimensions, Alert, } from 'react-native'

import Check from 'react-native-vector-icons/AntDesign'
import Calender from 'react-native-vector-icons/Feather'
import Edit from 'react-native-vector-icons/MaterialIcons'
import Delete from 'react-native-vector-icons/MaterialIcons'
import Exclamation from 'react-native-vector-icons/FontAwesome5'
import Add from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../util/Color'
import SubHeader from '../../component/SubHeader'
import SuccessModal from '../../component/SuccessModal'
import styles from '../../constant/Tasks/TaskDetailStyle'
import { RadioButton } from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from '@react-native-community/checkbox'
import RNCheckBox from 'react-native-check-box'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Dot from 'react-native-vector-icons/Entypo'
import CustomStatusBar from "../../component/CustomStatusBar";
import Spinner from 'react-native-loading-spinner-overlay';
import { deleteTask, getAllTeam, getTeamUserSelection, getNewTeam, singleComments, TaskUpdate } from '../../services'
import DateTimePicker from '@react-native-community/datetimepicker';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const InfoView = ({ title, info }) => {
    return (
        <View style={styles.subInfoContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.textinfo}>{info}</Text>
        </View>
    )
}

const CommentView = ({ image, dueDate, description }) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: "94%",
            alignSelf: 'center',
            marginTop: 5
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start'
            }}>
                <Dot name="dot-single" size={20} color={COLORS.black} style={{ marginTop: -2 }} />
                <View style={{ width: "95%" }}>
                    <Text style={{
                        fontSize: RFValue(10),
                        fontWeight: '500',
                        lineHeight: 15,
                        color: "#444444"
                    }}>{description}</Text>
                    <Text style={{
                        fontSize: RFValue(9),
                        fontWeight: '500',
                        lineHeight: 13,
                        color: '#878787',
                        marginTop: 5
                    }}>Date : {dueDate}</Text>
                </View>
            </View>
            <Image source={image} style={{
                width: 16,
                height: 16,
                borderRadius: 2
            }} />
        </View>
    )
}

export default function TaskDetail({ route, navigation }) {

    // Props
    console.log("props", route.params.project_id)
    const assignUsers = route.params.user_ids
    const names = assignUsers.map((item) => item.name);
    const ids = assignUsers.map((item) => item.id)
    console.log("ids are", route.params.user_ids)
    // Comments & Logs
    var comments = route.params.message_ids

    // Date
    var currentdate = new Date();
    console.log("currentdate", currentdate)
    var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    // Modals
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [saveModal, setSaveModal] = useState(false)
    const [refresh, setRefresh] = useState("")

    // States
    const [description, setDescription] = useState("")
    const [completed, setCompleted] = useState(route.params.kanban_state === "normal" ? false : true)
    const [rating, setRating] = useState(+route.params.priority_kanban)
    const [loading, setLoading] = useState(false)
    const [showpicker, setShowpicker] = useState(false)
    const [assignUser, setAssignUser] = useState(false)
    const [allUser, setAllUser] = useState([])

    // date states
    const [date, setDate] = useState(new Date(route.params.date_deadline));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("")

    const [state, setState] = useState({
        allTeam: [],
        properDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        allIds: [],
        taskName: route.params.name,
        status: route.params.kanban_state,
        description: ""
    })

    // Multiple user selection by search
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState(!showpicker ? ids : []);
    const [selectedItemNames, setSelectedItemNames] = useState([]);


    useEffect(() => {
        getTeamMember()
    }, [])


    const saveEditTask = () => {
        editTask()
    }

    const addComments = async () => {
        try {
            setLoading(true)
            const res = await singleComments(route.params.id, description)

            if (res.result === true) {
                console.log("response", res)

                comments.push({
                    body: description,
                    date: datetime
                })
                // setRefresh(value)
                setDescription("")
                navigation.goBack()
                setLoading(false)
            }
            else {
                alert("Try again! not add any commnets")
            }
        } catch (error) {
            setLoading(false)
            console.log("error", error)
        }
    }

    const RemoveTask = async () => {
        setDeleteModal(false)
        try {
            setLoading(true)
            const res = await deleteTask(route.params.id)
            setLoading(false)
            console.log("respnse", res)
            if (res.result === true) {
                if (route.params.project_id === false) {
                    navigation.goBack()
                }
                else {
                    navigation.pop(2)
                }
            }
            else {
                setLoading(false)
                alert("Try again! not delete this task")
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    const CloseDeleteModal = () => {
        setDeleteModal(false)
        setTimeout(() => {
            RemoveTask()
        }, 500);
    }

    const TaskStatus = () => {
        setCompleted(!completed)
        if (completed === false) {
            setState({ ...state, status: "done" })
        }
        else {
            setState({ ...state, status: "normal" })
        }
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        let tempDate = new Date(currentDate)
        // console.log("temp date", tempDate.toLocaleDateString())
        let fDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate()
        // console.log("df",tempDate.toLocaleDateString()) 
        console.log("date format", fDate)
        setState({ ...state, properDate: fDate })
        // let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        // setProperTime(fTime)
    };

    const OnchangePickerSeletedHandler = (value, index) => {
        setValue(value)
        if (index === 0) {
            setState({ ...state, AssignedId: [route.params.user_ids[0].id] })
        }
        else {
            setState({ ...state, AssignedId: [value] })
        }
        console.log("sldkfjaskfjs", value, "<><>", index)
    }


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

    console.log("list", selectedItems)


    // Edit Task Function
    const editTask = async () => {
        if (state.taskName === "") {
            alert("Task name not empty")
            return true
        }
        setShowpicker(false)
        setEditModal(false)
        try {
            const res = await TaskUpdate(state.taskName, assignUser ? state.allIds : selectedItems, state.properDate, state.status, rating.toString(), route.params.id, route.params.project_id)
            // console.log("response", res)
            if (route.params.project_id === false) {
                navigation.goBack()
            }
            else {
                navigation.pop(2)
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    // Search User by Name
    const filteredData = allUser.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectAllTeam = () => {
        let tempId = [];
        for (let i = 0; i < state.allTeam.length; i++) {
            tempId.push(state.allTeam[i].id);
        }
        const filteredIds = tempId.filter(item => item !== undefined);
        setState({ ...state, allIds: filteredIds });
        setAssignUser(!assignUser);
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

            {/* Header */}
            <SubHeader
                goBack={() => navigation.goBack()}
                title={"Task Detail"}
                note={""}
            />

            {/* body */}
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>

                {/* Buttons Container */}
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnEditTasks} onPress={() => setEditModal(true)}>
                        <Edit name="edit" size={14} color={COLORS.white} />
                        <Text style={styles.textEditTasks}>Edit Tasks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnDelete} onPress={() => setDeleteModal(true)}>
                        <Delete name="delete" size={30} color='#FA3050' />
                    </TouchableOpacity>
                </View>

                {/* Information Container */}
                <View style={styles.infoContainer}>
                    <Image source={require("../../assest/image/taskIcon.png")} style={styles.image} />
                    <View style={styles.headingConatiner}>
                        <View style={{ width: "75%" }}>
                            <Text style={styles.textHeading}>Task Title: {route.params.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Image source={require("../../assest/icon/CheckCircle.png")} style={{ tintColor: route.params.kanban_state === "done" ? COLORS.orange : COLORS.lightestBlack }} />
                            <Text style={[styles.textEditTasks, { color: COLORS.black }]}>Completed</Text>
                        </View>
                    </View>
                    <InfoView
                        title={"Due Date"}
                        info={route.params.date_deadline}
                    />
                    <InfoView
                        title={"Created By:"}
                        info={route.params.create_uid.name}
                    />
                    <View style={{ ...styles.subInfoContainer, justifyContent: "flex-start" }}>
                        <Text style={[styles.title, { marginTop: 3, width: "60%" }]}>Prioritiy: </Text>
                        <StarRating
                            disabled={false}
                            maxStars={2}
                            rating={+route.params.priority_kanban}
                            containerStyle={{ width: '15%', }}
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
                    </View>
                    <InfoView
                        title={"Assigned To:"}
                        info={route.params.user_ids.length > 1 ?
                            <>
                                {names.map((name) => (
                                    <Text key={name}>{name}, </Text>
                                ))}
                            </>
                            :
                            route.params.user_ids[0].name}
                    />
                </View>

                <View style={{ flex: 1, width: "97.5%", alignSelf: 'center', borderRadius: 5, elevation: 20, shadowColor: '#00000042', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2, marginTop: 10, padding: 10, position: 'relative', backgroundColor: '#EEFAFF', zIndex: 0, paddingBottom: 0 }}>
                    <Text style={{ fontSize: RFValue(11), fontWeight: '600', lineHeight: 16, color: '#F7941D' }}>Comments:</Text>
                    {
                        comments && comments.map((item) => {
                            if (item.grow_app_check == true) {
                                return (
                                    <>
                                        <CommentView
                                            image={""}
                                            description={item.description}
                                            dueDate={item.date}
                                        />
                                        <View style={{ borderColor: COLORS.orange, borderWidth: 0.5, marginVertical: 10 }} />
                                    </>
                                )
                            }
                            else {
                                return null;
                            }
                        })
                    }
                </View>

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
                        value={description}
                        onChangeText={(value) => setDescription(value)}
                    />
                    <TouchableOpacity onPress={() => addComments()} style={styles.btnSend}>
                        <Image source={require("../../assest/icon/send.png")} />
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>


            {/* Edit Task Modal  */}
            <Modal visible={editModal} animationType='slide' transparent={true}>
                <View style={styles.mainContainerModal}>
                    <View style={styles.subContainerModal}>
                        <KeyboardAwareScrollView
                            showsVerticalScrollIndicator={false} contentContainerStyle={styles.bodyModal} keyboardShouldPersistTaps='always'>

                            {/* Image */}
                            <TouchableOpacity style={styles.EditContinerModal}>
                                <Edit name='edit' size={20} color={COLORS.white} />
                            </TouchableOpacity>
                            <Image source={require("../../assest/image/taskIcon.png")} style={styles.imageModal} />

                            {/* Task Name */}
                            <Text style={styles.textHeadingModal}>Short Task Name</Text>
                            <TextInput
                                style={styles.inputTextModal}
                                placeholder='Create the Account...'
                                placeholderTextColor={COLORS.placeholder}
                                keyboardType="default"
                                value={state.taskName}
                                onChangeText={(value) => setState({ ...state, taskName: value })}
                            />

                            {/* Check Complete  */}
                            <View style={styles.completeContainerModal}>
                                <RNCheckBox
                                    style={{}}
                                    onClick={() => TaskStatus()}
                                    isChecked={completed}
                                    checkedCheckBoxColor={COLORS.orange}
                                    uncheckedCheckBoxColor="#807d7d"
                                />
                                <Text style={[styles.textHeadingModal, { marginTop: 0, marginBottom: 0, marginLeft: 5 }]}>{completed ? "Completed" : "Complete"}</Text>
                            </View>

                            {/* Due Date */}
                            <Text style={[styles.textHeadingModal, { marginTop: 0 }]}>Due Date</Text>
                            <View style={styles.dateContainer}>
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

                            {/* Assigned To */}
                            <Text style={styles.textHeadingModal}>Assigned To Specific Users</Text>
                            {
                                showpicker ?
                                    <>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.black }}>{selectedItemNames.join(', ')}</Text>
                                        <TextInput
                                            style={styles.inputTextModal}
                                            placeholder='Enter Search Name'
                                            placeholderTextColor={COLORS.placeholder}
                                            keyboardType="default"
                                            value={searchQuery}
                                            onChangeText={text => setSearchQuery(text)}
                                        />

                                        {
                                            filteredData.length > 0 ?
                                                <View style={{ height: 70, backgroundColor: COLORS.silver }}>
                                                    <FlatList
                                                        data={filteredData}
                                                        scrollEnabled={false}
                                                        renderItem={({ item }) => (
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                                                <CheckBox
                                                                    value={selectedItems.includes(item.id)}
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
                                                                <Text>{item.name}</Text>
                                                            </View>
                                                        )}
                                                        keyExtractor={item => item.id.toString()}
                                                    />
                                                </View>
                                                :
                                                <Text style={{ color: 'red', marginLeft: 12 }}>No User Found</Text>
                                        }

                                    </>

                                    :
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: COLORS.white, width: '99%', alignSelf: 'center', paddingHorizontal: 10, paddingVertical: Platform.OS === "ios" ? 18 : 10, elevation: 20, shadowColor: '#00000042', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2, borderRadius: 5 }}>

                                        <Text>{route.params.user_ids.length > 1 ?
                                            <>
                                                {names.map((name) => (
                                                    <Text key={name}>{name}, </Text>
                                                ))}
                                            </>
                                            :
                                            route.params.user_ids[0].name}
                                        </Text>

                                        {
                                            state.allTeam.length > 0 ?
                                                <TouchableOpacity
                                                    onPress={() => setShowpicker(!showpicker)}
                                                    style={{ width: 20, height: 20, borderRadius: 12.5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Edit name='edit' size={20} color={"#000000"} />
                                                </TouchableOpacity>
                                                :
                                                null
                                        }

                                    </View>

                            }

                            {
                                state.allTeam.length > 0 ?
                                    <View style={styles.completeContainerModal}>
                                        <RNCheckBox
                                            style={{}}
                                            onClick={() => selectAllTeam()}
                                            isChecked={assignUser}
                                            checkedCheckBoxColor={COLORS.orange}
                                            uncheckedCheckBoxColor="#807d7d"
                                        />
                                        <Text style={[styles.textHeadingModal, { marginTop: 0, marginBottom: 0, marginLeft: 5 }]}>Assign To all Users</Text>
                                    </View>

                                    :
                                    null
                            }

                            {/* Select Priority Type */}
                            <Text style={styles.textHeadingModal}>Select Priority Type</Text>
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
                        </KeyboardAwareScrollView>

                        {/* Save Button */}
                        <TouchableOpacity style={styles.btnSave} onPress={() => editTask()}>
                            <Check name="checkcircle" size={15} color={COLORS.white} />
                            <Text style={styles.textBottomBtn}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            {/* Delete Modal */}
            <Modal visible={deleteModal} animationType='slide' transparent={true} >
                <View style={styles.modalContainer}>
                    <View style={styles.deleteModalContainer}>
                        {/* Modal Header */}
                        <View style={styles.deleteModalHeader}>
                            <Text style={styles.textDeleteModalHeader}>Delete Task?</Text>
                        </View>

                        {/* Delete Modal Body */}
                        <View style={styles.deleteModalBody}>
                            <Text style={[styles.textinfo, { textAlign: 'center', width: "70%" }]}>Are you sure you want to delete this task?</Text>
                        </View>

                        {/* Delete Modal Buttons */}
                        <View style={styles.deleteBtnContainer}>
                            <TouchableOpacity style={styles.deleteModalBtn} onPress={() => CloseDeleteModal()}>
                                <Text style={[styles.textinfo, { width: '100%' }]}>OK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteModalBtn} onPress={() => { setDeleteModal(false) }}>
                                <Text style={[styles.textinfo, { width: '100%' }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Save Modal */}
            <Modal visible={saveModal} animationType='slide' transparent={true} >
                <View style={styles.modalContainer}>
                    <SuccessModal
                        statement={"Your Task is edited successfully"}
                    />
                </View>
            </Modal>
        </View>
    )
}



// const stylescomment = StyleSheet.create({

// subContainer: {
//     flex: 1,
//         width: "97.5%",
//             alignSelf: 'center',
//                 borderRadius: 5,
//                     elevation: 20,

//                         shadowColor: '#00000042',
//                             shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.5,
//         shadowRadius: 2,
//             marginTop: 10,
//                 backgroundColor: '#ffffff',
//                     padding: 10,
//                         position: 'relative',
//                             zIndex: 1,
//     },
// lowerContainer: {
    // flexDirection: 'row',
    //     justifyContent: 'space-between',
    //         width: "94%",
    //             alignSelf: 'center',
    //                 marginTop: 5
// },
// lowerSubContainer: {
    // flexDirection: 'row',
    //     alignItems: 'flex-start'
// },
// textDateLower: {
    // fontSize: RFValue(7),
    //     fontWeight: '500',
    //         lineHeight: 10,
    //             color: '#878787'
// },
// upperText: {
    // fontSize: RFValue(10),
    //     fontWeight: '500',
    //         lineHeight: 15,
    //             color: "#444444"
// },
// lowerImage: {
    // width: 16,
    //     height: 16,
    //         borderRadius: 2
// }

// })






