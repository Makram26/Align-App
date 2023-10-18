import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../util/Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  body: {
    flex: 1,
  },
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
  },
  textContainerHeading: {
    fontSize: RFValue(12),
    fontWeight: '500',
    lineHeight: 18,
    color: COLORS.orange,
    marginVertical: 5,
    textTransform: 'uppercase',
  },

  calenderConatiner: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
    width: "94%",
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calenderSubConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  calenderText: {
    fontSize: RFValue(10),
    fontWeight: '500',
    lineHeight: 15,
    color: COLORS.lightestBlack,
    marginLeft: 30,
    width: '80%'
  }
});

export default styles;