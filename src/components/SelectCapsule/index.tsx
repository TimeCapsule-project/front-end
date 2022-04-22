import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const colors = [
  { color: '#216B76', source: require('assets/images/capsules/0.png') },
  { color: '#FF3737', source: require('assets/images/capsules/1.png') },
  { color: '#63F3F3', source: require('assets/images/capsules/2.png') },
  { color: '#E7A54E', source: require('assets/images/capsules/3.png') },
  { color: '#9D00C5', source: require('assets/images/capsules/4.png') },
  { color: '#FFC0D3', source: require('assets/images/capsules/5.png') },
];

interface PropsType {
  updateColor: (color: string) => void;
}

function SelectCapsule({ updateColor }: PropsType) {
  const [source, setSource] = useState<ImageSourcePropType>(colors[0].source);

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={source} />
      <View style={styles.colorPickers}>
        {colors.map(({ color, source: _source }) => (
          <TouchableOpacity
            key={color}
            onPress={() => {
              setSource(_source);
              updateColor(color);
            }}>
            <View style={[styles.color, { backgroundColor: color }]} />
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
  img: { width: 167, height: 167 },
});

export default SelectCapsule;
