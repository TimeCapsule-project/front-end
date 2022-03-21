import React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import Item, { TabMenuListItem } from './Item';

type PropsType = {
  items: TabMenuListItem[];
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    height: Dimensions.get('screen').height,
  },
});

const TabMenuList: React.FC<PropsType> = ({ items }) => {
  return (
    <FlatList
      style={styles.container}
      data={items}
      renderItem={({ item }) => <Item {...item} />}
      keyExtractor={(_, i) => String(i)}
    />
  );
};

export default TabMenuList;
