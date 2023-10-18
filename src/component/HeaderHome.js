import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import Menu from 'react-native-vector-icons/Feather'
import Notification from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../util/Color'
import styles from "../constant/HeaderStyle";

export default function HeaderHome({ drawerOpen,onPress }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={drawerOpen}>
                <Menu name='menu' size={25} color={COLORS.white} />
            </TouchableOpacity>

            <View style={styles.rightContainer}>
                <TouchableOpacity >
                <Notification name="notifications-outline" size={25} color={COLORS.white} style={{ marginRight: 10 }} />

                </TouchableOpacity>
                <Image source={require("../assest/image/ProfileImage.png")} style={styles.image} />
            </View>
        </View>
    )
}

