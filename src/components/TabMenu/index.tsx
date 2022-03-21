import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import TabMenuHeader from './TabMenuHeader';
import TabMenuList from './TabMenuList';
import { TabMenuHeaderItem } from './TabMenuHeader/Item';
import { TabMenuListItem } from './TabMenuList/Item';
import { orange } from '../../assets/styles/colors';

type PropsType = {
  headerItems: TabMenuHeaderItem[];
  listItems: TabMenuListItem[];
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    width: '100%',
    minHeight: Dimensions.get('screen').height - 42,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: orange,
  },
  spacingBox: { height: 25 },
});

const TabMenu: React.FC<PropsType> = ({ headerItems, listItems }) => {
  return (
    <View style={styles.container}>
      <TabMenuHeader items={headerItems} />
      <View style={styles.spacingBox} />
      <TabMenuList items={listItems} />
    </View>
  );
};

export default TabMenu;
