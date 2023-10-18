import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView,FlatList, TouchableOpacity, TextInput, Image, Modal, Dimensions, Alert, } from 'react-native'

import Check from 'react-native-vector-icons/AntDesign'
import Calender from 'react-native-vector-icons/Feather'
import Edit from 'react-native-vector-icons/MaterialIcons'
import Delete from 'react-native-vector-icons/MaterialIcons'
import Exclamation from 'react-native-vector-icons/FontAwesome5'
import Add from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../util/Color'
import SubHeader from '../../component/SubHeader'
import CustomStatusBar from "../../component/CustomStatusBar";
import SuccessModal from '../../component/SuccessModal'
// import styles from '../../constant/Tasks/TaskDetailStyle'
import { RadioButton } from "react-native-paper";
import CheckBox from '@react-native-community/checkbox'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Forward from 'react-native-vector-icons/Ionicons'
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

export default function MemberDetail({ navigation, route }) {

    let MemberRecord = route.params
    console.log("props",  MemberRecord)

    // Modals
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [saveModal, setSaveModal] = useState(false)

    // States
    const [nameModal, setNameModal] = useState("")
    const [emailModal, setEmailModal] = useState("")
    const [mobileModal, setMobileModal] = useState("")

    const saveEditTask = () => {
        setSaveModal(true)

        setTimeout(() => {
            setSaveModal(false);
        }, 2000);

        setEditModal(false)
    }

    return (
        <View style={styles.container}>
            <CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content" />
            {/* Header */}
            <SubHeader
                goBack={() => navigation.goBack()}
                title={"Member Detail"}
                note={""}
            />

            {/* body */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                <Text style={styles.textHeading}>Team Member</Text>
                <Text style={styles.tasks}>Total Member {MemberRecord.length}</Text>
                <FlatList
                    data={MemberRecord}
                    keyExtractor={(stoke) => stoke.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.subContainer} >
                                <Image source={item.image ? item.image : require("../../assest/image/taskIcon.png")} style={styles.image} />
                                <View style={styles.textContainer}>

                                    <Text style={styles.upperText}>
                                        Name : <Text style={{ fontSize: 10, }}>{item.name}</Text>
                                    </Text>
                                    <Text style={styles.upperText}>Email : <Text style={{ fontSize: 10 }}>{item.work_email}</Text> </Text>
                                </View>
                                {/* <Forward name='chevron-forward' size={20} color={COLORS.orange} style={{ marginRight: 0 }} /> */}
                            </TouchableOpacity>
                        )
                    }}
                />

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    subContainer: {
        flex: 1,
        width: "96%",
        marginTop: 12,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        paddingVertical: 15,
        marginBottom: 5,

        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    image: {
        width: "20%",
        height: 75,
        borderRadius: 10,
    },
    textContainer: {
        width: '78%',
        marginLeft: 10,
        // backgroundColor:"red"
    },
    upperTextHeading: {
        fontSize: RFValue(12),
        fontWeight: '500',
        lineHeight: 21,
        color: COLORS.lightestBlack,
        // marginTop: 5
    },
    upperText: {
        fontSize: RFValue(12),
        fontWeight: '500',
        lineHeight: 25,
        color: COLORS.lightestBlack
    },
    textHeading: {
        fontSize: RFValue(20),
        fontWeight: '500',
        lineHeight: 30,
        color: '#000000',
        marginVertical: 15,
        marginLeft: 10
    },
    tasks: {
        fontSize: RFValue(16),
        fontWeight: '500',
        lineHeight: 24,
        color: COLORS.lightestBlack,
        textAlign: 'center',
        marginTop: 15
    },

})
