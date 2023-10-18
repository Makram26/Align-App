import { StyleSheet, Dimensions,Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from '../../util/Color'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    image: {
        width: windowWidth / 4,
        height: windowHeight / 7,
        margin: 20,
        alignSelf: 'center',
        borderRadius: 100,
    },
    addIcon: {
        alignSelf: 'center',
        marginLeft: "18%",
        marginTop: '-15%'
    },
    textHeading: {
        fontSize: RFValue(12),
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
        paddingVertical:Platform.OS ==="ios"?18:13,
        borderRadius: 5
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
        // paddingVertical: 3,
      
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        paddingVertical:13,
        // paddingVertical:Platform.OS ==="ios"?18:13,

        borderRadius: 5
    },
    
    // Radio Button Container
    radiobtnContainer: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    singleRadiobtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textRadiobtn: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.darkGreen,
        marginRight: 5
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
        paddingVertical:Platform.OS ==="ios"?18:13,
        
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10
    },
    textComments: {
        fontSize: RFValue(18),
        fontWeight: '500',
        lineHeight: 27,
        color: COLORS.lightestBlack,
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
    editDescriptionContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 5
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

    // Modal 
    modalContainer: {
        flex: 1,
        backgroundColor: '#200000',
        justifyContent: 'center',
        opacity: 0.9,
    },



    datePickerContainer: {
        width:"77%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor:"red"
    },


    calendarIcon:{
        width: 18, 
        height: 18,
        marginRight:10,
        tintColor:COLORS.orange
    },
    checkbox: {
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
      },
})

export default styles;