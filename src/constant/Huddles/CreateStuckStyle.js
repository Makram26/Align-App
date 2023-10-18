import { StyleSheet,Platform } from "react-native";
import { ColorSpace } from "react-native-reanimated";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from '../../util/Color'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    body: {
        flexGrow: 1,
        width: '94%',
        alignSelf: 'center'
    },
    textHeading: {
        fontSize: RFValue(11),
        fontWeight: '500',
        lineHeight: 18,
        color: COLORS.black,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 2
    },
    inputText: {
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        paddingHorizontal: 10,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        paddingVertical:Platform.OS === "ios"? 15:10,
        // marginTop:,


        borderRadius: 5
    },
    completeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12
    },
    dateContainer: {
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Platform.OS === "ios"? 15:8,
        paddingHorizontal: 10,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        borderRadius: 5
    },
    descriptionContainer: {
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        
        borderRadius: 5,
        marginTop: 20
    },
    textDescription: {
        fontSize: RFValue(18),
        fontWeight: '500',
        lineHeight: 27,
        color: COLORS.lightestBlack,
        margin: 10,
        marginBottom: 0
    },
    pickerStyle:{
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        // paddingHorizontal: 10,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        // paddingVertical:Platform.OS ==="ios"?18:13,

        borderRadius: 5
    },
})

export default styles;