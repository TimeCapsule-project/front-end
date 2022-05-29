import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { post } from 'utils/request';
import { USER_PROFILE_KEY, USER_TOKEN_KEY } from 'constants/asyncStorage';
import { CommonLoginRequestData, LoginResponseData } from './types';

const useLogin = (data: CommonLoginRequestData, onSuccess: () => void) => {
  const client = useQueryClient();

  const mutation = useCallback(() => post('/api/user/login', { data }), [data]);

  return useMutation<AxiosResponse<LoginResponseData>>(
    ['login', data],
    mutation,
    {
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
          Toast.show('로그인이 실패하였습니다.');
          console.error(error);
        }
      },
      onError: error => {
        Toast.show('로그인이 실패했습니다.');
        console.error(error);
      },
    },
  );
};

export { useLogin };
