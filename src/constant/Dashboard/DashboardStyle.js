import { StyleSheet, Dimensions } from "react-native";
import { ColorSpace } from "react-native-reanimated";
import { COLORS } from "../../util/Color";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white
    },
  
    body: {
      flexGrow: 1,
      width: "98%",
      alignSelf: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: windowWidth/20.5,
      fontWeight: '500',
      lineHeight: 30,
      color: '#050505',
      marginVertical: 10,
      marginLeft: 7
    },
  
    statusBoxContainer: {
      width: '85%',
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      backgroundColor: 'white',
      borderRadius: 10
    },
    statusBox: {
      width: windowWidth/2.5,
      borderRadius: 30,
      height: windowHeight/6,
      justifyContent: 'space-between',
      backgroundColor: 'white',
      
      shadowColor: '#00000042',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,

      elevation: 19,
      marginBottom: 10
    },
  
    
    statusType: {
      color: COLORS.black,
      fontSize: windowWidth/29.5,
      // fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: '400',
      marginTop: 10,
      lineHeight: 21,
    },
    statusquantity: {
      fontSize: windowWidth/14,
      fontWeight: '700',
      lineHeight: 45,
      color: COLORS.black,
      alignSelf: 'flex-end',
      marginRight: 10,
      marginBottom: 10
    },
  
    headingConatiner: {
      width: "96%",
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10
    },
    textHeading: {
      fontSize: windowWidth/22.5,
      fontWeight: '500',
      lineHeight: 27,
      color: COLORS.black
    },
    btn: {
      width: "30%",
      padding: 5,
      backgroundColor: COLORS.orange,
      borderRadius: 50,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 12,
    },
    btnText: {
      fontSize: windowWidth/41,
      fontWeight: '600',
      lineHeight: 15,
      color: COLORS.white,
      marginHorizontal:5,
      textTransform: 'uppercase'
  
    }
  });

export default styles;