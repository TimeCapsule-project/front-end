import tokenParser from 'jwt-decode';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_TOKEN_KEY } from 'constants/asyncStorage';

export const getToken = async () => await AsyncStorage.getItem(USER_TOKEN_KEY);

export const checkLogged = async () => {
  const token = await getToken();
  return !!token;
};

export const parseJwt = (token: string) => {
  const decode = tokenParser(token);
  return decode;
};

export const logout = async (navigation?: any) => {
  await AsyncStorage.setItem(USER_TOKEN_KEY, '');

  Toast.show('성공적으로 로그아웃 되었습니다!');
  navigation && navigation?.navigate('Intro');
};
