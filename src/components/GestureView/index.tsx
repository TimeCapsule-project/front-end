import React, { useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderCallbacks,
  TouchableOpacity,
} from 'react-native';

type PropsType = {
  children: JSX.Element;
  onPress?: (event: GestureResponderEvent) => void;
  translate?: (pan: Animated.ValueXY) => {
    x: number | Animated.Value | Animated.AnimatedInterpolation;
    y: number | Animated.Value | Animated.AnimatedInterpolation;
  };
  grantEventHandler?: (
    pan: Animated.ValueXY,
  ) => PanResponderCallbacks['onPanResponderGrant'];
  moveEventHandler?: (
    pan: Animated.ValueXY,
  ) => PanResponderCallbacks['onPanResponderMove'];
  releaseEventHandler?: (
    pan: Animated.ValueXY,
  ) => PanResponderCallbacks['onPanResponderRelease'];
};

/**
 * @description 제스처를 제어하기 위한 View Container 입니다. /
 * @type {function(PropsType): JSX.Element {}}
 */
function GestureView({
  children,
  onPress,
  translate,
  grantEventHandler,
  moveEventHandler,
  releaseEventHandler,
}: PropsType): JSX.Element {
  const _pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const _panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: grantEventHandler
        ? grantEventHandler(_pan)
        : () => {
            // @ts-ignore
            _pan.setOffset({ x: _pan.x._value, y: _pan.y._value });
          },
      onPanResponderMove: moveEventHandler ? moveEventHandler(_pan) : undefined,
      onPanResponderRelease: releaseEventHandler
        ? releaseEventHandler(_pan)
        : undefined,
    }),
  ).current;

  const _translate = translate ? translate(_pan) : _pan;

  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      style={{
        transform: [{ translateX: _translate.x }, { translateY: _translate.y }],
      }}
      {..._panResponder.panHandlers}>
      {children}
    </AnimatedTouchableOpacity>
  );
}

export default GestureView;
