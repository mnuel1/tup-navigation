import { TouchableHighlight, View, StyleSheet, Image, Text} from "react-native"

interface LegendBoxProps {
    name: string;
    uri: string;
    active: boolean;
    onPress: () => void;
}
  
export const LegendBox: React.FC<LegendBoxProps> = ({ name, uri, active, onPress }) => {

    return (
        <View style={{marginRight:6}}>        
            <TouchableHighlight
                
                onPress={onPress}
                activeOpacity={1}
                underlayColor="#D29290"
                style={[styles.button , active && styles.activeButton]}
            >
                <View style={styles.titleCont}>
                                            
                    <Image
                        style={styles.tinyLogo}
                        source= {{uri}}
                    />
                    
                    <Text style={{fontWeight:'bold'}}>{name.toUpperCase()}</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({

    tinyLogo: {
        width: 30,
        height: 30,
        borderRadius:15
    },  
    button: {
        display:'flex',        
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"white",
        width:98,
        height:46,        
        borderRadius:16
    },
    titleCont: {
        display:'flex',        
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',        
        gap:4,        
    },
    activeButton: {
        backgroundColor: '#D29290', 
        borderWidth:1,
        borderColor: 'rgba(6, 9, 48, 0.2)',
        

      },

})