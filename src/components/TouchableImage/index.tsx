import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
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
};

function TouchableImage({ onPress, imgInfo, styles }: PropsType) {
  return (
    <TouchableOpacity onPress={onPress} style={styles}>
      <Image
        source={imgInfo.source}
        width={imgInfo.width}
        height={imgInfo.height}
      />
    </TouchableOpacity>
  );
}

export default TouchableImage;
