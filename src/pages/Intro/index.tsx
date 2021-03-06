import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { checkLogged } from 'utils/auth';
import { useLogin } from 'hooks/api/useLogin';
import { useKakaoLogin } from 'hooks/api/useKakaoLogin';
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

  const redirectLogged = useCallback(async () => {
    if (await checkLogged()) {
      props.navigation.navigate('Home');
    }
  }, [props.navigation]);

  useEffect(() => {
    redirectLogged();
  }, [redirectLogged]);

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

  // common Login
  const _onSuccessLogin = useCallback(
    () => props.navigation.navigate('Home'),
    [props.navigation],
  );

  const { mutate: signIn } = useLogin(
    { userId: id, userPw: password },
    _onSuccessLogin,
  );

  const _onPress = useCallback(() => {
    if (!id) {
      return Toast.show('???????????? ??????????????????.');
    }
    if (!password) {
      return Toast.show('??????????????? ??????????????????.');
    }
    signIn();
  }, [id, password, signIn]);

  // kakao Login
  const _onSuccessKakaoLogin = useCallback(() => {
    props.navigation.navigate('Home');
  }, [props.navigation]);

  const { refetch: signInWithKakao } = useKakaoLogin(_onSuccessKakaoLogin);

  const _onPressKakaoLogin = useCallback(
    () => signInWithKakao(),
    [signInWithKakao],
  );

  return (
    <View style={styles.container}>
      <Image source={require(thumbnailSource)} />
      <TemplateText familyType="bold" style={styles.title}>
        {'???   ???   ???   ???   ???'}
      </TemplateText>
      <View style={styles.signIn}>
        <TextInput
          style={styles.input}
          onChangeText={_onChangeID}
          placeholder="?????????"
          value={id}
        />
        <TextInput
          style={styles.input}
          onChangeText={_onChangePassword}
          placeholder="????????????"
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.findPassword}
          onPress={_onPressFindPassword}>
          <Text style={styles.findPasswordText}>
            {'??????????????? ????????????????'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={_onPress}>
          <TemplateText familyType="power" style={styles.buttonText}>
            {'?????????'}
          </TemplateText>
        </TouchableOpacity>
        <View style={styles.spacingBox} />
        <TouchableOpacity style={styles.signUpButton} onPress={_onPressSignUp}>
          <TemplateText familyType="power" style={styles.buttonText}>
            {'??? ?????? ?????????'}
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
