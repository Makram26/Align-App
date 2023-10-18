import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Dimensions, Button } from 'react-native'
import { RadioButton } from "react-native-paper";
import Exclamation from 'react-native-vector-icons/FontAwesome5'
import CheckBox from "@react-native-community/checkbox";
// import StarReview from "react-native-stars";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from "react-native-star-rating";
import moment from 'moment';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-gesture-handler";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const libraryData = [
    {
        id: 1,
        name: "Jahanzaib",
        role: "Developer",
    },
    {
        id: 2,
        name: "Ikram",
        role: "Developer",
    },
    {
        id: 3,
        name: "Kashif",
        role: "Developer",
    },
    {
        id: 4,
        name: "Waseem",
        role: "Developer",
    },
    {
        id: 5,
        name: "Usama",
        role: "Developer",
    },
    {
        id: 6,
        name: "Jahanzaib",
        role: "Developer",
    },
    {
        id: 7,
        name: "Ikram",
        role: "Developer",
    },
    {
        id: 8,
        name: "Kashif",
        role: "Developer",
    },
    {
        id: 9,
        name: "Waseem",
        role: "Developer",
    },
    {
        id: 10,
        name: "Usama",
        role: "Developer",
    }, {
        id: 11,
        name: "Jahanzaib",
        role: "Developer",
    },
    {
        id: 12,
        name: "Ikram",
        role: "Developer",
    },
    {
        id: 13,
        name: "Kashif",
        role: "Developer",
    },
    {
        id: 14,
        name: "Waseem",
        role: "Developer",
    },
    {
        id: 15,
        name: "Usama",
        role: "Developer",
    },
]

const items = [
    { label: 'itachi', value: '1' },
    { label: 'kakashi', value: '2' },
    { label: 'madara', value: '3' },
    { label: 'menato', value: '4' },
    { label: 'naruto', value: '5' },
    { label: 'hinata', value: '6' },
    { label: 'jiraya', value: '7' },
    { label: 'tsunade', value: '8' },
    { label: 'naruto', value: '9' },
    { label: 'sasuke', value: '10' },
    { label: 'hashirama', value: '11' },
    { label: 'tobirama', value: '12' },
    { label: 'pain', value: '13' },
    { label: 'sarada', value: '14' },
    { label: 'sakura', value: '15' },
    { label: 'asura', value: '16' },
    { label: 'indra', value: '17' }
]


