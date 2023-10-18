import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from '../../util/Color'

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
  
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    type: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      padding: 5,
      flexDirection: 'row'
    },
    typeText: {
      fontSize: RFValue(14),
      fontWeight: '500',
      lineHeight: 18,
      textTransform: 'uppercase'
    },
    smallbox: {
      width: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5
    },
    textContainer: {
      width: "96%",
      backgroundColor: COLORS.white,
      elevation: 20,

      shadowColor: '#00000042',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      
      borderRadius: 5,
      padding: 5,
      alignSelf: 'center',
      marginBottom: 12,
    },
    textContainerHeading: {
      fontSize: RFValue(12),
      fontWeight: '500',
      lineHeight: 18,
      color: COLORS.orange,
      marginVertical: 5,
    },

    textContainerTextHeading: {
      width: '90%',
      fontSize: RFValue(10),
      fontWeight: '500',
      lineHeight: 12,
      color: COLORS.black,
      // marginBottom: 5,
    },

    textContainerText: {
      width: '90%',
      fontSize: RFValue(8),
      fontWeight: '500',
      lineHeight: 12,
      color: COLORS.lightestBlack,
      marginBottom: 10,
      marginLeft: 15,
    },
    textAgendaContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
  
    editbtn: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      margin: 5
    },
    editText: {
      fontSize: RFValue(12),
      fontWeight: '500',
      lineHeight: 18,
      color: COLORS.darkGreen,
      textTransform: 'uppercase',
      marginLeft: 5
    },
  
    activityContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '96%',
      alignSelf: 'center'
    },
    textMainHeading: {
      fontSize: RFValue(18),
      fontWeight: '500',
      lineHeight: 30,
      color: COLORS.black
    },
    viewallContainer: {
      backgroundColor: COLORS.orange,
      borderRadius: 3,
      paddingHorizontal: 12,
      justifyContent: 'center',
      marginTop: 4
    },
    viewallText: {
      fontSize: RFValue(10),
      fontWeight: '500',
      lineHeight: 11,
      color: COLORS.white,
      textTransform: 'uppercase'
    },
  
    updateContiner: {
      width: '96%',
      alignSelf: 'center',
      marginTop: 20
    },
    completeTaskContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10
    },
    textCompleteTask: {
      fontSize: RFValue(11),
      fontWeight: '500',
      lineHeight: 18,
      color: COLORS.black
    },
  
    // Weekly Hundles
    headerSubContainer: {
      width: '96%',
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    textDate: {
      fontSize: RFValue(9),
      fontWeight: '500',
      lineHeight: 13,
      color: COLORS.lightestBlack,
      marginLeft: 3,
    }
  });

export default styles;