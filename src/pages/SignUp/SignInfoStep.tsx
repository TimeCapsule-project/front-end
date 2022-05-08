import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { validator } from 'utils/validator';
import { useSignUpMutation } from './hooks/useSignUpMutation';
import { useVerifyEmailNumber } from './hooks/useVerifyEmailNumber';
import { useGetVerifyEmailNumber } from './hooks/useGetVerifyEmailNumber';
import { useCheckDuplicateNickname } from './hooks/useCheckDuplicateNickname';
import { RootStackParamList } from '../routes';
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

type SignInfoStepNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp/SignInfoStep'
>;

type SignInfoStepRouteProp = RouteProp<
  RootStackParamList,
  'SignUp/SignInfoStep'
>;

function SignInfoStep() {
  const navigation = useNavigation<SignInfoStepNavigationProp>();
  const route = useRoute<SignInfoStepRouteProp>();

  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');
  const [verifiedEmail, setVerifiedEmail] = useState<boolean>(false);
  const [checkedNickname, setCheckedNickname] = useState<boolean>(false);
  const [editableEmail, setEditableEmail] = useState<boolean>(true);
  const [editableNickname, setEditableNickname] = useState<boolean>(true);

  const onSuccess = useCallback(() => {
    navigation.navigate('Intro');
  }, [navigation]);

  const _onSuccessCheckNickname = useCallback(() => {
    setEditableNickname(false);
    setCheckedNickname(true);
  }, []);

  const _onSuccessGetVerifyEmailNumber = useCallback((data: any) => {
    console.log(data);
    setAuthNumber(data.code);
  }, []);

  const _onSuccessVerifyEmail = useCallback(() => {
    setEditableEmail(true);
    setVerifiedEmail(true);
  }, []);

  const { refetch: checkNickname } = useCheckDuplicateNickname(
    nickname,
    _onSuccessCheckNickname,
  );

  const { refetch: getVerifyNumber } = useGetVerifyEmailNumber(
    email,
    _onSuccessGetVerifyEmailNumber,
  );

  const { refetch: verifyNumber } = useVerifyEmailNumber(
    nickname,
    _onSuccessVerifyEmail,
  );

  const { mutate } = useSignUpMutation(onSuccess);

  const doneBtnPress = () => {
    if (checkedNickname && verifiedEmail) {
      mutate({
        userId: route.params.id,
        userPw: route.params.password,
        userEmail: email,
        userNickname: nickname,
      });
    }
  };

  const checkDuplNickname = useCallback(() => {
    if (validator(nickname, 'id')) {
      checkNickname();
    }
  }, [checkNickname, nickname]);

  const getEmailAuthNum = useCallback(
    () => getVerifyNumber(),
    [getVerifyNumber],
  );

  const checkEmailAuthNumber = useCallback(
    () => verifyNumber(),
    [verifyNumber],
  );

  const _onChangeTextNickname = useCallback(
    (text: string) => setNickname(text),
    [],
  );
  const _onChangeTextEmail = useCallback(
    (text: string) => setEmail(encodeURIComponent(text)),
    [],
  );
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
          editable: editableNickname,
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
          editable: editableEmail,
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
