import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { validator } from 'utils/validator';
import { RootStackParamList } from '../routes';
import AuthContainer from '../../components/AuthContainer';
import InputRow from '../../components/InputRow';
import styles from './style';

type PropsType = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignInfoStep'>;
};

function AccountInfoStep({ navigation }: PropsType) {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');

  const backBtnPress = useCallback(() => navigation.goBack(), [navigation]);
  const nextBtnPress = useCallback(
    () => navigation.navigate('SignInfoStep'),
    [navigation],
  );

  const checkDuplID = useCallback(() => {
    if (validator(id, 'id')) {
      console.log('isValid And Request checkDuplID');
    }
  }, [id]);

  const _onChangeTextID = useCallback((text: string) => setId(text), []);
  const _onChangeTextPassword = useCallback(
    (text: string) => setPassword(text),
    [],
  );
  const _onChangeTextCheckPassword = useCallback(
    (text: string) => setCheckPassword(text),
    [],
  );

  return (
    <AuthContainer backBtnOption={{ func: backBtnPress, text: '돌아가기' }}>
      <InputRow
        containerStyle={styles.inputContainer}
        inputProps={{
          onChangeText: _onChangeTextID,
          placeholder: '영문, 숫자 혼합 5자리 이상',
          value: id,
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
          onChangeText: _onChangeTextPassword,
          placeholder: '비밀번호',
          value: password,
        }}
        type="text"
        label={'비밀번호'}
      />
      <InputRow
        containerStyle={styles.inputContainer}
        inputProps={{
          onChangeText: _onChangeTextCheckPassword,
          placeholder: '비밀번호 확인',
          value: checkPassword,
        }}
        type="text"
        label={'비밀번호 확인'}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={nextBtnPress}>
        <Text>{'다음'}</Text>
      </TouchableOpacity>
    </AuthContainer>
  );
}

export default AccountInfoStep;
