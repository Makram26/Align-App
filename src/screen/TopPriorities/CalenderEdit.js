import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, Keyboard, TouchableOpacity, TextInput } from 'react-native'

import Bold from 'react-native-vector-icons/Foundation'
import Italic from 'react-native-vector-icons/MaterialCommunityIcons'
import Underline from 'react-native-vector-icons/MaterialIcons'
import Bullets from 'react-native-vector-icons/MaterialIcons'
import Numbering from 'react-native-vector-icons/MaterialCommunityIcons'
import Check from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../../util/Color'
import SubHeader from '../../component/SubHeader'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import styles from '../../constant/TopPriorities/CalenderEditStyle'
// import CheckBox from '@react-native-community/checkbox'
import CheckBox from 'react-native-check-box'

import CustomStatusBar from "../../component/CustomStatusBar";
import { UpdateTopPriority } from '../../services'

import Spinner from 'react-native-loading-spinner-overlay';



export default function CalenderEdit({ navigation, route }) {

    console.log("props", route.params)


    const [description, setDescription] = useState(route.params.note)
    const [completed, setCompleted] = useState(route.params.completed)
    const [loading, setLoading] = useState(false)

    // const [bold,setBold]=useState(false)


    const [state, setState] = useState({
        textBold: false,
        textItalic: false,
        textunderline: false,
        textUpperline: false
    })



    const editTopPriority = async () => {
        setLoading(true)
        try {
            const res = await UpdateTopPriority(description, completed, route.params.id)
            console.log('response', res)
            if (res.result) {
                setLoading(false)
                navigation.goBack()
            }
            else {
                alert("Not Edit Top Priority!")
                setLoading(false)
            }
        } catch (error) {
            console.log("error", error)
            setLoading(false)
        }
    }


    // alert(description)

    // const changeTextStyle=(value)=>{
    //        console.log("value",value)


    //         if(value === true){
    //             setState({...state,textBold:"bold"})
    //         }
    //         else {
    //             setState({...state,textBold:"normal"})

    //         }



    // }


    return (
        <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

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
                title={"Top Priority Calender"}
                save={() => editTopPriority()}
                note={description}
            />

            <View style={styles.body}>
                <View style={{ ...styles.dateContainer, alignItems: "center" }}>
                    <Text style={styles.textDate}>{route.params.date}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                        {/* <CheckBox
                            disabled={false}
                            value={completed}
                            boxType="square"
                            onFillColor={COLORS.orange}
                            onTintColor={COLORS.orange}
                            onCheckColor={"#FFFFFF"}
                            onValueChange={(newValue) => setCompleted(newValue)}
                            tintColors={{ true: COLORS.orange, false: COLORS.lightBlack }}
                            style={{}}
                        /> */}
                        <CheckBox
                            style={{}}
                            onClick={() => setCompleted(!completed)}
                            isChecked={completed}
                            // leftText={"Complete"}
                            // rightText={"any right txt"}
                            // rightTextStyle={{fontSize:19,color:completed? "green":"black",fontWeight:"bold"}}
                            checkedCheckBoxColor={COLORS.orange}
                            uncheckedCheckBoxColor="#807d7d"
                        // disabled
                        // leftText='any leftText'
                        // leftTextStyle={{textAlign:"center",fontSize:15,color:"black",marginRight:10}}
                        />
                        <Text style={[styles.textComplete, { marginLeft: 5 }]}>{completed ? "Completed" : "Complete"}</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => setState({ ...state, textBold: !state.textBold })}>
                        <Bold name="bold" size={20} color={COLORS.lightestBlack} style={{ marginHorizontal: 12 }} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setState({ ...state, textItalic: !state.textItalic })}>
                        <Italic name="format-italic" size={20} color={COLORS.lightestBlack} style={{ marginHorizontal: 12 }} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setState({ ...state, textunderline: !state.textunderline })}>
                        <Underline name="format-underline" size={20} color={COLORS.lightestBlack} style={{ marginHorizontal: 12 }} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setState({ ...state, textUpperline: !state.textUpperline })}>
                        <Bold name='strikethrough' size={20} color={COLORS.lightestBlack} style={{ marginHorizontal: 12 }} />

                    </TouchableOpacity>
                    {/* <Bullets name='format-list-bulleted' size={20} color={COLORS.lightestBlack} style={{ marginHorizontal: 12 }} />
                    <Numbering name='format-list-numbered' size={20} color={COLORS.lightestBlack} style={{ marginHorizontal: 12 }} /> */}
                </View>

                <TextInput
                    style={{ ...styles.inputText, fontWeight: state.textBold ? "bold" : "normal", fontStyle: state.textItalic ? "italic" : "normal", textDecorationLine: state.textunderline ? "underline" : state.textUpperline ? "line-through" : "none", }}
                    placeholder='Sugestion text goes here...'
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

            </View>
        </ScrollView>
    )
}

