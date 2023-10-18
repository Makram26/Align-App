import { StyleSheet, Dimensions, Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from '../../util/Color'
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    body: {
        flexGrow: 1,
        width: '98%',
        alignSelf: 'center'
    },
    btnContainer: {
        // flex: 0.12,
        flexDirection: 'row',
        // height:"8%",
        width: '40%',
        alignSelf: 'center',
        marginVertical: 15,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        backgroundColor: COLORS.white,
        borderRadius: 8
    },
    btnEditTasks: {
        width: "75%",
        padding:20,
        backgroundColor: COLORS.green,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    textEditTasks: {
        fontSize: RFValue(12),
        fontWeight: '500',
        lineHeight: 15,
        color: COLORS.white,
        marginLeft: 4
    },
    btnDelete: {
        width: "25%",
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    infoContainer: {
        // flex: 0.3,
        backgroundColor: COLORS.white,
        width: "98%",
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        padding: 20,
        // paddingBottom:30,
        // paddingBottom: 0,
    },
    image: {
        width: windowWidth/8,
        height: windowHeight/17,
        borderRadius: 100,
        alignSelf: 'center',
        marginBottom: 10,
    },
    headingConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    textHeading: {
        fontSize: RFValue(16),
        fontWeight: '500',
        lineHeight: 27,
        color: COLORS.black
    },
    subInfoContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: RFValue(10),
        fontWeight: '500',
        lineHeight: 15,
        color: COLORS.black,
        width: '40%'
    },
    textinfo: {
        fontSize: RFValue(12),
        fontWeight: '500',
        lineHeight: 18,
        color: COLORS.black,
        width: '40%'
    },
    priorityContainer: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    commentsContainer: {
        backgroundColor: COLORS.white,
        // flex: 0.2,
        width: '98%',
        alignSelf: 'center',
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        borderRadius: 5,
        paddingBottom:20,
        marginTop: 20,
        marginBottom:40
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
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: "5%",
        borderRadius: 7
    },


    mainContainerModal: {
        flex: 1,
        height:windowHeight,
        backgroundColor: '#300000',
        opacity:Platform.OS === "ios"?1: 0.9,
        justifyContent: 'center',
        alignItems: 'center',


        
        // position:"absolute"
        
    },
    subContainerModal: {
        backgroundColor: COLORS.white,
        width: '80%',
        flex: 0.8, 
        borderRadius: 20,
        opacity: 1,
        // zIndex:1
    },
    bodyModal: {
        flexGrow: 0.9,
        width: '94%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    imageModal: {
        width: windowWidth / 6,
        height: windowHeight / 13,
        marginHorizontal: 20,
        borderRadius: 100,
        alignSelf: 'flex-end',
        marginTop: -20
    },
    EditContinerModal: {
        backgroundColor: COLORS.orange,
        width: 25,
        height: 25,
        borderRadius: 12.5,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginRight: 16,
        zIndex:1
    },
    textHeadingModal: {
        fontSize: RFValue(11),
        fontWeight: '500',
        lineHeight: 18,
        color: '#000000',
        marginTop: 11,
        marginBottom: 6,
        marginLeft: 2
    },
    inputTextModal: {
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingVertical:Platform.OS === "ios"?18:10,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderRadius: 5
    },
    completeContainerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12
    },
    dateContainerModal: {
        backgroundColor: COLORS.white,
        width: '99%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 10,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        paddingVertical:Platform.OS === "ios"?18:0,
        borderRadius: 5
    },
    btnSave: {
        backgroundColor: COLORS.green,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        elevation: 6,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    textBottomBtn: {
        fontSize: RFValue(16),
        fontWeight: '500',
        lineHeight: 24,
        color: COLORS.white,
        textTransform: 'uppercase',
        marginLeft: 5
    },
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

    // Delete Modal
    modalContainer: {
        flex: 1,
        backgroundColor: '#200000',
        justifyContent: 'center',
        opacity:Platform.OS === "ios"?1: 0.9,
    },
    deleteModalContainer: {
        backgroundColor: COLORS.white,
        width: '80%',
        flex: 0.2,
        borderRadius: 10,
        alignSelf: 'center',
        elevation: 6,
    },
    deleteModalHeader: {
        flex: 0.3,
        backgroundColor: COLORS.orange,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center"
    },
    textDeleteModalHeader: {
        fontSize: RFValue(16),
        fontWeight: "400",
        lineHeight: 18,
        color: COLORS.white,
        textAlign: 'center'
    },
    deleteModalBody: {
        flex: 0.3,
        alignSelf: 'center',
        justifyContent: 'center',
        // backgroundColor:"blue"
    },
    deleteBtnContainer: {
        flex: .3,
        alignSelf: 'center',
        // backgroundColor:"red",
        // justifyContent: 'center',
        flexDirection: 'row',
    },
    deleteModalBtn: {
        backgroundColor: COLORS.white,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        margin: 5,
        justifyContent:'center',
    },


    subContainer: {
        flex: 1,
        width: "96%",
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 20,

        shadowColor: '#00000042',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        backgroundColor: '#ffffff',
        padding: 10,
        position: 'relative',
        zIndex: 1,
    },
    lowerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "94%",
        alignSelf: 'center',
        marginTop: 5
    },
    lowerSubContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    textDateLower: {
        fontSize: RFValue(7),
        fontWeight: '500',
        lineHeight: 10,
        color: '#878787'
    },
    upperText: {
        fontSize: RFValue(10),
        fontWeight: '500',
        lineHeight: 15,
        color: "#444444"
    },
    lowerImage: {
        width: 16,
        height: 16,
        borderRadius: 2
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
        // marginRight:10,
        tintColor:COLORS.orange
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