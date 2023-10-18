import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, Modal, Platform } from 'react-native'

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
import CheckBox from '@react-native-community/checkbox'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import CustomStatusBar from "../../component/CustomStatusBar";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CreateMember({ navigation, route }) {

    // State
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [saveModal, setSaveModal] = useState(false)

    // Add Modal Open for 2 seconds
    const addMember = () => {
        setSaveModal(true)
        setTimeout(() => {
            setSaveModal(false);
        }, 2000);
    }

    return (
        <View style={styles.container}>

<CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content" />


            {/* Header */}
            <SubHeader
                goBack={() => navigation.goBack()}
                title={"Create Member"}
                save={""}
            />

            {/* body */}
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body} keyboardShouldPersistTaps='always'>

                {/* Image */}
                <Image source={require("../../assest/image/Imagebg.png")} style={styles.image} />
                <Add name="ios-add-circle" size={25} color={COLORS.orange} style={[styles.addIcon, {marginBottom: 30}]} />

                {/* Task Name */}
                <Text style={styles.textHeading}>Member Name</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Enter Name...'
                    placeholderTextColor={COLORS.placeholder}
                    keyboardType="default"
                    value={name}
                    onChangeText={(value) => setName(value)}
                />

                {/* Due Date */}
                <Text style={styles.textHeading}>Mobile No.</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='0302-9513962'
                    placeholderTextColor={COLORS.placeholder}
                    keyboardType="number-pad"
                    value={mobile}
                    onChangeText={(value) => setMobile(value)}
                />

                {/* Assigned To */}
                <Text style={styles.textHeading}>Email</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder='Enter Email'
                    placeholderTextColor={COLORS.placeholder}
                    keyboardType="default"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />




            </KeyboardAwareScrollView>

            {/* Buttons */}
            <View style={{...styles.bottomBtnContainer,marginBottom:Platform.OS === "ios"?20:0}}>
                <TouchableOpacity style={styles.btnSave} onPress={() => addMember()}>
                    <Check name="checkcircle" size={15} color={COLORS.white} />
                    <Text style={styles.textBottomBtn}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnSave, { width: '75%', backgroundColor: '#ffffff' }]} onPress={() => addMember()}>
                    <Add name="ios-add-circle" size={15} color={COLORS.green} />
                    <Text style={[styles.textBottomBtn, { color: COLORS.green }]}>Save and add another</Text>
                </TouchableOpacity>
            </View>

            {/* Save Modal */}
            <Modal visible={saveModal} animationType='slide' transparent={true} >
                <View style={styles.modalContainer}>
                    <SuccessModal
                        statement={"New Member created successfully"}
                    />
                </View>
            </Modal>
        </View>
    )
}

