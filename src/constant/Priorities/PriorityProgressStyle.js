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
        width: '98%',
        alignSelf: 'center'
    },
    heading: {
        fontSize: RFValue(16),
        fontWeight: "500",
        lineHeight: 30,
        color: COLORS.black,
        marginVertical: 15,
        marginLeft: 10
    },
    btnCreateTask: {
        backgroundColor: COLORS.green,
        width: "95%",
        borderRadius: 2,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
    },
    textCreateTask: {
        fontSize: RFValue(12),
        fontWeight: "500",
        lineHeight: 18,
        color: COLORS.white,
        textTransform: 'uppercase',
        marginLeft: 5
    },
    textPercentage: {
        fontSize: RFValue(17),
        fontWeight: '500',
        lineHeight: 26,
        color: COLORS.darkGreen,
        textAlign: 'right',
        marginRight: 12
    },

    progressContainer: {
        flex: 0.02,
        width: "95%",
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        
        marginVertical: 10,
        padding: 10,
        justifyContent: 'center'
    },
    textProgress: {
        fontSize: RFValue(14),
        fontWeight: "500",
        lineHeight: 21,
        color: COLORS.lightestBlack
    },
    textDescription: {
        fontSize: RFValue(10),
        fontWeight: '500',
        lineHeight: 15,
        color: COLORS.green
    }
});


export default styles;