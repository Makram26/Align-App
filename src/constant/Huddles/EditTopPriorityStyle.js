import { StyleSheet,Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from '../../util/Color'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
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
        marginTop: 8,
        marginBottom: 5,
        marginLeft: 2
    },
    inputText: {
        backgroundColor: COLORS.white,
        // width: '99%',
        padding:Platform.OS === "ios"?15:10,
        // alignSelf: 'center',
        // paddingHorizontal: 10,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        marginTop:3,

        borderRadius: 5
    },
    completeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:"center",
        marginVertical: 12
    },
    dateContainer: {
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Platform.OS === "ios"? 16:3,
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
    }
})

export default styles;