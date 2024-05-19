import React from 'react';
import { View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

interface ConnectionProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

const Connection: React.FC<ConnectionProps> = ({ start, end }) => {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <Svg height="100%" width="100%">
        <Line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="black"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

export default Connection;
