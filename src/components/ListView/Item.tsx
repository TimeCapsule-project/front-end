import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { sandGray } from '../../assets/styles/colors';
import { mixinStyles } from '../../assets/styles/mixin';
import GestureView from '../GestureView';
import TouchableImage from '../TouchableImage';

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

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: sandGray,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 85,
    marginBottom: 12,
  },
  mainContainer: {
    ...mixinStyles.flexCenter,
    flexDirection: 'row',
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
  sideButtonWrap: {},
  hideButtonsWrap: {},
});

function ListViewItem({ date, dDayText, fromUserName }: PropsType) {
  return (
    <GestureView>
      <View style={styles.container}>
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
          <View style={styles.sideButtonWrap}>
            <TouchableImage
              onPress={() => {}}
              imgInfo={{ source: 'dsadasdasd', width: 30, height: 30 }}
            />
            <TouchableImage
              onPress={() => {}}
              imgInfo={{ source: 'dsadasdasd', width: 30, height: 30 }}
            />
          </View>
        </View>
        <View style={styles.hideButtonsWrap}>
          <TouchableImage
            onPress={() => {}}
            imgInfo={{ source: 'dsadasdasd', width: 30, height: 30 }}
          />
          <TouchableImage
            onPress={() => {}}
            imgInfo={{ source: 'dsadasdasd', width: 30, height: 30 }}
          />
        </View>
      </View>
    </GestureView>
  );
}

export default ListViewItem;
