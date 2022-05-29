import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../routes';
import { validator } from 'utils/validator';
import { useCheckDuplicateId } from 'hooks/api/useCheckDuplicateId';
import InputRow from 'components/InputRow';
import TemplateText from 'components/TemplateText';
import FormContainer from 'components/FormContainer';
import styles from 'components/FormContainer/style';
import Toast from 'react-native-root-toast';

const commonOptions = {
  containerStyle: styles.inputContainer,
  labelStyle: styles.inputLabelStyle,
  inputWrapStyle: styles.inputWrap,
  type: 'text',
};

type AccountInfoData = { id: string; password: string };

interface PropsType {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'SignUp/AccountInfoStep'
  >;
}

function AccountInfoStep({ navigation }: PropsType) {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [pass, setPass] = useState<boolean>(false);

  const _onSuccess = useCallback((data: any) => {
    if (data?.status === 200) {
      setPass(true);
    }
  }, []);

  const { refetch: checkDuplicateId } = useCheckDuplicateId(id, _onSuccess);

  const nextBtnPress = useCallback(() => {
    if (!pass) {
      return Toast.show('아이디의 중복확인을 해주세요!');
    }
    navigation.navigate('SignUp/SignInfoStep', { id, password });
  }, [id, navigation, pass, password]);

  const checkDuplID = useCallback(() => {
    if (validator(id, 'id')) {
      return checkDuplicateId();
    }
    Toast.show('아이디가 유효하지 않습니다.');
  }, [checkDuplicateId, id]);

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
    <FormContainer backBtnText={'돌아가기'}>
      <InputRow
        {...commonOptions}
        inputProps={{
          style: styles.input,
          onChangeText: _onChangeTextID,
          placeholder: '영문, 숫자 혼합 5자리 이상',
          value: id,
        }}
        buttonProps={{
          style: styles.button,
          text: '중복 확인',
          textStyle: styles.inputButtonText,
          onPress: checkDuplID,
        }}
        label={'아이디'}
      />
      <InputRow
        {...commonOptions}
        inputProps={{
          secureTextEntry: true,
          style: styles.input,
          onChangeText: _onChangeTextPassword,
          placeholder: '비밀번호',
          value: password,
        }}
        label={'비밀번호'}
      />
      <InputRow
        {...commonOptions}
        inputProps={{
          secureTextEntry: true,
          style: styles.input,
          onChangeText: _onChangeTextCheckPassword,
          placeholder: '비밀번호 확인',
          value: checkPassword,
        }}
        label={'비밀번호 확인'}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={nextBtnPress}>
        <TemplateText familyType="power" style={styles.signUpButtonText}>
          {'다음'}
        </TemplateText>
      </TouchableOpacity>
    </FormContainer>
  );
}

export type { AccountInfoData };
export default AccountInfoStep;
