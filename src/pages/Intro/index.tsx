import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { defaultStyles } from '../../assets/styles/default';
import { globalStyles } from '../../assets/styles/global';
import { mixinStyles } from '../../assets/styles/mixin';

const thumbnailSource = '../../assets/images/thumbnail.png';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    ...mixinStyles.flexCenter,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  loginBtn: {
    ...defaultStyles.button,
    width: '40%',
  },
});

function Intro(props: { navigation: any }) {
  const _onPress = useCallback(
    () => props.navigation.navigate('Home'),
    [props.navigation],
  );

  return (
    <View style={styles.container}>
      <Image source={require(thumbnailSource)} />
      <Text style={styles.title}>{'황금두더지'}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={_onPress}>
        <Text style={defaultStyles.buttonText}>{'로그인'}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Intro;
