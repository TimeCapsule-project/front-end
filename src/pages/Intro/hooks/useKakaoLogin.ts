import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useQuery, useQueryClient } from 'react-query';
import { instance as axios } from 'utils/request';

const useKakaoLogin = (onSuccess: (data: any) => void) => {
  const client = useQueryClient();

  const fetch = useCallback(() => axios.get('/api/account/login-url'), []);

  return useQuery(['kakaoLogin'], fetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: response => {
      client.invalidateQueries(['api', 'account', 'login-url']);
      onSuccess(response.data.data); // TODO: FIX API RESPONSE
    },
    onError: error => {
      Toast.show('이미 가입된 아이디 입니다.');
      console.error(error);
    },
  });
};

export { useKakaoLogin };
