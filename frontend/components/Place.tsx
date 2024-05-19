import { TouchableHighlight, View, StyleSheet, Image, Text} from "react-native"

interface PlaceBoxProps {
    title: string;
    sub_text: string
    uri: string;    
    onPress: () => void;
}
  
export const PlaceBox: React.FC<PlaceBoxProps> = ({ title, uri, sub_text, onPress }) => {

    return(
        <View style={{marginRight:6}}>
            <TouchableHighlight 
            activeOpacity={1}
            underlayColor="#D29290"
            style={[styles.button]}>

                <View style={styles.mainCont}>                                            
                    <Image
                        style={styles.tinyLogo}
                        source= {{uri}} />
                    <View style={styles.titleCont}>

                        <Text style={{fontWeight:'bold'}}>{title.toUpperCase()}</Text>
                        <Text style={{fontWeight:'light', color:"gray"}}>{sub_text}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        </View>

    );

}

const styles = StyleSheet.create({

    tinyLogo: {
        width: 157,
        height: 157,
        borderRadius:10
    },  
    button: {
        display:'flex',        
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"white",
        width:175,
        height:242,
        borderRadius:15
    },
    mainCont: {
        display:'flex',
        flexDirection:"column",
        justifyContent:'center',
        gap:4,
    },
    titleCont: {
        display:'flex',
        flexDirection:"column",
        justifyContent:'center',
        gap:4,
        paddingHorizontal:10
    },


})