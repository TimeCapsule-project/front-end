import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { darkBlue } from '../../../assets/styles/colors';
import { mixinStyles } from '../../../assets/styles/mixin';

export type TabMenuHeaderItemInfo = {
  imgInfo: {
    activeImgSource: ImageSourcePropType;
    inActiveImgSource: ImageSourcePropType;
    width: number;
    height: number;
  };
  text: string;
};

type ComponentProps = {
  isActive: boolean;
  onPress: () => void;
};

type TabMenuHeaderItemProps = TabMenuHeaderItemInfo & Partial<ComponentProps>;

const styles = StyleSheet.create({
  container: {
    ...mixinStyles.flexCenter,
    position: 'relative',
    flexDirection: 'column',
    flex: 1,
    height: 86,
    paddingTop: 13,
  },
  text: {
    paddingTop: 5,
    width: 50,
    fontSize: 10,
    paddingBottom: 9,
    color: darkBlue,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'GangwonEduAllBold',
  },
  bottomLine: {
    position: 'absolute',
    width: 68,
    bottom: 0,
    marginTop: 'auto',
    borderBottomWidth: 2,
    borderBottomColor: darkBlue,
  },
  bottomLineNone: {},
});

function TabMenuHeaderItem({
  imgInfo,
  text,
  isActive,
  onPress,
}: TabMenuHeaderItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={isActive ? imgInfo.activeImgSource : imgInfo.inActiveImgSource}
        style={{ width: imgInfo.width, height: imgInfo.height }}
        width={imgInfo.width}
        height={imgInfo.height}
      />
      <Text style={styles.text}>{text}</Text>
      <View style={isActive ? styles.bottomLine : styles.bottomLineNone} />
    </TouchableOpacity>
  );
}

export default TabMenuHeaderItem;
