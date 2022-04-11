import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../pages/routes';

type WriteCapsuleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WriteCapsule'
>;

type WriteCapsuleScreenRouteProp = RouteProp<
  RootStackParamList,
  'WriteCapsule'
>;

function WriteCapsule() {
  const navigation = useNavigation<WriteCapsuleScreenNavigationProp>();
  const route = useNavigation<WriteCapsuleScreenRouteProp>();
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default WriteCapsule;
