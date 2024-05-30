import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Node from '@/components/map/Node';
import Connection from '@/components/map/Connection';
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
  const [connections, setConnections] = useState([
    { start: { x: 807, y: 558, label: '0' }, end: { x: 774, y: 546, label: '1' }, active: false },
    { start: { x: 807, y: 558, label: '0' }, end: { x: 789, y: 546, label: '2' }, active: false },
    { start: { x: 807, y: 558, label: '0' }, end: { x: 804, y: 546, label: '3' }, active: false },
    { start: { x: 807, y: 558, label: '0' }, end: { x: 819, y: 546, label: '4' }, active: false },
    { start: { x: 807, y: 558, label: '0' }, end: { x: 834, y: 546, label: '5' }, active: false },
    { start: { x: 774, y: 546, label: '1' }, end: { x: 834, y: 531, label: '10' }, active: false },
    { start: { x: 774, y: 546, label: '1' }, end: { x: 819, y: 531, label: '9' }, active: false },
    { start: { x: 774, y: 546, label: '1' }, end: { x: 804, y: 531, label: '8' }, active: false },
    { start: { x: 774, y: 546, label: '1' }, end: { x: 789, y: 531, label: '7' }, active: false },
    { start: { x: 774, y: 546, label: '1' }, end: { x: 774, y: 531, label: '6' }, active: false },
    { start: { x: 789, y: 546, label: '2' }, end: { x: 834, y: 531, label: '10' }, active: false },
    { start: { x: 789, y: 546, label: '2' }, end: { x: 819, y: 531, label: '9' }, active: false },
    { start: { x: 789, y: 546, label: '2' }, end: { x: 804, y: 531, label: '8' }, active: false },
    { start: { x: 789, y: 546, label: '2' }, end: { x: 789, y: 531, label: '7' }, active: false },
    { start: { x: 789, y: 546, label: '2' }, end: { x: 774, y: 531, label: '6' }, active: false },
    { start: { x: 804, y: 546, label: '3' }, end: { x: 834, y: 531, label: '10' }, active: false },
    { start: { x: 804, y: 546, label: '3' }, end: { x: 819, y: 531, label: '9' }, active: false },
    { start: { x: 804, y: 546, label: '3' }, end: { x: 804, y: 531, label: '8' }, active: false },
    { start: { x: 804, y: 546, label: '3' }, end: { x: 789, y: 531, label: '7' }, active: false },
    { start: { x: 804, y: 546, label: '3' }, end: { x: 774, y: 531, label: '6' }, active: false },
    { start: { x: 819, y: 546, label: '4' }, end: { x: 834, y: 531, label: '10' }, active: false },
    { start: { x: 819, y: 546, label: '4' }, end: { x: 819, y: 531, label: '9' }, active: false },
    { start: { x: 819, y: 546, label: '4' }, end: { x: 804, y: 531, label: '8' }, active: false },
    { start: { x: 819, y: 546, label: '4' }, end: { x: 789, y: 531, label: '7' }, active: false },
    { start: { x: 819, y: 546, label: '4' }, end: { x: 774, y: 531, label: '6' }, active: false },
    { start: { x: 834, y: 546, label: '5' }, end: { x: 834, y: 531, label: '10' }, active: false },
    { start: { x: 834, y: 546, label: '5' }, end: { x: 819, y: 531, label: '9' }, active: false },
    { start: { x: 834, y: 546, label: '5' }, end: { x: 804, y: 531, label: '8' }, active: false },
    { start: { x: 834, y: 546, label: '5' }, end: { x: 789, y: 531, label: '7' }, active: false },
    { start: { x: 834, y: 546, label: '5' }, end: { x: 774, y: 531, label: '6' }, active: false },
    
    { start: { x: 774, y: 531, label: '6' }, end: { x: 834, y: 516, label: '15' }, active: false },
    { start: { x: 774, y: 531, label: '6' }, end: { x: 819, y: 516, label: '14' }, active: false },
    { start: { x: 774, y: 531, label: '6' }, end: { x: 804, y: 516, label: '13' }, active: false },
    { start: { x: 774, y: 531, label: '6' }, end: { x: 789, y: 516, label: '12' }, active: false },
    { start: { x: 774, y: 531, label: '6' }, end: { x: 774, y: 516, label: '11' }, active: false },
    { start: { x: 789, y: 531, label: '7' }, end: { x: 834, y: 516, label: '15' }, active: false },
    { start: { x: 789, y: 531, label: '7' }, end: { x: 819, y: 516, label: '14' }, active: false },
    { start: { x: 789, y: 531, label: '7' }, end: { x: 804, y: 516, label: '13' }, active: false },
    { start: { x: 789, y: 531, label: '7' }, end: { x: 789, y: 516, label: '12' }, active: false },
    { start: { x: 789, y: 531, label: '7' }, end: { x: 774, y: 516, label: '11' }, active: false },
    { start: { x: 804, y: 531, label: '8' }, end: { x: 834, y: 516, label: '15' }, active: false },
    { start: { x: 804, y: 531, label: '8' }, end: { x: 819, y: 516, label: '14' }, active: false },
    { start: { x: 804, y: 531, label: '8' }, end: { x: 804, y: 516, label: '13' }, active: false },
    { start: { x: 804, y: 531, label: '8' }, end: { x: 789, y: 516, label: '12' }, active: false },
    { start: { x: 804, y: 531, label: '8' }, end: { x: 774, y: 516, label: '11' }, active: false },
    { start: { x: 819, y: 531, label: '9' }, end: { x: 834, y: 516, label: '15' }, active: false },
    { start: { x: 819, y: 531, label: '9' }, end: { x: 819, y: 516, label: '14' }, active: false },
    { start: { x: 819, y: 531, label: '9' }, end: { x: 804, y: 516, label: '13' }, active: false },
    { start: { x: 819, y: 531, label: '9' }, end: { x: 789, y: 516, label: '12' }, active: false },
    { start: { x: 819, y: 531, label: '9' }, end: { x: 774, y: 516, label: '11' }, active: false },
    { start: { x: 834, y: 531, label: '10' }, end: { x: 834, y: 516, label: '15' }, active: false },
    { start: { x: 834, y: 531, label: '10' }, end: { x: 819, y: 516, label: '14' }, active: false },
    { start: { x: 834, y: 531, label: '10' }, end: { x: 804, y: 516, label: '13' }, active: false },
    { start: { x: 834, y: 531, label: '10' }, end: { x: 789, y: 516, label: '12' }, active: false },
    { start: { x: 834, y: 531, label: '10' }, end: { x: 774, y: 516, label: '11' }, active: false },
    { start: { x: 774, y: 516, label: '11' }, end: { x: 834, y: 501, label: '20' }, active: false },
    { start: { x: 774, y: 516, label: '11' }, end: { x: 819, y: 501, label: '19' }, active: false },
    { start: { x: 774, y: 516, label: '11' }, end: { x: 804, y: 501, label: '18' }, active: false },
    { start: { x: 774, y: 516, label: '11' }, end: { x: 789, y: 501, label: '17' }, active: false },
    { start: { x: 774, y: 516, label: '11' }, end: { x: 774, y: 501, label: '16' }, active: false },    
    { start: { x: 789, y: 516, label: '12' }, end: { x: 834, y: 501, label: '20' }, active: false },
    { start: { x: 789, y: 516, label: '12' }, end: { x: 819, y: 501, label: '19' }, active: false },
    { start: { x: 789, y: 516, label: '12' }, end: { x: 804, y: 501, label: '18' }, active: false },
    { start: { x: 789, y: 516, label: '12' }, end: { x: 789, y: 501, label: '17' }, active: false },
    { start: { x: 789, y: 516, label: '12' }, end: { x: 774, y: 501, label: '16' }, active: false },
    { start: { x: 804, y: 516, label: '13' }, end: { x: 834, y: 501, label: '20' }, active: false },
    { start: { x: 804, y: 516, label: '13' }, end: { x: 819, y: 501, label: '19' }, active: false },
    { start: { x: 804, y: 516, label: '13' }, end: { x: 804, y: 501, label: '18' }, active: false },
    { start: { x: 804, y: 516, label: '13' }, end: { x: 789, y: 501, label: '17' }, active: false },
    { start: { x: 804, y: 516, label: '13' }, end: { x: 774, y: 501, label: '16' }, active: false },
    { start: { x: 819, y: 516, label: '14' }, end: { x: 834, y: 501, label: '20' }, active: false },
    { start: { x: 819, y: 516, label: '14' }, end: { x: 819, y: 501, label: '19' }, active: false },
    { start: { x: 819, y: 516, label: '14' }, end: { x: 804, y: 501, label: '18' }, active: false },
    { start: { x: 819, y: 516, label: '14' }, end: { x: 789, y: 501, label: '17' }, active: false },
    { start: { x: 819, y: 516, label: '14' }, end: { x: 774, y: 501, label: '16' }, active: false },
    { start: { x: 834, y: 516, label: '15' }, end: { x: 834, y: 501, label: '20' }, active: false },
    { start: { x: 834, y: 516, label: '15' }, end: { x: 819, y: 501, label: '19' }, active: false },
    { start: { x: 834, y: 516, label: '15' }, end: { x: 804, y: 501, label: '18' }, active: false },
    { start: { x: 834, y: 516, label: '15' }, end: { x: 789, y: 501, label: '17' }, active: false },
    { start: { x: 834, y: 516, label: '15' }, end: { x: 774, y: 501, label: '16' }, active: false },
    { start: { x: 774, y: 501, label: '16' }, end: { x: 779, y: 486, label: '23' }, active: false },
    { start: { x: 779, y: 486, label: '23' }, end: { x: 779, y: 471, label: '24' }, active: false },
    { start: { x: 779, y: 471, label: '24' }, end: { x: 779, y: 456, label: '25' }, active: false },
    { start: { x: 834, y: 501, label: '20' }, end: { x: 829, y: 486, label: '26' }, active: false },
    { start: { x: 829, y: 486, label: '26' }, end: { x: 829, y: 471, label: '27' }, active: false },
    { start: { x: 829, y: 471, label: '27' }, end: { x: 829, y: 456, label: '28' }, active: false },
    { start: { x: 804, y: 501, label: '18' }, end: { x: 804, y: 488, label: '21' }, active: false },
    { start: { x: 804, y: 488, label: '21' }, end: { x: 804, y: 475, label: '22' }, active: false },
    { start: { x: 774, y: 516, label: '11' }, end: { x: 759, y: 516, label: '29' }, active: false },
    { start: { x: 759, y: 516, label: '29' }, end: { x: 744, y: 516, label: '30' }, active: false },
    { start: { x: 744, y: 516, label: '30' }, end: { x: 728, y: 516, label: '31' }, active: false },
    { start: { x: 728, y: 516, label: '31' }, end: { x: 713, y: 516, label: '32' }, active: false },

    { start: { x: 834, y: 516, label: '15' }, end: { x: 849, y: 516, label: '33' }, active: false },
    { start: { x: 849, y: 516, label: '33' }, end: { x: 865, y: 516, label: '34' }, active: false },
    { start: { x: 865, y: 516, label: '34' }, end: { x: 880, y: 516, label: '35' }, active: false },
    { start: { x: 880, y: 516, label: '35' }, end: { x: 895, y: 516, label: '36' }, active: false },
    { start: { x: 895, y: 516, label: '36' }, end: { x: 910, y: 516, label: '37' }, active: false },


    


  ]);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startTranslateX = useSharedValue(0);
  const startTranslateY = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onStart(() => {
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

  const activateConnections = (path:any) => {
    const newConnections = connections.map((connection) => ({
      ...connection,
      active: false,
    }));

    for (let i = 0; i < path.length - 1; i++) {
      const startLabel = path[i];
      const endLabel = path[i + 1];
      
      newConnections.forEach((connection) => {
        if (
          (connection.start.label === startLabel && connection.end.label === endLabel) ||
          (connection.start.label === endLabel && connection.end.label === startLabel)
        ) {
          connection.active = true;
        }
      });
    }

    setConnections(newConnections);
  };

  useEffect(() => {
    const path = ['1', '6', '11', '29',];
    // activateConnections(path);
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
                <Image
                  source={require('../../assets/images/1st.png')}
                  style={styles.backgroundImage}
                  resizeMode="center"
                />
     

                <Node x={905} y={504} label="51/clinic" />
                <Node x={895} y={528} label="50/museum" />
                <Node x={895} y={504} label="49/cla multimedia" />
                <Node x={884} y={528} label="48/stair" />
                <Node x={884} y={504} label="47/cr" />
                <Node x={870} y={504} label="45/guidance and testing office" />


                <Node x={863} y={527} label="44/unknown room" />
                <Node x={858} y={504} label="43/osa" />
                <Node x={847} y={527} label="42/unknown room" />
                <Node x={845} y={504} label="41/office of admissions" />

                <Node x={711} y={528} label="40/pe dept"  />
                <Node x={724} y={528} label="39/stair"  />
                <Node x={759} y={528} label="38/registrar"  />

                <Node x={910} y={516} label="37" />
                <Node x={895} y={516} label="36" />
                <Node x={880} y={516} label="35" />
                <Node x={865} y={516} label="34" />
                <Node x={849} y={516} label="33" />
                
                <Node x={713} y={516} label="32" />
                <Node x={728} y={516} label="31" />
                <Node x={744} y={516} label="30" />
                <Node x={759} y={516} label="29" />

                <Node x={829} y={456} label="28" />
                <Node x={829} y={471} label="27" />
                <Node x={829} y={486} label="26" />

                <Node x={779} y={456} label="25" />
                <Node x={779} y={471} label="24" />
                <Node x={779} y={486} label="23" />


                <Node x={804} y={475} label="22/stair" />
                <Node x={804} y={488} label="21" />

                <Node x={834} y={501} label="20" />
                <Node x={819} y={501} label="19" />
                <Node x={804} y={501} label="18" />
                <Node x={789} y={501} label="17" />
                <Node x={774} y={501} label="16" />

                <Node x={834} y={516} label="15" />
                <Node x={819} y={516} label="14" />
                <Node x={804} y={516} label="13" />
                <Node x={789} y={516} label="12" />
                <Node x={774} y={516} label="11" />
                
                <Node x={834} y={531} label="10" />
                <Node x={819} y={531} label="9"  />
                <Node x={804} y={531} label="8"  />
                <Node x={789} y={531} label="7"  />
                <Node x={774} y={531} label="6"  />

                <Node x={834} y={546} label="5" />
                <Node x={819} y={546} label="4" />
                <Node x={804} y={546} label="3" />
                <Node x={789} y={546} label="2" />
                <Node x={774} y={546} label="1" />

                <Node x={805} y={558} label="0"/>

                {connections.map((conn, index) => (
                  <Connection key={index} start={conn.start} end={conn.end} active={conn.active} />
                ))}
                
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </>
      }
    >
      <View style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
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
    flexDirection: 'row',
    gap: 8,
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
});