export default function Test() {

    const [priority, setPriority] = useState('High');
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [rating, setRating] = useState(0)
    console.log(rating)

    // Multiple user selection by search
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemNames, setSelectedItemNames] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const filteredData = libraryData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // const filteredData = [{ id: 'select-all', name: 'Select All' }, ...libraryData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))];

    // Week days data through API
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        // Initialize with the current week's start and end dates
        const now = moment();
        const startOfWeek = now.clone().startOf('isoWeek').add(3, 'days');;
        const endOfWeek = now.clone().endOf('isoWeek').add(3, 'days');
        setStartDate(startOfWeek);
        setEndDate(endOfWeek);
    }, []);

    const showWeekData = () => {
        // Fetch and display the data for the current week (startDate and endDate)
        // Make an API call using the startDate and endDate
        // Update your data state with the received data
        // Display the data in your component
    };

    const previousWeek = () => {
        // Update the startDate and endDate to display the previous week's data
        setStartDate(startDate.clone().subtract(1, 'week'));
        setEndDate(endDate.clone().subtract(1, 'week'));
    };

    const nextWeek = () => {
        // Update the startDate and endDate to display the next week's data
        setStartDate(startDate.clone().add(1, 'week'));
        setEndDate(endDate.clone().add(1, 'week'));
    }

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.textHeading}>Test for Font Size</Text>
            <Text style={styles.textRefrence}>Test for Font Size</Text>
            <Text style={styles.textDimensions}>Test for Font Size</Text>
            <Text></Text>
            <Text style={[styles.textHeading, { fontSize: 14, }]}>Test for Font Size</Text>
            <Text style={[styles.textRefrence, { fontSize: RFValue(14) }]}>Test for Font Size</Text>
            <Text style={[styles.textDimensions, { fontSize: windowWidth / 29.5 }]}>Test for Font Size</Text>

            <View style={styles.radiobtnContainer}>
                <View style={styles.singleRadiobtn}>
                    <RadioButton
                        value="High"
                        status={priority === 'High' ? 'checked' : 'unchecked'}
                        onPress={() => setPriority('High')}
                        color="#00C94E"
                        uncheckedColor="#D4D4D4"
                    />
                    <Text style={styles.textRadiobtn}>High</Text>
                    <Exclamation name="exclamation-triangle" size={12} color="#00C94E" />
                </View>

                <View style={styles.singleRadiobtn}>
                    <RadioButton
                        value="Medium"
                        status={priority === 'Medium' ? 'checked' : 'unchecked'}
                        onPress={() => setPriority('Medium')}
                        color="#F7941D"
                        uncheckedColor="#D4D4D4"
                    />
                    <Text style={[styles.textRadiobtn, { color: '#F7941D' }]}>Medium</Text>
                    <Exclamation name="exclamation-triangle" size={12} color="#F7941D" />
                </View>

                <View style={styles.singleRadiobtn}>
                    <RadioButton
                        value="Low"
                        status={priority === 'Low' ? 'checked' : 'unchecked'}
                        onPress={() => setPriority('Low')}
                        color="#EC0000"
                        uncheckedColor="#D4D4D4"
                    />
                    <Text style={[styles.textRadiobtn, { color: '#EC0000' }]}>High</Text>
                    <Exclamation name="exclamation-triangle" size={12} color="#EC0000" />
                </View>
            </View>

            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: "#300000", false: "#000000" }}
            />

            <StarRating
                disabled={false}
                maxStars={5}
                rating={rating}
                selectedStar={(rating) => setRating(rating)}
                // animation Types are ["bounce","flash","jello","pulse","rotate","rubberBand","shake","swing","tada","wobble"].
                // animation= {"flash"}
                containerStyle={{ width: '70%', backgroundColor: 'silver', justifyContent: 'center' }}
                buttonStyle={{ backgroundColor: '#ffffff', width: windowWidth / 10, justifyContent: 'center', alignItems: 'center', padding: 5, }}
                starSize={20}
                activeOpacity={0.5}
                iconSet={'FontAwesome'}
                emptyStar={'star'}
                emptyStarColor={"#D4D4D4"}
                halfStarEnabled={true}
                halfStar={'star-half'}
                halfStarColor={"#F7C71D"}
                fullStar={'star'}
                fullStarColor={'#F7C71D'}
                reversed={false}
            // starStyle={{flex: 0.5}}
            />

            {/* Multiple user Selection by */}
            <Text>{selectedItemNames.join(', ')}</Text>
            <TextInput
                style={{ width: '40%', height: 30, borderColor: 'gray', borderWidth: 1, marginTop: 15, }}
                placeholder="Enter user name"
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
            />
            <View style={{ flex: 0.4 }}>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            {/* only single user selection and show above */}
                            {/* <CheckBox
                                value={selectedItems.includes(item.id)}
                                onValueChange={value => {
                                    setSelectedItems(newSelectedItems => {
                                        const newSelectedIds = value
                                            ? [...newSelectedItems, item.id]
                                            : newSelectedItems.filter(id => id !== item.id);
                                        setSelectedItemNames(
                                            newSelectedIds.length === 0
                                                ? []
                                                : [libraryData.find(dataItem => dataItem.id === item.id).name]
                                        );
                                        return newSelectedIds;
                                    });
                                }}
                            /> */}
                            <CheckBox
                                value={selectedItems.includes(item.id)}
                                onValueChange={value => {
                                    setSelectedItems(newSelectedItems => {
                                        const newSelectedIds = value
                                            ? [...newSelectedItems, item.id]
                                            : newSelectedItems.filter(id => id !== item.id);
                                        setSelectedItemNames(
                                            newSelectedIds.map(selectedId =>
                                                libraryData.find(dataItem => dataItem.id === selectedId).name
                                            )
                                        );
                                        return newSelectedIds;
                                    });
                                }}
                            />
                            <Text>{item.name}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <Button title="Submit" onPress={() => console.log(selectedItems)} />

            {/* Multiple User Selection by Search */}
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
            />
            <Text>{selectedItemNames.join(', ')}</Text>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBox
                            value={selectedItems.includes(item.id)}
                            onValueChange={value => {
                                setSelectedItems(newSelectedItems => {
                                    const newSelectedIds = value
                                        ? [...newSelectedItems, item.id]
                                        : newSelectedItems.filter(id => id !== item.id);
                                    setSelectedItemNames(
                                        newSelectedIds.map(selectedId =>
                                            libraryData.find(dataItem => dataItem.id === selectedId).name
                                        )
                                    );
                                    setSelectAll(
                                        newSelectedIds.length === filteredData.length
                                    );
                                    return newSelectedIds;
                                });
                            }}
                        />
                        <Text>{item.name}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
            <View style={{}}>
                <Button title="Select All" onPress={() => setSelectedItems(filteredData.map(item => item.id))} />
                <Button title="Clear Selection" onPress={() => {
                    setSelectedItems([]);
                    setSelectedItemNames([]);
                    setSelectAll(false);
                }} />
            </View>
            <Button title="Submit" onPress={() => console.log(selectedItems)} />


            {/* Multiple User Selection from dropdown menu */}
            {/* <View style={styles.pickerStyle}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                    <Text>Please Select Multiple users</Text>
                    {
                        isShownPicker ?
                            <TouchableOpacity onPress={() => { getTeamId(), setIsShowPicker(!isShownPicker) }}>
                                <Arrow name='up' size={20} color="#000000" />

                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { getTeamId(), setIsShowPicker(!isShownPicker) }}>
                                <Arrow name='down' size={20} color="#000000" />

                            </TouchableOpacity>
                    }
                </View>
                {isShownPicker ? <MultipleSelectPicker
                    items={state.allTeam}
                    onSelectionsChange={(ele) => SetSelectedItems(ele)}
                    selectedItems={selectectedItems}
                    buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                    buttonText='hello'
                    checkboxStyle={{ height: 20, width: 20 }}

                />
                    : null
                }

                {(selectectedItems || []).map((item, index) => {
                    return <Text key={index} style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>
                        {item.label}
                    </Text>
                })}
            </View> */}

            <View>
                <Text>Start Date: {startDate && startDate.format('DD-MM-YYYY')}</Text>
                <Text>End Date: {endDate && endDate.format('YYYY-MM-DD')}</Text>
                <Button title="Previous" onPress={previousWeek} />
                <Button title="Next" onPress={nextWeek} />
                <Button title="Show Data" onPress={showWeekData} />
                {/* Display your data here */}
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // alignItems: 'center',
        width: "94%",
        alignSelf: 'center'
    },
    textHeading: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000000',
    },

    textRefrence: {
        fontSize: RFValue(12),
        fontWeight: '400',
        color: '#000000',
    },
    textDimensions: {
        fontSize: windowWidth / 34,
        fontWeight: '400',
        color: '#000000',
    },

    // Radio Button Container
    radiobtnContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    singleRadiobtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textRadiobtn: {
        fontSize: 12,
        fontWeight: '500',
        color: '#00C94E',
        marginRight: 5
    }
})