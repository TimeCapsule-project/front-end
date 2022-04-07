import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

type PropsType = {
  children: JSX.Element;
  releaseEventHandler?: (pan: Animated.ValueXY) => void;
};

/**
 * @description 제스처를 제어하기 위한 View Container 입니다. /
 * 현재 Horizental direction 만 지원하고 있습니다.
 * @type {function(PropsType): JSX.Element {}}
 */
function GestureView({
  children,
  releaseEventHandler,
}: PropsType): JSX.Element {
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
      onPanResponderMove: Animated.event([null, { dx: _pan.x, dy: _pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        releaseEventHandler && releaseEventHandler(_pan);
      },
    }),
  ).current;

  return (
    <Animated.View
      style={{
        transform: [{ translateX: _pan.x } /*, { translateY: _pan.y } */],
      }}
      {..._panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
}

export default GestureView;
