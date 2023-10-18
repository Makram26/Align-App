import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Forward from 'react-native-vector-icons/Ionicons'
import Calender from 'react-native-vector-icons/Feather'
import { COLORS } from "../../util/Color";
import Header from "../../component/Header";
import { CalenderData } from "../../data/PriorityData";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styles from "../../constant/TopPriorities/TopprioritiesStyle";

import Spinner from 'react-native-loading-spinner-overlay';


import moment from 'moment';

import CustomStatusBar from "../../component/CustomStatusBar";
import { GetTopPriorities } from "../../services";


export default function TopPriorities({ navigation }) {


  var now = moment()
  let date = new Date()
  const [year,setYear] =useState(date.getFullYear())
  // const [month,setMonth]=useState('0' + (date.getMonth() + 1)).slice(-2)
  const [month,setMonth]=useState(date.getMonth() + 1)
  const [monthlyRecord,setMonthlyRecord]=useState("")
  const [loading,setLoading]=useState(false)

  

  // let currentMonthYear=month + " "+ year
  const [currentMonthYear,setCurrentMonthYear]=useState(month + ","+ year)
  console.log("<><",currentMonthYear)





   useEffect(()=>{
    getPriority(month,year)
    const unsubscribe = navigation.addListener('focus', () => {
      getPriority(month,year)
    });
    return () => {
        unsubscribe;
    };
   },[])     




  function getStartAndEndDate(month, year,state) {

    
    //  alert(month)
    if(state === "next"){
      month = +month+1;
      year = month === +1 ? (year + 1) : year;
      // const lastDate = moment().date(1).month(month).daysInMonth();

    setCurrentMonthYear(month +","+ year )
    setMonth(month)
    setYear(year)
    getPriority(month,year)

    
    //  currentMonthYear=month + " "+ year
      console.log("month>>>>>>",month === +1)
      console.log("year<<<<<<",year)
      // console.log("alskfdjas",lastDate)

     console.log("currentMonthYear",currentMonthYear)

      // return {
      //   startDate: moment().date(1).month(month).year(year).format('MM-DD-YYYY'),
      //   endDate: moment().date(lastDate).month(month).year(year).format('MM-DD-YYYY'),
      //   date: moment().date(1).month(month).year(year),
      // }
    }
    else if (state === "last") {
      month =month === 1 ? month : month - 1;
      year = month < 1 ? (year - 1) : year;
      const lastDate = moment().date(1).month(month).daysInMonth();

      setCurrentMonthYear(month + ","+ year)
     
      setMonth(month)
      setYear(year)
      
        getPriority(month,year)
     
     console.log("currentMonthYear",currentMonthYear)

      console.log("month>>>>>>",month < 1)
      console.log("year<<<<<<",year)
      console.log("alskfdjas",lastDate)
      // return {
      //   startDate: moment().date(1).month(month).year(year).format('MM-DD-YYYY'),
      //   endDate: moment().date(lastDate).month(month).year(year).format('MM-DD-YYYY'),
      //   date: moment().date(1).month(month).year(year),
      // }
    }

   
  }

//   var now = new Date();
// if (now.getMonth() == 11) {
//     var current = new Date(now.getFullYear() + 1, 0, 1);
//     console.log("current >>>>>>>>>>>>>>>>>>>>>>>>>>1",current)
// } else {
//     var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
//     console.log("current >>>>>>>>>>>>>>>>>>>>>>>>>>2",current)

// }

// function addMonths(after = 1, now = new Date()) {
//   var current;
//   if (now.getMonth() == 11) {
//       current = new Date(now.getFullYear() + 1, 0, 1);
//   } else {
//       current = new Date(now.getFullYear(), now.getMonth() + 1, 1);            
//   }
//   return (after == 1) ? current : addMonths(after - 1, new Date(now.getFullYear(), now.getMonth() + 1, 1))
// }


// console.log('Add 3 months to November', addMonths(3, new Date(2017, 10, 27)))


  // for(var m=0;m<=11;m++) { console.info( "next month for %i: %i", m+1, (m+1)%12 + 1 ) }
// next month for 1: 2
// next month for 2: 3
// next month for 3: 4
// next month for 4: 5
// next month for 5: 6
// next month for 6: 7
// next month for 7: 8
// next month for 8: 9
// next month for 9: 10
// next month for 10: 11
// next month for 11: 12
// next month for 12: 1


  // const [currentMonthYear,setCurrentMonthYear]=useState(('0' + (date.getMonth() + 1)).slice(-2),date.getFullYear())

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  //Getting last 6 months from current date
  let currentMonth = date.getMonth(),
    previousMonth_1 = date.getMonth() - 1,
    previousMonth_2 = date.getMonth() - 2,
    previousMonth_3 = date.getMonth() - 3,
    previousMonth_4 = date.getMonth() - 4,
    previousMonth_5 = date.getMonth() - 5

  // getting total days of month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };


  //create function which will return the start and end object
  const getDate = (month) => {

    let addZeroInMonth = month < 10 ? `0${month + 1}` : month + 1

    return {
      startDate: new Date(`${year},${addZeroInMonth},1`),
      endDate: new Date(`${year},${addZeroInMonth},${getDaysInMonth(addZeroInMonth, year)}`),
    }
  }


  //Store each month
  let m1 = getDate(currentMonth)
  let m2 = getDate(previousMonth_1)
  let m3 = getDate(previousMonth_2)
  let m4 = getDate(previousMonth_3)
  let m5 = getDate(previousMonth_4)
  let m6 = getDate(previousMonth_5)



  // const endDate = now.format('DD-MM-YYYY')
  // const startDate = moment().month(now.month()).year(now.year()).format('DD-MM-YYYY')

  // console.log('sixth')

  // console.log(">>>>>>>.",currentMonthYear);
   

  // console.log(endDate);

  

  // const fifthMonth = getStartAndEndDate(now.month(), now.year());
  // console.log('fifth')

  // console.log(fifthMonth.startDate);
  // console.log(fifthMonth.endDate);

  // const fourthMonth = getStartAndEndDate(fifthMonth.date.month(), fifthMonth.date.year());
  // console.log('fourth')

  // console.log(fourthMonth.startDate);
  // console.log(fourthMonth.endDate);

  // const thirdMonth = getStartAndEndDate(fourthMonth.date.month(), fourthMonth.date.year());
  // console.log('third')

  // console.log(thirdMonth.startDate);
  // console.log(thirdMonth.endDate);

  // const secondMonth = getStartAndEndDate(thirdMonth.date.month(), thirdMonth.date.year());
  // console.log('second')

  // console.log(secondMonth.startDate);
  // console.log(secondMonth.endDate);

  // const firstMonth = getStartAndEndDate(secondMonth.date.month(), secondMonth.date.year());
  // console.log('first')

  // console.log(firstMonth.startDate);
  // console.log(firstMonth.endDate);

  // var dateObj = new Date();
  // var month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  // var date1 = ('0' + dateObj.getDate()).slice(-2);
  // var year1 = dateObj.getFullYear();
  // var shortDate = month + ' ' +  year1;
  // alert(shortDate);

  //create array for last six months to pass in API on select
  // let filter = [
  //     {
  //         label: 'Current',
  //         "startDate": `${m1.startDate} 00:00:00`,
  //         "endDate": `${m1.endDate} 00:00:00`,
  //     },
  //     {
  //         label: months[previousMonth_1] + ' ' + year,
  //         "startDate": `${m2.startDate} 00:00:00`,
  //         "endDate": `${m2.endDate} 00:00:00`,
  //     },
  //     {
  //         label: months[previousMonth_2] + ' ' + year,
  //         "startDate": `${m3.startDate} 00:00:00`,
  //         "endDate": `${m3.endDate} 00:00:00`,
  //     },
  //     {
  //         label: months[previousMonth_3] + ' ' + year,
  //         "startDate": `${m4.startDate} 00:00:00`,
  //         "endDate": `${m4.endDate} 00:00:00`,
  //     },
  //     {
  //         label: months[previousMonth_4] + ' ' + year,
  //         "startDate": `${m5.startDate} 00:00:00`,
  //         "endDate": `${m5.endDate} 00:00:00`,
  //     },
  //     {
  //         label: months[previousMonth_5] + ' ' + year,
  //         "startDate": `${m6.startDate} 00:00:00`,
  //         "endDate": `${m6.endDate} 00:00:00`,
  //     },
  // ]



  // console.log("filter",filter)
  




  const getPriority=async(selectMonth,selectYear)=>{
    setLoading(true)
   try {
    const res=await GetTopPriorities(selectMonth,selectYear)
    // console.log("response",res)
    setMonthlyRecord(res.result)
    // tempData.push(res.result)
    setLoading(false)

   } catch (error) {
    console.log("error",error)
    setLoading(false)

   }
  //  setMonthlyRecord(tempData)
  }



  // console.log(monthlyRecord)



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
        title={"Top Priority Calender "}
      />

      {/* body */}
      <View style={styles.body}>

        {/* Date Container */}
        <View style={styles.headerSubContainer}>
          <View pointerEvents={month === 1 ? 'none' : 'auto'}>
          <TouchableOpacity  onPress={()=> getStartAndEndDate(month,year,"last")} style={styles.dateContainer}>
            <Forward name="ios-chevron-back" size={16} color={month === 1? COLORS.silver:COLORS.orange} />
            <Text style={{...styles.textContainerHeading,color:month === 1? COLORS.silver:COLORS.orange}}>Prev</Text>
          </TouchableOpacity>
          </View>
         
          <View style={styles.dateContainer}>
            <Calender name="calendar" size={16} color={"#58565B"} />
            <Text style={styles.textDate}>{currentMonthYear}</Text>
          </View>
          <View pointerEvents={month === 12 ? 'none' : 'auto'}>
          <TouchableOpacity onPress={()=> getStartAndEndDate(month,year,"next")} style={styles.dateContainer}>
            <Text style={{...styles.textContainerHeading,color:month === 12? COLORS.silver:COLORS.orange}}>Next</Text>
            <Forward name="ios-chevron-forward" size={16} color={month === 12? COLORS.silver:COLORS.orange} />
          </TouchableOpacity>
          </View>
          
        </View>
        <View style={{ borderColor: '#ECECEC', borderWidth: 1, marginVertical: 10 }} />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={monthlyRecord}
          keyExtractor={stoke => (stoke.id)}
          renderItem={({ item,index }) => {
            return (
              <TouchableOpacity style={styles.calenderConatiner} onPress={() => navigation.navigate("CalenderEdit",item)}>
                <View style={styles.calenderSubConatiner}>
                  <Calender name="calendar" size={40} color={"#58565B"} />
                  <Text style={[styles.textContainerHeading, { marginTop: 17, marginLeft: "-11%" }]}>{index+1}</Text>
                  <Text style={styles.calenderText}>{item.note === ""?"No Priorty Entered":item.note}</Text>
                </View>
                <Forward name="ios-chevron-forward" size={30} color={"#7D7F88"} />
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  );
};


