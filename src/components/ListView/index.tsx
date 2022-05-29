import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListFooterComponent from './footer';
import Item, { ListViewItem } from './Item';

export type ListViewProps = {
  items: ListViewItem[];
  loading?: boolean;
  onClickItem: (data: any) => void;
  onEndReached(): void;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatListStyle: { paddingHorizontal: 30 },
  contentContainerStyle: { paddingBottom: 20 },
});

function ListView({
  items,
  loading,
  onClickItem,
  onEndReached,
}: ListViewProps) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.flatListStyle}
        data={items}
        renderItem={({ item }) => <Item {...item} onClickItem={onClickItem} />}
        keyExtractor={(_, i) => String(i)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        ListFooterComponent={<ListFooterComponent loading={loading} />}
      />
    </View>
  );
}

export default ListView;
