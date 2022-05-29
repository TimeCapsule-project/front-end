import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';
import {
  login,
  logout,
  unlink,
  getProfile,
  KakaoProfile,
  KakaoProfileNoneAgreement,
} from '@react-native-seoul/kakao-login';
import { get } from 'utils/request';
import { LoginResponseData } from './types';
import { USER_TOKEN_KEY, USER_PROFILE_KEY } from 'constants/asyncStorage';

const useKakaoLogin = (onSuccess: () => void) => {
  const client = useQueryClient();

  const fetch = async () => {
    const tokens = await login();
    const token = tokens.accessToken;

    return get('api/account/kakaologin', { params: { token } });
  };

  return useQuery<AxiosResponse<LoginResponseData>>(
    ['signInWithKakao'],
    fetch,
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: async response => {
        try {
          client.invalidateQueries(['api', 'user', 'login']);

          const _data = response.data.data;
          const token = _data.access_TOKEN;
          if (token) {
            await AsyncStorage.setItem(USER_TOKEN_KEY, token);
            await AsyncStorage.setItem(
              USER_PROFILE_KEY,
              JSON.stringify({
                userId: _data.userId,
                userNickname: _data.userNickname,
              }),
            );
            Toast.show(`${_data.userNickname}님, 환영합니다!`);
            onSuccess();
          }
        } catch (error) {
          Toast.show('카카오 로그인이 실패하였습니다.');
          console.error(error);
        }
      },
      onError: error => {
        Toast.show('카카오 인증에 실패했습니다. 먼저 카카오톡을 설치해주세요.');
        console.error(error);
      },
    },
  );
};

const kakaoLoginUtils = () => {
  /**
   * @returns {String} message
   */
  const signOutWithKakao = async (): Promise<string> => await logout();

  /**
   * @returns {String} message
   */
  const unlinkKakao = async (): Promise<string> => await unlink();

  const getKakaoProfile = async (): Promise<string> => {
    const profile: KakaoProfile | KakaoProfileNoneAgreement =
      await getProfile();

    return JSON.stringify(profile);
  };

  return {
    signOutWithKakao,
    getKakaoProfile,
    unlinkKakao,
  };
};

export { useKakaoLogin, kakaoLoginUtils };
