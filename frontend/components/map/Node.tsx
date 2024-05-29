import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface NodeProps {
  x: number;
  y: number;
  label: string;
}

const Node: React.FC<NodeProps> = ({ x, y, label }) => {
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      <Svg height="5" width="5">
        <Circle cx="2.5" cy="2.5" r="2.5" fill="blue" />
      </Svg>
      <Text style={{ color: 'white', textAlign: 'center' }}></Text>
    </View>
  );
};

export default Node;
