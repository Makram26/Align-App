import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'

import Forward from 'react-native-vector-icons/Ionicons'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../util/Color"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function TeamMember({ navigation, department, name, email, child_count, image }) {
    return (
        <TouchableOpacity style={styles.subContainer} onPress={navigation}>
            <Image source={image?image:require("../assest/image/taskIcon.png")}  style={styles.image}/>
            <View style={styles.textContainer}>
                <Text style={styles.upperTextHeading}>Department : <Text style={{fontSize:10}}>{department}</Text></Text>  
                <Text style={styles.upperText}>Manager : <Text style={{fontSize:10}}>{name}</Text></Text>
                <Text style={styles.upperText}>Email : <Text style={{fontSize:10}}>{email}</Text> </Text>
                <Text style={styles.upperText}>Users : <Text style={{fontSize:10}}>{child_count}</Text> </Text>
            </View>
            <Forward name='chevron-forward' size={20} color={COLORS.orange} style={{ marginRight: 0 }} />
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
        backgroundColor: COLORS.white,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        padding:10,
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
        height:75, 
        borderRadius: 10, 
    },
    textContainer: {
        width: '70%', 
        marginLeft: 10 
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
        lineHeight: 18,
        color: COLORS.lightestBlack
    },

})