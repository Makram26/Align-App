import React, { useState, useEffect, useContext } from "react";
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, FlatList, Dimensions } from "react-native";

import Add from 'react-native-vector-icons/Ionicons'
import Header from "../../component/Header";
import Priority from "../../component/Priority";
import { PriorityPersons } from "../../data/PriorityData";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from "../../util/Color";
import styles from "../../constant/Priorities/PrioritiesStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';

import CustomStatusBar from "../../component/CustomStatusBar";
import { getAllPriority } from "../../services";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Priorities({ navigation }) {

  const [state, setState] = useState({
    // AllPriority: [],
    ownerName: "",
    admin: ""
  })

  const [loading, setLoading] = useState(false)

  // Search Bar
  const [allPriorities, setAllPriority] = useState([])
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    getPriority()
    const unsubscribe = navigation.addListener('focus', () => {
      getPriority()
    });
    return () => {
      unsubscribe;
    };
  }, [])

  const getPriority = async () => {
    setLoading(true)
    // const Admin = await AsyncStorage.getItem('admin')
    // setState({ ...state, ownerName: await AsyncStorage.getItem('username') })
    // setAdminRights(Admin)
    try {
      const res = await getAllPriority()
      console.log("response", res.result)
      // setState({ ...state, AllPriority: res.result })
      setAllPriority(res.result)
      setLoading(false)
    } catch (error) {
      console.log("error", error)
      setLoading(false)

    }
  }

  // Search Bar
  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const filteredData = allPriorities.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.create_uid.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // console.log("All Priorities are :", allPriorities.name)

  return (
    <View style={styles.container}>

      {
        loading ?
          <Spinner visible={true} />
          :
          null
      }

      <CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content" />

      {/* Header */}
      <Header
        goBack={() => navigation.goBack()}
        title={"Priority Tasks"}
      />

      {/* body */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>

        {/* Create Priority Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("CreatePriority", { 'comesFrom': 'Priorities' })}
          style={styles.btnCreatePriority}>
          <Add name="ios-add-circle" size={12} color={COLORS.white} />
          <Text style={styles.textCreatePriority}>Create Priority</Text>
        </TouchableOpacity>

        {/* {
          adminRights === "true" ?
            
            :
            null
        } */}

        {/* Search Bar */}
        <TextInput
          style={styles.inputText}
          placeholder='Search here...'
          placeholderTextColor={COLORS.white}
          keyboardType="default"
          value={searchQuery}
          onChangeText={handleSearch}
        />


        {/* Priority Data */}
        {
          filteredData.length > 0 ?
            <FlatList
              data={filteredData}
              keyExtractor={(stoke) => { stoke.id }}
              renderItem={({ item }) => {
                return (
                  <Priority
                    name={item.name}
                    // progress={item.progress}
                    owner={item.create_uid.name}
                    task={item.task_ids}
                    progress={item.done_task_count != 0 ? Math.round((item.done_task_count / item.task_count) * 100) : 0}
                    // status={item.status}
                    rating={item.priority_kanban}
                    navigation={() => navigation.navigate("PriorityProgress", item)}
                  />
                )
              }}
            />
            :
            <Text style={{ color: 'red', marginLeft: 12 }}>No record found</Text>
        }

      </ScrollView>
    </View>
  );
};

