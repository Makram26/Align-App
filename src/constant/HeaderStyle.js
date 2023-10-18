import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../util/Color";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        // height: 45,
        height: windowHeight/16,
        flexDirection: 'row',
        justifyContent: "space-between", 
        alignItems: 'center', 
        backgroundColor: COLORS.orange,
        paddingHorizontal: 12 
    },
    leftContainer:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    headerTitle:{
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.white,
        marginLeft: 5
    },
    rightContainer:{ 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    image:{ 
        width: 35, 
        height: 35,
        borderRadius: 35/2
    }
})

export default styles;