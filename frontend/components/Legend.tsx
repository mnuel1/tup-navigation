import { TouchableHighlight, View, StyleSheet, Image, Text} from "react-native"

interface LegendBoxProps {
    name: string;
    uri: number;
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

                    {name === 'cos' && <Image
                        style={styles.tinyLogo}
                        source={require('../assets/images/cos.jpg')}
                        
                    />}

                    {name === 'cla' && <Image
                        style={styles.tinyLogo}
                        source={require('../assets/images/cla.jpg')}
                        
                    />}
                    {name === 'cie' && <Image
                        style={styles.tinyLogo}
                        source={require('../assets/images/cie.jpg')}
                        
                    />}
                    {name === 'cafa' && <Image
                        style={styles.tinyLogo}
                        source={require('../assets/images/cafa.jpg')}
                        
                    />}
                    
                    
                    
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