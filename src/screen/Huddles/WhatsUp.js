import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import Bold from 'react-native-vector-icons/Foundation'
import Italic from 'react-native-vector-icons/MaterialCommunityIcons'
import Underline from 'react-native-vector-icons/MaterialIcons'
import Bullets from 'react-native-vector-icons/MaterialIcons'
import Numbering from 'react-native-vector-icons/MaterialCommunityIcons'

import SubHeader from '../../component/SubHeader'
import styles from '../../constant/Huddles/WhatsUpStyle'

export default function WhatsUp({ navigation }) {

    const [description, setDescription] = useState("")
    const [fontWeightt, changefontWeight] = useState(false)
    const [fontItalic, changefontItalic] = useState(false)
    const [fontUnderline, changefontUnderline] = useState(false)
    const [fontCross, changefontCross] = useState(false)

    return (
        <View style={styles.container}>
            <SubHeader
                goBack={() => navigation.goBack()}
                title={"What's Up"}
                save={() => navigation.goBack()}
            />
            <View style={styles.body}>
                <View style={styles.menuContiner}>
                    <TouchableOpacity onPress={() => changefontWeight(!fontWeightt)}>
                        <Bold name="bold" size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => changefontItalic(!fontItalic)}>
                        <Italic name="format-italic" size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => changefontUnderline(!fontUnderline)}>
                        <Underline name="format-underline" size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => changefontCross(!fontCross)}>
                        <Bold name='strikethrough' size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                    </TouchableOpacity>

                    <Bullets name='format-list-bulleted' size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                    <Numbering name='format-list-numbered' size={20} color="#444444" style={{ marginHorizontal: 12 }} />
                </View>

                <TextInput
                    style={[{ borderBottomColor: '#E2E2E2', borderBottomWidth: 1, backgroundColor: '#ffffff', padding: 10, }, { fontWeight: fontWeightt ? "bold" : "normal" }, { fontStyle: fontItalic ? 'italic' : 'normal' }, { textDecorationLine: fontUnderline ? 'underline' : 'none' }, { textDecorationLine: fontCross ? 'line-through' : 'none' },]}
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

