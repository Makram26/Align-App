import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import Back from 'react-native-vector-icons/Ionicons'
import Notification from 'react-native-vector-icons/Ionicons'
import styles from "../constant/HeaderStyle";
import { COLORS } from '../util/Color'

export default function Header({ goBack, title }) {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
            <TouchableOpacity onPress={goBack}>
                <Back name='arrow-back' size={25} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            </View>

            <View style={styles.rightContainer}>
                <Notification name="notifications-outline" size={25} color={COLORS.white} style={{ marginRight: 10 }} />
                <Image source={require("../assest/image/ProfileImage.png")} style={styles.image} />
            </View>
        </View>
    )
}

