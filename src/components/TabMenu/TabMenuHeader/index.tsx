import React from 'react';
import { StyleSheet, View } from 'react-native';
import Item, { TabMenuHeaderItem } from './Item';

type PropsType = {
  items: TabMenuHeaderItem[];
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const TabMenuHeader: React.FC<PropsType> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item: TabMenuHeaderItem) => (
        <Item {...item} />
      ))}
    </View>
  );
};

export default TabMenuHeader;
