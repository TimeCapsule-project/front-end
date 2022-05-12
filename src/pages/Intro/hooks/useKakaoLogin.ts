import Toast from 'react-native-root-toast';
import { useQuery } from 'react-query';
import {
  login,
  logout,
  unlink,
  getProfile,
  KakaoProfile,
  KakaoProfileNoneAgreement,
} from '@react-native-seoul/kakao-login';
import { get } from 'utils/request';

const useKakaoLogin = (onSuccess: (data: any) => void) => {
  const fetch = async () => {
    try {
      const tokens = await login();
      const token = tokens.accessToken;
      if (token) {
        return get('api/account/kakaologin', { params: { token } });
      }
      throw new Error('failed kakao login api');
    } catch (error) {
      console.error(error);
      Toast.show(String(error));
    }
  };

  return useQuery(['signInWithKakao'], fetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: (response: any) => onSuccess(response.data.data),
    onError: error => {
      // loginWithKakaoAccount # 카카오톡 없이 로그인하는 기능이 제대로 작동하지 않아 기본형으로 사용함
      Toast.show('카카오 인증에 실패했습니다. 먼저 카카오톡을 설치해주세요.');
      console.error(error);
    },
  });
}

const useKakaoLoginUtils = () => {
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

export { useKakaoLogin, useKakaoLoginUtils };
