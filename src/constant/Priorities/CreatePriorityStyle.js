import { StyleSheet,Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from '../../util/Color'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    body: {
        flexGrow: 0.9,
        width: '94%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    textHeading: {
        fontSize: RFValue(12),
        fontWeight: '500',
        lineHeight: 18,
        color: COLORS.black,
        marginTop: 20,
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

        paddingVertical: Platform.OS === "ios"? 16:10,


        borderRadius: 5
    },
    editDescriptionContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 5
    },

    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '98%',
        alignSelf: 'center'
    },
    textSubHeading: {
        fontSize: RFValue(10),
        fontWeight: '300',
        lineHeight: 15,
        color: '#666666'
    },
    subInputText: {
        width: "95%",
        marginTop: -12
    },
    subInputTextBottom: {
        borderBottomColor: "#D2D2D2",
        borderBottomWidth: 1,
        marginTop: -12,
        width: "98%"
    },

    commentsContainer: {
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10
    },
    textComments: {
        fontSize: RFValue(18),
        fontWeight: '500',
        lineHeight: 27,
        color: '#444444',
        margin: 10,
        marginBottom: 0
    },
    btnSend: {
        backgroundColor: COLORS.green,
        width: "15%",
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: "5%",
        marginBottom: '5%'

    },
    bottomBtnContainer: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 6,
        alignItems: 'flex-end'
    },
    btnSave: {
        width: "30%",
        backgroundColor: COLORS.green,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    textBottomBtn: {
        fontSize: RFValue(12),
        fontWeight: '500',
        lineHeight: 18,
        color: COLORS.white,
        textTransform: 'uppercase',
        marginLeft: 5
    },
    pickerStyle:{
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        elevation: 20,
        borderRadius: 5,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2, 
    },
})

export default styles;