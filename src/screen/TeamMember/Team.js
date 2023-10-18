import React, { useState, useEffect, useContext } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";

import Add from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../util/Color";
import Header from "../../component/Header";
import { TeamPerson } from "../../data/teamData";
import TeamMember from "../../component/TeamMember";
import styles from "../../constant/Tasks/TaskStyle";
import CustomStatusBar from "../../component/CustomStatusBar";
import { getAllTeam } from "../../services";
import { getNewTeam } from "../../services";
import { getAlJalilTeam } from "../../services";

import Spinner from 'react-native-loading-spinner-overlay';


export default function Team({ navigation }) {
    const [loading, setLoading] = useState(false)

    const [state, setState] = useState({
        allTeam: [],
        newTeam: [],

    })

    // useEffect(() => {
    //     getTeamMember()
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         getTeamMember()
    //     });
    //     return () => {
    //         unsubscribe;
    //     };

    // }, [])

    // const getTeamMember = async () => {
    //     setLoading(true)
    //     let tempRecord = []

    //     try {
    //         const res = await getAllTeam()
    //         // console.log("res>>>>>>>>>>>>>",res.result)
    //         tempRecord = res.result
    //         setLoading(false)
    //     } catch (error) {
    //         console.log("error", error)
    //         setLoading(false)

    //     }
    //     setState({ ...state, allTeam: tempRecord })
    // }

    useEffect(() => {
        getNewTeamMember()
        const unsubscribe = navigation.addListener('focus', () => {
            getNewTeamMember()
        });
        return () => {
            unsubscribe;
        };
    }, [])

    const getNewTeamMember = async () => {
        setLoading(true)
        let tempRecord = []

        try {
            const res = await getNewTeam()
            // console.log("res>>>>>>>>>>>>>",res.result)
            tempRecord = res.result
            setLoading(false)
        } catch (error) {
            console.log("error", error)
            setLoading(false)

        }
        setState({ ...state, newTeam: tempRecord })
    }

    console.log("aljalil Users: ", state.newTeam)

    return (
        <View style={styles.container}>
            <CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content" />

            {
                loading ?
                    <Spinner visible={true} />
                    :
                    null
            }

            {/* Header */}
            <Header
                goBack={() => navigation.goBack()}
                title={"Team"}
            />

            {/* body */}
            <ScrollView contentContainerStyle={styles.body}>
                {
                    state.newTeam.length > 0 ?
                        <Text style={styles.tasks}>Total Team {state.newTeam.length}</Text>
                        :
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, color: "red" }}>Don't Have any Team!</Text>
                        </View>
                }

                <FlatList
                    data={state.newTeam}
                    keyExtractor={(stoke) => stoke.id}
                    renderItem={({ item }) => {
                        return (
                            <TeamMember
                                department={item.department_id.name}
                                name={item.name}
                                email={item.work_email}
                                child_count={item.child_all_count}
                                image={item.image}
                                navigation={() => navigation.navigate('MemberDetail', item.child_ids)}
                            />
                        )
                    }}
                />

            </ScrollView>
        </View>
    );
};