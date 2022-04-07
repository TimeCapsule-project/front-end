import React, { useCallback } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { darkBlue, sandGray, tomatoRed } from '../../assets/styles/colors';
import { mixinStyles } from '../../assets/styles/mixin';
import DeactiveNoti from '../SvgComponents/deactiveNoti';
import Trash from '../SvgComponents/trash';
import GestureView from '../GestureView';

const capsuleSource = '../../assets/images/capsule.png';

export type ListViewItem = {
  date: string;
  dDayText: string;
  fromUserName: string;
  location?: any;
  isActiveAlarm?: boolean;
  isShareAvailable?: boolean;
};

type PropsType = ListViewItem;

export const leftButtonOnPress = () => {
  console.log('leftButton pressed');
};

export const rightButtonOnPress = () => {
  console.log('rightButton pressed');
};

function ListViewItem({ date, dDayText, fromUserName }: PropsType) {
  /* 스크롤 범위 제한 및 스크롤시 최대 범위 까지 자동 스크롤링 */
  const releaseEventHandler = useCallback((pan: Animated.ValueXY) => {
    const SCROLL_LIMIT = 120;
    // @ts-ignore
    let x = pan.x._value;
    if (x > 0) {
      x = SCROLL_LIMIT < x ? SCROLL_LIMIT : x;
    } else {
      x = SCROLL_LIMIT * -1 > x ? SCROLL_LIMIT * -1 : x;
    }
    Animated.spring(pan, { toValue: { x, y: 0 }, useNativeDriver: false });
  }, []);

  return (
    <View style={styles.container}>
      <GestureView releaseEventHandler={releaseEventHandler}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.leftButton}
            onPress={leftButtonOnPress}>
            <DeactiveNoti />
          </TouchableOpacity>
          <View style={styles.mainContainer}>
            <Image
              style={styles.img}
              source={require(capsuleSource)}
              width={46}
              height={48}
            />
            <View style={styles.textContentsWrap}>
              <Text style={styles.dDayText}>{dDayText}</Text>
              <Text style={styles.dateText}>{date}</Text>
              <Text style={styles.fromUserNameText}>{fromUserName}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.rightButton}
            onPress={rightButtonOnPress}>
            <Trash />
          </TouchableOpacity>
        </View>
      </GestureView>
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
    fontSize: 10,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  fromUserNameText: {
    fontSize: 10,
    fontWeight: 'bold',
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
