import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import Back from 'react-native-vector-icons/Ionicons'
import Check from 'react-native-vector-icons/Ionicons'
import { COLORS } from "../util/Color";
import styles from "../constant/HeaderStyle";

export default function SubHeader({ goBack, title, save,note }) {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={goBack}>
                    <Back name='arrow-back' size={25} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

            <View style={styles.rightContainer}>
                {
                    note !== "" ?
                        <TouchableOpacity onPress={save}>
                            <Check name="ios-checkmark-sharp" size={25} color={COLORS.white} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                        :
                        null
                }
            </View>
        </View>
    )
}

