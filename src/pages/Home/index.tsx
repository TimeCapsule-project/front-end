import React, { useEffect, useMemo } from 'react';
import { PermissionsAndroid, StyleSheet, View } from 'react-native';
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

type PropsType = { navigation: any };

function Home({ navigation }: PropsType) {
  useEffect(() => {

  }, [])

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
      <CapsuleDetail navigation={navigation} />,
    ],
    [listItems, listItems2, navigation],
  );

  return (
    <View style={styles.container}>
      <Header />
      <TabMenu headerItems={tabHeaderItems} viewList={viewList} />
    </View>
  );
}

export default Home;
