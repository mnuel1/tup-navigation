import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
import Node from '@/components/map/Node';
import { ConnectionsByFloor } from '../types/ConnectionsFloor';
import FloorsImage from '@/components/FloorsImage';
import nodeConnections from '@/components/NodeConnections';
import InputBoxComponent from '@/components/InputBox';
import Connection from '@/components/map/Connection';
import { FloorLegend } from '@/components/FloorLegend';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

function clamp(val:any, min:any, max:any) {
  return Math.min(Math.max(val, min), max);
}

export default function TabThreeScreen() {

  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [floor, setFloor] = useState(1)
  const [connections, setConnections] = useState<ConnectionsByFloor>(nodeConnections);
  const floorsImage = FloorsImage

  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startTranslateX = useSharedValue(0);
  const startTranslateY = useSharedValue(0);

  const pinch = Gesture.Pinch().onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = clamp(
        startScale.value * event.scale,
        0.1,
        Math.min(width / 100, height / 100)
      );
    })
    .runOnJS(true);

  const pan = Gesture.Pan()
    .onStart(() => {
      startTranslateX.value = translateX.value;
      startTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = startTranslateX.value + event.translationX;
      translateY.value = startTranslateY.value + event.translationY;
    })
    .runOnJS(true);

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const composedGesture = Gesture.Simultaneous(pinch, pan);

  const handleSetStart = (text: string) => { setStart(text) }
  const handleSetEnd = (text: string) => { setEnd(text) }

  const activateConnections = (floor:any, path: any) => {
    const newConnections = { ...connections };
    const floorConnections = newConnections[floor].map((connection) => ({
      ...connection,
      active: false,
    }));

    for (let i = 0; i < path.length - 1; i++) {
      const startLabel = path[i];
      const endLabel = path[i + 1];

      floorConnections.forEach((connection) => {
        if (
          (connection.start.label === startLabel && connection.end.label === endLabel) ||
          (connection.start.label === endLabel && connection.end.label === startLabel)
        ) {
          connection.active = true;
        }
      });
    }

    newConnections[floor] = floorConnections;
    setConnections(newConnections);
  };

  useEffect(() => {
    const path = ['0', '1', '6'];
    // activateConnections(floor, path);
  }, []);


  return (
    <ParallaxScrollView
      isMap={true}
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <>
          <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={composedGesture}>
              <Animated.View style={[styles.box, boxAnimatedStyles]}>
                {floorsImage[floor] && floorsImage[floor]()}
                
                {connections[floor] && connections[floor].map((conn, index) => (
                  <Connection key={index} start={conn.start} end={conn.end} active={conn.active} />
                ))}
                           
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </>
      }
    >
      <View style={styles.titleContainer}>
      <ScrollView horizontal style={styles.legendCont}>
        {
          (() => {
            const floorLegendComponents = [];
            for (let i = 1; i <= 4; i++) {
              const isUp = i === 1 && floor === 1|| floor < i;
              const floorLabel = i === 1 ? "1st" : i === 2 ? "2nd" : i === 3 ? "3rd" : `${i}th`;
              floorLegendComponents.push(
                <FloorLegend
                  key={i} 
                  name={floorLabel}
                  active={floor === i ? true : false}
                  isUp={isUp}
                  onPress={() => setFloor(i)} 
                />
              );
            }
            return floorLegendComponents;
          })()
        }
      </ScrollView>
        <ThemedText type="title">Explore</ThemedText>

        <View style={styles.inputboxes}>
          <InputBoxComponent             
            placeholder='Currently at...' 
            onInputChange={handleSetStart} />
          <InputBoxComponent             
            placeholder='Your Destination...' 
            onInputChange={handleSetEnd} />
        </View>
        
      </View>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  box: {
    width: 1503,
    height: 779,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
    position: 'absolute',
    left: '50%',
    top: '50%',
    pointerEvents: 'none',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  inputboxes: {
    gap:4
  },
  header: {
    height: '100%',
    width: '100%',
  },
  backgroundImage: {
    // flex: 1,
    width: '100%',
    height: '100%',
    // position: 'absolute',
  },
  legendCont:{
    display:'flex',
    flexDirection:'row',
    gap:20,
  }
});
