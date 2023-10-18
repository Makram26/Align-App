import { StyleSheet } from "react-native";
import { COLORS } from "../util/Color";
const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    header:{ 
        flex: 1, 
        backgroundColor: COLORS.orange, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 10 
    },
    infoContainer:{ 
        flex: 1, 
        width: '5%', 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    image:{ 
        width: 60, 
        height: 60, 
        borderRadius: 60/2, 
        marginVertical: 5, 
        marginRight: 5
    },
    name:{
        fontSize: 16,
        fontWeight: '400',
        color: COLORS.white
    },
    designation:{
        fontSize: 12,
        fontWeight: '400',
        color: COLORS.black,
        marginTop:5
    }

})

export default styles;