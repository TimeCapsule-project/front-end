import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  STORAGE_KAKAO_TOKEN_KEY,
  STORAGE_COMMON_TOKEN_KEY,
} from 'constants/asyncStorage';

export const getTokenAndType = async () => {
  const kakaoToken = await AsyncStorage.getItem(STORAGE_KAKAO_TOKEN_KEY);
  if (kakaoToken) {
    return {
      token: kakaoToken,
      type: 'kakao',
    };
  }
  const token = await AsyncStorage.getItem(STORAGE_COMMON_TOKEN_KEY);
  if (token) {
    return {
      token: kakaoToken,
      type: 'common',
    };
  }
  return null;
};

export const checkLogged = async () => {
  const token = await getTokenAndType();
  return !!token;
};
