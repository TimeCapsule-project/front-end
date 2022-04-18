import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TemplateText from 'components/TemplateText';
import { darkBlue } from '../../../assets/styles/colors';
import { mixinStyles } from '../../../assets/styles/mixin';

export type TabMenuHeaderItemInfo = {
  imgInfo: {
    activeImgSource: ImageSourcePropType;
    inActiveImgSource: ImageSourcePropType;
    width: number;
    height: number;
  };
  texts: string[];
};

type ComponentProps = {
  isActive: boolean;
  onPress: () => void;
};

type TabMenuHeaderItemProps = TabMenuHeaderItemInfo & Partial<ComponentProps>;

function TabMenuHeaderItem({
  imgInfo,
  texts,
  isActive,
  onPress,
}: TabMenuHeaderItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          source={
            isActive ? imgInfo.activeImgSource : imgInfo.inActiveImgSource
          }
          style={{ width: imgInfo.width, height: imgInfo.height }}
          width={imgInfo.width}
          height={imgInfo.height}
        />
      </View>
      <View style={styles.texts}>
        {texts.map((text: string, i: React.Key) => (
          <TemplateText familyType="power" style={styles.text} key={i}>
            {text}
          </TemplateText>
        ))}
      </View>
      <View style={isActive ? styles.bottomLine : styles.bottomLineNone} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...mixinStyles.flexCenter,
    position: 'relative',
    flexDirection: 'column',
    flex: 1,
    height: 86,
    paddingTop: 13,
  },
  imageWrap: {
    ...mixinStyles.flexCenter,
    width: 45,
    height: 45,
  },
  texts: {
    paddingTop: 5,
    paddingBottom: 9,
  },
  text: {
    fontSize: 10,
    color: darkBlue,
    textAlign: 'center',
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

export default TabMenuHeaderItem;
