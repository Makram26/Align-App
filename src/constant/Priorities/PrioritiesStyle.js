import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from '../../util/Color'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  body: {
    flexGrow: 1,
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
  },
});


export default styles;