 import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'

import Bold from 'react-native-vector-icons/Foundation'
import Italic from 'react-native-vector-icons/MaterialCommunityIcons'
import Underline from 'react-native-vector-icons/MaterialIcons'
import Bullets from 'react-native-vector-icons/MaterialIcons'
import Numbering from 'react-native-vector-icons/MaterialCommunityIcons'

import SubHeader from '../../component/SubHeader'
import styles from '../../constant/Huddles/ParkingLotNoteStyle'

export default function ParkingLotNote({ navigation }) {

    const [description, setDescription] = useState("")
    return (
        <View style={styles.container}>
            <SubHeader
                goBack={() => navigation.goBack()}
                title={"Parking Lot Note"}
                save={() => navigation.goBack()}
            />
            <View style={styles.body}>
                <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'center' }}>
                    <Bold name="bold" size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                    <Italic name="format-italic" size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                    <Underline name="format-underline" size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                    <Bold name='strikethrough' size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                    <Bullets name='format-list-bulleted' size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                    <Numbering name='format-list-numbered' size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                </View>

                <TextInput
                    style={{ borderBottomColor: '#E2E2E2', borderBottomWidth: 1, backgroundColor: '#ffffff', padding: 10 }}
                    placeholder='Add your description here...'
                    placeholderTextColor={"#444444"}
                    keyboardType="default"
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={(value) => setDescription(value)}
                />

            </View>
        </View>
    )
}

