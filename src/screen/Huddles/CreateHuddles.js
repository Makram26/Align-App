import { StyleSheet, Text, View, ScrollView, FlatList, Platform, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react'
import CustomStatusBar from "../../component/CustomStatusBar";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CheckBox from '@react-native-community/checkbox';
import { COLORS } from "../../util/Color";
import Header from "../../component/Header";
import Cross from "react-native-vector-icons/Entypo"
import Edit from 'react-native-vector-icons/Feather'
import Arrow from 'react-native-vector-icons/AntDesign'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import Spinner from 'react-native-loading-spinner-overlay';
import AuthContext from '../../Routes/context'
import { CreateMainHuddles, Create_Priority, getAllTeam, getNewTeam, getTeamUserSelection, CreateWeeklyMainHuddles } from '../../services'

const CreateHuddles = ({ navigation, route }) => {
    const focusdescription = useRef(null);
    const type = route.params.state
    // console.log("Types : ", route.params.state)

    const { userID } = useContext(AuthContext)
    const uid = Number(userID)

    const [state, setState] = useState({
        HuddlesName: "",
        description: "",
        allTeam: [],
    })
    const [editDescriptionshow, setEditDescriptionShow] = useState(false)


    

    // const [selectectedItems, SetSelectedItems] = useState([])
    const [isShownPicker, setIsShowPicker] = useState(false)
    const [sendList, setSendList] = useState([])
    const [loading, setLoading] = useState(false)

    // State
    const [allUser, setAllUser] = useState([])

    // Multiple user selection by search
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemNames, setSelectedItemNames] = useState([]);

    const items = [
        { label: 'itachi', value: '1' },
        { label: 'kakashi', value: '2' },
        { label: 'madara', value: '3' },
        { label: 'menato', value: '4' },
        { label: 'naruto', value: '5' },
        { label: 'hinata', value: '6' },
        { label: 'jiraya', value: '7' },
        { label: 'tsunade', value: '8' },
        { label: 'naruto', value: '9' },
        { label: 'sasuke', value: '10' },
        { label: 'hashirama', value: '11' },
        { label: 'tobirama', value: '12' },
        { label: 'pain', value: '13' },
        { label: 'sarada', value: '14' },
        { label: 'sakura', value: '15' },
        { label: 'asura', value: '16' },
        { label: 'indra', value: '17' }
    ]

    useEffect(() => {
        getTeamMember()
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
        setAllUser(newArrayList)
        setState({ ...state, allTeam: newArrayList })
    }

    // Filter Data of user
    const filteredData = allUser.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log("list", selectedItems)

    const showDescriptioninput = () => {
        setEditDescriptionShow(true)
        setTimeout(() => {
            if (focusdescription.current) {
                focusdescription.current.focus();
            }
        }, 0);
        // focusdescription.current.focus()
    }

    const createHudlles = async () => {

        if (state.HuddlesName === "") {
            alert("Please Enter Huddles Name!")
            return true
        }
        try {
            setLoading(true)
            const res = await
                (
                    type === "Daily" ?
                        CreateMainHuddles(state.HuddlesName, selectedItems.length === 0 ? [uid] : selectedItems)
                        :
                        CreateWeeklyMainHuddles(state.HuddlesName, selectedItems.length === 0 ? [uid] : selectedItems)
                )
            if (res.result) {
                console.log("response >>>>>>>>>>>>>>>", res)
                navigation.goBack()
                setLoading(false)
            }
            else {
                alert("Huddles Not Created! Try Again.")
            }
        } catch (error) {
            console.log("error", error)
            setLoading(false)
        }
    }


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
                title={"Create Huddles"}
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>

                <Text style={styles.textHeading}>Short Huddles Name</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Enter Huddles Name'
                    placeholderTextColor={COLORS.placeholder}
                    multiline
                    keyboardType="default"
                    value={state.HuddlesName}
                    onChangeText={(value) => setState({ ...state, HuddlesName: value })}
                />

                {/* Description */}
                {/* <View style={styles.commentsContainer}>
                    <Text style={styles.textComments}>Description</Text>
                    {editDescriptionshow ?


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

                </View> */}

                {
                    allUser.length === 1 ?
                        null
                        :
                        <>
                            < Text style={styles.textHeading}>Assigned To</Text>
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

                            
                        </>
                }


                <TouchableOpacity onPress={() => createHudlles()} style={styles.btn}>
                    <Text>Create Huddles</Text>
                </TouchableOpacity>
               


                {/* <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}>
                    {
                        isShownPicker ?
                            <TouchableOpacity onPress={() => { getTeamId(), setIsShowPicker(!isShownPicker) }} style={{ backgroundColor: COLORS.orange, width: "50%", marginTop: 20, justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 100, alignSelf: "center" }}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                    {
                        sendList.length > 0 ?
                            <TouchableOpacity onPress={() => createHudlles()} style={{ backgroundColor: COLORS.orange, width: "70%", marginTop: 30, justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 100, alignSelf: "center" }}>
                                <Text>Create Huddles</Text>
                            </TouchableOpacity>
                            :
                            null
                    }

                </View> */}




            </ScrollView>
        </View>
    )
}

export default CreateHuddles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    body: {
        flexGrow: 1,
        width: "98%",
        alignSelf: 'center'
    },
    inputText: {
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        paddingHorizontal: 10,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        paddingVertical: Platform.OS === "ios" ? 16 : 10,


        borderRadius: 5
    },
    commentsContainer: {
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10
    },
    textComments: {
        fontSize: RFValue(18),
        fontWeight: '500',
        lineHeight: 27,
        color: '#444444',
        margin: 10,
        marginBottom: 0
    },
    editDescriptionContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 5
    },
    textHeading: {
        fontSize: RFValue(12),
        fontWeight: '500',
        lineHeight: 18,
        color: COLORS.black,
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 2
    },
    pickerStyle: {
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        // paddingHorizontal: 10,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        // paddingVertical:Platform.OS ==="ios"?18:13,

        borderRadius: 5
    },

    btn: {
        backgroundColor: COLORS.green,
        width: "70%",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        alignSelf: "center"
    },

    checkbox: {
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
      },

})