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
    'SignUp/AccountInfoStep'
  >;
};

function AccountInfoStep({ navigation }: PropsType) {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');

  const nextBtnPress = useCallback(
    () => navigation.navigate('SignUp/SignInfoStep'),
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

export default AccountInfoStep;
