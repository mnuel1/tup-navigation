import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, TouchableHighlight, Dimensions, ScrollView,Text } from 'react-native';
import Node from '@/components/map/Node';
import { ConnectionsByFloor } from '../types/ConnectionsFloor';
import FloorsImage from '@/components/FloorsImage';
import nodeConnections from '@/components/NodeConnections';
import { ScannerCamera } from '@/components/Scanner';

import Connection from '@/components/map/Connection';
import { FloorLegend } from '@/components/FloorLegend';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
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


import { RoomContext } from '@/components/Context';

const { width, height } = Dimensions.get('screen');

function clamp(val:any, min:any, max:any) {
  return Math.min(Math.max(val, min), max);
}

export default function TabThreeScreen() {

  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('YourComponent must be used within a RoomProvider');
  }

  const { roomLabel, roomName, roomFloor } = context;
  const [showScanner, setShowScanner] = useState(false);
  const [start, setStart] = useState('')
  const [end, setEnd] = useState(roomName || "");
  const [path, setPath] = useState([])
  const [floor, setFloor] = useState(roomFloor || 1)
  const [loading, setLoading] = useState(false)
  const [connections, setConnections] = useState<ConnectionsByFloor>(nodeConnections);
  const floorsImage = FloorsImage
  
  useEffect(() => {
    setEnd(roomName || "");
  }, [roomName]);

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
    // const path = ['0', '1', '6', '11', '29', '30', '31', '39', '53', '55', '57', '58', '76'];
      // const pathp = ['0', '3', '6', '11', '29', '38']
    activateConnections(floor, path);
    
  }, [floor, path]);

  const findPath = async () => {
    
    setLoading(true)
    try {
      if (!start && !end){
        alert('Please Select your destination and current location')
        return;
      }
      const url = `http://192.168.100.9:5000/find/path?start=${start}&end=${roomLabel}`;     
      const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
      const data = await response.json();
      

      setPath(data.best_path)
    } catch (error) {
      console.log(error)
      alert(error) 
    }
    setLoading(false)    
  }

  const handleDataScanned = (data: string) => {
    setStart(data)
    setShowScanner(false)
  };


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
            <Text style={{fontWeight:500}}>{'Your Current Location :'}</Text>
              {!showScanner ? (
                <TouchableHighlight 
                activeOpacity={1}
                underlayColor="#D29290"            
                onPress={() => setShowScanner(true)}>
                  <View style={styles.containerIB}>
                  <Entypo name="location-pin" size={24} color="#060930" />
                  <Text style={styles.inputBox}>{!start || start.length === 0 ? 'Scan the QR Code near you...' : start}</Text>
                </View>
                  
                </TouchableHighlight>
              ) : (
                <ScannerCamera onDataScanned={handleDataScanned} />
              )}
            
            
            <Text style={{fontWeight:500}}>{'Your Destination :'}</Text>
            <View style={styles.containerIB}>
              <Entypo name="location-pin" size={24} color="#060930" />
              <Text style={styles.inputBox}>{end || 'Your Destination...'}</Text>
            </View>
            {!loading && <TouchableHighlight 
            activeOpacity={1}
            underlayColor="#D29290"
            style={styles.button}
            // disabled={loading}
            onPress={() => findPath()}>
              <View style={styles.view}>
                <AntDesign name="search1" size={24} color="black" />
                <Text style={{fontWeight:400, fontSize: 18,color:'black'}}>Find</Text>
              </View>
              
            </TouchableHighlight>}

            
            
        </View>
        
      </View>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  containerIB: {        
    paddingHorizontal: 20,
    display:'flex',
    flexDirection:'row',    
    alignItems:'center',
    borderColor: 'rgba(6, 9, 48, 0.2)',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor:'white'
  },
  inputBox: {    
    padding: 15,
    color:'#060930',
    
  },
  button: {
    display:'flex',        
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"#D29290",
    width:'100%',
    marginTop:10,
    borderColor: 'rgba(6, 9, 48, 0.2)',
    borderWidth:1,
    borderRadius:4,
    padding:5

  },
  view:{
    display:'flex',        
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center',        
    gap:4,
  },
  
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
