import React, { useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';
import AuthContainer from '../../components/AuthContainer';
import InputRow from '../../components/InputRow';
import styles from './style';

type PropsType = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignInfoStep'>;
};

function AccountInfoStep({ navigation }: PropsType) {
  const backBtnPress = useCallback(() => navigation.goBack(), [navigation]);
  const nextBtnPress = useCallback(
    () => navigation.navigate('SignInfoStep'),
    [navigation],
  );

  const checkDuplID = useCallback(() => console.log('Request checkDuplID'), []);

  return (
    <AuthContainer backBtnOption={{ func: backBtnPress, text: '돌아가기' }}>
      <InputRow
        containerStyle={styles.inputContainer}
        inputProps={{
          placeholder: '영문, 숫자 혼합 5자리 이상',
        }}
        buttonProps={{
          text: '중복 확인',
          textStyle: styles.inputButton,
          onPress: checkDuplID,
        }}
        type="text"
        label={'아이디'}
      />
      <InputRow
        containerStyle={styles.inputContainer}
        inputProps={{
          placeholder: '비밀번호',
        }}
        type="text"
        label={'비밀번호'}
      />
      <InputRow
        containerStyle={styles.inputContainer}
        inputProps={{
          placeholder: '비밀번호 확인',
        }}
        type="text"
        label={'비밀번호 찾기'}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={nextBtnPress}>
        <Text>{'다음'}</Text>
      </TouchableOpacity>
    </AuthContainer>
  );
}

export default AccountInfoStep;
