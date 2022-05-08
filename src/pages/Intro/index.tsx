import React, { useCallback, useState } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useKakaoLogin } from './hooks/useKakaoLogin';
import { defaultStyles } from 'assets/styles/default';
import { globalStyles } from 'assets/styles/global';
import { mixinStyles } from 'assets/styles/mixin';
import { darkBlue, yellow } from 'assets/styles/colors';
import { RootStackParamList } from '../routes';
import TemplateText from 'components/TemplateText';
import TouchableImage from 'components/TouchableImage';

const thumbnailSource = '../../assets/images/thumbnail.png';

type PropsType = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Intro'>;
};

function Intro(props: PropsType) {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const _onPress = useCallback(
    () => props.navigation.navigate('Home'),
    [props.navigation],
  );

  const _onPressSignUp = useCallback(
    () => props.navigation.navigate('SignUp/AccountInfoStep'),
    [props.navigation],
  );

  const _onPressFindPassword = useCallback(
    () => props.navigation.navigate('FindPassword'),
    [props.navigation],
  );

  const _onChangeID = useCallback((text: string) => setId(text), []);

  const _onChangePassword = useCallback(
    (text: string) => setPassword(text),
    [],
  );

  const _onSuccessGetKakaoLoginUrl = useCallback(async (url: string) => {
    const redirect = await Linking.getInitialURL();
    const split = url.split('redirect_uri=');
    const openUrl = `${split[0]}redirect_uri=${'timecapsuleapp://Intro'}${
      '&response_type=code' //split[1]
    }`;
    console.log(openUrl);
    await Linking.openURL(openUrl);
  }, []);

  const { refetch: getKakaoLoginUrl } = useKakaoLogin(
    _onSuccessGetKakaoLoginUrl,
  );

  const _onPressKakaoLogin = useCallback(() => {
    getKakaoLoginUrl();
  }, [getKakaoLoginUrl]);

  return (
    <View style={styles.container}>
      <Image source={require(thumbnailSource)} />
      <TemplateText familyType="bold" style={styles.title}>
        {'황   금   두   더   지'}
      </TemplateText>
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
        <TouchableImage
          imgInfo={{
            source: require('../../assets/images/kakaoLogin.png'),
            width: 170,
            height: 45,
          }}
          styles={styles.kakaoLoginButtonContainer}
          imgStyles={styles.kakaoLoginButton}
          onPress={_onPressKakaoLogin}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    ...mixinStyles.flexCenter,
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginVertical: 24,
  },
  signIn: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 45,
  },
  input: {
    fontFamily: 'GangwonEduPower',
    width: '100%',
    height: 45,
    borderRadius: 4,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#bbbbbb',
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
    width: 170,
    height: 45,
  },
  kakaoLoginButton: {
    width: 170,
    height: 45,
    borderRadius: 4,
  },
  kakaoLoginButtonContainer: {
    marginTop: 15,
  },
  findPassword: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: -5,
    marginBottom: 25,
  },
  findPasswordText: {
    fontSize: 12,
    color: yellow,
    fontFamily: 'GangwonEduPower',
  },
});

export default Intro;
