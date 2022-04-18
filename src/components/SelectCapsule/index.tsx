import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const colors = [
  '#216B76',
  '#FF3737',
  '#63F3F3',
  '#E7A54E',
  '#9D00C5',
  '#FFC0D3',
];

interface PropsType {
  updateColor: (color: string) => void;
}

function SelectCapsule({ updateColor }: PropsType) {
  return (
    <View style={styles.container}>
      <Image
        width={140}
        height={155}
        source={require('assets/images/capsule.png')}
      />
      <View style={styles.colorPickers}>
        {colors.map((_color: string) => (
          <TouchableOpacity onPress={() => updateColor(_color)}>
            <View
              key={_color}
              style={[styles.color, { backgroundColor: _color }]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
  },
  colorPickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 219,
    marginTop: 30,
  },
  color: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: 'black',
  },
})

export default SelectCapsule;
