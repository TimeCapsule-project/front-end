import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../pages/routes';
import TemplateText from 'components/TemplateText';

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
  console.log(route.params.type);

  return (
    <View style={styles.container}>
      <TemplateText familyType="power" style={{}}>
        TEST
      </TemplateText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default WriteCapsule;
