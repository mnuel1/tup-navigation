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
  const [floor, setFloor] = useState(4)
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
                <Node x={578} y={482} label="366/cafa 405" />
<Node x={596} y={451} label="366/cafa 403" />
<Node x={607} y={436} label="365/cafa 402" />
<Node x={618} y={423} label="364/cafa 401" /> 
<Node x={581} y={404} label="363/cafa 413" />
<Node x={573} y={416} label="362/cafa 412" />
<Node x={562} y={430} label="361/cafa 411" />
<Node x={551} y={446} label="360/cafa 410" />
<Node x={540} y={462} label="359/cafa 409" />

<Node x={562} y={478} label="358/cafa 404" />
<Node x={562} y={490} label="357/cafa 406b" />
<Node x={562} y={508} label="356/cafa 406a" />
<Node x={532} y={476} label="355/cafa 408" />
<Node x={533} y={507} label="354/cafa 407" />

<Node x={588} y={472} label="353/cr" />
<Node x={583} y={467} label="352/stair" />
<Node x={534} y={525} label="351/stair" />
<Node x={580} y={460} label="350" />
<Node x={590} y={446} label="349" />
<Node x={601} y={430} label="348" />
<Node x={609} y={420} label="347" />
<Node x={603} y={410} label="346" />
<Node x={591} y={408} label="345" />
<Node x={581} y={422} label="344" />
<Node x={570} y={436} label="343" />
<Node x={560} y={450} label="342" />
<Node x={548} y={464} label="341" />
<Node x={539} y={479} label="340" />
<Node x={534} y={493} label="339" /> 
<Node x={539} y={503} label="338" />

<Node x={546} y={517} label="337" />
<Node x={570} y={475} label="336" />
<Node x={570} y={490} label="335" />
<Node x={570} y={515} label="334" />

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
