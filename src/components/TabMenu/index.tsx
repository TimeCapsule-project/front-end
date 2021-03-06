import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import TabMenuHeader from './TabMenuHeader';
import { TabMenuHeaderItemInfo } from './TabMenuHeader/Item';
import { orange } from '../../assets/styles/colors';

type PropsType = {
  headerItems: TabMenuHeaderItemInfo[];
  viewList: React.ReactNode[];
  defaultTab?: number;
  onTabChange: (index: number) => void;
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
  nullBox: { flex: 1 },
  spacingBox: { height: 15 },
});

function TabMenu({
  headerItems,
  viewList,
  defaultTab,
  onTabChange,
}: PropsType) {
  const [currentTab, setTab] = useState<number>(defaultTab || 0);
  const ViewComponent = useMemo(
    () => viewList[currentTab] || <View style={styles.nullBox} />,
    [currentTab, viewList],
  );

  const _setTab = useCallback(
    (index: number) => {
      setTab(index);
      onTabChange(index);
    },
    [onTabChange],
  );

  return (
    <View style={styles.container}>
      <TabMenuHeader
        setTab={_setTab}
        items={headerItems}
        currentTab={currentTab}
      />
      <View style={styles.spacingBox} />
      {ViewComponent}
    </View>
  );
}

export default TabMenu;
