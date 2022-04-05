import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type ContainerProps = {
  children: JSX.Element;
  title: string;
  style?: StyleProp<ViewStyle>;
};

function Container({ children, title, style }: ContainerProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.cardTitle}>
        <Text style={styles.cardTitleText}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'column',
    flex: 1,
    bottom: 0,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  cardTitle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30,
    height: 50,
  },
  cardTitleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Container;
