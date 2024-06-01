import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Node from '@/components/map/Node';
import InputBoxComponent from '@/components/InputBox';
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
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
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
    { start: { x: 759, y: 516, label: '29' }, end: { x: 759, y: 528, label: '38' }, active: false },
    { start: { x: 759, y: 516, label: '29' }, end: { x: 744, y: 516, label: '30' }, active: false },
    { start: { x: 744, y: 516, label: '30' }, end: { x: 728, y: 516, label: '31' }, active: false },
    { start: { x: 728, y: 516, label: '31' }, end: { x: 724, y: 528, label: '39' }, active: false },
    { start: { x: 728, y: 516, label: '31' }, end: { x: 713, y: 516, label: '32' }, active: false },
    { start: { x: 713, y: 516, label: '32' }, end: { x: 711, y: 528, label: '40' }, active: false },
    { start: { x: 834, y: 516, label: '15' }, end: { x: 849, y: 516, label: '33' }, active: false },
    { start: { x: 849, y: 516, label: '33' }, end: { x: 847, y: 527, label: '42' }, active: false },
    { start: { x: 849, y: 516, label: '33' }, end: { x: 845, y: 504, label: '41' }, active: false },
    { start: { x: 849, y: 516, label: '33' }, end: { x: 865, y: 516, label: '34' }, active: false },
    { start: { x: 865, y: 516, label: '34' }, end: { x: 863, y: 527, label: '44' }, active: false },
    { start: { x: 865, y: 516, label: '34' }, end: { x: 858, y: 504, label: '43' }, active: false },
    { start: { x: 865, y: 516, label: '34' }, end: { x: 880, y: 516, label: '35' }, active: false },
    { start: { x: 880, y: 516, label: '35' }, end: { x: 884, y: 528, label: '48' }, active: false },
    { start: { x: 880, y: 516, label: '35' }, end: { x: 884, y: 504, label: '47' }, active: false },
    { start: { x: 880, y: 516, label: '35' }, end: { x: 870, y: 504, label: '45' }, active: false },
    { start: { x: 880, y: 516, label: '35' }, end: { x: 895, y: 516, label: '36' }, active: false },
    { start: { x: 895, y: 516, label: '36' }, end: { x: 895, y: 528, label: '50' }, active: false },
    { start: { x: 895, y: 516, label: '36' }, end: { x: 895, y: 504, label: '49' }, active: false },
    { start: { x: 895, y: 516, label: '36' }, end: { x: 910, y: 516, label: '37' }, active: false },
    { start: { x: 910, y: 516, label: '37' }, end: { x: 905, y: 504, label: '51' }, active: false },
    { start: { x: 579, y: 463, label: '179' }, end: { x: 584, y: 468, label: '184' }, active: false },
    { start: { x: 586, y: 454, label: '178' }, end: { x: 595, y: 456, label: '207' }, active: false },
    { start: { x: 586, y: 454, label: '178' }, end: { x: 579, y: 463, label: '179' }, active: false },
    { start: { x: 603, y: 431, label: '175' }, end: { x: 608, y: 437, label: '208' }, active: false },
    { start: { x: 603, y: 431, label: '175' }, end: { x: 586, y: 454, label: '178' }, active: false },
    { start: { x: 612, y: 417, label: '174' }, end: { x: 619, y: 423, label: '209' }, active: false },
    { start: { x: 612, y: 417, label: '174' }, end: { x: 603, y: 431, label: '175' }, active: false },
    { start: { x: 604, y: 411, label: '173' }, end: { x: 612, y: 417, label: '174' }, active: false },
    { start: { x: 595, y: 406, label: '172' }, end: { x: 588, y: 399, label: '206' }, active: false },
    { start: { x: 595, y: 406, label: '172' }, end: { x: 604, y: 411, label: '173' }, active: false },
    { start: { x: 583, y: 420, label: '171' }, end: { x: 576, y: 415, label: '205' }, active: false },
    { start: { x: 583, y: 420, label: '171' }, end: { x: 595, y: 406, label: '172' }, active: false },
    { start: { x: 569, y: 438, label: '170' }, end: { x: 563, y: 431, label: '204' }, active: false },
    { start: { x: 569, y: 438, label: '170' }, end: { x: 583, y: 420, label: '171' }, active: false },
    { start: { x: 558, y: 453, label: '169' }, end: { x: 552, y: 447, label: '203' }, active: false },
    { start: { x: 558, y: 453, label: '169' }, end: { x: 569, y: 438, label: '170' }, active: false },
    { start: { x: 550, y: 464, label: '168' }, end: { x: 558, y: 453, label: '169' }, active: false },
    { start: { x: 539, y: 481, label: '167' }, end: { x: 532, y: 479, label: '202' }, active: false },
    { start: { x: 539, y: 481, label: '167' }, end: { x: 550, y: 464, label: '168' }, active: false },
    { start: { x: 535, y: 492, label: '165' }, end: { x: 528, y: 498, label: '201' }, active: false },
    { start: { x: 535, y: 492, label: '165' }, end: { x: 539, y: 481, label: '167' }, active: false },
    { start: { x: 540, y: 504, label: '164' }, end: { x: 534, y: 508, label: '200' }, active: false },
    { start: { x: 540, y: 504, label: '164' }, end: { x: 535, y: 492, label: '165' }, active: false },
    { start: { x: 546, y: 517, label: '163' }, end: { x: 553, y: 526, label: '197' }, active: false },
    { start: { x: 546, y: 517, label: '163' }, end: { x: 535, y: 526, label: '182' }, active: false },
    { start: { x: 546, y: 517, label: '163' }, end: { x: 540, y: 504, label: '164' }, active: false },
    { start: { x: 562, y: 517, label: '161' }, end: { x: 563, y: 526, label: '196' }, active: false },
    { start: { x: 562, y: 517, label: '161' }, end: { x: 546, y: 517, label: '163' }, active: false },
    { start: { x: 571, y: 476, label: '160' }, end: { x: 579, y: 463, label: '179' }, active: false },
    { start: { x: 571, y: 478, label: '160' }, end: { x: 588, y: 477, label: '186' }, active: false },
    { start: { x: 571, y: 476, label: '160' }, end: { x: 550, y: 464, label: '168' }, active: false },
    { start: { x: 571, y: 485, label: '159' }, end: { x: 563, y: 486, label: '199' }, active: false },
    { start: { x: 571, y: 485, label: '159' }, end: { x: 571, y: 476, label: '160' }, active: false },
    { start: { x: 572, y: 501, label: '158' }, end: { x: 564, y: 504, label: '198' }, active: false },
    { start: { x: 572, y: 501, label: '158' }, end: { x: 572, y: 485, label: '159' }, active: false },
    { start: { x: 572, y: 517, label: '157' }, end: { x: 573, y: 526, label: '195' }, active: false },
    { start: { x: 572, y: 517, label: '157' }, end: { x: 562, y: 517, label: '161' }, active: false },
    { start: { x: 572, y: 517, label: '157' }, end: { x: 572, y: 501, label: '158' }, active: false },
    { start: { x: 589, y: 517, label: '156' }, end: { x: 582, y: 510, label: '194' }, active: false },
    { start: { x: 589, y: 517, label: '156' }, end: { x: 595, y: 510, label: '193' }, active: false },
    { start: { x: 589, y: 517, label: '156' }, end: { x: 572, y: 517, label: '157' }, active: false },
    { start: { x: 606, y: 496, label: '155' }, end: { x: 606, y: 490, label: '192' }, active: false },
    { start: { x: 606, y: 517, label: '154' }, end: { x: 613, y: 526, label: '191' }, active: false },
    { start: { x: 606, y: 517, label: '154' }, end: { x: 589, y: 517, label: '156' }, active: false },
    { start: { x: 606, y: 517, label: '154' }, end: { x: 606, y: 496, label: '155' }, active: false },
    { start: { x: 628, y: 517, label: '153' }, end: { x: 606, y: 517, label: '154' }, active: false },
    { start: { x: 651, y: 496, label: '152' }, end: { x: 651, y: 490, label: '189' }, active: false },
    { start: { x: 651, y: 496, label: '152' }, end: { x: 606, y: 496, label: '155' }, active: false },
    { start: { x: 651, y: 504, label: '151' }, end: { x: 644, y: 505, label: '181' }, active: false },
    { start: { x: 651, y: 504, label: '151' }, end: { x: 651, y: 496, label: '152' }, active: false },
    { start: { x: 651, y: 517, label: '150' }, end: { x: 647, y: 526, label: '190' }, active: false },
    { start: { x: 651, y: 517, label: '150' }, end: { x: 628, y: 517, label: '153' }, active: false },
    { start: { x: 651, y: 517, label: '150' }, end: { x: 651, y: 504, label: '151' }, active: false },
    { start: { x: 658, y: 517, label: '149' }, end: { x: 663, y: 508, label: '187' }, active: false },
    { start: { x: 658, y: 517, label: '149' }, end: { x: 658, y: 533, label: '185' }, active: false },
    { start: { x: 658, y: 517, label: '149' }, end: { x: 651, y: 517, label: '150' }, active: false },
    { start: { x: 669, y: 517, label: '148' }, end: { x: 663, y: 508, label: '187' }, active: false },
    { start: { x: 669, y: 517, label: '148' }, end: { x: 667, y: 531, label: '180' }, active: false },
    { start: { x: 669, y: 517, label: '148' }, end: { x: 657, y: 517, label: '149' }, active: false },
    


  ]);
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

  const handleSetStart = (text: string) => { setStart(text) }
  const handleSetEnd = (text: string) => { setEnd(text) }

  useEffect(() => {
    const path = ['150', '153', '154', '155', '152'];
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
                  source={require('../../assets/images/1st11.png')}
                  style={styles.backgroundImage}
                  resizeMode="center"
                />
          
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
});
