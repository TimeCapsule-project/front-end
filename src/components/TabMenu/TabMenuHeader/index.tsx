import React from 'react';
import { StyleSheet, View } from 'react-native';
import Item, { TabMenuHeaderItemInfo } from './Item';

type PropsType = {
  setTab: (idx: number) => void;
  items: TabMenuHeaderItemInfo[];
  currentTab: number;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function TabMenuHeader({ items, setTab, currentTab }: PropsType) {
  return (
    <View style={styles.container}>
      {items.map((item: TabMenuHeaderItemInfo, i: React.Key) => (
        <Item
          {...item}
          isActive={currentTab === i}
          onPress={() => setTab(Number(i))}
        />
      ))}
    </View>
  );
}

export default TabMenuHeader;
