import React, { useState } from 'react';
import { StyleSheet, Image, View, ScrollView, Text } from 'react-native';
import { Departments, Buildings } from '@/components/places';
import { PlaceBox } from '@/components/Place';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { LegendBox } from '@/components/Legend';
import { useRouter } from 'expo-router';

const legendData = [
  { name: 'cos', uri: 1 },
  { name: 'cla', uri: 1 },
  { name: 'cie', uri: 1 },
  { name: 'cafa', uri: 1 },
  
]


export default function TabTwoScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<string>('cos');
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
        source={require('@/assets/images/tup.png')}
        style={styles.header}
        resizeMode='cover'
      />}>
      
      <View style={styles.titleContainer}>
        <ThemedText type="title">Departments</ThemedText>
      </View>

      <ScrollView horizontal style={styles.legendCont}>
        {legendData.map((item, index) => (
          <LegendBox
            key={index}
            name={item.name}
            uri={item.uri}
            active={item.name === activeIndex}
            onPress={() => setActiveIndex(item.name) }
          />
        ))}
      </ScrollView>

      <ThemedText type="subtitle">Rooms</ThemedText>
      <ScrollView horizontal>               
        {Departments[activeIndex.toUpperCase()].map((room, roomIndex) => (
            <View key={roomIndex}>
              <PlaceBox 
                title={room.name} 
                sub_text={room.subName || ""}
                floor={room.floor !== undefined ? room.floor.toFixed(0) : ""}
                uri='https://www.claretschool.edu.ph/images/SHSCompLab/shs_comp_lab03.jpg' 
                onPress={() => {
                  router.push({ 
                    pathname: 'map', 
                    params: {
                      roomLabel: room.label,
                      roomName: room.name,
                      roomFloor: room.floor || 1
                    }
                  });
                }}
              />                            
            </View>
        ))}
             
      </ScrollView>

      <View style={styles.titleContainer}>
        <ThemedText type="title">Buildings</ThemedText>
      </View>
      <ScrollView horizontal>
        {Buildings.map((building, index)=>(
          <PlaceBox 
            key={index}
            title={building.name} 
            sub_text={`Floor ${building.label}`}
            uri='https://www.claretschool.edu.ph/images/SHSCompLab/shs_comp_lab03.jpg' 
            onPress={() => {
              router.push({ 
                pathname: 'map', 
                params: {
                  roomLabel: building.label,
                  roomName: building.name,
                  roomFloor: 1
                }
              });
            }}/>
        ))}
        
        
      </ScrollView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: '100%',
    width: '100%',    
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  legendCont:{
    display:'flex',
    flexDirection:'row',
    gap:20,
  }
});
