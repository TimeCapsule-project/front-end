import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { mixinStyles } from 'assets/styles/mixin';

const ListFooterComponent = (props: { loading?: boolean }) => {
  if (props.loading) {
    return (
      <View style={styles.ListFooterComponentIndicator}>
        <ActivityIndicator />
      </View>
    );
  }
  return <View style={styles.ListFooterComponentCommon} />;
};

const styles = StyleSheet.create({
  ListFooterComponentIndicator: { ...mixinStyles.flexCenter, height: 50 },
  ListFooterComponentCommon: { height: 0, marginVertical: 50 },
});

export default ListFooterComponent;
