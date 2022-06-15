import React, { useCallback, useMemo } from 'react';
import {
  View,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'pages/routes';
import { mixinStyles } from 'assets/styles/mixin';
import { darkBlue, sandGray, tomatoRed } from 'assets/styles/colors';
import { capsuleColors } from 'constants/capsuleColors';
import Trash from '../SvgComponents/trash';
import DeactiveNoti from '../SvgComponents/deactiveNoti';
import GestureView from '../GestureView';
import TemplateText from 'components/TemplateText';

export type ListViewItem = {
  data: any;
  id: number;
  colorIdx: number;
  mainText: string;
  subText1: string;
  subText2: string;
  isActiveAlarm?: boolean;
  isShareAvailable?: boolean;
  onClickItem?: (data: any) => void;
};

type PropsType = ListViewItem;

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const SCROLL_LIMIT = 120;

export const leftButtonOnPress = () => {
  console.log('leftButton pressed');
};

export const rightButtonOnPress = () => {
  console.log('rightButton pressed');
};

function ListViewItem({
  data,
  colorIdx,
  mainText,
  subText1,
  subText2,
  isActiveAlarm,
  isShareAvailable,
  onClickItem,
}: PropsType) {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const valueY = useMemo(() => new Animated.Value(0), []);

  const translate = useCallback(
    (pan: Animated.ValueXY) => ({
      x: pan.x.interpolate({
        // 최대 스크롤 범위 보간
        inputRange: [-SCROLL_LIMIT, 0, SCROLL_LIMIT],
        outputRange: [-SCROLL_LIMIT, 0, SCROLL_LIMIT],
        extrapolate: 'clamp',
      }),
      y: pan.y,
    }),
    [],
  );

  const moveEventHandler = useCallback(
    (pan: Animated.ValueXY) =>
      Animated.event([null, { dx: pan.x, dy: valueY }], {
        useNativeDriver: false,
      }),
    [valueY],
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.leftButton} onPress={leftButtonOnPress}>
          <DeactiveNoti />
        </TouchableOpacity>
        <GestureView
          onPress={() => onClickItem && onClickItem(data)}
          translate={translate}
          moveEventHandler={moveEventHandler}>
          <View style={styles.mainContainer}>
            <Image
              style={styles.img}
              source={capsuleColors[colorIdx || 0].source}
              width={60}
              height={60}
            />
            <View style={styles.textContentsWrap}>
              <TemplateText familyType="power" style={styles.dDayText}>
                {mainText}
              </TemplateText>
              <TemplateText familyType="bold" style={styles.dateText}>
                {subText1}
              </TemplateText>
              <TemplateText familyType="bold" style={styles.fromUserNameText}>
                {subText2}
              </TemplateText>
            </View>
          </View>
        </GestureView>
        <TouchableOpacity
          style={styles.rightButton}
          onPress={rightButtonOnPress}>
          <Trash />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 20,
    height: 96,
    marginBottom: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: sandGray,
    width: Dimensions.get('screen').width - 60,
    paddingHorizontal: 12,
    paddingVertical: 18,
    borderRadius: 20,
  },
  img: {
    marginRight: 17,
  },
  textContentsWrap: {
    flexDirection: 'column',
  },
  dDayText: {
    fontSize: 20,
    marginBottom: 3,
    color: darkBlue,
  },
  dateText: {
    fontSize: 14,
    marginBottom: 3,
    color: darkBlue,
  },
  fromUserNameText: {
    fontSize: 14,
    opacity: 0.8,
    color: darkBlue,
  },
  leftButton: {
    ...mixinStyles.flexCenter,
    width: 120,
    height: 96,
    borderRadius: 20,
    backgroundColor: darkBlue,
  },
  rightButton: {
    ...mixinStyles.flexCenter,
    width: 120,
    height: 96,
    borderRadius: 20,
    backgroundColor: tomatoRed,
  },
});

export default ListViewItem;
