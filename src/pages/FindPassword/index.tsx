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
  navigation: NativeStackNavigationProp<RootStackParamList, 'FindPassword'>;
};

function FindPassword({ navigation }: PropsType) {
  const [id, setId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');

  const goLogin = useCallback(() => navigation.navigate('Intro'), [navigation]);

  const checkID = useCallback(() => {
    if (validator(id, 'id')) {
      console.log('isValid And Request checkDuplID');
    }
  }, [id]);

  const verifyEmail = useCallback(() => {
    console.log(email);
  }, [email]);

  const _onChangeTextId = useCallback((text: string) => setId(text), []);
  const _onChangeTextEmail = useCallback((text: string) => setEmail(text), []);
  const _onChangeTextNewPassword = useCallback(
    (text: string) => setPassword(text),
    [],
  );
  const _onChangeTextNewCheckPassword = useCallback(
    (text: string) => setCheckPassword(text),
    [],
  );

  return (
    <FormContainer backBtnText={'돌아가기'} logoTitle={'비밀번호 찾기'}>
      <InputRow
        {...commonOptions}
        inputProps={{
          style: styles.input,
          onChangeText: _onChangeTextId,
          placeholder: '가입 정보와 일치해야 합니다.',
          value: id,
        }}
        buttonProps={{
          style: styles.button,
          text: '확인',
          textStyle: styles.inputButtonText,
          onPress: checkID,
        }}
        label={'가입 시 작성한 아이디'}
      />
      <InputRow
        {...commonOptions}
        inputProps={{
          style: styles.input,
          onChangeText: _onChangeTextEmail,
          placeholder: '가입 정보와 일치해야 합니다.',
          value: email,
        }}
        buttonProps={{
          style: styles.button,
          text: '인증 받기',
          textStyle: styles.inputButtonText,
          onPress: verifyEmail,
        }}
        label={'가입 시 작성한 이메일'}
      />
      <InputRow
        {...commonOptions}
        inputProps={{
          style: styles.input,
          onChangeText: _onChangeTextNewPassword,
          placeholder: '새 비밀번호',
          value: password,
        }}
        label={'새 비밀번호'}
      />
      <InputRow
        {...commonOptions}
        inputProps={{
          style: styles.input,
          onChangeText: _onChangeTextNewCheckPassword,
          placeholder: '새 비밀번호 확인',
          value: checkPassword,
        }}
        label={'새 비밀번호 확인'}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={goLogin}>
        <TemplateText familyType="power" style={styles.signUpButtonText}>
          {'로그인 하기'}
        </TemplateText>
      </TouchableOpacity>
    </FormContainer>
  );
}

export default FindPassword;
