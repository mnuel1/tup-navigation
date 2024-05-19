import { useRouter } from 'expo-router';
import { TouchableHighlight, View, StyleSheet, Image, Text} from "react-native"
import { Entypo } from '@expo/vector-icons';

export const ViewMoreButton = ({}) => {
    const router = useRouter();

    return (
        <View style={{marginRight:6}}>        
            <TouchableHighlight                
                onPress={() => router.push('places')}
                activeOpacity={1}
                underlayColor="#D29290"
                style={[styles.button]}
            >
                <View style={styles.titleCont}>
                    <Entypo name="chevron-with-circle-right" size={80} color="black" />                    
                    <Text style={{fontWeight:'semibold', fontSize:21}}>View More</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({

    button: {
        display:'flex',        
        alignItems:'center',
        justifyContent:'center',        
        borderWidth:1,
        borderColor:'white',
        width:175,
        height:242,   
        borderRadius:16
    },
    titleCont: {
        display:'flex',        
        flexDirection:"column",
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