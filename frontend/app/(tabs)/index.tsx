import React, { useState } from 'react';
import { Image, StyleSheet, Platform, ScrollView, View } from 'react-native';

import SearchComponent from '@/components/Search';
import { PlaceBox } from '@/components/Place';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { LegendBox } from '@/components/Legend';
import { ViewMoreButton } from '@/components/ViewMore';

export default function HomeScreen() {

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const data = [
    "sample1", "sample2"
  ]

  const legendData = [
    { name: 'cos', uri: 'https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/380750921_798508205620840_1007242552690161056_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeER2XMdHJ5DRVAUgaoINYCH54bOMDvEa3Tnhs4wO8RrdPx_x39w6bybWjbTQXpZbcM2d6OjbxjEh9eBIPQmyHit&_nc_ohc=Jkze40MRbbYQ7kNvgEbxKGG&_nc_ht=scontent.fcrk1-3.fna&oh=00_AYAAT95znPTVNItYDbvdPQ1PUuwxnfcQJyLkwPcOlwiXdw&oe=664FB19B' },
    { name: 'cla', uri: 'https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/400556800_3413985688911540_7860603865415269625_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF3akpeHRqlbZu1Pw5VOvgOfu0WwwMdRXJ-7RbDAx1Fck9mCz7Lhw2XEtEdvvCI2-ABKEgrTMZs9led9u5y-PYS&_nc_ohc=tv568u83b8QQ7kNvgHoNx6_&_nc_ht=scontent.fcrk1-4.fna&oh=00_AYC-jhnVGcKu8I4PedeiKnc4d5zZbwRTsYduhy67MSrrKg&oe=664F9CD0' },
    { name: 'cie', uri: 'https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/305390591_501802911949180_3688453010256607881_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFdQrujoZsOH95rzlZ7ahAkERDKccC73fUREMpxwLvd9aA1wNFuH26Bi6KhQoHdbypCy0xBjrbbHoFJwYcvOJuV&_nc_ohc=CehBniVpmf0Q7kNvgHSpm5f&_nc_ht=scontent.fcrk1-4.fna&oh=00_AYDjZ_SBpEWFrNJvoSVRyzKJ2i7PpJtPtc2pBgIWpgv_6g&oe=664FB14C' },
    { name: 'cafa', uri: 'https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/297713813_5467703859962984_3787380132607116630_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHjBTskVT6FjPvskd9X_z7O5QF-rCv5HdHlAX6sK_kd0dAM6fFaX224L79VRIPnp2JjvjDjhq7gFfPnfipR_zHD&_nc_ohc=wX8QJ0otV9kQ7kNvgF9SHa0&_nc_ht=scontent.fcrk1-4.fna&oh=00_AYDu42P79jZ91gkF7FkCcpMAJVlYPMfHChQ3d5ZuzBqivw&oe=664FCB09' },
    { name: 'coe', uri: 'https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/378694372_692325912925816_108306840591697452_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHTcFLrB5Z0PxFXpoyIh1r-yHjjwMeCGH7IeOPAx4IYfjwxzHirozMhvtjvH9KeNUcn1zY-bdF6DoFe3oVucz_Y&_nc_ohc=xVm3Z2kyOwkQ7kNvgEX2SwP&_nc_ht=scontent.fcrk1-3.fna&oh=00_AYC_NAslknhLScfSSOO4-YmOzk0nFIFVlqoUN_zCDVbD9A&oe=664FA48F' },
  ]
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
        <SearchComponent data={data}/>        
      </View>

      <ScrollView horizontal style={styles.legendCont}>
        {legendData.map((item, index) => (
          <LegendBox
            key={index}
            name={item.name}
            uri={item.uri}
            active={index === activeIndex}
            onPress={() => setActiveIndex(index)}
          />
        ))}
      </ScrollView>
      
      <ThemedText type="subtitle">Rooms</ThemedText>
      <ScrollView horizontal>
        <PlaceBox title='sample' sub_text='test' uri='https://www.claretschool.edu.ph/images/SHSCompLab/shs_comp_lab03.jpg' onPress={() => alert('yo')}/>
        <PlaceBox title='sample' sub_text='test' uri='https://www.claretschool.edu.ph/images/SHSCompLab/shs_comp_lab03.jpg' onPress={() => alert('yo')}/>
        <PlaceBox title='sample' sub_text='test' uri='https://www.claretschool.edu.ph/images/SHSCompLab/shs_comp_lab03.jpg' onPress={() => alert('yo')}/>
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
