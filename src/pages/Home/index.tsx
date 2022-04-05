import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sandGray } from '../../assets/styles/colors';
import Header from '../../components/Header';
import TabMenu from '../../components/TabMenu';

import ListView from '../../components/ListView';
import tabHeaderItems from '../../constants/tabHeaderItems';
import CapsuleDetail from '../../components/CapsuleDetail';

const MOCK_ITEM = {
  date: '2022.03.27 11:30',
  dDayText: 'D-12',
  fromUserName: '돌아온 프로도',
  location: true,
  isActiveAlarm: true,
  isShareAvailable: true,
};

const MOCK_ITEM2 = {
  date: '2022.03.27 11:30',
  dDayText: 'D-Day',
  fromUserName: '집나간 프로도',
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

  const listItems = useMemo(() => {
    return Array.from({ length: 25 }, () => MOCK_ITEM);
  }, []);

  const listItems2 = useMemo(() => {
    return Array.from({ length: 25 }, () => MOCK_ITEM2);
  }, []);

  const viewList = useMemo(
    () => [
      <ListView items={listItems} onEndReached={() => {}} />,
      <ListView items={listItems2} onEndReached={() => {}} />,
      <CapsuleDetail />,
    ],
    [listItems, listItems2],
  );

  return (
    <View style={styles.container}>
      <Header />
      <TabMenu headerItems={tabHeaderItems} viewList={viewList} />
      {/* TEST BACK BUTTON */}
      {/* <TouchableOpacity onPress={_onPress}>
        <View style={defaultStyles.button}>
          <Text>BACK</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
}

export default Home;
