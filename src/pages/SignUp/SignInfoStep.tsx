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

function SignInfoStep({ navigation }: PropsType) {
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

  const backBtnPress = useCallback(() => navigation.goBack(), [navigation]);
  const doneBtnPress = useCallback(() => {
    // TODO: CALL LOGIN API
    navigation.navigate('Intro');
  }, [navigation]);

  const checkDuplNickname = useCallback(() => {
    if (validator(nickname, 'id')) {
      console.log('isValid And Request checkDuplNickname');
    }
  }, [nickname]);

  const getEmailAuthNum = useCallback(
    () => console.log('Request getEmailAuthNum'),
    [],
  );

  const checkEmailAuthNumber = useCallback(
    () => console.log('Request checkEmailAuthNumber'),
    [],
  );

  const _onChangeTextNickname = useCallback(
    (text: string) => setNickname(text),
    [],
  );
  const _onChangeTextEmail = useCallback((text: string) => setEmail(text), []);
  const _onChangeTextAuthNumber = useCallback(
    (text: string) => setAuthNumber(text),
    [],
  );

  return (
    <AuthContainer backBtnOption={{ func: backBtnPress, text: '이전 단계' }}>
      <InputRow
        inputProps={{
          onChangeText: _onChangeTextNickname,
          placeholder: '영문, 숫자 혼합 5자리 이상',
          value: nickname,
        }}
        buttonProps={{
          text: '중복 확인',
          textStyle: styles.inputButton,
          onPress: checkDuplNickname,
        }}
        type="text"
        label={'닉네임'}
      />
      <InputRow
        inputProps={{
          onChangeText: _onChangeTextEmail,
          placeholder: '이메일을 입력해주세요.',
          value: email,
        }}
        buttonProps={{
          text: '인증 받기',
          textStyle: styles.inputButton,
          onPress: getEmailAuthNum,
        }}
        type="text"
        label={'이메일'}
      />
      <InputRow
        inputProps={{
          onChangeText: _onChangeTextAuthNumber,
          placeholder: '인증번호 4자리를 입력해주세요.',
          value: authNumber,
        }}
        buttonProps={{
          text: '확인',
          textStyle: styles.inputButton,
          onPress: checkEmailAuthNumber,
        }}
        type="text"
        label={'이메일 인증번호'}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={doneBtnPress}>
        <Text>{'완료'}</Text>
      </TouchableOpacity>
    </AuthContainer>
  );
}

export default SignInfoStep;
