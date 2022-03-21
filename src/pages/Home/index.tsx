import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sandGray } from '../../assets/styles/colors';
import { defaultStyles } from '../../assets/styles/default';
import Header from '../../components/Header';
import TabMenu from '../../components/TabMenu';
import { TabMenuHeaderItem } from '../../components/TabMenu/TabMenuHeader/Item';
import { TabMenuListItem } from '../../components/TabMenu/TabMenuList/Item';

const MOCK_ITEM = {
  date: '2022.03.27 11:30',
  dDayText: 'D-12',
  fromUserName: '돌아온 프로도',
  location: true,
  isActiveAlarm: true,
  isShareAvailable: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: sandGray,
  },
});

function Home(props: { navigation: any }) {
  const _onPress = useCallback(
    () => props.navigation.navigate('Intro'),
    [props.navigation],
  );

  const headerItems: TabMenuHeaderItem[] = useMemo(() => {
    return [
      {
        imgInfo: {
          imgSource: require('../../assets/images/capsule.png'),
          width: 37,
          height: 40,
        },
        text: `도착한 캡슐 ${10}개`,
      },
    ];
  }, []);

  const listItems: TabMenuListItem[] = useMemo(() => {
    return Array.from({ length: 25 }, () => MOCK_ITEM);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <TabMenu headerItems={headerItems} listItems={listItems} />
      {/* TEST BACK BUTTON */}
      <TouchableOpacity onPress={_onPress}>
        <View style={defaultStyles.button}>
          <Text>BACK</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
