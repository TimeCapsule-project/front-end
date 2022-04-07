import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../routes';
import { defaultStyles } from '../../assets/styles/default';
import { globalStyles } from '../../assets/styles/global';
import { mixinStyles } from '../../assets/styles/mixin';
import { darkBlue, yellow } from '../../assets/styles/colors';
import TemplateText from 'components/TemplateText';

const thumbnailSource = '../../assets/images/thumbnail.png';

type PropsType = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignInfoStep'>;
};

function Intro(props: PropsType) {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const _onPress = useCallback(
    () => props.navigation.navigate('Home'),
    [props.navigation],
  );

  const _onPressSignUp = useCallback(
    () => props.navigation.navigate('SignInfoStep'),
    [props.navigation],
  );

  const _onPressFindPassword = useCallback(() => {}, []);

  const _onChangeID = useCallback((text: string) => setId(text), []);

  const _onChangePassword = useCallback(
    (text: string) => setPassword(text),
    [],
  );

  return (
    <View style={styles.container}>
      <Image source={require(thumbnailSource)} />
      <Text style={styles.title}>{'황금두더지'}</Text>
      <View style={styles.signIn}>
        <TextInput
          style={styles.input}
          onChangeText={_onChangeID}
          placeholder="아이디"
          value={id}
        />
        <TextInput
          style={styles.input}
          onChangeText={_onChangePassword}
          placeholder="비밀번호"
          value={password}
        />
        <TouchableOpacity
          style={styles.findPassword}
          onPress={_onPressFindPassword}>
          <Text style={styles.findPasswordText}>
            {'비밀번호를 잊으셨나요?'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={_onPress}>
          <TemplateText familyType="power" style={styles.buttonText}>
            {'로그인'}
          </TemplateText>
        </TouchableOpacity>
        <View style={styles.spacingBox} />
        <TouchableOpacity style={styles.signUpButton} onPress={_onPressSignUp}>
          <TemplateText familyType="power" style={styles.buttonText}>
            {'새 계정 만들기'}
          </TemplateText>
        </TouchableOpacity>
      </View>
      {/* '테스트 로그인 버튼' */}
      <TouchableOpacity style={styles.loginBtn} onPress={_onPress}>
        <TemplateText familyType="power" style={defaultStyles.buttonText}>
          {'로그인'}
        </TemplateText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    ...mixinStyles.flexCenter,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  signIn: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    fontFamily: 'GangwonEduPower',
    width: '100%',
    height: 45,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    backgroundColor: '#E2E2E2',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  loginButton: {
    ...defaultStyles.button,
    backgroundColor: yellow,
    borderRadius: 4,
    width: '100%',
    height: 45,
    marginTop: 25,
  },
  loginBtn: {
    ...defaultStyles.button,
    width: '40%',
    marginTop: 50,
  },
  spacingBox: {
    width: '100%',
    height: 1,
    marginTop: 50,
    marginBottom: 25,
    backgroundColor: '#C0BFBE',
  },
  signUpButton: {
    ...defaultStyles.button,
    backgroundColor: darkBlue,
    borderRadius: 4,
    width: '50%',
    height: 45,
  },
  findPassword: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  findPasswordText: {
    fontSize: 12,
    color: yellow,
    fontFamily: 'GangwonEduPower',
  },
});

export default Intro;
