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
                  source={require('../../assets/images/firstfloor1.png')}
                  style={styles.backgroundImage}
                  resizeMode="cover"
                />
                <Node x={1410} y={335} label="51/clinic" />
                <Node x={1316} y={515} label="50/museum" />
                <Node x={1316} y={335} label="49/cla multimedia" />
                <Node x={1236} y={532} label="48/stair" />
                <Node x={1236} y={335} label="47/cr" />
                <Node x={1132} y={335} label="45/guidance and testing office" />

                <Node x={1040} y={515} label="44/unknown room" />
                <Node x={1040} y={335} label="43/osa" />
                
                <Node x={963} y={515} label="42/unknown room" />
                <Node x={963} y={335} label="41/office of admissions" />

                <Node x={28} y={502} label="40/pe dept" />
                <Node x={107} y={522} label="39/stair" />
                <Node x={300} y={505} label="38/registrar" />

                <Node x={1430} y={422} label="37" />
                <Node x={1315} y={422} label="36" />
                <Node x={1202} y={422} label="35" />
                <Node x={1090} y={422} label="34" />
                <Node x={975} y={422} label="33" />
                
                {/* <Node x={862} y={422} label="32" /> */}
                <Node x={75} y={422} label="31" />
                <Node x={185} y={422} label="30" />
                <Node x={300} y={422} label="29" />
                

                <Node x={825} y={0} label="28" />
                <Node x={825} y={110} label="27" />
                <Node x={825} y={225} label="26" />
                <Node x={452} y={0} label="25" />
                <Node x={452} y={110} label="24" />
                <Node x={452} y={225} label="23" />
                <Node x={640} y={110} label="22/stair" />
                <Node x={640} y={225} label="21" />
                

                <Node x={862} y={310} label="20" />
                <Node x={750} y={310} label="19" />
                <Node x={640} y={310} label="18" />
                <Node x={525} y={310} label="17" />
                <Node x={412} y={310} label="16" />


                <Node x={862} y={422} label="15" />
                <Node x={750} y={422} label="14" />
                <Node x={640} y={422} label="13" />
                <Node x={525} y={422} label="12" />
                <Node x={412} y={422} label="11" />

                <Node x={862} y={535} label="10" />
                <Node x={750} y={535} label="9"  />
                <Node x={640} y={535} label="8"  />
                <Node x={525} y={535} label="7"  />
                <Node x={412} y={535} label="6"  />

                <Node x={862} y={650} label="5" />
                <Node x={750} y={650} label="4" />
                <Node x={640} y={650} label="3" />
                <Node x={525} y={650} label="2" />
                <Node x={412} y={650} label="1" />

                <Node x={640} y={720} label="0" />

              
                

                <Connection start={{ x: 60, y: 80 }} end={{ x: 210, y: 60 }} />
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
    backgroundColor: '#b58df1',
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
