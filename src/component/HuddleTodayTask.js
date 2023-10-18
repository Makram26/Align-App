import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'

import Star from 'react-native-vector-icons/Ionicons'
import CheckBox from 'react-native-vector-icons/AntDesign'
import Edit from 'react-native-vector-icons/Feather'
import Exclamation from 'react-native-vector-icons/FontAwesome5'
import Forward from 'react-native-vector-icons/Ionicons'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../util/Color"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HuddleTodayTask({ onpress, name, task, dueDate, assigned, image, priority,status }) {

    return (
        <TouchableOpacity style={styles.subContainer} onPress={onpress}>

            {
                priority !== "" && priority !== undefined ?
                    <View style={styles.priorityContiner}>
                        <Text style={styles.textPriority}>Priority: </Text>
                        <Exclamation name="exclamation-triangle" size={10} color={priority === "High" ? COLORS.darkGreen : priority === "Medium" ? COLORS.yellow : priority === "Low" ? COLORS.red : null} />
                        <Text style={[styles.typePriority, { color: priority === "High" ? COLORS.darkGreen : priority === "Medium" ? COLORS.yellow : priority === "Low" ? COLORS.red : null }]}>{priority}</Text>
                    </View>
                    :
                    null
            }

            <View style={styles.upperContainer}>
                <Star name="star" size={20} color={COLORS.silver} style={{ marginHorizontal: 5 }} />
                <CheckBox name="checksquare" size={20} color={status !== "done" ? COLORS.lightestBlack : COLORS.orange} style={{ marginHorizontal: 5 }} />
                <View style={styles.upperTextContainer}>
                    <View style={{ width: '95%' }}>
                        <Text style={styles.upperTextHeading}>Task Name:{name}</Text>
                        <Text style={styles.upperText}>Due Date : {dueDate}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{width:"99%"}}>
                            <Text style={styles.upperText}>Assigned To : {assigned}</Text>

                            </View>
                            <Forward name='chevron-forward' size={20} color={COLORS.orange} style={{ alignSelf: 'flex-end', }} />

                        </View>

                    </View>
                    {/* <Image source={image} style={styles.upperImage} /> */}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        width: "96%",
        marginTop: 12,
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginBottom: 5,

        backgroundColor: COLORS.white,
        padding: 10,
    },
    priorityContiner: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 5
    },
    textPriority: {
        fontSize: RFValue(8),
        fontWeight: '500',
        lineHeight: 12,
        color: '#636363',
        marginRight: 5
    },
    typePriority: {
        fontSize: RFValue(8),
        fontWeight: '500',
        lineHeight: 12,
        color: COLORS.darkGreen,
        marginLeft: 5
    },
    upperContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    upperTextContainer: {
        width: '77%',
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: 7,
    },
    upperTextHeading: {
        fontSize: RFValue(10),
        fontWeight: '500',
        lineHeight: 22,
        color: COLORS.lightestBlack
    },
    upperText: {
        fontSize: RFValue(10),
        fontWeight: '500',
        lineHeight: 18,
        color: COLORS.lightestBlack
    },
    upperImage: {
        width: 18,
        height: 18,
        borderRadius: 2
    },

})