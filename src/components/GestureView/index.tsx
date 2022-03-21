import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

type PropsType = {};

const GestureView: React.FC<PropsType> = ({ children }) => {
  const _pan = useRef(new Animated.ValueXY()).current;
  const _panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        _pan.setOffset({
          // @ts-ignore
          x: _pan.x._value,
          // @ts-ignore
          y: _pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: _pan.x, dy: _pan.y }]),
      onPanResponderRelease: () => {
        _pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <Animated.View {..._panResponder.panHandlers}>{children}</Animated.View>
  );
};

export default GestureView;
