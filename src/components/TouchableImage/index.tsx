import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type PropsType = {
  onPress(event: GestureResponderEvent): void;
  imgInfo: {
    source: ImageSourcePropType;
    width: number;
    height: number;
  };
  styles?: StyleProp<ViewStyle>;
  imgStyles?: StyleProp<ImageStyle>;
};

function TouchableImage({ onPress, imgInfo, styles, imgStyles }: PropsType) {
  return (
    <TouchableOpacity onPress={onPress} style={styles}>
      <Image
        style={imgStyles}
        source={imgInfo.source}
        width={imgInfo.width}
        height={imgInfo.height}
      />
    </TouchableOpacity>
  );
}

export default TouchableImage;
