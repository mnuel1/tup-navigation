import { TouchableHighlight, View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

interface FloorLegendProps {
    name: string;    
    active: boolean;
    isUp: boolean;    
    onPress: () => void;
}
  
export const FloorLegend: React.FC<FloorLegendProps> = ({ name, active, isUp, onPress }) => {
    return (
        <View style={{ marginRight: 6 }}>
            <TouchableHighlight
                onPress={onPress}
                activeOpacity={1}
                underlayColor="#D29290"
                style={[styles.button, active && styles.activeButton]}
            >
                <View style={styles.titleCont}>
                    {isUp && <MaterialCommunityIcons name={'stairs-up'} size={24} color="#060930" />}
                    {!isUp && <MaterialCommunityIcons name={'stairs-down'} size={24} color="#060930" />}
                    
                    <Text style={{ fontWeight: 'bold' }}>{`${name} Floor`}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        width: 106,
        height: 46,
        borderRadius: 16
    },
    titleCont: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    activeButton: {
        backgroundColor: '#D29290',
        borderWidth: 1,
        borderColor: 'rgba(6, 9, 48, 0.2)',
    },
});
