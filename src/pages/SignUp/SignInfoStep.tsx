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

function SignInfoStep({ navigation }: PropsType) {
  const backBtnPress = useCallback(() => navigation.goBack(), [navigation]);
  const doneBtnPress = useCallback(() => {
    // TODO: CALL LOGIN API
    navigation.navigate('Intro');
  }, [navigation]);

  const checkDuplNickname = useCallback(
    () => console.log('Request checkDuplNickname'),
    [],
  );

  const getEmailAuthNum = useCallback(
    () => console.log('Request getEmailAuthNum'),
    [],
  );

  const checkEmailAuthNumber = useCallback(
    () => console.log('Request checkEmailAuthNumber'),
    [],
  );

  return (
    <AuthContainer backBtnOption={{ func: backBtnPress, text: '이전 단계' }}>
      <InputRow
        inputProps={{
          placeholder: '영문, 숫자 혼합 5자리 이상',
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
          placeholder: '이메일을 입력해주세요.',
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
          placeholder: '인증번호 4자리를 입력해주세요.',
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
