import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, View } from 'react-native';
import { Departments } from '@/components/places';
import SearchComponent from '@/components/Search';
import { PlaceBox } from '@/components/Place';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { LegendBox } from '@/components/Legend';
import { ViewMoreButton } from '@/components/ViewMore';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState<string>('cos');
  const data = [
    "sample1", "sample2"
  ]

  const legendData = [
    { name: 'cos', uri: 1 },
    { name: 'cla', uri: 1 },
    { name: 'cie', uri: 1 },
    { name: 'cafa', uri: 1 },
    
  ]
  const handleSetSearchQuery = (text: string) => { setSearchQuery(text) }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/tup.png')}
          style={styles.header}
          resizeMode='cover'
        />
      }>
      <View style={styles.titleContainer}>
        <ThemedText type="title">TUP NAVIGATE</ThemedText>
      </View>
      <View style={styles.container}>
        <SearchComponent data={data} onSearchChange={handleSetSearchQuery}/>        
      </View>

      <ScrollView horizontal style={styles.legendCont}>
        {legendData.map((item, index) => (
          <LegendBox
            key={index}
            name={item.name}
            uri={item.uri}
            active={item.name === activeIndex}
            onPress={() => setActiveIndex(item.name)}
          />
        ))}
      </ScrollView>
      
      <ThemedText type="subtitle">Rooms</ThemedText>
      <ScrollView horizontal>
        {Departments[activeIndex.toUpperCase()].map((room, roomIndex) => {
          if (roomIndex > 3) return <View key={roomIndex}></View>;

          return (
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
                        roomLabel: typeof room.label === 'string' ? room.label : undefined,
                        roomName: typeof room.name === 'string' ? room.name : undefined,
                        roomFloor: typeof room.floor === 'number' ? room.floor : 1
                    }
                  });                
                }}
              />                                         
            </View>
          );
        })}
        <ViewMoreButton/>
      </ScrollView>
      <View style={styles.container}>
        
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    gap: 8,
    marginBottom: 8,
  },
  header: {
    height: '100%',
    width: '100%',    
  },
  legendCont:{
    display:'flex',
    flexDirection:'row',
    gap:20,
  }
});
