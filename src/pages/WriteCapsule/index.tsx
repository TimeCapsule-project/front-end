import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { yellow } from 'assets/styles/colors';
import { RootStackParamList } from 'pages/routes';
import { TextInputTemplate } from 'components/InputRow/template';
import RouteHeader from 'components/RouteHeader';
import SelectCapsule from 'components/SelectCapsule';

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
  const route = useRoute<WriteCapsuleScreenRouteProp>();

  const [color, setColor] = useState<string>('#40a629');

  return (
    <View style={styles.container}>
      <RouteHeader
        label="타임 캡슐 생성"
        textAlign="center"
        containerStyle={styles.headerStyle}
      />
      <View>
        <SelectCapsule updateColor={setColor} />
        <TextInputTemplate inputProps={{}} label={'캡슐 받을 친구 선택하기'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: yellow,
  },
  headerStyle: {
    backgroundColor: yellow,
  },
});

export default WriteCapsule;
