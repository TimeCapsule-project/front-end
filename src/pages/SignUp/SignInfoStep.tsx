import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../routes';
import { validator } from 'utils/validator';
import InputRow from 'components/InputRow';
import TemplateText from 'components/TemplateText';
import FormContainer from 'components/FormContainer';
import styles from 'components/FormContainer/style';

const commonOptions = {
  containerStyle: styles.inputContainer,
  labelStyle: styles.inputLabelStyle,
  inputWrapStyle: styles.inputWrap,
  type: 'text',
};

type PropsType = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'SignUp/SignInfoStep'
  >;
};

function SignInfoStep({ navigation }: PropsType) {
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

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
    <FormContainer backBtnText={'이전 단계'}>
      <InputRow
        {...commonOptions}
        inputProps={{
          style: styles.input,
          onChangeText: _onChangeTextNickname,
          placeholder: '영문, 숫자 혼합 5자리 이상',
          value: nickname,
        }}
        buttonProps={{
          style: styles.button,
          text: '중복 확인',
          textStyle: styles.inputButtonText,
          onPress: checkDuplNickname,
        }}
        label={'닉네임'}
      />
      <InputRow
        {...commonOptions}
        inputProps={{
          style: styles.input,
          onChangeText: _onChangeTextEmail,
          placeholder: '이메일을 입력해주세요.',
          value: email,
        }}
        buttonProps={{
          style: styles.button,
          text: '인증 받기',
          textStyle: styles.inputButtonText,
          onPress: getEmailAuthNum,
        }}
        label={'이메일'}
      />
      <InputRow
        {...commonOptions}
        inputProps={{
          style: styles.input,
          onChangeText: _onChangeTextAuthNumber,
          placeholder: '인증번호 4자리를 입력해주세요.',
          value: authNumber,
        }}
        buttonProps={{
          style: styles.button,
          text: '확인',
          textStyle: styles.inputButtonText,
          onPress: checkEmailAuthNumber,
        }}
        label={'이메일 인증번호'}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={doneBtnPress}>
        <TemplateText familyType="power" style={styles.signUpButtonText}>
          {'완료'}
        </TemplateText>
      </TouchableOpacity>
    </FormContainer>
  );
}

export default SignInfoStep;
