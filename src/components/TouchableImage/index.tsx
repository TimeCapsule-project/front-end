import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type NewType = {
  onPress(event: GestureResponderEvent): void;
  imgInfo: {
    source: ImageSourcePropType;
    width: number;
    height: number;
  };
  styles?: StyleProp<ViewStyle>;
};

type PropsType = NewType;

const TouchableImage: React.FC<PropsType> = ({ onPress, imgInfo, styles }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles}>
      <Image
        source={imgInfo.source}
        width={imgInfo.width}
        height={imgInfo.height}
      />
    </TouchableOpacity>
  );
};

export default TouchableImage;
