import { StyleSheet, Text, View, ScrollView, Platform, TouchableOpacity, TextInput, Keyboard, FlatList } from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react'
import CustomStatusBar from "../../component/CustomStatusBar";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../util/Color";
import Header from "../../component/Header";
import Cross from "react-native-vector-icons/Entypo"
import Edit from 'react-native-vector-icons/Feather'
import Arrow from 'react-native-vector-icons/AntDesign'
import Add from 'react-native-vector-icons/Ionicons'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import Spinner from 'react-native-loading-spinner-overlay';
import { CreateMainHuddles, Create_Priority, getAllTeam } from '../../services'
import AuthContext from '../../Routes/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HuddlesDetails = ({ navigation, route }) => {

  const { userID } = useContext(AuthContext)
  console.log("User ID :", userID)

  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');

  const type = route.params.state
  const adminRights1 = route.params.adminRights === "false" ? false: true
  console.log("is Admin ? :", adminRights1)
  
  const id = route.params.item.id
  const mainHuddleName = route.params.item.name
  console.log("Main Huddle Name : ", route.params.item.name)
  const attendees = route.params.item.huddle_attendees
  const ids = attendees.map(item => item.id)
  console.log(ids)

  // Search Bar
  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const subHuddles = type === "Daily" ? route.params.item.grow_huddles_ids : route.params.item.weekly_huddles_ids
  // console.log("SUB Huddles", subHuddles)

  const filteredData = subHuddles.filter(d =>
    d.create_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.user_id.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomStatusBar backgroundColor={COLORS.orange} barStyle="light-content" />

      {
        loading ?
          <Spinner visible={true} />
          :
          null
      }

      <Header
        goBack={() => navigation.goBack()}
        title={"Huddles Details"}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>

        <TouchableOpacity
          onPress={() => navigation.navigate("CreateHuddlesDetails", { id, type })}
          style={styles.btnCreatePriority}>
          <Add name="ios-add-circle" size={12} color={COLORS.white} />
          <Text style={styles.textCreatePriority}>Create Huddles Details</Text>
        </TouchableOpacity>

        {/* Search Bar */}
        <TextInput
          style={styles.inputText}
          placeholder='Search here...'
          placeholderTextColor={COLORS.white}
          keyboardType="default"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {
          ids.includes(userID) || adminRights1
            ?
            filteredData.length > 0 ?
              <>
                {/* Priority Data */}
                <FlatList
                  data={filteredData}
                  keyExtractor={(stoke) => { stoke.id }}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity onPress={() => navigation.navigate("Huddles", { item, type, mainHuddleName })}>
                        <View style={styles.recordView}>
                          {
                            type === "Daily" ?
                              <Text style={{ color: COLORS.black }}>{item.date}</Text>
                              :
                              <Text style={{ color: COLORS.black }}>{item.create_date.substring(0, 10)}</Text>
                          }

                          <Text style={{ color: COLORS.black }}>{item.user_id.name}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  }}
                />
              </>
              :
              <Text style={{ color: 'red', marginLeft: 12 }}>No record found</Text>
            :
            <Text style={{color: 'red', fontSize: 20, justifyContent:'center', alignItems:'center', textAlign:'center', }}>You are not in huddle</Text>
        }
      </ScrollView>

    </View>
  )
}

export default HuddlesDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  body: {
    flexGrow: 1,
    width: "98%",
    alignSelf: 'center'
  },
  btnCreatePriority: {
    backgroundColor: COLORS.green,
    width: "95%",
    borderRadius: 2,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    marginVertical: 20
  },
  textCreatePriority: {
    fontSize: RFValue(12),
    fontWeight: "500",
    lineHeight: 18,
    color: COLORS.white,
    textTransform: 'uppercase',
    marginLeft: 5
  },
  recordView: {
    flex: 1,
    width: "96%",
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: '#00000042',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 9,
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 10,
  },
  inputText: {
    backgroundColor: COLORS.silver,
    width: '96%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    elevation: 20,
    shadowColor: '#00000042',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    paddingVertical: Platform.OS === "ios" ? 18 : 13,
    borderRadius: 10
  }
})