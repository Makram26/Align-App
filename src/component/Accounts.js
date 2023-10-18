import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import Star from 'react-native-vector-icons/Ionicons'
import CheckBox from 'react-native-vector-icons/AntDesign'
import Edit from 'react-native-vector-icons/Feather'
import Exclamation from 'react-native-vector-icons/FontAwesome5'
import Forward from 'react-native-vector-icons/Ionicons'
import Dot from 'react-native-vector-icons/Entypo'
import Down from 'react-native-vector-icons/Feather'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from '../util/Color'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CommentView = ({ image, dueDate }) => {
    return (
        <View style={styles.lowerContainer}>
            <View style={styles.lowerSubContainer}>
                <Dot name="dot-single" size={20} color={COLORS.black} style={{ marginTop: -2 }} />
                <View>
                    <Text style={styles.upperText}>Requirement incomplete</Text>
                    <Text style={styles.textDateLower}>Date : {dueDate}</Text>
                </View>
            </View>
            <Image source={image} style={styles.lowerImage} />
        </View>
    )
}

export default function Accounts({ navigation, name, dueDate, progress, image, priority }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.subContainer} onPress={navigation}>
                <View style={styles.priorityContiner}>
                    <Text style={styles.textPriority}>Priority: </Text>
                    <Exclamation name="exclamation-triangle" size={10} color={COLORS.darkGreen} />
                    <Text style={styles.typePriority}>{priority}</Text>
                </View>

                <View style={styles.upperContainer}>
                    <Star name="star" size={20} color="#D4D4D4" style={{ marginHorizontal: 5 }} />
                    <CheckBox name="checksquare" size={20} color={COLORS.orange} style={{ marginHorizontal: 5 }} />
                    <View style={styles.upperTextContainer}>
                        <View style={{ width: '80%' }}>
                            <Text style={styles.upperTextHeading}>Prioritiy Name: Create the Account</Text>
                            <Text style={styles.upperText}>Due Date : {dueDate}</Text>
                            <Text style={styles.upperText}>Assigned To : {name}</Text>
                        </View>
                        <Image source={image} style={styles.upperImage} />
                    </View>
                </View>
                <Forward name='chevron-forward' size={20} color={COLORS.orange} style={styles.forward} />
            </TouchableOpacity>

            <View style={[styles.subContainer, { backgroundColor: '#EEFAFF', zIndex: 0, paddingBottom: 0 }]}>
                <Text style={styles.lowerHeading}>Comments:</Text>
                <CommentView
                    image={image}
                    dueDate={dueDate}
                />
                <View style={{ borderColor: COLORS.orange, borderWidth: 0.5, marginVertical: 5 }} />
                <CommentView
                    image={image}
                    dueDate={dueDate}
                />
                <Down name='chevron-down' size={20} color={"#000000"} style={{ alignSelf: 'center' }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 12,
    },
    subContainer: {
        flex: 1,
        width: "96%",
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 20,

      shadowColor: '#00000042',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,

        backgroundColor: '#ffffff',
        padding: 10,
        position: 'relative',
        zIndex: 1,
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
        marginLeft: 15,
    },
    upperTextHeading: {
        fontSize: RFValue(10),
        fontWeight: '500',
        lineHeight: 18,
        color: "#444444"
    },
    upperText: {
        fontSize: RFValue(10),
        fontWeight: '500',
        lineHeight: 15,
        color: "#444444"
    },
    upperImage: {
        width: 18,
        height: 18,
        borderRadius: 2
    },
    forward: {
        alignSelf: 'flex-end',
        marginRight: 5
    },

    lowerHeading: {
        fontSize: RFValue(11),
        fontWeight: '600',
        lineHeight: 16,
        color: '#F7941D'
    },
    lowerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "94%",
        alignSelf: 'center',
        marginTop: 5
    },
    lowerSubContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    textDateLower: {
        fontSize: RFValue(7),
        fontWeight: '500',
        lineHeight: 10,
        color: '#878787'
    },
    lowerImage: {
        width: 16,
        height: 16,
        borderRadius: 2
    }



})