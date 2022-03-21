import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { darkBlue } from '../../../assets/styles/colors';
import { mixinStyles } from '../../../assets/styles/mixin';

export type TabMenuHeaderItem = {
  imgInfo: {
    imgSource: ImageSourcePropType;
    width: number;
    height: number;
  };
  text: string;
};

type PropsType = TabMenuHeaderItem;

const styles = StyleSheet.create({
  container: {
    ...mixinStyles.flexCenter,
    flexDirection: 'column',
    flex: 1,
    height: 86,
    paddingTop: 13,
  },
  text: {
    paddingTop: 5,
    width: 50,
    fontSize: 10,
    color: darkBlue,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'GangwonEduAllBold',
  },
  bottomLine: {
    width: 68,
    marginTop: 'auto',
    borderBottomWidth: 2,
    borderBottomColor: darkBlue,
  },
});

const TabMenuHeaderItem: React.FC<PropsType> = ({ imgInfo, text }) => {
  return (
    <View style={styles.container}>
      <Image
        source={imgInfo.imgSource}
        style={{ width: imgInfo.width, height: imgInfo.height }}
        width={imgInfo.width}
        height={imgInfo.height}
      />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.bottomLine} />
    </View>
  );
};

export default TabMenuHeaderItem;
