import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { capsuleColors } from 'constants/capsuleColors';

interface PropsType {
  updateColor: (idx: number) => void;
}

function SelectCapsule({ updateColor }: PropsType) {
  const [source, setSource] = useState<ImageSourcePropType>(
    capsuleColors[0].source,
  );

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={source} />
      <View style={styles.colorPickers}>
        {capsuleColors.map(({ color, source: _source }, i: number) => (
          <TouchableOpacity
            key={color}
            onPress={() => {
              setSource(_source);
              updateColor(i);
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
