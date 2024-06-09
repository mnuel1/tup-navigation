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
                <Node x={630} y={295} label="440" />
                <Node x={692} y={308} label="439" />
                <Node x={688} y={316} label="438" />
                <Node x={672} y={340} label="437" />
                <Node x={662} y={353} label="436" />
                <Node x={656} y={363} label="435" />
                <Node x={649} y={371} label="434" />
                <Node x={644} y={379} label="433" />
                <Node x={638} y={392} label="432" />
                <Node x={686} y={284} label="431" />
                <Node x={656} y={330} label="430" />
                <Node x={630} y={364} label="429" />
                <Node x={649} y={322} label="428" />
                <Node x={664} y={280} label="427" />
                <Node x={639} y={319} label="426" />
                <Node x={615} y={353} label="425" />
                <Node x={605} y={364} label="424" />
                <Node x={652} y={268} label="423" />
                <Node x={643} y={280} label="422" />
                <Node x={633} y={290} label="421" />
                <Node x={627} y={302} label="420" />
                <Node x={623} y={310} label="419" />
                <Node x={617} y={319} label="418" />
                <Node x={608} y={330} label="417" />
                <Node x={595} y={348} label="416" />
                <Node x={587} y={356} label="415" />
                <Node x={698} y={284} label="414" />
                <Node x={682} y={308} label="413" />
                <Node x={639} y={371} label="412" />
                <Node x={651} y={353} label="411" />
                <Node x={662} y={336} label="410" />
                <Node x={670} y={323} label="409" />
                <Node x={656} y={311} label="408" />
                <Node x={654} y={280} label="407" />
                <Node x={640} y={302} label="406" />
                <Node x={626} y={319} label="405" />
                <Node x={606} y={349} label="404" />
                <Node x={596} y={364} label="403" />
                <Node x={933} y={350} label="402" />
                <Node x={887} y={266} label="401" />
                <Node x={956} y={255} label="400/coe" />
                <Node x={946} y={265} label="399" />
                <Node x={902} y={206} label="398/irtc" />
                <Node x={895} y={215} label="397" />
                <Node x={853} y={250} label="396" />
                <Node x={826} y={192} label="395/PPET" />
                <Node x={804} y={198} label="394" />
                <Node x={782} y={200} label="393/motorpool" />
                <Node x={747} y={250} label="392/old cit building" />
                <Node x={758} y={255} label="391" />
                <Node x={799} y={366} label="390/openfield" />
                <Node x={750} y={333} label="389/court" />
                <Node x={720} y={313} label="388" />
                <Node x={688} y={337} label="387" />
                <Node x={682} y={367} label="386" />
                <Node x={549} y={352} label="385/gate4" />
                <Node x={628} y={387} label="384" />
                <Node x={611} y={397} label="383" />
                <Node x={646} y={415} label="382" />
                <Node x={639} y={444} label="381/chapel" />
                <Node x={691} y={556} label="380/gate3" />
                <Node x={926} y={555} label="379/gate1" />
                <Node x={926} y={515} label="378" />
                <Node x={926} y={440} label="377" />
                <Node x={829} y={440} label="376" />                
                <Node x={779} y={440} label="375" />
                <Node x={722} y={440} label="374" />
                <Node x={722} y={465} label="373/liblary" />
                <Node x={722} y={455} label="372" />
                <Node x={691} y={455} label="371" />
                <Node x={671} y={470} label="370" />
                <Node x={691} y={470} label="369" />
                <Node x={691} y={470} label="369" />
                <Node x={691} y={516} label="368" />

                <Node x={671} y={480} label="188" />

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
