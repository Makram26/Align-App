import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../util/Color";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F6F8F7'
    },
    body: {
        flex: 1,
    },
    dateContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginHorizontal: 12, 
        marginVertical:5 
    },
    textDate: { 
        fontSize: RFValue(10), 
        fontWeight: '400', 
        lineHeight: 15, 
        color: COLORS.lightestBlack 
    },
    textComplete: { 
        fontSize: RFValue(12), 
        fontWeight: '500', 
        lineHeight: 18, 
        color: COLORS.black 
    },
    menuContainer: { 
        flex: 0.1, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    inputText: { 
        borderBottomColor: '#E2E2E2', 
        borderBottomWidth: 1, 
        backgroundColor: COLORS.white, 
        padding: 10,
    }
})

export default styles;