import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Check from 'react-native-vector-icons/AntDesign'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../util/Color";

export default function SuccessModal({ statement }) {
    return (
        <View style={styles.successModalContainer}>

            {/* Save Modal Header */}
            <View style={styles.successModalHeader}>
                <Check name="checkcircle" size={20} color={COLORS.green} />
                <Text style={styles.textSuccessModalHeader}>Successfully !!</Text>
            </View>

            {/* Save Modal Body */}
            <View style={[styles.successModalBody, { flex: 0.5 }]}>
                <Text style={styles.textinfo}>{statement}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    successModalContainer: {
        backgroundColor: COLORS.white,
        width: '80%',
        flex: 0.1,
        borderRadius: 10,
        alignSelf: 'center',
        elevation: 6,
    },
    successModalHeader: {
        flex: 0.5,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center",
        alignItems:'center',
        flexDirection:'row'
    },
    textSuccessModalHeader: {
        fontSize: RFValue(18),
        fontWeight: "400",
        lineHeight: 21,
        color: COLORS.green,
        textAlign: 'center',
        marginLeft:10
    },
    successModalBody: {
        flex: 0.4,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    textinfo: {
        fontSize: RFValue(12),
        fontWeight: '500',
        lineHeight: 18,
        color: '#000000',
        textAlign: 'center',
    },
})