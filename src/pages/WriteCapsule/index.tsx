import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getFont } from 'utils/getFont';
import { yellow } from 'assets/styles/colors';
import { RootStackParamList } from 'pages/routes';
import { TextInputTemplate } from 'components/InputRow/template';
import People from 'components/SvgComponents/people';
import SmallPencel from 'components/SvgComponents/smallPencel';
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
  const [isEnableNickname, setEnableNickname] = useState<boolean>(false);

  return (
    <ScrollView style={styles.mainContainer}>
      <RouteHeader
        label="타임 캡슐 생성"
        textAlign="center"
        containerStyle={styles.headerStyle}
      />
      <View style={styles.container}>
        <SelectCapsule updateColor={setColor} />
        <TextInputTemplate
          iconComponentFunc={People}
          inputProps={{
            editable: false,
            placeholder: '닉네임 검색하기',
            style: styles.input,
          }}
          containerStyle={styles.inputContainer}
          label={'캡슐 받을 친구 선택하기'}
        />
        <TextInputTemplate
          iconComponentFunc={SmallPencel}
          inputProps={{
            editable: true,
            placeholder: '직접 입력',
            style: styles.input,
          }}
          containerStyle={styles.inputContainer2}
          switchInfo={{
            label: '랜덤 닉네임 사용',
            value: isEnableNickname,
            onSwitch: setEnableNickname,
          }}
          label={'내 닉네임 정하기'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%'
  },
  headerStyle: {
    backgroundColor: yellow,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: yellow,
  },
  inputContainer: {
    marginTop: 40,
  },
  inputContainer2: {
    marginTop: 15,
  },
  input: {
    fontFamily: getFont('bold'),
    paddingLeft: 50,
  }
});

export default WriteCapsule;
