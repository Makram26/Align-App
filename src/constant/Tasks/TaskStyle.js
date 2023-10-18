import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from '../../util/Color';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white
    },
    body: {
      flexGrow: 1,
      width: '98%',
      alignSelf: 'center'
    },
    textHeading: {
      fontSize: RFValue(20),
      fontWeight: '500',
      lineHeight: 30,
      color: '#000000',
      marginVertical: 15,
      marginLeft: 10
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // width: '75%',
      width: '98%',
      elevation: 6,
    },
    type: {
      justifyContent: 'center',
      alignItems: 'center',
      // width:'50%',
      width: '32%',
      padding: 7,
      flexDirection: 'row',
      marginLeft:5,
    },
    typeText: {
      fontSize: RFValue(10),
      fontWeight: '500',
      lineHeight: 15,
      textTransform: 'uppercase'
    },
  
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: "95%",
      alignSelf: 'center'
    },
    createBtn: {
      backgroundColor: COLORS.green,
      width: '60%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 5,
      borderRadius: 8,
      marginTop: 15,
    },
    tasks: {
      fontSize: RFValue(16),
      fontWeight: '500',
      lineHeight: 24,
      color: COLORS.lightestBlack,
      textAlign: 'center',
      marginTop:15
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
      borderRadius: 10,
      marginTop: 10,
  },
  });

export default styles;