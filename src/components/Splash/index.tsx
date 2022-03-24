import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const sourceCapsuleCloud = '../../assets/images/capsule_cloud.png';
const sourceThumbnail = '../../assets/images/thumbnail.png';

function Splash() {
  return (
    <View style={styles.container}>
      <Image source={require(sourceCapsuleCloud)} />
      <Image source={require(sourceThumbnail)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
