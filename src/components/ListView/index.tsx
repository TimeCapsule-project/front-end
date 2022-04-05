import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import Item, { ListViewItem } from './Item';

export type ListViewProps = {
  items: ListViewItem[];
  loading?: boolean;
  onEndReached(): void;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatListStyle: { paddingHorizontal: 30 },
  contentContainerStyle: { paddingBottom: 20 },
  ListFooterComponentIndicator: { height: 50 },
  ListFooterComponentCommon: { height: 0, marginVertical: 50 },
});

const ListFooterComponent = React.memo((props: { loading?: boolean }) => {
  if (props.loading) {
    return (
      <View style={styles.ListFooterComponentIndicator}>
        <ActivityIndicator />
      </View>
    );
  }
  return <View style={styles.ListFooterComponentCommon} />;
});

function ListView({ items, loading, onEndReached }: ListViewProps) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.flatListStyle}
        data={items}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(_, i) => String(i)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        ListFooterComponent={<ListFooterComponent loading={loading} />}
      />
    </View>
  );
}

export default ListView;
